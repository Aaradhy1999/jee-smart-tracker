let jeeSyllabusData = null;
let activeSubpartId = null;
let activeSubpartName = "";
let pomoTimerThread = null;
let pomoSecondsLeft = 1500;
let questionStopwatchThread = null;
let questionSecondsElapsed = 0;

const formulaSheetDatabase = {
    "p-ud-1": "• <b>Dimensional Homogeneity:</b> Only terms with matching dimensions can be added or subtracted.<br>• <b>Planck's Constant (h):</b> [E][T] = [M¹ L² T⁻¹]<br>• <b>Permittivity (ε₀):</b> [F⁻¹ L⁻² T⁴ A²]<br>• <b>Gravitational Constant (G):</b> [M⁻¹ L³ T⁻²]<br>• <b>JEE Speed Trick:</b> Velocity of light c = 1/√(μ₀ε₀).",
    "p-kin-1": "• <b>Equations of Motion:</b> Only valid if acceleration (a) is perfectly uniform.<br>• v = u + at, s = ut + ½at², v² = u² + 2as<br>• <b>Snth Distance:</b> S_nth = u + a/2(2n - 1)<br>• <b>Variable Acceleration:</b> Always differentiate or integrate: v = dx/dt, a = dv/dt = v(dv/dx).",
    "p-nlm-1": "• <b>Newton's 2nd Law:</b> F_net = dP/dt = m(dv/dt) + v(dm/dt).<br>• <b>Wedge Acceleration Rule:</b> Wedge acceleration a = g tanθ stops relative block slip.<br>• <b>Apparent Lift Weight:</b> W_app = m(g ± a). Use '+' for upward acceleration, '-' for deceleration down.",
    "c-bsc-2": "• <b>Mole Formula:</b> Moles = Given Mass / Molar Mass = Vol at STP / 22.4L = N_particles / 6.022×10²³.<br>• <b>Concentration Rules:</b> Molarity (M) = Moles / Vol of Sol (L); Molality (m) = Moles / Mass of Solvent (kg).<br>• <b>Mole Fraction:</b> X_A = n_A / (n_A + n_B). Always note that X_A + X_B = 1.",
    "m-qe-1": "• <b>Roots of ax² + bx + c = 0:</b> x = (-b ± √D) / 2a, where Discriminant D = b² - 4ac.<br>• <b>Sum & Product:</b> α + β = -b/a, αβ = c/a.<br>• <b>Difference of Roots:</b> |α - β| = √D / |a|.<br>• <b>Condition for Common Root:</b> (c₁a₂ - c₂a₁)² = (a₁b₂ - a₂b₁)(b₁c₂ - b₂c₁)."
};

document.querySelectorAll('.sub-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        document.querySelectorAll('.sub-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        renderChapters(e.target.dataset.subject);
    });
});

async function initializeApp() {
    try {
        const response = await fetch('syllabus-schema.json');
        jeeSyllabusData = await response.json();
        renderChapters('physics');
    } catch (err) {
        document.getElementById('chapter-list-tree').innerHTML = `<p class="status-msg" style="color:var(--tag-critical)">System Error: Failed to orchestrate schema configuration mapping layer.</p>`;
    }
}

function renderChapters(subject) {
    const container = document.getElementById('chapter-list-tree');
    container.innerHTML = '';
    if (!jeeSyllabusData || !jeeSyllabusData[subject]) return;

    jeeSyllabusData[subject].forEach(chapter => {
        const chapterDiv = document.createElement('div');
        chapterDiv.className = 'chapter-container';
        chapterDiv.innerHTML = `
            <div class="chapter-row" onclick="toggleSubparts('${chapter.id}')">
                <span class="dropdown-arrow">▶</span>
                <span class="chapter-name">${chapter.name}</span>
                <div class="progress-bar-wrapper">
                    <div class="progress-bar-fill" id="bar-${chapter.id}" style="width: 0%"></div>
                </div>
                <span class="progress-text" id="text-${chapter.id}">0%</span>
            </div>
            <div class="subparts-tree" id="tree-${chapter.id}" style="display: none;"></div>
        `;
        const treeContainer = chapterDiv.querySelector(`#tree-${chapter.id}`);
        chapter.subparts.forEach(sub => {
            const subRow = document.createElement('div');
            subRow.className = 'subpart-item';
            subRow.id = `item-${sub.id}`;
            subRow.innerText = sub.name;
            subRow.onclick = (e) => {
                e.stopPropagation();
                selectSubpart(sub.id, sub.name);
            };
            treeContainer.appendChild(subRow);
        });
        container.appendChild(chapterDiv);
        updateChapterProgressUI(chapter.id);
    });
    updateGlobalMetrics();
}

function toggleSubparts(chapterId) {
    const tree = document.getElementById(`tree-${chapterId}`);
    const arrow = tree.previousElementSibling.querySelector('.dropdown-arrow');
    if (tree.style.display === 'none') {
        tree.style.display = 'block';
        arrow.style.transform = 'rotate(90deg)';
    } else {
        tree.style.display = 'none';
        arrow.style.transform = 'rotate(0deg)';
    }
}

function selectSubpart(subpartId, subpartName) {
    activeSubpartId = subpartId;
    activeSubpartName = subpartName;
    document.querySelectorAll('.subpart-item').forEach(item => item.classList.remove('selected'));
    const activeItem = document.getElementById(`item-${subpartId}`);
    if (activeItem) activeItem.classList.add('selected');

    document.getElementById('active-topic-header').innerHTML = `<h2>${subpartName} Workspace</h2>`;
    
    const formulaBtn = document.getElementById('view-formula-btn');
    if(formulaSheetDatabase[subpartId]) {
        formulaBtn.style.display = 'block';
    } else {
        formulaBtn.style.display = 'none';
    }

    localStorage.removeItem(`score-${subpartId}`);
    localStorage.removeItem(`check-${subpartId}`);
    localStorage.removeItem(`indices-${subpartId}`);
    localStorage.removeItem(`timeElapsed-${subpartId}`);
    for (let i = 0; i < 30; i++) {
        localStorage.removeItem(`map-${subpartId}-${i}`);
        localStorage.removeItem(`textSnap-${subpartId}-${i}`);
    }

    if(questionStopwatchThread) clearInterval(questionStopwatchThread);
    questionSecondsElapsed = 0;
    questionStopwatchThread = setInterval(() => {
        questionSecondsElapsed++;
    }, 1000);

    generateRandomizedQuestions(subpartId, subpartName);
    evaluateDiagnosticMetrics(subpartId);

    const savedNote = localStorage.getItem(`note-${subpartId}`) || '';
    document.getElementById('note-input').value = savedNote;
    document.getElementById('save-status').innerText = '';
}

function generateRandomizedQuestions(subpartId, subpartName) {
    const testZone = document.getElementById('mcq-test-zone');
    testZone.innerHTML = '';

    let subjectPrefix = subpartId.split('-')[0];
    let targetShardFile = 'physics-questions.json';
    if (subjectPrefix === 'c') targetShardFile = 'chemistry-questions.json';
    if (subjectPrefix === 'm') targetShardFile = 'math-questions.json';

    fetch(targetShardFile)
        .then(response => response.json())
        .then(data => {
            let staticPool = data[subpartId] || [];
            let fullPool = [];

            staticPool.forEach(item => {
                fullPool.push({ q: item.q, correctText: item.correctText, falseOptions: [...item.falseOptions] });
            });

            while (fullPool.length < 30) {
                let i = fullPool.length + 1;
                let v1 = Math.floor(Math.random() * 15) + 3;
                let v2 = Math.floor(Math.random() * 8) + 2;
                let scenarioIdx = Math.floor(Math.random() * 4);
                let ansValue = v1 * v2;
                let qText = "", cText = "", f1 = "", f2 = "", f3 = "";

                if (subjectPrefix === 'p') {
                    if (scenarioIdx === 0) {
                        qText = `Variant #${i}: An isolated particle working under mechanics metrics for "${subpartName}" accelerates uniformly from rest. If acceleration parameters register $a = ${v1} \\text{ m/s}^2$ across a specific active window of $t = ${v2} \\text{ s}$, evaluate the ultimate terminal velocity profile value.`;
                        cText = `${ansValue} m/s`; f1 = `${v1 + v2} m/s`; f2 = `${Math.abs(v1 - v2)} m/s`; f3 = `${ansValue * 2} m/s`;
                    } else if (scenarioIdx === 1) {
                        qText = `Variant #${i}: An experimental force grid array tracking fields for "${subpartName}" receives parallel vector configurations. If linear field parameters register input metrics $E_1 = ${v1} \\text{ N}$ and $E_2 = ${v2} \\text{ N}$ acting along a matching continuous vector plane, calculate the maximum possible superposition force magnitude value.`;
                        cText = `${v1 + v2} N`; f1 = `${v1 * v2} N`; f2 = `${Math.abs(v1 - v2)} N`; f3 = `${(v1 + v2) * 2} N`;
                    } else if (scenarioIdx === 2) {
                        qText = `Variant #${i}: A systemic framework processing structural constraints for "${subpartName}" maps a continuous potential energy distribution curve defined by $U(x) = ${v2}x^2$. Determine the complete network energy state evaluated at a localized boundary limit coordinate node of $x = ${v1} \\text{ meters}$.`;
                        cText = `${v1 * v1 * v2} J`; f1 = `${v1 * v2} J`; f2 = `${v1 + v2} J`; f3 = `${v1 * v1 * v2 + v1} J`;
                    } else {
                        qText = `Variant #${i}: A continuous fluids chamber tracking configurations for "${subpartName}" moves medium across distinct dimensions. Given an operational fluid intake rate constant of $Q = ${v1} \\text{ L/min}$ moving across an aperture restriction cross-section coefficient of ${v2} units, evaluate the resulting output flow tracking scalar component value ($100Q / \\text{factor}$).`;
                        cText = `${Math.round((v1 * 100) / v2)}`; f1 = `${v1 * v2}`; f2 = `${v1 + v2}`; f3 = `${Math.round((v1 * 100) / v2) + 5}`;
                    }
                } else if (subjectPrefix === 'c') {
                    if (scenarioIdx === 0) {
                        qText = `Variant #${i}: An aqueous chemical coordination composition testing properties of "${subpartName}" runs inside a closed system layout. If an extraction flask isolates precisely ${v1} moles of reacting compound species managed under a stoichiometric combination matrix coefficient of ${v2}, compute the net molar tracking mass yield parameters.`;
                        cText = `${ansValue} g/mol`; f1 = `${v1 + v2} g/mol`; f2 = `${Math.abs(v1 - v2)} g/mol`; f3 = `${ansValue * 2} g/mol`;
                    } else if (scenarioIdx === 1) {
                        qText = `Variant #${i}: During an analytical titration sequence framing elements of "${subpartName}", a color indicator monitors chemical step adjustments. If a standard solution matrix layers an initial active baseline concentration of $M_1 = ${v1} \\text{ M}$ treated with a secondary chemical reagent changing limits by $M_2 = ${v2} \\text{ M}$, calculate the final mixture molarity profile.`;
                        cText = `${v1 + v2} M`; f1 = `${v1 * v2} M`; f2 = `${v1} M`; f3 = `${v2} M`;
                    } else if (scenarioIdx === 2) {
                        qText = `Variant #${i}: An excited structural electronic state tracking orbit path properties for "${subpartName}" maps discrete orbital domains. If atomic drops transition across bounds releasing a localized field frequency metric of $\\nu = ${v1} \\times 10^{14} \\text{ Hz}$, compute the squared electronic probability coordinate factor.`;
                        cText = `${v1 * v1}`; f1 = `${v1 * 2}`; f2 = `${v1 + v2}`; f3 = `${v1 * v1 + v2}`;
                    } else {
                        qText = `Variant #${i}: A thermodynamic gas expansion setup investigating properties of "${subpartName}" processes internal changes. If absolute system enthalpy updates record $\\Delta H = ${v1} \\text{ kJ}$ while external system boundary configurations perform work energy transfers of $W = ${v2} \\text{ kJ}$, find the true internal energy profile adjustment value ($\\Delta H - W$).`;
                        cText = `${v1 - v2} kJ`; f1 = `${v1 + v2} kJ`; f2 = `${v1 * v2} kJ`; f3 = `${Math.abs(v1 - v2) * 2} kJ`;
                    }
                } else {
                    if (scenarioIdx === 0) {
                        qText = `Variant #${i}: Let a multi-dimensional array mapping functions for "${subpartName}" build a standard arithmetic sequence string. If the sequence layout initiates from a base coordinate index of $a = ${v1}$ incrementing sequentially by a common difference step variable of $d = ${v2}$, find the exact value of the second structural element.`;
                        cText = `${v1 + v2}`; f1 = `${v1 * v2}`; f2 = `${v1}`; f3 = `${v2}`;
                    } else if (scenarioIdx === 1) {
                        qText = `Variant #${i}: A linear transform square grid module processing dataset boundary intersections for "${subpartName}" solves matrix equations. If a column projection maps a regular target transform matrix returning an evaluated determinant magnitude of $|A| = ${v1}$ scaling rows by uniform factor indexes of ${v2}, solve for the Cramer scalar vector product metric.`;
                        cText = `${ansValue}`; f1 = `${v1 + v2}`; f2 = `${v1 * v1}`; f3 = `${v2 * v2}`;
                    } else if (scenarioIdx === 2) {
                        qText = `Variant #${i}: The structural boundary parameters of a geometric coordinate locus tracing equations for "${subpartName}" cut across structural domains. Given an intersection root array mapping domain paths managed by quadratic criteria variables $x^2 = ${v1}x + ${v2}$, compute the active polynomial matching metric value evaluated for ($v_1^2 - v_2$).`;
                        cText = `${v1 * v1 - v2}`; f1 = `${v1 + v2}`; f2 = `${v1 * v1}`; f3 = `${v2 * v2}`;
                    } else {
                        qText = `Variant #${i}: A distribution configuration sorting discrete choice structures matching laws for "${subpartName}" organizes array layouts. If total collection slots group into an matrix domain of $n = ${v1} elements matching an option selector index of $r = ${v2}$, find the final configuration space boundary tracking scalar ($n \\cdot r + 1$).`;
                        cText = `${v1 * v2 + 1}`; f1 = `${v1 * v2}`; f2 = `${v1 + v2}`; f3 = `${(v1 * v2 + 1) * 2}`;
                    }
                }
                fullPool.push({ q: `[Dynamic Variant Stream] ${qText}`, correctText: cText, falseOptions: [f1, f2, f3] });
            }

            let availableIndices = [...Array(fullPool.length).keys()];
            let savedIndices = localStorage.getItem(`indices-${subpartId}`);
            if (!savedIndices) {
                availableIndices.sort(() => Math.random() - 0.5);
                localStorage.setItem(`indices-${subpartId}`, JSON.stringify(availableIndices.slice(0, 5)));
            }
            let chosenIndices = JSON.parse(localStorage.getItem(`indices-${subpartId}`));
            let activeQuestions = chosenIndices.map(idx => fullPool[idx]);
            const scoreState = JSON.parse(localStorage.getItem(`score-${subpartId}`)) || {};

            activeQuestions.forEach((q, qIdx) => {
                const qCard = document.createElement('div');
                qCard.className = 'mcq-card';
                qCard.style.margin = '20px 0';
                
                let savedText = localStorage.getItem(`textSnap-${subpartId}-${qIdx}`);
                if (!savedText) {
                    localStorage.setItem(`textSnap-${subpartId}-${qIdx}`, q.q);
                    savedText = q.q;
                }
                
                let isBookmarked = verifyBookmarkState(subpartId, savedText);
                
                qCard.innerHTML = `
                    <div class="mcq-header">
                        <span style="font-size:0.8rem; color:var(--text-muted)">High-Yield Challenge Array</span>
                        <button class="bookmark-action-btn ${isBookmarked ? 'active' : ''}" onclick="toggleBookmarkVariantDirect('${subpartId}', '${subpartName}', this)">${isBookmarked ? '★ Flagged' : '☆ Flag'}</button>
                    </div>
                    <p class="question-text-paragraph" style="font-weight:600; margin-bottom:12px; color:var(--text-main)">Q${qIdx + 1}: ${savedText}</p>
                `;

                let optionMapping = [];
                let savedMapping = localStorage.getItem(`map-${subpartId}-${qIdx}`);
                if (savedMapping) {
                    optionMapping = JSON.parse(savedMapping);
                } else {
                    let optionsPool = [{ text: q.correctText, isCorrect: true }];
                    q.falseOptions.forEach(f => optionsPool.push({ text: f, isCorrect: false }));
                    optionsPool.sort(() => Math.random() - 0.5);
                    optionMapping = optionsPool;
                    localStorage.setItem(`map-${subpartId}-${qIdx}`, JSON.stringify(optionMapping));
                }

                let correctOptionIndex = optionMapping.findIndex(o => o.isCorrect);

                optionMapping.forEach((opt, optIdx) => {
                    const btn = document.createElement('button');
                    btn.className = 'mcq-opt-btn';
                    btn.innerText = opt.text;
                    btn.style.display = 'block';
                    btn.style.width = '100%';
                    btn.style.textAlign = 'left';
                    btn.style.margin = '6px 0';
                    btn.style.padding = '12px';
                    btn.style.border = '1px solid var(--border-glass)';
                    btn.style.background = 'rgba(255,255,255,0.01)';
                    btn.style.color = '#e2e8f0';
                    btn.style.borderRadius = '8px';
                    btn.style.cursor = 'pointer';

                    if (scoreState[qIdx] !== undefined) {
                        if (optIdx === correctOptionIndex) btn.style.background = 'rgba(16, 185, 129, 0.15)';
                        if (scoreState[qIdx] === optIdx && optIdx !== correctOptionIndex) btn.style.background = 'rgba(244, 63, 94, 0.15)';
                        btn.disabled = true;
                    } else {
                        btn.onclick = () => verifyMCQAnswer(subpartId, subpartName, qIdx, optIdx, correctOptionIndex);
                    }
                    qCard.appendChild(btn);
                });

                if (scoreState[qIdx] !== undefined && scoreState[qIdx] !== correctOptionIndex) {
                    const diaryDiv = document.createElement('div');
                    diaryDiv.style.marginTop = '12px';
                    diaryDiv.style.padding = '10px';
                    diaryDiv.style.background = 'rgba(244, 63, 94, 0.05)';
                    diaryDiv.style.borderRadius = '6px';
                    diaryDiv.style.border = '1px solid rgba(244, 63, 94, 0.1)';
                    diaryDiv.innerHTML = `
                        <span style="font-size:0.8rem; color:var(--tag-critical); font-weight:700; display:block; margin-bottom:6px;">Log this incorrect attempt in your JEE 2029 Mistake Diary:</span>
                        <select onchange="logMistakeToDiary('${subpartId}', '${subpartName}', ${qIdx}, this.value, this)" style="background:var(--bg-dark); color:#fff; border:1px solid var(--border-glass); padding:6px; border-radius:4px; font-size:0.85rem; width:100%; cursor:pointer;">
                            <option value="">-- Choose Error Root Category --</option>
                            <option value="Silly Calculation Trap">Silly Calculation Trap (Arithmetic Sign error / Multiplier rush)</option>
                            <option value="Conceptual Blindspot">Conceptual Blindspot (Misapplied theorem boundary/formula constraint)</option>
                            <option value="Time-Pressure Panic">Time-Pressure Panic (Rushed the reading statement parameters)</option>
                        </select>
                    `;
                    qCard.appendChild(diaryDiv);
                }

                testZone.appendChild(qCard);
            });
        })
        .catch(err => {
            testZone.innerHTML = `<p class="status-msg" style="color:var(--tag-critical);">Error loading context database shard file map streaming layer.</p>`;
        });
}

function verifyMCQAnswer(subpartId, subpartName, qIdx, selectedIdx, correctIdx) {
    if(questionStopwatchThread) {
        clearInterval(questionStopwatchThread);
        questionStopwatchThread = null;
    }
    localStorage.setItem(`timeElapsed-${subpartId}`, questionSecondsElapsed);

    let scoreState = JSON.parse(localStorage.getItem(`score-${subpartId}`)) || {};
    scoreState[qIdx] = selectedIdx;
    localStorage.setItem(`score-${subpartId}`, JSON.stringify(scoreState));
    
    let savedState = JSON.parse(localStorage.getItem(`check-${subpartId}`)) || [false, false, false, false, false];
    savedState[qIdx] = (selectedIdx === correctIdx);
    localStorage.setItem(`check-${subpartId}`, JSON.stringify(savedState));
    
    generateRandomizedQuestions(subpartId, subpartName);
    evaluatePercentages();
    evaluateDiagnosticMetrics(subpartId);
}

function logMistakeToDiary(subpartId, subpartName, qIdx, reason, selectEl) {
    if (!reason) return;
    let qText = localStorage.getItem(`textSnap-${subpartId}-${qIdx}`) || "Dynamic Metric Variant Question Block";
    let diary = JSON.parse(localStorage.getItem('jee_mistake_diary')) || [];
    if (!diary.some(d => d.subpartId === subpartId && d.qIdx === qIdx)) {
        diary.push({ subpartId, subpartName, qIdx, q: qText, errorType: reason, timestamp: new Date().toLocaleDateString() });
        localStorage.setItem('jee_mistake_diary', JSON.stringify(diary));
    }
    selectEl.parentElement.innerHTML = `<span style="font-size:0.85rem; color:var(--tag-clear); font-weight:600;">✓ Error categorized as [${reason}] and filed into Mistake Diary!</span>`;
    if(document.getElementById('global-diary-view').style.display === 'block') renderDiaryPanelContents();
}

function toggleDiaryPanel() {
    const pane = document.getElementById('global-diary-view');
    const btn = document.getElementById('toggle-diary-btn');
    if(pane.style.display === 'none') {
        pane.style.display = 'block'; btn.innerText = "Close Mistake Diary"; renderDiaryPanelContents();
    } else {
        pane.style.display = 'none'; btn.innerText = "Open Mistake Diary";
    }
}

function renderDiaryPanelContents() {
    const container = document.getElementById('diary-container');
    container.innerHTML = '';
    let diary = JSON.parse(localStorage.getItem('jee_mistake_diary')) || [];
    
    if(diary.length === 0) {
        container.innerHTML = '<p class="status-msg">Your diary is clean! No incorrect attempts logged yet. Keep aiming for 100% accuracy.</p>';
        return;
    }
    
    diary.forEach(d => {
        const card = document.createElement('div');
        card.style.borderLeft = "3px solid var(--tag-critical)";
        card.style.background = "rgba(255,255,255,0.01)";
        card.style.padding = "12px"; card.style.margin = "10px 0"; card.style.borderRadius = "6px";
        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <strong style="color:var(--tag-critical); font-size:0.85rem;">${d.subpartName}</strong>
                <span style="font-size:0.75rem; background:rgba(244,63,94,0.15); color:var(--tag-critical); padding:2px 8px; border-radius:4px; font-weight:700;">${d.errorType}</span>
            </div>
            <p style="font-size:0.9rem; color:#e2e8f0; margin-top:4px;">${d.q}</p>
        `;
        container.appendChild(card);
    });
}

function evaluatePercentages() {
    let activeSubject = document.querySelector('.sub-btn.active').dataset.subject;
    jeeSyllabusData[activeSubject].forEach(chapter => {
        updateChapterProgressUI(chapter.id);
    });
    updateGlobalMetrics();
}

function updateChapterProgressUI(chapterId) {
    let chapter = null;
    for (let sub in jeeSyllabusData) {
        chapter = jeeSyllabusData[sub].find(c => c.id === chapterId);
        if (chapter) break;
    }
    if (!chapter) return;

    let totalChapterProgress = 0;
    chapter.subparts.forEach(sub => {
        const checkState = JSON.parse(localStorage.getItem(`check-${sub.id}`)) || [false, false, false, false, false];
        const correctCount = checkState.filter(Boolean).length;
        totalChapterProgress += (correctCount / 5) * sub.weight;
    });

    const finalPercent = Math.round(totalChapterProgress);
    const bar = document.getElementById(`bar-${chapterId}`);
    const text = document.getElementById('text-' + chapterId);
    if (bar) bar.style.width = `${finalPercent}%`;
    if (text) text.innerText = `${finalPercent}%`;
}

function updateGlobalMetrics() {
    let totalSyllabusWeight = 0;
    let totalEarnedWeight = 0;

    for (let sub in jeeSyllabusData) {
        jeeSyllabusData[sub].forEach(chapter => {
            chapter.subparts.forEach(subpart => {
                totalSyllabusWeight += 100;
                const checkState = JSON.parse(localStorage.getItem(`check-${subpart.id}`)) || [false, false, false, false, false];
                const correctCount = checkState.filter(Boolean).length;
                totalEarnedWeight += (correctCount / 5) * 100;
            });
        });
    }

    const overallPercent = totalSyllabusWeight > 0 ? Math.round((totalEarnedWeight / totalSyllabusWeight) * 100) : 0;
    const globalPercentEl = document.getElementById('global-percent');
    if (globalPercentEl) globalPercentEl.innerText = `${overallPercent}%`;
}

function evaluateDiagnosticMetrics(subpartId) {
    const badge = document.getElementById('analytics-badge');
    const textZone = document.getElementById('analytics-summary-text');
    if (!badge || !textZone) return;
    
    const scoreState = JSON.parse(localStorage.getItem(`score-${subpartId}`)) || {};
    const checkState = JSON.parse(localStorage.getItem(`check-${subpartId}`)) || [false, false, false, false, false];
    let timeTaken = parseInt(localStorage.getItem(`timeElapsed-${subpartId}`)) || 0;
    
    const answersAttempted = Object.keys(scoreState).length;
    const correctAnswers = checkState.filter(Boolean).length;
    const wrongAnswers = answersAttempted - correctAnswers;

    let totalJeeMarks = (correctAnswers * 4) - (wrongAnswers * 1);
    let rawScorePercent = answersAttempted > 0 ? Math.round((correctAnswers / 5) * 100) : 0;
    
    const chartRing = document.getElementById('radial-accuracy-ring');
    const chartText = document.getElementById('radial-percentage-text');
    if(chartRing && chartText) {
        let degrees = (rawScorePercent / 100) * 360;
        chartRing.style.setProperty('--chart-ratio', `${degrees}deg`);
        chartText.innerText = `${rawScorePercent}%`;
    }

    if (answersAttempted === 0) {
        badge.className = "badge neutral"; badge.innerText = "Clearance Pending";
        textZone.innerHTML = `No quiz submissions found for this module yet. Take the 5-question test on the left to compute telemetry insights.`;
        return;
    }

    let simulatedRank = "N/A";
    if (totalJeeMarks >= 15) simulatedRank = `AIR ${Math.floor(Math.random() * 500) + 1} (Elite Bracket)`;
    else if (totalJeeMarks >= 8) simulatedRank = `AIR ${Math.floor(Math.random() * 4000) + 2000} (NIT/IIIT Safe Zone)`;
    else simulatedRank = "AIR > 50,000 (Requires Sprint Revision)";

    let speedAlert = (timeTaken > 120 && totalJeeMarks >= 15) ? `<br><span style="color:var(--tag-warn); font-weight:700;">⚠️ SPEED ALERT: Solved accurately but spent ${timeTaken}s. AIR 1 requires dropping calculation latency below 90s per module.</span>` : "";

    if (totalJeeMarks < 10) {
        badge.className = "badge critical"; badge.innerText = "Critical Zone";
        textZone.innerHTML = `<strong>JEE Marks Metric: ${totalJeeMarks} / 20 Score</strong><br><strong>Predictor Matrix: ${simulatedRank}</strong><br><strong>Calibration Latency: ${timeTaken}s</strong><br><br>Negative marks penalty is draining your matrix safety. Slow down calculations and log your specific deviations inside your error book tab files.`;
    } else if (totalJeeMarks >= 10 && totalJeeMarks < 16) {
        badge.className = "badge warn"; badge.innerText = "Revision Needed";
        textZone.innerHTML = `<strong>JEE Marks Metric: ${totalJeeMarks} / 20 Score</strong><br><strong>Predictor Matrix: ${simulatedRank}</strong><br><strong>Calibration Latency: ${timeTaken}s</strong>${speedAlert}<br><br>Good raw base score accuracy, but accuracy leaks occurred. Track the alternative equation steps option items to secure a top 2000 spot.`;
    } else {
        badge.className = "badge clear"; badge.innerText = "AIR 1 Target Lock";
        textZone.innerHTML = `<strong>JEE Marks Metric: ${totalJeeMarks} / 20 Score</strong><br><strong>Predictor Matrix: ${simulatedRank}</strong><br><strong>Calibration Latency: ${timeTaken}s</strong>${speedAlert}<br><br>Phenomenal accuracy telemetry coordinates logged! Safe from negative marking penalty traps. Weight vector completely optimized.`;
    }
}

function verifyBookmarkState(subpartId, qText) {
    let bookmarks = JSON.parse(localStorage.getItem('jee_bookmarked_pool')) || [];
    return bookmarks.some(b => b.subpartId === subpartId && b.q === qText);
}

function toggleBookmarkVariantDirect(subpartId, subpartName, btnEl) {
    let cardElement = btnEl.closest('.mcq-card');
    let qTextElement = cardElement.querySelector('.question-text-paragraph');
    let rawQuestionText = qTextElement.innerText.replace(/^Q\d+:\s*/, '');

    let bookmarks = JSON.parse(localStorage.getItem('jee_bookmarked_pool')) || [];
    let idx = bookmarks.findIndex(b => b.subpartId === subpartId && b.q === rawQuestionText);
    
    if(idx > -1) {
        bookmarks.splice(idx, 1);
        btnEl.innerText = "☆ Flag";
        btnEl.classList.remove('active');
    } else {
        bookmarks.push({ subpartId, subpartName, q: rawQuestionText, correctText: "Dynamic Verified Formula Model" });
        btnEl.innerText = "★ Flagged";
        btnEl.classList.add('active');
    }
    localStorage.setItem('jee_bookmarked_pool', JSON.stringify(bookmarks));
    if(document.getElementById('global-bookmark-view').style.display === 'block') renderBookmarkPanelContents();
}

function toggleBookmarkPanel() {
    const pane = document.getElementById('global-bookmark-view');
    const btn = document.getElementById('toggle-bookmark-btn');
    if(pane.style.display === 'none') {
        pane.style.display = 'block'; btn.innerText = "Close Flagged Questions"; renderBookmarkPanelContents();
    } else {
        pane.style.display = 'none'; btn.innerText = "Open Flagged Questions";
    }
}

function renderBookmarkPanelContents() {
    const container = document.getElementById('bookmark-container');
    container.innerHTML = '';
    let bookmarks = JSON.parse(localStorage.getItem('jee_bookmarked_pool')) || [];
    
    if (bookmarks.length === 0) {
        container.innerHTML = `<p class="status-msg">No active revision metrics or text elements compiled yet.</p>`;
        return;
    }

    bookmarks.forEach(subpart => {
        const card = document.createElement('div');
        card.style.borderLeft = "3px solid var(--accent-aqua)";
        card.style.background = "rgba(255,255,255,0.01)";
        card.style.padding = "12px"; card.style.margin = "10px 0"; card.style.borderRadius = "6px";
        card.innerHTML = `<strong style="color:var(--accent-aqua)">${subpart.subpartName} Mapping Layer</strong><p style="margin-top:6px; color:#fff;">${subpart.q}</p><div style="margin-top:8px; font-size:0.85rem; color:var(--tag-clear)">Properties Matrix: ${subpart.correctText}</div>`;
        container.appendChild(card);
    });
}

function togglePomodoroCycle() {
    const btn = document.getElementById('pomo-toggle-btn');
    if(pomoTimerThread) {
        clearInterval(pomoTimerThread);
        pomoTimerThread = null;
        btn.innerText = "Resume Focus Session";
    } else {
        btn.innerText = "Pause Session";
        pomoTimerThread = setInterval(() => {
            if(pomoSecondsLeft <= 0) {
                clearInterval(pomoTimerThread);
                pomoTimerThread = null;
                alert("Focus Session Complete! Commencing revision interval state maps.");
                pomoSecondsLeft = 1500;
                document.getElementById('pomo-timer-display').innerText = "25:00";
                btn.innerText = "Start Focus Session";
            } else {
                pomoSecondsLeft--;
                let mins = Math.floor(pomoSecondsLeft / 60).toString().padStart(2, '0');
                let secs = (pomoSecondsLeft % 60).toString().padStart(2, '0');
                document.getElementById('pomo-timer-display').innerText = `${mins}:${secs}`;
            }
        }, 1000);
    }
}

function openFormulaModal() {
    if(!activeSubpartId || !formulaSheetDatabase[activeSubpartId]) return;
    document.getElementById('formula-modal-title').innerText = `${activeSubpartName} - High-Yield Formula Sheet`;
    document.getElementById('formula-modal-body').innerHTML = formulaSheetDatabase[activeSubpartId];
    document.getElementById('formula-modal-overlay').style.display = 'flex';
}

function closeFormulaModal() {
    document.getElementById('formula-modal-overlay').style.display = 'none';
}

function escapeStr(str) { return str.replace(/`/g, '\\`').replace(/'/g, "\\'"); }

function switchWorkspaceTab(tabId) {
    document.querySelectorAll('.tabs-header .tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.interactive-deck .tab-pane').forEach(pane => pane.style.display = 'none');
    
    if(tabId === 'notes') {
        document.getElementById('tab-notes-btn').classList.add('active');
        document.getElementById('tab-content-notes').style.display = 'block';
    } else {
        document.getElementById('tab-analytics-btn').classList.add('active');
        document.getElementById('tab-content-analytics').style.display = 'block';
        if(activeSubpartId) evaluateDiagnosticMetrics(activeSubpartId);
    }
}

function exportAppState() {
    let stateData = {};
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        stateData[key] = localStorage.getItem(key);
    }
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(stateData));
    let downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "jee_tracker_production_state.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click(); downloadAnchor.remove();
}

function triggerStateImport() { document.getElementById('state-file-input').click(); }

function importAppState(inputEl) {
    let file = inputEl.files[0]; if (!file) return;
    let reader = new FileReader();
    reader.onload = function(e) {
        try {
            let stateData = JSON.parse(e.target.result);
            localStorage.clear();
            for (let key in stateData) { localStorage.setItem(key, stateData[key]); }
            alert("Database session synchronizer restoration complete!");
            let activeSubject = document.querySelector('.sub-btn.active').dataset.subject;
            renderChapters(activeSubject);
            if(activeSubpartId) selectSubpart(activeSubpartId, activeSubpartName);
        } catch (err) { alert("Error parsing backup synchronization file structure."); }
    };
    reader.readAsText(file);
}

document.getElementById('reset-module-btn').addEventListener('click', () => {
    if (!activeSubpartId) return;
    localStorage.removeItem(`score-${activeSubpartId}`);
    localStorage.removeItem(`check-${activeSubpartId}`);
    localStorage.removeItem(`indices-${activeSubpartId}`);
    localStorage.removeItem(`timeElapsed-${activeSubpartId}`);
    for (let i = 0; i < 30; i++) { 
        localStorage.removeItem(`map-${activeSubpartId}-${i}`); 
        localStorage.removeItem(`textSnap-${activeSubpartId}-${i}`);
    }
    if(questionStopwatchThread) clearInterval(questionStopwatchThread);
    questionSecondsElapsed = 0;
    questionStopwatchThread = setInterval(() => {
        questionSecondsElapsed++;
    }, 1000);
    generateRandomizedQuestions(activeSubpartId, activeSubpartName);
    evaluatePercentages();
    evaluateDiagnosticMetrics(activeSubpartId);
});

document.getElementById('save-note-btn').addEventListener('click', () => {
    if (!activeSubpartId) return;
    const noteText = document.getElementById('note-input').value;
    localStorage.setItem(`note-${activeSubpartId}`, noteText);
    const statusEl = document.getElementById('save-status');
    statusEl.innerText = "Notes saved locally!"; statusEl.style.color = "var(--accent-aqua)";
    setTimeout(() => { statusEl.innerText = ""; }, 3000);
    if(document.getElementById('global-vault-view').style.display === 'block') compileVaultNotes();
});

function toggleNotesVault() {
    const vault = document.getElementById('global-vault-view');
    const btn = document.getElementById('toggle-vault-btn');
    if (vault.style.display === 'none') {
        vault.style.display = 'block'; btn.innerText = "Close Notes Vault"; compileVaultNotes();
    } else {
        vault.style.display = 'none'; btn.innerText = "Open Global Notes Vault";
    }
}

function compileVaultNotes() {
    const container = document.getElementById('vault-notes-container');
    container.innerHTML = ''; let notesFound = false;
    for (let subject in jeeSyllabusData) {
        jeeSyllabusData[subject].forEach(chapter => {
            chapter.subparts.forEach(subpart => {
                const note = localStorage.getItem(`note-${subpart.id}`);
                if (note && note.trim() !== '') {
                    notesFound = true;
                    const card = document.createElement('div');
                    card.style.borderLeft = "3px solid var(--accent-aqua)";
                    card.style.background = "rgba(255,255,255,0.01)";
                    card.style.padding = "12px"; card.style.margin = "10px 0"; card.style.borderRadius = "6px";
                    card.innerHTML = `<strong style="color:var(--accent-aqua)">${chapter.name} - ${subpart.name}</strong><p style="margin-top:6px; white-space: pre-wrap; font-size:0.9rem;">${note}</p>`;
                    container.appendChild(card);
                }
            });
        });
    }
    if (!notesFound) container.innerHTML = `<p class="status-msg">No active revision metrics or text elements compiled yet.</p>`;
}

initializeApp();
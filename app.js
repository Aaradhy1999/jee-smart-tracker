const jeeSyllabusData = {
    physics: [
        {
            id: "p-physics-math",
            name: "Physics Core Basics & Vectors",
            subparts: [
                { id: "p-pm-1", name: "Dimensions & Dimensional Analysis Error Limits", weight: 30 },
                { id: "p-pm-2", name: "Vector Properties Cross & Dot Products", weight: 40 },
                { id: "p-pm-3", name: "Calculus Applications in Kinematics Rules", weight: 30 }
            ]
        },
        {
            id: "p-kinematics",
            name: "Kinematics & Motion Parameters",
            subparts: [
                { id: "p-kin-1", name: "Rectilinear Motion Equations & Graphs", weight: 30 },
                { id: "p-kin-2", name: "Projectile Motion Components & Trajectories", weight: 40 },
                { id: "p-kin-3", name: "Relative Velocity & River-Man Cases", weight: 30 }
            ]
        },
        {
            id: "p-nlm",
            name: "Laws of Motion & Mechanics",
            subparts: [
                { id: "p-nlm-1", name: "Newton Laws & Free Body Equilibrium Diagrams", weight: 35 },
                { id: "p-nlm-2", name: "Static & Kinetic Friction Constraints", weight: 35 },
                { id: "p-nlm-3", name: "Circular Motion Kinetics & Banking Angles", weight: 30 }
            ]
        },
        {
            id: "p-wep",
            name: "Work, Energy & Power Dynamics",
            subparts: [
                { id: "p-wep-1", name: "Work Energy Theorem Verification", weight: 40 },
                { id: "p-wep-2", name: "Conservative Forces & Potential Profiles", weight: 30 },
                { id: "p-wep-3", name: "Vertical Circular Motion Parameters", weight: 30 }
            ]
        }
    ],
    chemistry: [
        {
            id: "c-mole",
            name: "Mole Concept Core Fundamentals",
            subparts: [
                { id: "c-mole-1", name: "Empirical Equations & Molecular Formulas", weight: 30 },
                { id: "c-mole-2", name: "Limiting Reagent Mass Conversions", weight: 40 },
                { id: "c-mole-3", name: "Concentration Metrics Molarity & Normality", weight: 30 }
            ]
        },
        {
            id: "c-atomic",
            name: "Atomic Structure Parameters",
            subparts: [
                { id: "c-at-1", name: "Bohr Atomic Model Orbits & Emission Profiles", weight: 40 },
                { id: "c-at-2", name: "Quantum Numbers Shell Configurations", weight: 40 },
                { id: "c-at-3", name: "De Broglie Mechanics & Heisenberg Balance", weight: 20 }
            ]
        },
        {
            id: "c-bonding",
            name: "Chemical Bonding & Matrix",
            subparts: [
                { id: "c-bnd-1", name: "Ionic Lattice Stability Factors", weight: 30 },
                { id: "c-bnd-2", name: "VSEPR Shapes & Hybridization Inversions", weight: 40 },
                { id: "c-bnd-3", name: "Molecular Orbital Configurations", weight: 30 }
            ]
        }
    ],
    math: [
        {
            id: "m-sequences",
            name: "Sequences & Progression Progress",
            subparts: [
                { id: "m-seq-1", name: "Arithmetic Progression Mean Rules", weight: 35 },
                { id: "m-seq-2", name: "Geometric & Harmonic Progression Sums", weight: 35 },
                { id: "m-seq-3", name: "Arithmetico-Geometric Sequences & Sigma Rules", weight: 30 }
            ]
        },
        {
            id: "m-quadratic",
            name: "Quadratic Equations Frameworks",
            subparts: [
                { id: "m-quad-1", name: "Discriminant Rules & Roots Nature", weight: 30 },
                { id: "m-quad-2", name: "Location of Roots Interval Parameters", weight: 40 },
                { id: "m-quad-3", name: "Common Roots Shared Intersections", weight: 30 }
            ]
        },
        {
            id: "m-determinants",
            name: "Matrices & Determinant Systems",
            subparts: [
                { id: "m-mat-1", name: "Matrix Properties & Inverse Calculations", weight: 35 },
                { id: "m-mat-2", name: "Cramer Rule Linear System Solvers", weight: 35 },
                { id: "m-mat-3", name: "Adjoint Transpose Matrix Multiplications", weight: 30 }
            ]
        }
    ]
};

let activeSubpartId = null;
let activeSubpartName = "";

document.querySelectorAll('.sub-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        document.querySelectorAll('.sub-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        renderChapters(e.target.dataset.subject);
    });
});

function renderChapters(subject) {
    const container = document.getElementById('chapter-list-tree');
    container.innerHTML = '';
    if (!jeeSyllabusData[subject]) return;

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
    
    generateRandomizedQuestions(subpartId, subpartName);
    evaluateDiagnosticMetrics(subpartId);

    const savedNote = localStorage.getItem(`note-${subpartId}`) || '';
    document.getElementById('note-input').value = savedNote;
    document.getElementById('save-status').innerText = '';
}

function generateRandomizedQuestions(subpartId, subpartName) {
    const testZone = document.getElementById('mcq-test-zone');
    testZone.innerHTML = '';

    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            let fullPool = data[subpartId] || [];

            if (fullPool.length === 0) {
                fullPool = [];
                for (let i = 1; i <= 5; i++) {
                    fullPool.push({
                        q: `Advanced Application Numerical conceptual validation question challenge target Q${i} for ${subpartName}?`,
                        correctText: `Correct conceptual derived value for Q${i}`,
                        falseOptions: [`Wrong trap estimation limit formula X`, `Wrong trap estimation limit formula Y`, `Wrong trap estimation limit formula Z`]
                    });
                }
            }

            let indices = [];
            let savedIndices = localStorage.getItem(`indices-${subpartId}`);
            if (savedIndices) {
                indices = JSON.parse(savedIndices);
            } else {
                let availableIndices = [...Array(fullPool.length).keys()];
                availableIndices.sort(() => Math.random() - 0.5);
                indices = availableIndices.slice(0, 5);
                localStorage.setItem(`indices-${subpartId}`, JSON.stringify(indices));
            }

            let activeQuestions = indices.map(idx => fullPool[idx]);
            const scoreState = JSON.parse(localStorage.getItem(`score-${subpartId}`)) || {};

            activeQuestions.forEach((q, qIdx) => {
                const qCard = document.createElement('div');
                qCard.className = 'mcq-card';
                qCard.style.margin = '15px 0';
                qCard.innerHTML = `<p style="font-weight:500; margin-bottom:8px;">Q${qIdx + 1}: ${q.q}</p>`;

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
                    btn.style.margin = '4px 0';
                    btn.style.padding = '8px';
                    btn.style.border = '1px solid rgba(255,255,255,0.1)';
                    btn.style.background = 'rgba(255,255,255,0.02)';
                    btn.style.color = '#f8fafc';
                    btn.style.borderRadius = '6px';
                    btn.style.cursor = 'pointer';

                    if (scoreState[qIdx] !== undefined) {
                        if (optIdx === correctOptionIndex) btn.style.background = 'rgba(0, 240, 255, 0.2)';
                        if (scoreState[qIdx] === optIdx && optIdx !== correctOptionIndex) btn.style.background = 'rgba(255, 0, 0, 0.2)';
                        btn.disabled = true;
                    } else {
                        btn.onclick = () => verifyMCQAnswer(subpartId, subpartName, qIdx, optIdx, correctOptionIndex);
                    }
                    qCard.appendChild(btn);
                });
                testZone.appendChild(qCard);
            });
        })
        .catch(err => {
            testZone.innerHTML = `<p class="status-msg" style="color:#ff4b4b;">Error loading question data source module file.</p>`;
        });
}

function verifyMCQAnswer(subpartId, subpartName, qIdx, selectedIdx, correctIdx) {
    let scoreState = JSON.parse(localStorage.getItem(`score-${subpartId}`)) || {};
    scoreState[qIdx] = selectedIdx;
    localStorage.setItem(`score-${subpartId}`, JSON.stringify(scoreState));
    
    if (selectedIdx === correctIdx) {
        let savedState = JSON.parse(localStorage.getItem(`check-${subpartId}`)) || [false, false, false, false, false];
        savedState[qIdx] = true;
        localStorage.setItem(`check-${subpartId}`, JSON.stringify(savedState));
    } else {
        let savedState = JSON.parse(localStorage.getItem(`check-${subpartId}`)) || [false, false, false, false, false];
        savedState[qIdx] = false;
        localStorage.setItem(`check-${subpartId}`, JSON.stringify(savedState));
    }
    
    generateRandomizedQuestions(subpartId, subpartName);
    evaluatePercentages();
    evaluateDiagnosticMetrics(subpartId);
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
        const subpartCompletionRatio = correctCount / 5;
        totalChapterProgress += subpartCompletionRatio * sub.weight;
    });

    const finalPercent = Math.round(totalChapterProgress);
    const bar = document.getElementById(`bar-${chapterId}`);
    const text = document.getElementById(`text-${chapterId}`);
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
    
    const scoreState = JSON.parse(localStorage.getItem(`score-${subpartId}`)) || {};
    const checkState = JSON.parse(localStorage.getItem(`check-${subpartId}`)) || [false, false, false, false, false];
    
    const answersAttempted = Object.keys(scoreState).length;
    const correctAnswers = checkState.filter(Boolean).length;

    badge.className = "badge";
    
    if (answersAttempted === 0) {
        badge.classList.add("neutral");
        badge.innerText = "Clearance Pending";
        textZone.innerHTML = `No quiz submissions found for this module yet. Take the 5-question test on the left to compute engineering feedback data structures.`;
        return;
    }

    let rawScorePercent = Math.round((correctAnswers / 5) * 100);

    if (rawScorePercent < 50) {
        badge.classList.add("critical");
        badge.innerText = "Critical Zone";
        textZone.innerHTML = `<strong>Performance Profile: ${rawScorePercent}%</strong><br><br>Your quiz data reveals fundamental formula gaps. Interviewers value remediation: use the red 'Reset Test' tool to trigger a completely new random data shuffle set and try again.`;
    } else if (rawScorePercent >= 50 && rawScorePercent < 80) {
        badge.classList.add("warn");
        badge.innerText = "Revision Needed";
        textZone.innerHTML = `<strong>Performance Profile: ${rawScorePercent}%</strong><br><br>Good initial concept grasp, but you triggered trap alternative choices. Log specific derived bottlenecks into your Revision Notes pad to lock down formula continuity.`;
    } else {
        badge.classList.add("clear");
        badge.innerText = "Mastered";
        textZone.innerHTML = `<strong>Performance Profile: ${rawScorePercent}%</strong><br><br>Excellent execution! Mapped 100% of the active problem coordinates accurately. This subpart weight is fully applied to your global master tracker metrics up top.`;
    }
}

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
    downloadAnchor.setAttribute("download", "jee_tracker_backup_state.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}

function triggerStateImport() {
    document.getElementById('state-file-input').click();
}

function importAppState(inputEl) {
    let file = inputEl.files[0];
    if (!file) return;

    let reader = new FileReader();
    reader.onload = function(e) {
        try {
            let stateData = JSON.parse(e.target.result);
            localStorage.clear();
            for (let key in stateData) {
                localStorage.setItem(key, stateData[key]);
            }
            alert("Database session synchronizer restoration complete!");
            let activeSubject = document.querySelector('.sub-btn.active').dataset.subject;
            renderChapters(activeSubject);
            if(activeSubpartId) selectSubpart(activeSubpartId, activeSubpartName);
        } catch (err) {
            alert("Error parsing backup synchronization file structure.");
        }
    };
    reader.readAsText(file);
}

document.getElementById('reset-module-btn').addEventListener('click', () => {
    if (!activeSubpartId) return;
    
    localStorage.removeItem(`score-${activeSubpartId}`);
    localStorage.removeItem(`check-${activeSubpartId}`);
    localStorage.removeItem(`indices-${activeSubpartId}`);
    for (let i = 0; i < 5; i++) {
        localStorage.removeItem(`map-${activeSubpartId}-${i}`);
    }
    
    generateRandomizedQuestions(activeSubpartId, activeSubpartName);
    evaluatePercentages();
    evaluateDiagnosticMetrics(activeSubpartId);
});

document.getElementById('save-note-btn').addEventListener('click', () => {
    if (!activeSubpartId) {
        document.getElementById('save-status').innerText = "Select a subpart first!";
        return;
    }
    const noteText = document.getElementById('note-input').value;
    localStorage.setItem(`note-${activeSubpartId}`, noteText);
    const statusEl = document.getElementById('save-status');
    statusEl.innerText = "Notes saved locally!";
    statusEl.style.color = "var(--accent-aqua)";
    setTimeout(() => { statusEl.innerText = ""; }, 3000);
    if(document.getElementById('global-vault-view').style.display === 'block') compileVaultNotes();
});

function toggleNotesVault() {
    const vault = document.getElementById('global-vault-view');
    const btn = document.getElementById('toggle-vault-btn');
    if (vault.style.display === 'none') {
        vault.style.display = 'block';
        btn.innerText = "Close Notes Vault";
        compileVaultNotes();
    } else {
        vault.style.display = 'none';
        btn.innerText = "Open Global Notes Vault";
    }
}

function compileVaultNotes() {
    const container = document.getElementById('vault-notes-container');
    container.innerHTML = '';
    let notesFound = false;

    for (let subject in jeeSyllabusData) {
        jeeSyllabusData[subject].forEach(chapter => {
            chapter.subparts.forEach(subpart => {
                const note = localStorage.getItem(`note-${subpart.id}`);
                if (note && note.trim() !== '') {
                    notesFound = true;
                    const card = document.createElement('div');
                    card.style.borderLeft = "3px solid var(--accent-aqua)";
                    card.style.background = "rgba(255,255,255,0.01)";
                    card.style.padding = "10px";
                    card.style.margin = "10px 0";
                    card.style.borderRadius = "4px";
                    card.innerHTML = `
                        <strong style="color:var(--accent-aqua)">${chapter.name} - ${subpart.name}</strong>
                        <p style="margin-top:5px; white-space: pre-wrap;">${note}</p>
                    `;
                    container.appendChild(card);
                }
            });
        });
    }

    if (!notesFound) {
        container.innerHTML = `<p class="status-msg">No active revision or pending task logs saved in the database yet.</p>`;
    }
}

renderChapters('physics');
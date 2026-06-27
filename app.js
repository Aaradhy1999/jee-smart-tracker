let jeeSyllabusData = null;
let activeSubpartId = null;
let activeSubpartName = "";

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
            let fullPool = data[subpartId] || [];

            if (fullPool.length === 0) {
                fullPool = [];
                for (let i = 1; i <= 5; i++) {
                    let v1 = Math.floor(Math.random() * 12) + 4;
                    let v2 = Math.floor(Math.random() * 6) + 2;
                    fullPool.push({
                        q: `[Fallback Algorithmic Question] Evaluate standard baseline relationships for "${subpartName}" given localized boundary parameters of X = ${v1} and Y = ${v2}.`,
                        correctText: `${v1 * v2}`,
                        falseOptions: [`${v1 + v2}`, `${v1 * v1}`, `${v2 * v2}`]
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
                qCard.style.margin = '20px 0';
                qCard.innerHTML = `<p style="font-weight:600; margin-bottom:12px; color:var(--text-main)">Q${qIdx + 1}: ${q.q}</p>`;

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
                qCard.appendChild(document.createElement('hr'));
                testZone.appendChild(qCard);
            });
        })
        .catch(err => {
            testZone.innerHTML = `<p class="status-msg" style="color:var(--tag-critical);">Error loading context database shard file map streaming layer.</p>`;
        });
}

function verifyMCQAnswer(subpartId, subpartName, qIdx, selectedIdx, correctIdx) {
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
    if (!badge || !textZone) return;
    
    const scoreState = JSON.parse(localStorage.getItem(`score-${subpartId}`)) || {};
    const checkState = JSON.parse(localStorage.getItem(`check-${subpartId}`)) || [false, false, false, false, false];
    
    const answersAttempted = Object.keys(scoreState).length;
    const correctAnswers = checkState.filter(Boolean).length;

    badge.className = "badge";
    
    if (answersAttempted === 0) {
        badge.classList.add("neutral"); badge.innerText = "Clearance Pending";
        textZone.innerHTML = `No quiz submissions found for this module yet. Take the 5-question test on the left to compute telemetry insights.`;
        return;
    }

    let rawScorePercent = Math.round((correctAnswers / 5) * 100);

    if (rawScorePercent < 50) {
        badge.classList.add("critical"); badge.innerText = "Critical Zone";
        textZone.innerHTML = `<strong>Performance Profile: ${rawScorePercent}%</strong><br><br>Fundamental concept blocks require revision. Trigger a new data shuffler pool selection by hitting the 'Reset Test' tool option.`;
    } else if (rawScorePercent >= 50 && rawScorePercent < 80) {
        badge.classList.add("warn"); badge.innerText = "Revision Needed";
        textZone.innerHTML = `<strong>Performance Profile: ${rawScorePercent}%</strong><br><br>Solid baseline understanding, but you triggered alternative calculation trap states. Log derivation formulas on your right pad.`;
    } else {
        badge.classList.add("clear"); badge.innerText = "Mastered";
        textZone.innerHTML = `<strong>Performance Profile: ${rawScorePercent}%</strong><br><br>Excellent execution coordinates! 100% precision score mapping recorded in local browser instance. Subpart weight is fully active up top.`;
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
    for (let i = 0; i < 5; i++) { localStorage.removeItem(`map-${activeSubpartId}-${i}`); }
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
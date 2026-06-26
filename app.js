const jeeSyllabusData = {
    physics: [
        {
            id: "p-basic-math",
            name: "Basic Mathematics & Vectors",
            subparts: [
                { id: "p-bm-1", name: "Differentiation & Integration Rules", weight: 30 },
                { id: "p-bm-2", name: "Vector Dot & Cross Products", weight: 40 },
                { id: "p-bm-3", name: "Component Resolution & Slopes", weight: 30 }
            ]
        },
        {
            id: "p-kinematics",
            name: "Kinematics",
            subparts: [
                { id: "p-kin-1", name: "Motion in a Straight Line", weight: 30 },
                { id: "p-kin-2", name: "Projectile Motion Equations", weight: 40 },
                { id: "p-kin-3", name: "Relative Velocity Frameworks", weight: 30 }
            ]
        },
        {
            id: "p-nlm",
            name: "Laws of Motion & Friction",
            subparts: [
                { id: "p-nlm-1", name: "Free Body Diagrams & Equilibrium", weight: 40 },
                { id: "p-nlm-2", name: "Friction Coefficients & Slopes", weight: 30 },
                { id: "p-nlm-3", name: "Pulley-Block Systems", weight: 30 }
            ]
        }
    ],
    chemistry: [
        {
            id: "c-mole",
            name: "Mole Concept & Stoichiometry",
            subparts: [
                { id: "c-mole-1", name: "Empirical & Molecular Formulas", weight: 30 },
                { id: "c-mole-2", name: "Limiting Reagent Calculations", weight: 40 },
                { id: "c-mole-3", name: "Concentration Terms (M/N/m)", weight: 30 }
            ]
        },
        {
            id: "c-atomic",
            name: "Atomic Structure",
            subparts: [
                { id: "c-at-1", name: "Bohr Model & Spectral Lines", weight: 40 },
                { id: "c-at-2", name: "Quantum Numbers & Configurations", weight: 40 },
                { id: "c-at-3", name: "De Broglie & Heisenberg Principles", weight: 20 }
            ]
        }
    ],
    math: [
        {
            id: "m-sequences",
            name: "Sequences & Series",
            subparts: [
                { id: "m-seq-1", name: "Arithmetic & Geometric Progressions", weight: 35 },
                { id: "m-seq-2", name: "AGP & Harmonic Series Limits", weight: 35 },
                { id: "m-seq-3", name: "Sigma Notation Special Sums", weight: 30 }
            ]
        },
        {
            id: "m-quadratic",
            name: "Quadratic Equations",
            subparts: [
                { id: "m-quad-1", name: "Nature of Roots & Discriminant", weight: 30 },
                { id: "m-quad-2", name: "Location of Roots Conditions", weight: 40 },
                { id: "m-quad-3", name: "Common Roots Criteria", weight: 30 }
            ]
        }
    ]
};

const subpartQuestions = {
    "p-bm-2": [
        {
            q: "If vector A = 2i + 3j and B = i - 2j, find the dot product A.B.",
            options: ["-4", "4", "8", "-2"],
            correct: 0
        },
        {
            q: "Find the magnitude of the cross product of i and j.",
            options: ["0", "1", "-1", "None"],
            correct: 1
        }
    ],
    "p-kin-2": [
        {
            q: "At the maximum height of a projectile launch profile, what is its vertical velocity?",
            options: ["v sin(theta)", "v cos(theta)", "0", "g"],
            correct: 2
        }
    ]
};

let activeSubpartId = null;

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
    document.querySelectorAll('.subpart-item').forEach(item => item.classList.remove('selected'));
    const activeItem = document.getElementById(`item-${subpartId}`);
    if (activeItem) activeItem.classList.add('selected');

    document.getElementById('active-topic-header').innerHTML = `<h2>${subpartName} Workspace</h2>`;
    loadTestZone(subpartId);

    const savedNote = localStorage.getItem(`note-${subpartId}`) || '';
    document.getElementById('note-input').value = savedNote;
    document.getElementById('save-status').innerText = '';
}

function loadTestZone(subpartId) {
    const testZone = document.getElementById('mcq-test-zone');
    testZone.innerHTML = '';
    const questions = subpartQuestions[subpartId];

    if (!questions) {
        testZone.innerHTML = `<p class="status-msg">Diagnostic testing set coming soon for this module. Use old verification checkboxes method.</p>
        <button onclick="loadLegacyChecklist('${subpartId}')" style="background:#00f0ff; color:#0f172a; padding:6px 12px; border:none; border-radius:4px; cursor:pointer; font-weight:600;">Load Fast-Pass Tasks</button>`;
        return;
    }

    const scoreState = JSON.parse(localStorage.getItem(`score-${subpartId}`)) || {};

    questions.forEach((q, qIdx) => {
        const qCard = document.createElement('div');
        qCard.className = 'mcq-card';
        qCard.style.margin = '15px 0';
        qCard.innerHTML = `<p style="font-weight:500; margin-bottom:8px;">Q${qIdx + 1}: ${q.q}</p>`;

        q.options.forEach((opt, optIdx) => {
            const btn = document.createElement('button');
            btn.className = 'mcq-opt-btn';
            btn.innerText = opt;
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
                if (optIdx === q.correct) btn.style.background = 'rgba(0, 240, 255, 0.2)';
                if (scoreState[qIdx] === optIdx && optIdx !== q.correct) btn.style.background = 'rgba(255, 0, 0, 0.2)';
                btn.disabled = true;
            } else {
                btn.onclick = () => verifyMCQAnswer(subpartId, qIdx, optIdx, q.correct);
            }
            qCard.appendChild(btn);
        });
        testZone.appendChild(qCard);
    });
}

function verifyMCQAnswer(subpartId, qIdx, selectedIdx, correctIdx) {
    let scoreState = JSON.parse(localStorage.getItem(`score-${subpartId}`)) || {};
    scoreState[qIdx] = selectedIdx;
    localStorage.setItem(`score-${subpartId}`, JSON.stringify(scoreState));
    
    if (selectedIdx === correctIdx) {
        let savedState = JSON.parse(localStorage.getItem(`check-${subpartId}`)) || [false, false, false, false, false];
        savedState[qIdx] = true;
        localStorage.setItem(`check-${subpartId}`, JSON.stringify(savedState));
    }
    
    loadTestZone(subpartId);
    evaluatePercentages();
}

function loadLegacyChecklist(subpartId) {
    const testZone = document.getElementById('mcq-test-zone');
    testZone.innerHTML = '';
    const ul = document.createElement('ul');
    ul.className = 'check-list';
    const savedState = JSON.parse(localStorage.getItem(`check-${subpartId}`)) || [false, false, false, false, false];
    
    for (let i = 1; i <= 5; i++) {
        const li = document.createElement('li');
        const isChecked = savedState[i - 1] ? 'checked' : '';
        li.innerHTML = `
            <label>
                <input type="checkbox" data-index="${i - 1}" ${isChecked} onchange="saveChecklistState(this)">
                Concept Verification Profile Q${i}
            </label>
        `;
        ul.appendChild(li);
    }
    testZone.appendChild(ul);
}

function saveChecklistState(checkbox) {
    const index = parseInt(checkbox.dataset.index);
    let savedState = JSON.parse(localStorage.getItem(`check-${activeSubpartId}`)) || [false, false, false, false, false];
    savedState[index] = checkbox.checked;
    localStorage.setItem(`check-${activeSubpartId}`, JSON.stringify(savedState));
    evaluatePercentages();
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
        const questions = subpartQuestions[sub.id];
        let subpartCompletionRatio = 0;
        
        if (questions) {
            const correctCount = checkState.slice(0, questions.length).filter(Boolean).length;
            subpartCompletionRatio = correctCount / questions.length;
        } else {
            const checkedCount = checkState.filter(Boolean).length;
            subpartCompletionRatio = checkedCount / 5;
        }
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
                const questions = subpartQuestions[subpart.id];
                let subpartCompletionRatio = 0;

                if (questions) {
                    const correctCount = checkState.slice(0, questions.length).filter(Boolean).length;
                    subpartCompletionRatio = correctCount / questions.length;
                } else {
                    const checkedCount = checkState.filter(Boolean).length;
                    subpartCompletionRatio = checkedCount / 5;
                }
                totalEarnedWeight += subpartCompletionRatio * 100;
            });
        });
    }

    const overallPercent = totalSyllabusWeight > 0 ? Math.round((totalEarnedWeight / totalSyllabusWeight) * 100) : 0;
    const globalPercentEl = document.getElementById('global-percent');
    if (globalPercentEl) globalPercentEl.innerText = `${overallPercent}%`;
}

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
});

renderChapters('physics');
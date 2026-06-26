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
                { id: "p-kin-1", name: "Rectilinear Motion Parameters", weight: 30 },
                { id: "p-kin-2", name: "Projectiles & Trajectory Equations", weight: 40 },
                { id: "p-kin-3", name: "Relative Velocity Frameworks", weight: 30 }
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
                { id: "c-mole-3", name: "Molarity & Normality Metrics", weight: 30 }
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
            subRow.innerText = `${sub.name}`;
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
    
    const checklistContainer = document.getElementById('tester-checklist');
    checklistContainer.innerHTML = '';
    
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
        checklistContainer.appendChild(li);
    }
    
    const savedNote = localStorage.getItem(`note-${subpartId}`) || '';
    document.getElementById('note-input').value = savedNote;
    document.getElementById('save-status').innerText = '';
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
    let foundSubject = null;
    
    for (let sub in jeeSyllabusData) {
        chapter = jeeSyllabusData[sub].find(c => c.id === chapterId);
        if (chapter) {
            foundSubject = sub;
            break;
        }
    }
    
    if (!chapter) return;

    let totalChapterProgress = 0;
    
    chapter.subparts.forEach(sub => {
        const checkState = JSON.parse(localStorage.getItem(`check-${sub.id}`)) || [false, false, false, false, false];
        const checkedCount = checkState.filter(Boolean).length;
        const subpartCompletionRatio = checkedCount / 5;
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
                const checkedCount = checkState.filter(Boolean).length;
                totalEarnedWeight += (checkedCount / 5) * 100;
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
    
    setTimeout(() => {
        statusEl.innerText = "";
    }, 3000);
});

renderChapters('physics');
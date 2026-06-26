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

console.log("Syllabus configuration initialized successfully.");
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
            <div class="subparts-tree" id="tree-${chapter.id}" style="display: none;">
                </div>
        `;
        
        const treeContainer = chapterDiv.querySelector(`#tree-${chapter.id}`);
        chapter.subparts.forEach(sub => {
            const subRow = document.createElement('div');
            subRow.className = 'subpart-item';
            subRow.innerText = `${sub.name} (${sub.weight}%)`;
            treeContainer.appendChild(subRow);
        });

        container.appendChild(chapterDiv);
    });
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

renderChapters('physics');
const jeeSyllabusData = {
    physics: [
        {
            id: "p-units-dimensions",
            name: "Units, Dimensions & Errors",
            subparts: [
                { id: "p-ud-1", name: "Dimensional Analysis & Application", weight: 35 },
                { id: "p-ud-2", name: "Least Count & Significant Figures", weight: 35 },
                { id: "p-ud-3", name: "Error Analysis & Propagation", weight: 30 }
            ]
        },
        {
            id: "p-kinematics",
            name: "Kinematics",
            subparts: [
                { id: "p-kin-1", name: "Rectilinear Motion & Graphs", weight: 30 },
                { id: "p-kin-2", name: "Projectile Motion Trajectories", weight: 40 },
                { id: "p-kin-3", name: "Relative Velocity & River-Man Problems", weight: 30 }
            ]
        },
        {
            id: "p-nlm",
            name: "Laws of Motion & Friction",
            subparts: [
                { id: "p-nlm-1", name: "Newton Laws & Free Body Diagrams", weight: 40 },
                { id: "p-nlm-2", name: "Static & Kinetic Friction Constraints", weight: 30 },
                { id: "p-nlm-3", name: "Circular Motion Dynamics & Banking", weight: 30 }
            ]
        },
        {
            id: "p-wep",
            name: "Work, Energy & Power",
            subparts: [
                { id: "p-wep-1", name: "Work-Energy Theorem Application", weight: 40 },
                { id: "p-wep-2", name: "Conservative Forces & Potential Energy", weight: 30 },
                { id: "p-wep-3", name: "Vertical Circular Motion Parameters", weight: 30 }
            ]
        },
        {
            id: "p-com",
            name: "Center of Mass & Collision",
            subparts: [
                { id: "p-com-1", name: "Discrete & Continuous COM Calculation", weight: 30 },
                { id: "p-com-2", name: "Conservation of Linear Momentum", weight: 35 },
                { id: "p-com-3", name: "Elastic & Inelastic Collisions", weight: 35 }
            ]
        },
        {
            id: "p-rotational",
            name: "Rotational Mechanics",
            subparts: [
                { id: "p-rot-1", name: "Moment of Inertia Theorems", weight: 30 },
                { id: "p-rot-2", name: "Torque & Angular Momentum Conservation", weight: 40 },
                { id: "p-rot-3", name: "Pure Rolling & Slipping Dynamics", weight: 30 }
            ]
        },
        {
            id: "p-gravitation",
            name: "Gravitation",
            subparts: [
                { id: "p-grav-1", name: "Gravitational Field & Potential", weight: 40 },
                { id: "p-grav-2", name: "Kepler Laws & Planetary Motion", weight: 30 },
                { id: "p-grav-3", name: "Escape Velocity & Satellite Orbitals", weight: 30 }
            ]
        },
        {
            id: "p-solids-fluids",
            name: "Properties of Matter",
            subparts: [
                { id: "p-sf-1", name: "Elasticity Modulus & Hooke Law", weight: 30 },
                { id: "p-sf-2", name: "Fluid Statics & Pascal Principle", weight: 35 },
                { id: "p-sf-3", name: "Surface Tension & Viscosity Mechanics", weight: 35 }
            ]
        },
        {
            id: "p-thermodynamics",
            name: "Thermodynamics & KTG",
            subparts: [
                { id: "p-thm-1", name: "Kinetic Theory of Gases & Gas Laws", weight: 30 },
                { id: "p-thm-2", name: "First Law & Thermodynamic Processes", weight: 40 },
                { id: "p-thm-3", name: "Heat Engines & Second Law Limits", weight: 30 }
            ]
        },
        {
            id: "p-shm-waves",
            name: "Oscillations & Waves",
            subparts: [
                { id: "p-wav-1", name: "Simple Harmonic Motion Equations", weight: 40 },
                { id: "p-wav-2", name: "Wave Speed & String Vibrations", weight: 30 },
                { id: "p-wav-3", name: "Doppler Effect & Sound Waves", weight: 30 }
            ]
        }
    ],
    chemistry: [
        {
            id: "c-mole",
            name: "Some Basic Concepts in Chemistry",
            subparts: [
                { id: "c-mole-1", name: "Empirical & Molecular Formulas", weight: 30 },
                { id: "c-mole-2", name: "Limiting Reagent Calculations", weight: 40 },
                { id: "c-mole-3", name: "Molarity, Molality & Normality Metrics", weight: 30 }
            ]
        },
        {
            id: "c-atomic",
            name: "Atomic Structure",
            subparts: [
                { id: "c-at-1", name: "Bohr Model & Hydrogen Spectrum", weight: 40 },
                { id: "c-at-2", name: "Quantum Numbers & Configurations", weight: 40 },
                { id: "c-at-3", name: "De Broglie & Heisenberg Principles", weight: 20 }
            ]
        },
        {
            id: "c-bonding",
            name: "Chemical Bonding",
            subparts: [
                { id: "c-bnd-1", name: "VSEPR Theory & Molecular Shapes", weight: 35 },
                { id: "c-bnd-2", name: "Hybridization & Dipole Moments", weight: 35 },
                { id: "c-bnd-3", name: "Molecular Orbital Theory Frameworks", weight: 30 }
            ]
        },
        {
            id: "c-solutions",
            name: "Solutions",
            subparts: [
                { id: "c-sol-1", name: "Vapor Pressure & Raoult Law", weight: 35 },
                { id: "c-sol-2", name: "Colligative Properties calculation", weight: 45 },
                { id: "c-sol-3", name: "Van t Hoff Factor Anomalies", weight: 20 }
            ]
        },
        {
            id: "c-equilibrium",
            name: "Chemical & Ionic Equilibrium",
            subparts: [
                { id: "c-eq-1", name: "Le Chatelier Principle Applications", weight: 30 },
                { id: "c-eq-2", name: "pH Calculation of Buffers & Salts", weight: 40 },
                { id: "c-eq-3", name: "Solubility Product Constant Ksp", weight: 30 }
            ]
        },
        {
            id: "c-thermo",
            name: "Chemical Thermodynamics",
            subparts: [
                { id: "c-th-1", name: "First Law Enthalpy Calculations", weight: 35 },
                { id: "c-th-2", name: "Entropy & Second Law Parameters", weight: 35 },
                { id: "c-th-3", name: "Gibbs Free Energy & Spontaneity", weight: 30 }
            ]
        },
        {
            id: "c-kinetics",
            name: "Chemical Kinetics",
            subparts: [
                { id: "c-kin-1", name: "Rate Laws & Order of Reaction", weight: 40 },
                { id: "c-kin-2", name: "Integrated Rate Equations", weight: 40 },
                { id: "c-kin-3", name: "Arrhenius Equation & Activation Energy", weight: 20 }
            ]
        },
        {
            id: "c-organic-basics",
            name: "General Organic Chemistry (GOC)",
            subparts: [
                { id: "c-goc-1", name: "IUPAC Nomenclature Rules", weight: 25 },
                { id: "c-goc-2", name: "Inductive, Resonance & Hyperconjugation", weight: 45 },
                { id: "c-goc-3", name: "Isomerism Structural & Stereo", weight: 30 }
            ]
        }
    ],
    math: [
        {
            id: "m-sequences",
            name: "Sequences & Series",
            subparts: [
                { id: "m-seq-1", name: "Arithmetic Progression Mean Rules", weight: 35 },
                { id: "m-seq-2", name: "Geometric & Harmonic Progressions", weight: 35 },
                { id: "m-seq-3", name: "AGP Series Summation Methods", weight: 30 }
            ]
        },
        {
            id: "m-quadratic",
            name: "Quadratic Equations",
            subparts: [
                { id: "m-quad-1", name: "Discriminant Rules & Roots Nature", weight: 35 },
                { id: "m-quad-2", name: "Location of Roots Interval Criteria", weight: 40 },
                { id: "m-quad-3", name: "Common Roots Algebraic Conditions", weight: 25 }
            ]
        },
        {
            id: "m-matrices",
            name: "Matrices & Determinants",
            subparts: [
                { id: "m-mat-1", name: "Matrix Algebra & Inverse Solutions", weight: 35 },
                { id: "m-mat-2", name: "Determinant Evaluation Properties", weight: 35 },
                { id: "m-mat-3", name: "Cramer Rule Linear Systems Solver", weight: 30 }
            ]
        },
        {
            id: "m-pnc-probability",
            name: "Permutations & Probability",
            subparts: [
                { id: "m-pr-1", name: "Fundamental Principle of Counting", weight: 30 },
                { id: "m-pr-2", name: "Permutations & Combinations Theorems", weight: 40 },
                { id: "m-pr-3", name: "Conditional Probability & Bayes Theorem", weight: 30 }
            ]
        },
        {
            id: "m-trigonometry",
            name: "Trigonometric Identites",
            subparts: [
                { id: "m-trg-1", name: "Compound Angles Formula Matrix", weight: 40 },
                { id: "m-trg-2", name: "Trigonometric Equations Solutions", weight: 30 },
                { id: "m-trg-3", name: "Inverse Trigonometric Functions", weight: 30 }
            ]
        },
        {
            id: "m-coordinate",
            name: "Straight Lines & Circles",
            subparts: [
                { id: "m-geo-1", name: "Straight Line Equations & Slopes", weight: 30 },
                { id: "m-geo-2", name: "Circle System Equations & Tangents", weight: 40 },
                { id: "m-geo-3", name: "Conic Sections Parabola & Ellipse", weight: 30 }
            ]
        },
        {
            id: "m-differential",
            name: "Differential Calculus",
            subparts: [
                { id: "m-dif-1", name: "Limits, Continuity & Differentiability", weight: 40 },
                { id: "m-dif-2", name: "Differentiation Product & Chain Rules", weight: 30 },
                { id: "m-dif-3", name: "Application of Derivatives Monotonicity", weight: 30 }
            ]
        },
        {
            id: "m-integral",
            name: "Integral Calculus",
            subparts: [
                { id: "m-int-1", name: "Indefinite Integral Substitution Maps", weight: 30 },
                { id: "m-int-2", name: "Definite Integral Calculus Properties", weight: 40 },
                { id: "m-int-3", name: "Differential Equations Solution Types", weight: 30 }
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
                let subjectPrefix = subpartId.split('-')[0];
                
                for (let i = 1; i <= 5; i++) {
                    let v1 = Math.floor(Math.random() * 10) + 2;
                    let v2 = Math.floor(Math.random() * 5) + 2;
                    let ansValue = v1 * v2;
                    
                    let qText = "";
                    let cText = "";
                    let f1 = "", f2 = "", f3 = "";

                    if (subjectPrefix === 'p') {
                        qText = `A physical system parameter modeling experimental values for "${subpartName}" scales according to field constraints ($X = ${v1} \\text{ units}$) and localized tracking factors ($Y = ${v2} \\text{ units}$). Compute the absolute resultant magnitude metrics under standard equilibrium conditions.`;
                        cText = `${ansValue} Joules`;
                        f1 = `${v1 + v2} Joules`;
                        f2 = `${Math.abs(v1 - v2)} Joules`;
                        f3 = `${ansValue * 2} Joules`;
                    } else if (subjectPrefix === 'c') {
                        qText = `A coordination mix representing chemical properties of "${subpartName}" undergoes diagnostic analysis. If a sample contains ${v1} moles of critical compound species matching an scaling coefficient of ${v2}, solve for the exact equilibrium mass yield constraint metrics.`;
                        cText = `${ansValue} grams`;
                        f1 = `${ansValue + v1} grams`;
                        f2 = `${v1} grams`;
                        f3 = `${v2} grams`;
                    } else {
                        qText = `Consider a geometric set array framing operations on the mathematical functions of "${subpartName}". If the intersection coordinates are defined on bounded interval parameters ($[0, ${v1}]$) with an internal subset value of ${v2}, compute the complete dimensional tracking scalar value.`;
                        cText = `${ansValue}`;
                        f1 = `${v1 + v2}`;
                        f2 = `${v1 * v1}`;
                        f3 = `${v2 * v2}`;
                    }

                    fullPool.push({
                        q: `[PYQ Numerical Variant] ${qText}`,
                        correctText: cText,
                        falseOptions: [f1, f2, f3]
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
                qCard.appendChild(document.createElement('hr'));
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
        textZone.innerHTML = `<strong>Performance Profile: ${rawScorePercent}%</strong><br><br>Your quiz data reveals fundamental formula gaps. Use the red 'Reset Test' tool to trigger a completely new random data shuffle set and try again.`;
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

// Global context restoration trigger handler 
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
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

const masterQuestionPool = {
    "p-pm-1": [
        { q: "The density of a material in SI units is 128 kg/m³. In a new system where unit of length is 25 cm and unit of mass is 50 g, numerical value of density is:", options: ["40", "16", "64", "410"], correct: 0 },
        { q: "If speed of light (c), gravitational constant (G) and Planck's constant (h) are taken as fundamental units, dimension of time is proportional to:", options: ["√(hG/c⁵)", "√(hG/c³)", "G√(hc³)", "hc/G"], correct: 0 },
        { q: "In an experiment, the values of a parameter are measured as 2.12, 2.14, and 2.15. The mean absolute error is:", options: ["0.01", "0.02", "0.03", "0.005"], correct: 0 },
        { q: "The percentage errors in measurement of mass and speed are 2% and 3% respectively. Maximum error in estimate of kinetic energy is:", options: ["8%", "5%", "11%", "6%"], correct: 0 },
        { q: "A quantity X is given by ε₀ L (ΔV/Δt). Dimensional formula for X matches:", options: ["Current", "Voltage", "Resistance", "Charge"], correct: 0 }
    ],
    "p-pm-2": [
        { q: "If vector A = 2i + 3j and B = i - 2j, find the dot product A.B.", options: ["4", "-4", "8", "-2"], correct: 1 },
        { q: "The magnitude of the cross product of two perpendicular vectors of magnitudes 3 and 4 is:", options: ["12", "0", "7", "1"], correct: 0 },
        { q: "If |A + B| = |A - B|, the angle between vector A and vector B is:", options: ["90°", "0°", "180°", "45°"], correct: 0 },
        { q: "Find the component of vector A = i + j along the direction of i - j.", options: ["0", "1", "√2", "1/√2"], correct: 0 },
        { q: "A force F = 5i + 2j - 3k acts on a particle creating displacement d = 2i + j. Work done is:", options: ["12 J", "8 J", "15 J", "0 J"], correct: 0 }
    ],
    "p-pm-3": [
        { q: "The displacement of a particle is given by x = 3t² + 2t + 1. Its acceleration at t = 2s is:", options: ["6 m/s²", "14 m/s²", "12 m/s²", "2 m/s²"], correct: 0 },
        { q: "Velocity of a particle changes with position as v = √x. Acceleration of the particle is:", options: ["0.5 m/s²", "1 m/s²", "2 m/s²", "Variable"], correct: 0 },
        { q: "A particle starts from rest with acceleration a = 2t. Its velocity at t = 3s is:", options: ["9 m/s", "6 m/s", "18 m/s", "3 m/s"], correct: 0 },
        { q: "Position vector is given by r = t²i + 2tj. The equation of path followed is:", options: ["y² = 4x", "y = 2x²", "x² = 4y", "x = y"], correct: 0 },
        { q: "If dx/dt = -kx, the value of x at time t given initial position x₀ is:", options: ["x₀ e^(-kt)", "x₀ - kt", "x₀ + kt", "x₀ e^(kt)"], correct: 0 }
    ],
    "p-kin-1": [
        { q: "A car moving at 40 km/h can be stopped by brakes after 2m. If same car moves at 80 km/h, minimum stopping distance is:", options: ["8m", "4m", "6m", "16m"], correct: 0 },
        { q: "A body dropped from top of a tower falls 7/16 of total height in its last second. Total time of fall is:", options: ["4s", "3s", "5s", "2.5s"], correct: 0 },
        { q: "A particle is moving along x-axis such that v = 4 - 2t. Distance traveled in first 3 seconds is:", options: ["5m", "4m", "3m", "6m"], correct: 0 },
        { q: "The displacement-time graph of two particles are straight lines making angles 30° and 60° with time axis. Ratio of their velocities is:", options: ["1:3", "1:√3", "√3:1", "3:1"], correct: 0 },
        { q: "A ball is thrown vertically upwards with velocity 20 m/s. Height attained after 3 seconds is (g=10):", options: ["15m", "20m", "25m", "10m"], correct: 0 }
    ],
    "p-kin-2": [
        { q: "A projectile is thrown from the ground with velocity v = 3i + 4j. Radius of curvature at highest point is (g=10):", options: ["0.9m", "1.2m", "1.6m", "2.5m"], correct: 0 },
        { q: "Maximum range of a projectile is 400m. Its maximum height in this configuration is:", options: ["100m", "200m", "50m", "400m"], correct: 0 },
        { q: "A projectile has a range R and maximum height H. If R = 4H, angle of projection is:", options: ["45°", "30°", "60°", "90°"], correct: 0 },
        { q: "The equation of trajectory of a projectile is y = √3x - x²/20. Its horizontal range is:", options: ["20√3 m", "40 m", "10√3 m", "20 m"], correct: 0 },
        { q: "Time of flight of a projectile is 10s and range is 500m. Maximum height reached is (g=10):", options: ["125m", "250m", "500m", "62.5m"], correct: 0 }
    ],
    "p-kin-3": [
        { q: "A river 400m wide flows at 2 m/s. Swimmer speed in still water is 4 m/s. Minimum time to cross river is:", options: ["100s", "200s", "50s", "150s"], correct: 0 },
        { q: "Rain is falling vertically at 4 km/h. A man walks at 3 km/h. Velocity of rain relative to man is:", options: ["5 km/h", "7 km/h", "1 km/h", "25 km/h"], correct: 0 },
        { q: "Two trains each of length 50m are moving parallel in opposite directions with speeds 10 m/s and 15 m/s. Time taken to cross each other is:", options: ["4s", "2s", "5s", "10s"], correct: 0 },
        { q: "A boat moves perpendicular to river current with velocity 12 m/s. River velocity is 5 m/s. Resultant boat velocity is:", options: ["13 m/s", "17 m/s", "7 m/s", "14 m/s"], correct: 0 },
        { q: "Ship A moves North at 10 km/h. Ship B moves West at 10 km/h. Velocity of A relative to B has magnitude:", options: ["14.14 km/h", "0 km/h", "20 km/h", "10 km/h"], correct: 0 }
    ],
    "c-mole-1": [
        { q: "A compound contains 40% carbon, 6.7% hydrogen, and 53.3% oxygen. Its empirical formula is:", options: ["CH₂O", "CHO", "CH₃O", "C₂H₂O"], correct: 0 },
        { q: "The empirical formula of a compound is CH₂. One mole of this compound has a mass of 42g. Molecular formula is:", options: ["C₃H₆", "C₂H₄", "C₄H₈", "C₅H₁₀"], correct: 0 },
        { q: "Number of atoms present in 4.25g of NH₃ is approximately:", options: ["6.02 × 10²³", "1.5 × 10²³", "3.01 × 10²³", "2.4 × 10²⁴"], correct: 0 },
        { q: "The mass of one molecule of water (H₂O) is approximately:", options: ["2.99 × 10⁻²³ g", "18 g", "6.02 × 10⁻²³ g", "1.66 × 10⁻²⁴ g"], correct: 0 },
        { q: "Percentage of calcium in calcium carbonate (CaCO₃) is:", options: ["40%", "12%", "48%", "60 Gold"], correct: 0 }
    ],
    "c-mole-2": [
        { q: "A 10 mL sample of hydrocarbon C_xH_y requires 55 mL of O₂ for complete combustion, producing 40 mL of CO₂. Value of y is:", options: ["6", "4", "8", "10"], correct: 0 },
        { q: "If 5 moles of H₂ react with 2 moles of O₂ to form water, maximum number of moles of water formed is:", options: ["4", "5", "2", "3"], correct: 0 },
        { q: "Mass of FeO produced by treating 5.6g Fe with excess oxygen is (Fe = 56, O = 16):", options: ["7.2g", "5.6g", "8.0g", "11.2g"], correct: 0 },
        { q: "Equal masses of H₂ and O₂ are reacted. The limiting reagent is:", options: ["Oxygen", "Hydrogen", "None", "Both fully react"], correct: 0 },
        { q: "Moles of carbon dioxide produced by heating 20g of pure CaCO₃ is:", options: ["0.2 Moles", "0.5 Moles", "1.0 Moles", "0.1 Moles"], correct: 0 }
    ],
    "m-seq-1": [
        { q: "Let S_n = sum(r=1 to n) r/(r⁴+r²+1). Find the value of lim(n→∞) 4•S_n.", options: ["2", "1", "4", "0.5"], correct: 0 },
        { q: "If the 5th and 12th terms of an AP are 14 and 35 respectively, the first term is:", options: ["2", "3", "4", "5"], correct: 0 },
        { q: "The sum of all two-digit numbers which leave a remainder 1 when divided by 3 is:", options: ["1635", "1620", "1650", "1590"], correct: 0 },
        { q: "If a, b, c are in AP, then value of (a-c)² / (b²-ac) is:", options: ["4", "2", "1", "0"], correct: 0 },
        { q: "The number of common terms between the sequences 3,7,11...403 and 2,9,16...457 is:", options: ["14", "15", "13", "12"], correct: 0 }
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
    
    generateRandomizedQuestions(subpartId, subpartName);

    const savedNote = localStorage.getItem(`note-${subpartId}`) || '';
    document.getElementById('note-input').value = savedNote;
    document.getElementById('save-status').innerText = '';
}

function generateRandomizedQuestions(subpartId, subpartName) {
    const testZone = document.getElementById('mcq-test-zone');
    testZone.innerHTML = '';
    
    let pool = masterQuestionPool[subpartId] || [];
    
    if (pool.length === 0) {
        for(let i = 0; i < 5; i++) {
            pool.push({
                q: `Advanced Application Numerical conceptual validation question challenge target for ${subpartName}?`,
                options: [
                    `Calculated option constraint evaluation value A`,
                    `The correct target engineering derived value key for ${subpartName}`,
                    `Calculated option constraint evaluation value C`,
                    `Calculated option constraint evaluation value D`
                ],
                correct: 1
            });
        }
    }

    const scoreState = JSON.parse(localStorage.getItem(`score-${subpartId}`)) || {};

    pool.forEach((q, qIdx) => {
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
                btn.onclick = () => verifyMCQAnswer(subpartId, subpartName, qIdx, optIdx, q.correct);
            }
            qCard.appendChild(btn);
        });
        testZone.appendChild(qCard);
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
    }
    
    generateRandomizedQuestions(subpartId, subpartName);
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

document.getElementById('reset-module-btn').addEventListener('click', () => {
    if (!activeSubpartId) return;
    
    localStorage.removeItem(`score-${activeSubpartId}`);
    localStorage.removeItem(`check-${activeSubpartId}`);
    
    const activeItem = document.getElementById(`item-${activeSubpartId}`);
    generateRandomizedQuestions(activeSubpartId, activeItem ? activeItem.innerText : "");
    evaluatePercentages();
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
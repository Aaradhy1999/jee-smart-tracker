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
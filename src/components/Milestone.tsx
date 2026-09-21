import type { IMilestone } from "../types"

// Milestone data - each entry represents one timeline event.
const milestones: IMilestone[] = [
    {
        commitHash: "8f4a2c1",
        term: "Trimester 1 - 2025",
        title: "Started at Deakin University",
        description: "Hello World."
    },
    {
        commitHash: "3b91e07",
        term: "Trimester 2 - 2025",
        title: "Deakin Mathematics Yearbook",
        description: "Yippie I got invited! Shout out to Dr. Julien Ugon!"
    },
    {
        commitHash: "1a02f4e",
        term: "Trimester 1 - 2026",
        title: "Data Structures and Algorithms",
        description: "A hundred WAM? Really?"
    },
    {
        commitHash: "c73e9a5",
        term: "Trimester 2 - 2026",
        title: "Joined IT Student Academy",
        description: "Excited to be part of it!!!"
    },
    {
        commitHash: "1a02f4e",
        term: "Trimester 2 - 2026",
        title: "Web Development",
        description: "Trying so hard on the web design~"
    }
]

function Milestone() {
    // Index of the most recent milestone - used to highlight it differently (filled dot)
    const lastIndex = milestones.length - 1

    return (
        <div id="milestones" className="timeline-section">
            <h2 className="section-title">
                <span className="accent">$</span> git log --academic-milestones
            </h2>

            <div className="timeline">
                {/* Vertical timeline line running behind all the dots */}
                <div className="timeline-line"></div>

                <div className="timeline-items">
                    {/* Render one timeline entry per milestone in the array */}
                    {milestones.map((milestone, index) => {
                        // The last item in the array is treated as "current" and styled differently
                        const isCurrent = index === lastIndex
                        return (
                            <div key={`${milestone.commitHash}-${index}`} className="timeline-item">
                                {/* Timeline dot — filled orange for the current milestone, hollow white otherwise */}
                                <span
                                    className={`timeline-dot${isCurrent ? ' current' : ''}`}
                                ></span>
                                <p className="timeline-commit">commit {milestone.commitHash}</p>
                                <p className="timeline-term">{milestone.term}</p>
                                <h3 className="timeline-title">{milestone.title}</h3>
                                <p className="timeline-description">{milestone.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Milestone
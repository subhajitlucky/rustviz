import { ModuleContainer } from "@/modules/ModuleContainer"
import { ProblemVis } from "./ProblemVis"

export default function ProblemSolving() {
    return (
        <ModuleContainer
            title="Problem Solving Application"
            description="Applying strict ownership rules to classic algorithmic problems."
            currentStep={10}
            totalSteps={10}
        >
            <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">The "Two Sum" Traps</h2>
                    <p className="text-muted-foreground mb-6">
                        In Python/JS, you just put things in a map. In Rust, you must ask: Do I own this data? Am I copying it? Am I borrowing it?
                    </p>
                    <ProblemVis />
                </div>
            </div>
        </ModuleContainer>
    )
}

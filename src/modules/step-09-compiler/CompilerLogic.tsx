import { ModuleContainer } from "@/modules/ModuleContainer"
import { CompilerVis } from "./CompilerVis"

export default function CompilerLogic() {
    return (
        <ModuleContainer
            title="How the Compiler Thinks"
            description="Compiler errors are not punishments. They are the compiler protecting you from unsafe memory bugs."
            currentStep={9}
            totalSteps={10}
        >
            <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">You vs The Borrow Checker</h2>
                    <p className="text-muted-foreground mb-6">
                        Understand the most common error codes by visualizing the rules being violated.
                    </p>
                    <CompilerVis />
                </div>
            </div>
        </ModuleContainer>
    )
}

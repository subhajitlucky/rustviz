import { ModuleContainer } from "@/modules/ModuleContainer"
import { ExplicitLifetimesVis } from "./ExplicitLifetimesVis"

export default function ExplicitLifetimes() {
    return (
        <ModuleContainer
            title="Explicit Lifetimes"
            description="Helping the compiler understand how long references are valid."
            currentStep={22}
            totalSteps={25}
        >
            <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Generic Lifetime Parameters</h2>
                    <p className="text-muted-foreground mb-6">
                        When a function returns a reference that could come from multiple inputs, the compiler needs your help to track which input's lifetime applies to the output.
                    </p>
                    <ExplicitLifetimesVis />
                </div>
            </div>
        </ModuleContainer>
    )
}

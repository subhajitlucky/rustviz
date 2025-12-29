import { ModuleContainer } from "@/modules/ModuleContainer"
import { LifetimesVis } from "./LifetimesVis"

export default function Lifetimes() {
    return (
        <ModuleContainer
            title="Lifetimes"
            description="Lifetimes are not magic. They are just the scopes for which a reference is valid."
            currentStep={5}
            totalSteps={10}
        >
            <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Dangling References</h2>
                    <p className="text-muted-foreground mb-6">
                        Rust prevents you from making a reference to data that is about to disappear (drop). If the Owner dies, all References must die.
                    </p>
                    <LifetimesVis />
                </div>
            </div>
        </ModuleContainer>
    )
}

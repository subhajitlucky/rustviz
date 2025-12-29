import { ModuleContainer } from "@/modules/ModuleContainer"
import { InteriorMutabilityVis } from "./InteriorMutabilityVis"

export default function InteriorMutability() {
    return (
        <ModuleContainer
            title="Interior Mutability"
            description="Mutating data even when you only have an immutable reference."
            currentStep={21}
            totalSteps={25}
        >
            <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">RefCell&lt;T&gt;</h2>
                    <p className="text-muted-foreground mb-6">
                        Interior mutability is a design pattern in Rust that allows you to mutate data even when there are immutable references to that data; normally, this action is disallowed by the borrowing rules.
                    </p>
                    <InteriorMutabilityVis />
                </div>
            </div>
        </ModuleContainer>
    )
}

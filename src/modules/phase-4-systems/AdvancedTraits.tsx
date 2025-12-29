import { ModuleContainer } from "@/modules/ModuleContainer"
import { AdvancedTraitsVis } from "./AdvancedTraitsVis"

export default function AdvancedTraits() {
    return (
        <ModuleContainer
            title="Advanced Traits"
            description="The deep magic of Rust's abstraction system."
            currentStep={28}
            totalSteps={32}
        >
            <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Beyond Simple Traits</h2>
                    <p className="text-muted-foreground mb-6">
                        Traits can be used for more than just shared behavior. They can define associated types, be implemented automatically, or even be used for dynamic polymorphism.
                    </p>
                    <AdvancedTraitsVis />
                </div>
            </div>
        </ModuleContainer>
    )
}

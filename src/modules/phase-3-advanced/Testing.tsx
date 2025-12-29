import { ModuleContainer } from "@/modules/ModuleContainer"
import { TestingVis } from "./TestingVis"

export default function Testing() {
    return (
        <ModuleContainer
            title="Testing in Rust"
            description="Built-in first-class support for correctness."
            currentStep={22}
            totalSteps={32}
        >
            <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Reliable Code</h2>
                    <p className="text-muted-foreground mb-6">
                        Rust's testing framework is integrated directly into the language and Cargo. You can write tests right next to your code.
                    </p>
                    <TestingVis />
                </div>
            </div>
        </ModuleContainer>
    )
}

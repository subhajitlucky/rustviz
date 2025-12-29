import { ModuleContainer } from "@/modules/ModuleContainer"
import { ErrorFlowVis } from "./ErrorFlowVis"

export default function ErrorHandling() {
    return (
        <ModuleContainer
            title="Error Handling"
            description="Rust doesn't have Exceptions. Errors are values. You deal with them like any other data."
            currentStep={7}
            totalSteps={10}
        >
            <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Control Flow, Not Crashes</h2>
                    <p className="text-muted-foreground mb-6">
                        See the difference between panicking (crashing) vs handling the error value. `unwrap()` is a promise that you are right... if you interrupt it, you crash.
                    </p>
                    <ErrorFlowVis />
                </div>
            </div>
        </ModuleContainer>
    )
}

import { ModuleContainer } from "@/modules/ModuleContainer"
import { AsyncVis } from "./AsyncVis"

export default function Async() {
    return (
        <ModuleContainer
            title="Async / Await"
            description="Zero-cost futures and the cooperative multitasking model."
            currentStep={23}
            totalSteps={25}
        >
            <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Futures and Executors</h2>
                    <p className="text-muted-foreground mb-6">
                        Rust's async model is pull-based. Futures only make progress when polled by an executor. This allows for extremely efficient concurrency.
                    </p>
                    <AsyncVis />
                </div>
            </div>
        </ModuleContainer>
    )
}

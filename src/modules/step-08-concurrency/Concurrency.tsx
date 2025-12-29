import { ModuleContainer } from "@/modules/ModuleContainer"
import { MutexVis } from "./MutexVis"

export default function Concurrency() {
    return (
        <ModuleContainer
            title="Concurrency & Safety"
            description="Fearless Concurrency. The compiler prevents you from sharing mutable state across threads without locking."
            currentStep={8}
            totalSteps={10}
        >
            <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">The Mutex</h2>
                    <p className="text-muted-foreground mb-6">
                        A `Mutex` (Mutual Exclusion) provides safe access to data. Note how only one thread can hold the lock at a time. Concurrency bugs like Data Races become compile-time errors if you don't use these safe wrappers.
                    </p>
                    <MutexVis />
                </div>
            </div>
        </ModuleContainer>
    )
}

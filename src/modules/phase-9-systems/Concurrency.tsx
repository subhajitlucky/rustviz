import { ModuleContainer } from "@/modules/ModuleContainer"
import { MutexVis } from "./MutexVis"
import { ThreadsVis } from "./ThreadsVis"
import { ChannelsVis } from "./ChannelsVis"

export default function Concurrency() {
    return (
        <ModuleContainer
            title="Concurrency & Safety"
            description="Fearless Concurrency. The compiler prevents you from sharing mutable state across threads without locking."
            currentStep={8}
            totalSteps={10}
        >
            <div className="space-y-12">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Threads</h2>
                    <p className="text-muted-foreground mb-6">
                        Rust threads are 1:1 with OS threads. They run in parallel and are independent.
                    </p>
                    <ThreadsVis />
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-4">Message Passing</h2>
                    <p className="text-muted-foreground mb-6">
                        Channels allow threads to communicate safely by sending ownership of data.
                    </p>
                    <ChannelsVis />
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-4">Shared State (Mutex)</h2>
                    <p className="text-muted-foreground mb-6">
                        A `Mutex` (Mutual Exclusion) provides safe access to data. Note how only one thread can hold the lock at a time. Concurrency bugs like Data Races become compile-time errors if you don't use these safe wrappers.
                    </p>
                    <MutexVis />
                </div>
            </div>
        </ModuleContainer>
    )
}

import { ModuleContainer } from "@/modules/ModuleContainer"
import { UnsafeVis } from "./UnsafeVis"

export default function Unsafe() {
    return (
        <ModuleContainer
            title="Unsafe Rust"
            description="Peeking under the hood of memory safety."
            currentStep={26}
            totalSteps={32}
        >
            <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">The Escape Hatch</h2>
                    <p className="text-muted-foreground mb-6">
                        Rust has a second language hidden inside it that doesn't enforce memory safety guarantees. This is where you go when you need to talk to hardware or build low-level abstractions.
                    </p>
                    <UnsafeVis />
                </div>
            </div>
        </ModuleContainer>
    )
}

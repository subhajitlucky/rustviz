import { ModuleContainer } from "@/modules/ModuleContainer"
import { MemoryLayoutVis } from "./MemoryLayoutVis"

export default function MemoryLayout() {
    return (
        <ModuleContainer
            title="Memory Layout & ABI"
            description="How Rust data actually looks in RAM."
            currentStep={27}
            totalSteps={32}
        >
            <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Bytes and Alignment</h2>
                    <p className="text-muted-foreground mb-6">
                        Rust is a systems language, which means you have control over the memory layout. Understanding how fields are packed and aligned is key for performance and FFI.
                    </p>
                    <MemoryLayoutVis />
                </div>
            </div>
        </ModuleContainer>
    )
}

import { ModuleContainer } from "@/modules/ModuleContainer"
import { SmartPointersVis } from "./SmartPointersVis"

export default function SmartPointers() {
    return (
        <ModuleContainer
            title="Smart Pointers"
            description="Moving beyond simple references to managed pointers that have metadata and capabilities."
            currentStep={20} // This will be dynamic in the future
            totalSteps={25}
        >
            <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Box and Rc</h2>
                    <p className="text-muted-foreground mb-6">
                        Smart pointers are data structures that act like a pointer but also have extra metadata and capabilities.
                    </p>
                    <SmartPointersVis />
                </div>
            </div>
        </ModuleContainer>
    )
}

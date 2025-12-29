import { StackHeapVis } from "./StackHeapVis"
import { OwnershipTracker } from "./OwnershipTracker"

export default function MemoryModel() {
    return (
        <div className="space-y-12">
            <div className="space-y-4">
                <StackHeapVis />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Ownership in Action</h2>
                <OwnershipTracker />
            </div>
        </div>
    )
}

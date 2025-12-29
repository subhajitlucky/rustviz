import { CodeWalkthrough, Step } from "@/components/visualizer/CodeWalkthrough"
import { StackView, HeapView } from "@/components/visualizer/MemoryBlock"
import { motion } from "framer-motion"

export default function CollectionsVis() {
    const steps: Step[] = [
        {
            title: "Vector Allocation",
            description: "A `Vec` is a 3-part 'fat pointer' on the stack: ptr, length, and capacity. The actual data is on the heap.",
            code: `let mut v = Vec::with_capacity(2);
v.push(1);`,
            highlightedLines: [1, 2],
            visualComponent: (
                <div className="grid grid-cols-2 gap-4 h-full">
                    <StackView 
                        title="Stack"
                        items={[
                            { id: "1", name: "v", value: "ptr: 0x500, len: 1, cap: 2", type: "Vec<i32>" }
                        ]} 
                    />
                    <HeapView
                        title="Heap"
                        items={[
                            { id: "0x500", name: "[0]", value: "1", color: "bg-blue-500/10 border-blue-500/20" },
                            { id: "0x504", name: "[1]", value: "_", color: "bg-slate-500/5 border-slate-500/10" }
                        ]}
                    />
                </div>
            )
        },
        {
            title: "Filling Capacity",
            description: "Pushing another element uses the remaining capacity. No reallocation needed yet.",
            code: `v.push(2);`,
            highlightedLines: [1],
            visualComponent: (
                <div className="grid grid-cols-2 gap-4 h-full">
                    <StackView 
                        title="Stack"
                        items={[
                            { id: "1", name: "v", value: "ptr: 0x500, len: 2, cap: 2", type: "Vec<i32>" }
                        ]} 
                    />
                    <HeapView
                        title="Heap"
                        items={[
                            { id: "0x500", name: "[0]", value: "1", color: "bg-blue-500/10 border-blue-500/20" },
                            { id: "0x504", name: "[1]", value: "2", color: "bg-blue-500/10 border-blue-500/20" }
                        ]}
                    />
                </div>
            )
        },
        {
            title: "Dynamic Resizing",
            description: "Exceeding capacity triggers a re-allocation. Rust doubles the capacity, copies the data to a new heap location, and updates the pointer.",
            code: `v.push(3); // Triggers growth`,
            highlightedLines: [1],
            visualComponent: (
                <div className="grid grid-cols-2 gap-4 h-full">
                    <StackView 
                        title="Stack"
                        items={[
                            { id: "1", name: "v", value: "ptr: 0x900, len: 3, cap: 4", type: "Vec<i32>" }
                        ]} 
                    />
                    <div className="flex flex-col gap-4">
                        <div className="opacity-30 grayscale scale-90 origin-top">
                             <HeapView
                                title="Old Heap (0x500)"
                                items={[
                                    { id: "0x500", name: "", value: "1" },
                                    { id: "0x504", name: "", value: "2" }
                                ]}
                            />
                        </div>
                        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                            <HeapView
                                title="New Heap (0x900)"
                                items={[
                                    { id: "0x900", name: "[0]", value: "1" },
                                    { id: "0x904", name: "[1]", value: "2" },
                                    { id: "0x908", name: "[2]", value: "3", color: "bg-green-500/10 border-green-500/20" },
                                    { id: "0x90C", name: "[3]", value: "_", color: "bg-slate-500/5 border-slate-500/10" }
                                ]}
                            />
                        </motion.div>
                    </div>
                </div>
            )
        }
    ]

    return <CodeWalkthrough steps={steps} title="Vec: Dynamic Growth" />
}

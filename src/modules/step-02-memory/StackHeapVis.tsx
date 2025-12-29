import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"

interface MemoryItem {
    id: string
    name: string
    value: string
    location: "stack" | "heap"
    address?: string // For heap items, the address pointer
}

export function StackHeapVis() {
    const [stackItems, setStackItems] = useState<MemoryItem[]>([])
    const [heapItems, setHeapItems] = useState<MemoryItem[]>([])

    const addStackNum = () => {
        const id = Math.random().toString(36).substring(7)
        setStackItems((prev) => [
            ...prev,
            { id, name: `x${prev.length}`, value: "42", location: "stack" },
        ])
    }

    const addHeapString = () => {
        const id = Math.random().toString(36).substring(7)
        const address = `0x${Math.floor(Math.random() * 10000).toString(16)}`

        // Push the string value to Heap
        setHeapItems((prev) => [
            ...prev,
            { id, name: `data`, value: "\"hello\"", location: "heap", address },
        ])

        // Push the pointer to Stack
        setStackItems((prev) => [
            ...prev,
            { id, name: `s${heapItems.length}`, value: `ptr->${address}`, location: "stack" },
        ])
    }

    const clear = () => {
        setStackItems([])
        setHeapItems([])
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-center gap-4">
                <Button onClick={addStackNum} size="sm" variant="secondary">
                    <Plus className="mr-2 h-4 w-4" /> Add Integer (Stack)
                </Button>
                <Button onClick={addHeapString} size="sm" variant="secondary">
                    <Plus className="mr-2 h-4 w-4" /> Add String (Heap)
                </Button>
                <Button onClick={clear} size="sm" variant="outline">
                    <Trash2 className="mr-2 h-4 w-4" /> Clear
                </Button>
            </div>

            <div className="grid grid-cols-2 gap-8 h-[400px]">
                {/* Stack Container */}
                <div className="border bg-background/50 rounded-xl p-4 flex flex-col font-mono relative overflow-hidden">
                    <div className="text-center font-bold text-muted-foreground mb-4 border-b pb-2">STACK (Fast, LIFO)</div>
                    <div className="flex-1 flex flex-col-reverse justify-start gap-2 overflow-auto p-2">
                        <AnimatePresence mode="popLayout">
                            {stackItems.map((item) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -50, scale: 0.8 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    className="bg-primary/20 border border-primary/30 p-3 rounded shadow-sm flex justify-between items-center"
                                >
                                    <span className="font-semibold text-primary">{item.name}</span>
                                    <span className="text-xs ml-2 opacity-70 truncate max-w-[100px]">{item.value}</span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Heap Container */}
                <div className="border bg-background/50 rounded-xl p-4 flex flex-col font-mono relative overflow-hidden">
                    <div className="text-center font-bold text-muted-foreground mb-4 border-b pb-2">HEAP (Flexible, Slow)</div>
                    <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-2 content-start p-2 overflow-auto">
                        <AnimatePresence>
                            {heapItems.map((item) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    className="bg-purple-500/20 border border-purple-500/30 p-3 rounded aspect-square flex flex-col items-center justify-center text-center shadow-sm"
                                >
                                    <span className="text-xs text-muted-foreground mb-1">{item.address}</span>
                                    <span className="font-bold text-purple-400">{item.value}</span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    )
}

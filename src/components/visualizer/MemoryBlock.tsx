import { motion, AnimatePresence } from "framer-motion"

export interface MemoryItem {
    id: string
    name: string
    value: string
    type?: string
    color?: string
}

interface StackProps {
    items: MemoryItem[]
    title?: string
}

export function StackView({ items, title = "Stack" }: StackProps) {
    return (
        <div className="border bg-background/50 rounded-xl p-4 flex flex-col font-mono relative overflow-hidden h-full min-h-[200px]">
            <div className="text-center font-bold text-muted-foreground mb-4 border-b pb-2 text-sm uppercase tracking-wider">{title}</div>
            <div className="flex-1 flex flex-col-reverse justify-start gap-2 overflow-auto p-2">
                <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className={`p-3 rounded border shadow-sm flex justify-between items-center ${
                                item.color ? item.color : "bg-primary/10 border-primary/20"
                            }`}
                        >
                            <div className="flex flex-col">
                                <span className="font-bold text-sm">{item.name}</span>
                                {item.type && <span className="text-[10px] text-muted-foreground">{item.type}</span>}
                            </div>
                            <span className="font-mono text-sm">{item.value}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {items.length === 0 && (
                    <div className="text-center text-muted-foreground/50 italic text-sm mt-auto mb-auto">Empty</div>
                )}
            </div>
        </div>
    )
}

interface HeapProps {
    items: MemoryItem[]
    title?: string
}

export function HeapView({ items, title = "Heap" }: HeapProps) {
    return (
        <div className="border bg-background/50 rounded-xl p-4 flex flex-col font-mono relative overflow-hidden h-full min-h-[200px]">
             <div className="text-center font-bold text-muted-foreground mb-4 border-b pb-2 text-sm uppercase tracking-wider">{title}</div>
            <div className="flex-1 grid grid-cols-2 gap-3 content-start p-2 overflow-auto">
                <AnimatePresence>
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className={`p-3 rounded aspect-square flex flex-col items-center justify-center text-center border shadow-sm ${
                                item.color ? item.color : "bg-purple-500/10 border-purple-500/20"
                            }`}
                        >
                            <span className="text-[10px] text-muted-foreground mb-1">{item.id}</span>
                            <span className="font-bold text-sm break-all">{item.value}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
                 {items.length === 0 && (
                    <div className="col-span-2 text-center text-muted-foreground/50 italic text-sm mt-auto mb-auto">Empty</div>
                )}
            </div>
        </div>
    )
}

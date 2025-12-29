import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Copy, ArrowRight, XCircle } from "lucide-react"

export function MoveCopyVis() {
    const [items, setItems] = useState<{ id: string, type: 'int' | 'string', val: string, owner: 'a' | 'b' | 'moved_from_a' }[]>([])

    const reset = () => setItems([])

    const addInt = () => {
        setItems([{ id: 'i1', type: 'int', val: '42', owner: 'a' }])
    }

    const addString = () => {
        setItems([{ id: 's1', type: 'string', val: '"Hello"', owner: 'a' }])
    }

    const moveOrCopy = () => {
        setItems(prev => prev.map(item => {
            if (item.type === 'int') {
                // Copy behavior
                return { ...item, owner: 'b' } // In visual we show both? Or duplicate? Let's duplicate for Copy.
                // Actually for visual clarity of "Copy", we ideally spawn a new one.
                // But let's simplify state:
            }
            return { ...item, owner: 'b' }
        }))

        // Correct implementation:
        // If Int (Copy), 'a' keeps value, 'b' gets value.
        // If String (Move), 'a' loses value, 'b' gets value.

        const current = items[0]
        if (!current) return

        if (current.type === 'int') {
            setItems([
                { ...current, owner: 'a' },
                { ...current, id: current.id + '_copy', owner: 'b' }
            ])
        } else {
            setItems([
                { ...current, owner: 'moved_from_a' }, // invalid state visual
                { ...current, owner: 'b' }
            ])
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex gap-4">
                <Button onClick={addInt} size="sm" variant="secondary">let a = 42 (i32)</Button>
                <Button onClick={addString} size="sm" variant="secondary">let a = String::from("Hi")</Button>
                <Button onClick={moveOrCopy} disabled={items.length === 0 || items.some(i => i.owner === 'b')} size="sm">
                    let b = a
                </Button>
                <Button onClick={reset} size="sm" variant="outline">Reset</Button>
            </div>

            <div className="grid grid-cols-2 gap-12 text-center">
                <div className="border p-4 rounded-xl min-h-[150px] relative">
                    <div className="font-mono text-muted-foreground mb-4">Variable 'a'</div>
                    <AnimatePresence>
                        {items.filter(i => i.owner === 'a').map(item => (
                            <motion.div
                                key={item.id}
                                layoutId={item.type === 'string' ? "string-val" : undefined}
                                initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                                className="bg-blue-500/20 text-blue-500 border border-blue-500 p-2 rounded font-bold inline-block"
                            >
                                {item.val}
                            </motion.div>
                        ))}
                        {items.filter(i => i.owner === 'moved_from_a').map(item => (
                            <div key={item.id + 'inv'} className="absolute inset-0 flex items-center justify-center bg-muted/50 rounded-xl backdrop-blur-[1px]">
                                <XCircle className="w-8 h-8 text-muted-foreground" />
                                <span className="sr-only">Invalid</span>
                            </div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="border p-4 rounded-xl min-h-[150px] flex items-center justify-center">
                    <div className="absolute top-4 font-mono text-muted-foreground">Variable 'b'</div>
                    <AnimatePresence>
                        {items.filter(i => i.owner === 'b').map(item => (
                            <motion.div
                                key={item.id}
                                layoutId={item.type === 'string' ? "string-val" : undefined}
                                initial={{ scale: 0 }} animate={{ scale: 1 }}
                                className="bg-blue-500/20 text-blue-500 border border-blue-500 p-2 rounded font-bold inline-block"
                            >
                                {item.val}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            <div className="p-4 bg-muted/30 rounded-lg text-sm">
                {items.length > 0 && items.some(i => i.type === 'int' && i.owner === 'b') && (
                    <p className="flex items-center gap-2"><Copy className="w-4 h-4" /> <strong>Copy Trait:</strong> Integers are simple bits (stack-only). They are cheap to copy, so 'a' stays valid.</p>
                )}
                {items.length > 0 && items.some(i => i.type === 'string' && i.owner === 'b') && (
                    <p className="flex items-center gap-2"><ArrowRight className="w-4 h-4" /> <strong>Move Semantics:</strong> Strings own heap data. Copying the pointer would cause a double-free, so ownership must MOVE.</p>
                )}
            </div>
        </div>
    )
}

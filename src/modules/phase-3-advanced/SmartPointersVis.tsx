import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Box, Users, Share2 } from "lucide-react"

export function SmartPointersVis() {
    const [mode, setMode] = useState<'Box' | 'Rc'>('Box')
    const [rcCount, setRcCount] = useState(1)

    return (
        <div className="space-y-6">
            <div className="flex gap-4">
                <Button variant={mode === 'Box' ? 'default' : 'outline'} onClick={() => setMode('Box')}>
                    Box&lt;T&gt; (Heap Allocation)
                </Button>
                <Button variant={mode === 'Rc' ? 'default' : 'outline'} onClick={() => setMode('Rc')}>
                    Rc&lt;T&gt; (Reference Counting)
                </Button>
            </div>

            <div className="min-h-[400px] border rounded-xl bg-card p-6">
                <AnimatePresence mode="wait">
                    {mode === 'Box' && (
                        <motion.div key="box" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                            <div className="flex items-center gap-2 font-bold text-xl">
                                <Box className="text-blue-500" /> Box&lt;T&gt;: The simplest smart pointer
                            </div>
                            <p className="text-muted-foreground">
                                A Box allows you to store data on the heap rather than the stack. What remains on the stack is the pointer to the heap data.
                            </p>
                            
                            <div className="grid md:grid-cols-2 gap-8 py-8">
                                <div className="space-y-4">
                                    <h4 className="font-mono text-sm text-center">STACK</h4>
                                    <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center">
                                        <div className="bg-blue-500/20 border border-blue-500 p-3 rounded w-full flex justify-between">
                                            <span>my_box</span>
                                            <span className="font-mono">ptr -&gt; 0x1A</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="font-mono text-sm text-center">HEAP</h4>
                                    <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center">
                                        <motion.div 
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="bg-blue-500 text-white p-4 rounded-lg shadow-xl"
                                        >
                                            <div className="text-xs opacity-80 mb-1">Address: 0x1A</div>
                                            <div className="font-bold font-mono text-lg">"Heavy Data"</div>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>

                            <Card className="p-4 bg-muted/50">
                                <h4 className="font-bold mb-2">When to use:</h4>
                                <ul className="text-sm list-disc list-inside space-y-1 text-muted-foreground">
                                    <li>When a type has a size that can't be known at compile time.</li>
                                    <li>When you want to transfer ownership of a large amount of data without copying.</li>
                                    <li>When you want to own a value and care only that it implements a trait (Trait Objects).</li>
                                </ul>
                            </Card>
                        </motion.div>
                    )}

                    {mode === 'Rc' && (
                        <motion.div key="rc" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                            <div className="flex items-center gap-2 font-bold text-xl">
                                <Users className="text-purple-500" /> Rc&lt;T&gt;: Reference Counting
                            </div>
                            <p className="text-muted-foreground">
                                Rc stands for "Reference Counted". It allows multiple ownership of the same data on the heap. It tracks how many pointers exist and only drops the data when the count reaches zero.
                            </p>

                            <div className="flex justify-center gap-4">
                                <Button size="sm" onClick={() => setRcCount(c => c + 1)} variant="secondary">
                                    <Share2 className="w-4 h-4 mr-2" /> Clone Rc
                                </Button>
                                <Button size="sm" onClick={() => setRcCount(c => Math.max(1, c - 1))} variant="outline">
                                    Drop Rc
                                </Button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 py-4">
                                <div className="space-y-4">
                                    <h4 className="font-mono text-sm text-center">STACK (Multiple Owners)</h4>
                                    <div className="border-2 border-dashed rounded-lg p-4 space-y-2 h-[200px] overflow-auto">
                                        <AnimatePresence>
                                            {Array.from({ length: rcCount }).map((_, i) => (
                                                <motion.div 
                                                    key={i}
                                                    initial={{ x: -20, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1 }}
                                                    exit={{ x: -20, opacity: 0 }}
                                                    className="bg-purple-500/20 border border-purple-500 p-2 rounded flex justify-between text-xs"
                                                >
                                                    <span>owner_{i+1}</span>
                                                    <span>ptr -&gt; 0x2B</span>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="font-mono text-sm text-center">HEAP (Shared Data)</h4>
                                    <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center h-[200px]">
                                        <div className="relative">
                                            <div className="bg-purple-500 text-white p-6 rounded-lg shadow-xl text-center">
                                                <div className="text-xs opacity-80 mb-1">Address: 0x2B</div>
                                                <div className="font-bold font-mono text-lg italic">Shared Resource</div>
                                            </div>
                                            <motion.div 
                                                key={rcCount}
                                                initial={{ scale: 1.5, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                className="absolute -top-3 -right-3 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-background"
                                            >
                                                {rcCount}
                                            </motion.div>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-4 italic">Reference Count: {rcCount}</p>
                                    </div>
                                </div>
                            </div>

                            <Card className="p-4 bg-muted/50">
                                <h4 className="font-bold mb-2">Key Restriction:</h4>
                                <p className="text-sm text-muted-foreground">
                                    Rc&lt;T&gt; only provides <span className="font-bold text-foreground">immutable</span> access to the data. If you need to mutate it, you usually pair it with <span className="font-mono">RefCell&lt;T&gt;</span>.
                                </p>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

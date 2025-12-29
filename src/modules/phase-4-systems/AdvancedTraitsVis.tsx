import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Puzzle, Zap, Layers } from "lucide-react"

export function AdvancedTraitsVis() {
    const [view, setView] = useState<'associated' | 'blanket' | 'objects'>('associated')

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
                <button 
                    onClick={() => setView('associated')}
                    className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${view === 'associated' ? 'bg-primary text-primary-foreground' : 'bg-card'}`}
                >
                    Associated Types
                </button>
                <button 
                    onClick={() => setView('blanket')}
                    className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${view === 'blanket' ? 'bg-primary text-primary-foreground' : 'bg-card'}`}
                >
                    Blanket Implementations
                </button>
                <button 
                    onClick={() => setView('objects')}
                    className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${view === 'objects' ? 'bg-primary text-primary-foreground' : 'bg-card'}`}
                >
                    Trait Objects (dyn)
                </button>
            </div>

            <Card className="p-8 min-h-[300px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    {view === 'associated' && (
                        <motion.div key="assoc" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                            <h4 className="text-xl font-bold flex items-center gap-2"><Puzzle className="text-blue-500" /> Associated Types</h4>
                            <div className="font-mono text-xs bg-slate-950 text-slate-300 p-4 rounded border-l-4 border-blue-500">
                                <div className="text-purple-400">trait</div> Graph {"{"}
                                <div className="pl-4">type Node;</div>
                                <div className="pl-4">type Edge;</div>
                                <div className="mt-2 text-slate-500">// ...</div>
                                <div>{"}"}</div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Like generics, but instead of parameters, the type is defined <span className="italic">inside</span> the trait implementation.
                            </p>
                        </motion.div>
                    )}

                    {view === 'blanket' && (
                        <motion.div key="blanket" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                            <h4 className="text-xl font-bold flex items-center gap-2"><Zap className="text-yellow-500" /> Blanket Implementations</h4>
                            <div className="font-mono text-xs bg-slate-950 text-slate-300 p-4 rounded border-l-4 border-yellow-500">
                                <div className="text-purple-400">impl</div>&lt;T&gt; MyTrait <span className="text-purple-400">for</span> T <span className="text-purple-400">where</span> T: Display {"{"}
                                <div className="mt-2 text-slate-500">// Implement for ANY type that is Display</div>
                                <div>{"}"}</div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Automatically implement a trait for all types that meet certain criteria.
                            </p>
                        </motion.div>
                    )}

                    {view === 'objects' && (
                        <motion.div key="dyn" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                            <h4 className="text-xl font-bold flex items-center gap-2"><Layers className="text-green-500" /> Trait Objects (vtable)</h4>
                            <div className="font-mono text-xs bg-slate-950 text-slate-300 p-4 rounded border-l-4 border-green-500">
                                <div className="text-purple-400">let</div> list: Vec&lt;Box&lt;<span className="text-purple-400">dyn</span> Draw&gt;&gt; = ...;
                            </div>
                            <div className="flex gap-4 items-center">
                                <div className="flex-1 h-12 border-2 border-dashed rounded flex items-center justify-center text-xs font-mono">Pointer to Data</div>
                                <div className="flex-1 h-12 border-2 border-dashed rounded flex items-center justify-center text-xs font-mono bg-green-500/10">vtable (Methods)</div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Dynamic dispatch. Use this when you have a collection of different types that all implement the same trait.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>
        </div>
    )
}

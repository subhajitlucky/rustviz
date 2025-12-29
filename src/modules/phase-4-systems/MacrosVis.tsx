import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Code, Zap, Wand2, Sparkles } from "lucide-react"

export function MacrosVis() {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div className="space-y-6">
            <div className="bg-slate-900 rounded-xl p-6 relative overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                    <div className="space-y-1">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Macro Definition</div>
                        <div className="font-mono text-xs text-slate-300">
                            <span className="text-purple-400">macro_rules!</span> say_hello {"{"} <br />
                            &nbsp;&nbsp;() =&gt; {"{"} <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;println!(<span className="text-green-400">"Hello!"</span>); <br />
                            &nbsp;&nbsp;{"}"} <br />
                            {"}"}
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="p-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors"
                    >
                        {isExpanded ? "Collapse" : "Expand Macro"}
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Your Code</div>
                        <div className="bg-slate-950 p-4 rounded border border-slate-800 font-mono text-sm relative">
                            say_hello!();
                            {isExpanded && (
                                <motion.div 
                                    layoutId="expand"
                                    className="absolute inset-0 bg-primary/10 border-2 border-primary border-dashed pointer-events-none"
                                />
                            )}
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <AnimatePresence>
                            {isExpanded ? (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center text-primary"
                                >
                                    <Sparkles className="w-8 h-8 mb-2 animate-pulse" />
                                    <span className="text-xs font-bold">Token Expansion</span>
                                </motion.div>
                            ) : (
                                <Wand2 className="w-8 h-8 text-slate-700" />
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="space-y-4">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Generated Code (Expanded)</div>
                        <div className={`p-4 rounded border font-mono text-sm transition-all duration-500 ${isExpanded ? 'bg-slate-950 border-primary text-slate-300' : 'bg-slate-900 border-transparent text-transparent select-none'}`}>
                            println!(<span className="text-green-400">"Hello!"</span>);
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-4 bg-muted/30">
                    <h4 className="font-bold mb-2 flex items-center gap-2 text-sm"><Code className="w-4 h-4" /> Declarative (macro_rules!)</h4>
                    <p className="text-[10px] text-muted-foreground">Pattern matching on tokens. Like a find-and-replace on steroids.</p>
                </Card>
                <Card className="p-4 bg-muted/30">
                    <h4 className="font-bold mb-2 flex items-center gap-2 text-sm"><Zap className="w-4 h-4" /> Procedural Macros</h4>
                    <p className="text-[10px] text-muted-foreground">Full Rust functions that run during compilation to manipulate syntax trees.</p>
                </Card>
            </div>
        </div>
    )
}

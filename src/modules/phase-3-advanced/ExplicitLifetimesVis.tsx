import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Timer, ArrowRight, Info } from "lucide-react"

export function ExplicitLifetimesVis() {
    const [highlight, setHighlight] = useState<string | null>(null)

    return (
        <div className="space-y-6">
            <Card className="p-6 bg-muted/20 border-dashed">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1 space-y-4">
                        <div className="font-mono text-sm bg-slate-950 text-slate-50 p-6 rounded-lg relative leading-relaxed">
                            <div className="text-muted-foreground opacity-50">// The compiler needs to know which reference lives as long as the returned one</div>
                            <div className="mt-4">
                                <span className="text-purple-400">fn</span> <span className="text-blue-400">longest</span>
                                <span 
                                    onMouseEnter={() => setHighlight('lifetime')} 
                                    onMouseLeave={() => setHighlight(null)}
                                    className={`cursor-help transition-colors ${highlight === 'lifetime' ? 'text-yellow-400 font-bold underline' : 'text-yellow-500'}`}
                                >
                                    &lt;'a&gt;
                                </span>
                                (
                                    x: 
                                    <span 
                                        onMouseEnter={() => setHighlight('arg1')} 
                                        onMouseLeave={() => setHighlight(null)}
                                        className={`transition-colors ${highlight === 'arg1' ? 'bg-yellow-500/20' : ''}`}
                                    >
                                        &'a str
                                    </span>, 
                                    y: 
                                    <span 
                                        onMouseEnter={() => setHighlight('arg2')} 
                                        onMouseLeave={() => setHighlight(null)}
                                        className={`transition-colors ${highlight === 'arg2' ? 'bg-yellow-500/20' : ''}`}
                                    >
                                        &'a str
                                    </span>
                                ) -&gt; 
                                <span 
                                    onMouseEnter={() => setHighlight('ret')} 
                                    onMouseLeave={() => setHighlight(null)}
                                    className={`transition-colors ${highlight === 'ret' ? 'bg-yellow-500/20 font-bold' : ''}`}
                                >
                                    &'a str
                                </span> 
                                {" {"}
                            </div>
                            <div className="pl-4 mt-2">
                                <span className="text-purple-400">if</span> x.len() &gt; y.len() {"{"} x {"}"} <span className="text-purple-400">else</span> {"{"} y {"}"}
                            </div>
                            <div>{"}"}</div>
                        </div>

                        <div className="flex gap-2 flex-wrap">
                            <Button size="sm" variant="outline" onMouseEnter={() => setHighlight('lifetime')} onMouseLeave={() => setHighlight(null)}>
                                Highlight 'a
                            </Button>
                            <Button size="sm" variant="outline" onMouseEnter={() => setHighlight('ret')} onMouseLeave={() => setHighlight(null)}>
                                Highlight Return
                            </Button>
                        </div>
                    </div>

                    <div className="w-full md:w-64 flex flex-col justify-center">
                        <AnimatePresence mode="wait">
                            {highlight === 'lifetime' && (
                                <motion.div key="h-lt" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-2">
                                    <div className="flex items-center gap-2 font-bold text-yellow-500"><Timer className="w-4 h-4" /> Lifetime Name</div>
                                    <p className="text-xs text-muted-foreground">
                                        'a is a placeholder for some scope. It doesn't change how long things live, it just <span className="italic">labels</span> them.
                                    </p>
                                </motion.div>
                            )}
                            {highlight === 'ret' && (
                                <motion.div key="h-ret" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-2">
                                    <div className="flex items-center gap-2 font-bold text-blue-400"><ArrowRight className="w-4 h-4" /> The Return</div>
                                    <p className="text-xs text-muted-foreground">
                                        This says: "The returned reference will be valid for as long as the <span className="font-bold">shorter</span> of x and y."
                                    </p>
                                </motion.div>
                            )}
                            {!highlight && (
                                <motion.div key="h-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-muted-foreground">
                                    <Info className="w-8 h-8 mx-auto mb-2 opacity-20" />
                                    <p className="text-xs">Hover over code elements to see their purpose.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </Card>

            <div className="space-y-4">
                <h4 className="font-bold">Visual Model: The Overlap</h4>
                <div className="h-24 relative border rounded-lg bg-muted/50 overflow-hidden">
                    <div className="absolute top-4 left-4 right-20 h-4 bg-blue-500/20 rounded border border-blue-500 flex items-center px-2 text-[10px] font-bold">Lifetime of 'x'</div>
                    <div className="absolute top-12 left-20 right-4 h-4 bg-purple-500/20 rounded border border-purple-500 flex items-center px-2 text-[10px] font-bold">Lifetime of 'y'</div>
                    
                    {/* Overlap */}
                    <div className="absolute top-4 bottom-4 left-20 right-20 bg-yellow-400/20 border-x-2 border-yellow-400 border-dashed flex items-center justify-center">
                        <span className="text-[10px] font-black text-yellow-600 tracking-tighter">'a (The Intersection)</span>
                    </div>
                </div>
                <p className="text-sm text-muted-foreground italic">
                    The compiler uses the <span className="font-bold">intersection</span> of all lifetimes labeled with the same name.
                </p>
            </div>
        </div>
    )
}

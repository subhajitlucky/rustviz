import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Terminal, AlertCircle, CheckCircle2 } from "lucide-react"

export function PrintMacrosVis() {
    const [name, setName] = useState("Rust")
    const [version, setVersion] = useState("1.75")
    const [argsCount, setArgsCount] = useState(2)

    const codeTemplate = `println!("Hello {}, version {}!", ${argsCount >= 1 ? `"${name}"` : ""}${argsCount >= 2 ? `, "${version}"` : ""}${argsCount > 2 ? ', "Extra"' : ""});`
    
    const isCorrect = argsCount === 2
    const isTooFew = argsCount < 2
    const isTooMany = argsCount > 2

    return (
        <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Interpolation Variables</h4>
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-mono">Variable 1 (name):</label>
                                <input 
                                    type="text" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-background border rounded px-3 py-2 text-sm font-mono"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-mono">Variable 2 (version):</label>
                                <input 
                                    type="text" 
                                    value={version} 
                                    onChange={(e) => setVersion(e.target.value)}
                                    className="w-full bg-background border rounded px-3 py-2 text-sm font-mono"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Macro Arguments</h4>
                        <div className="flex gap-2">
                            {[1, 2, 3].map(count => (
                                <button
                                    key={count}
                                    onClick={() => setArgsCount(count)}
                                    className={`flex-1 py-2 rounded-md text-xs font-bold border transition-all ${argsCount === count ? 'bg-primary text-primary-foreground border-primary' : 'bg-card hover:border-primary/50'}`}
                                >
                                    {count} {count === 1 ? 'Arg' : 'Args'}
                                </button>
                            ))}
                        </div>
                        <p className="text-[10px] text-muted-foreground italic">
                            The macro expects exactly 2 values for the 2 pairs of braces `{}`.
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Compiler Output</h4>
                    <Card className="bg-slate-950 border-slate-800 p-6 min-h-[200px] font-mono text-sm relative overflow-hidden">
                        <div className="flex items-center gap-2 mb-4 text-slate-500">
                            <Terminal size={14} />
                            <span>cargo run</span>
                        </div>
                        
                        <AnimatePresence mode="wait">
                            {isCorrect ? (
                                <motion.div 
                                    key="success"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-green-400"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle2 size={16} />
                                        <span className="font-bold">Compiling... Success</span>
                                    </div>
                                    <div className="pl-6 border-l-2 border-green-900/50 py-2">
                                        Hello <span className="underline font-bold">{name}</span>, version <span className="underline font-bold">{version}</span>!
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="error"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-red-400"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <AlertCircle size={16} />
                                        <span className="font-bold">error: argument unused</span>
                                    </div>
                                    <div className="pl-6 border-l-2 border-red-900/50 py-2 text-xs">
                                        {isTooFew && "error: 2 positional arguments in format string, but no arguments were given"}
                                        {isTooMany && "error: argument never used"}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Visual connections */}
                        <div className="absolute bottom-4 right-4 opacity-10 pointer-events-none">
                            <Terminal size={80} />
                        </div>
                    </Card>

                    <div className="p-4 bg-muted/30 rounded-lg border text-xs">
                        <div className="font-bold mb-1 flex items-center gap-1">
                             Mental Model:
                        </div>
                        <p className="text-muted-foreground">
                            The <span className="text-foreground font-mono">!</span> means this is code generation. Rust checks your strings at compile-time to ensure they match your variables.
                        </p>
                    </div>
                </div>
            </div>

            <Card className="p-4 bg-slate-900 border-slate-800">
                <div className="text-[10px] text-slate-500 mb-2 uppercase font-bold tracking-widest">Macro Code</div>
                <pre className="font-mono text-xs text-blue-300 overflow-x-auto p-2">
                    {codeTemplate}
                </pre>
            </Card>
        </div>
    )
}

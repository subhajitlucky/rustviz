import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ShieldAlert, ShieldCheck, Skull, Wand2 } from "lucide-react"

export function UnsafeVis() {
    const [isUnsafe, setIsUnsafe] = useState(false)

    return (
        <div className="space-y-6">
            <div className="flex justify-center">
                <Button 
                    variant={isUnsafe ? "destructive" : "outline"} 
                    onClick={() => setIsUnsafe(!isUnsafe)}
                    className="h-16 px-12 text-lg rounded-full shadow-lg"
                >
                    {isUnsafe ? <Skull className="mr-2" /> : <ShieldCheck className="mr-2" />}
                    {isUnsafe ? "Leave the Safety Zone" : "Enter Unsafe Block"}
                </Button>
            </div>

            <div className="min-h-[400px] relative border-4 border-dashed rounded-3xl p-8 transition-colors duration-500 overflow-hidden" 
                 style={{ borderColor: isUnsafe ? '#ef4444' : '#10b981' }}>
                
                <AnimatePresence mode="wait">
                    {!isUnsafe ? (
                        <motion.div 
                            key="safe"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="h-full flex flex-col items-center justify-center text-center space-y-4"
                        >
                            <ShieldCheck className="w-16 h-16 text-green-500" />
                            <h3 className="text-2xl font-bold text-green-500">Safe Rust</h3>
                            <p className="max-w-md text-muted-foreground">
                                The compiler enforces strict rules. No null pointers, no data races, no use-after-free. You are protected by the Borrow Checker.
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="unsafe"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            className="h-full space-y-6"
                        >
                            <div className="flex items-center gap-2 text-red-500 font-bold text-xl">
                                <ShieldAlert className="w-6 h-6" /> unsafe {"{"} ... {"}"}
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                <Card className="p-4 bg-red-500/10 border-red-500/30">
                                    <h4 className="font-bold flex items-center gap-2 mb-2"><Wand2 className="w-4 h-4" /> The Superpowers</h4>
                                    <ul className="text-xs space-y-2 text-muted-foreground">
                                        <li>• Dereference a raw pointer</li>
                                        <li>• Call an unsafe function/method</li>
                                        <li>• Access or modify a mutable static variable</li>
                                        <li>• Implement an unsafe trait</li>
                                        <li>• Access fields of a union</li>
                                    </ul>
                                </Card>
                                
                                <div className="space-y-4">
                                    <div className="font-mono text-sm bg-slate-950 text-slate-300 p-4 rounded border border-red-500/50">
                                        <div className="text-purple-400">let</div> raw_p = &my_num <span className="text-purple-400">as</span> *<span className="text-purple-400">const</span> i32;
                                        <div className="mt-2 text-red-500 font-bold">unsafe {"{"}</div>
                                        <div className="pl-4">println!(<span className="text-green-400">"Value: {}"</span>, *raw_p);</div>
                                        <div className="text-red-500 font-bold">{"}"}</div>
                                    </div>
                                    <p className="text-[10px] text-red-400 italic font-bold animate-pulse">
                                        Warning: The compiler no longer checks memory safety here. You must manually ensure the pointer is valid!
                                    </p>
                                </div>
                            </div>

                            <div className="p-4 bg-background border rounded-xl text-center">
                                <p className="text-sm">
                                    Unsafe Rust is not "bad" code. It is a way to tell the compiler: 
                                    <br />
                                    <span className="font-bold italic">"I have more information than you do. I'll take responsibility for this memory."</span>
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertTriangle, BookOpen, Search } from "lucide-react"

export function CompilerVis() {
    const [errorId, setErrorId] = useState<'E0382' | 'E0502' | 'E0597' | null>(null)

    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
                <Button variant={errorId === 'E0382' ? 'default' : 'outline'} onClick={() => setErrorId('E0382')}>
                    E0382 (Use After Move)
                </Button>
                <Button variant={errorId === 'E0502' ? 'default' : 'outline'} onClick={() => setErrorId('E0502')}>
                    E0502 (Borrow Conflict)
                </Button>
                <Button variant={errorId === 'E0597' ? 'default' : 'outline'} onClick={() => setErrorId('E0597')}>
                    E0597 (Lifetime Error)
                </Button>
            </div>

            <div className="min-h-[350px] border rounded-xl bg-card p-6 relative">
                <AnimatePresence mode="wait">
                    {!errorId && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center text-muted-foreground mt-20">
                            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>Select a compiler error code to see how the compiler thinks.</p>
                        </motion.div>
                    )}

                    {errorId === 'E0382' && (
                        <motion.div key="E0382" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}>
                            <div className="flex items-center gap-2 text-destructive font-mono font-bold text-lg mb-2">
                                <AlertTriangle className="w-5 h-5" /> error[E0382]: use of moved value: `s`
                            </div>
                            <Card className="p-4 bg-muted/50 font-mono text-sm space-y-2 mb-6">
                                <div>let s = String::from("hello");</div>
                                <div>let x = s; <span className="text-muted-foreground">// `s` moved to `x` here</span></div>
                                <div className="text-destructive font-bold underline decoration-wavy">println!("{ }", s);</div>
                            </Card>
                            <div className="space-y-4">
                                <h4 className="font-bold flex items-center gap-2"><BookOpen className="w-4 h-4" /> Compiler Logic</h4>
                                <p className="text-sm text-muted-foreground">
                                    The compiler sees that `String` does not implement Copy. When assigned to `x`, ownership moved. The variable `s` is now uninitialized in the compiler's control flow graph. Accessing it is forbidden.
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {errorId === 'E0502' && (
                        <motion.div key="E0502" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}>
                            <div className="flex items-center gap-2 text-destructive font-mono font-bold text-lg mb-2">
                                <AlertTriangle className="w-5 h-5" /> error[E0502]: cannot borrow `x` as immutable
                            </div>
                            <Card className="p-4 bg-muted/50 font-mono text-sm space-y-2 mb-6">
                                <div>let mut x = 5;</div>
                                <div>let y = &mut x; <span className="text-muted-foreground">// mutable borrow occurs here</span></div>
                                <div className="text-destructive font-bold underline decoration-wavy">println!("{ }", x);</div>
                                <div className="text-muted-foreground">// immutable borrow occurs here</div>
                            </Card>
                            <div className="space-y-4">
                                <h4 className="font-bold flex items-center gap-2"><BookOpen className="w-4 h-4" /> Compiler Logic</h4>
                                <p className="text-sm text-muted-foreground">
                                    The compiler tracks "loans". `x` is currently loaned out mutably to `y`. You cannot access `x` directly (aliasing) while an exclusive lock (mutable borrow) exists.
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {errorId === 'E0597' && (
                        <motion.div key="E0597" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}>
                            <div className="flex items-center gap-2 text-destructive font-mono font-bold text-lg mb-2">
                                <AlertTriangle className="w-5 h-5" /> error[E0597]: `x` does not live long enough
                            </div>
                            <Card className="p-4 bg-muted/50 font-mono text-sm space-y-2 mb-6">
                                <div>let r;</div>
                                <div>{'{'}</div>
                                <div className="pl-4">let x = 5;</div>
                                <div className="pl-4 text-destructive font-bold underline decoration-wavy">r = &x;</div>
                                <div>{'}'} <span className="text-muted-foreground">// `x` dropped here while still borrowed</span></div>
                                <div>println!("{ }", r);</div>
                            </Card>
                            <div className="space-y-4">
                                <h4 className="font-bold flex items-center gap-2"><BookOpen className="w-4 h-4" /> Compiler Logic</h4>
                                <p className="text-sm text-muted-foreground">
                                    The compiler calculates the scope of `x` (lives until `{'}'}`). It sees `r` lives longer than `x`. This violates the lifetime constraint `'x &gt;= 'r`. The reference would dangle.
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

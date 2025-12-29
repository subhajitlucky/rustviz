import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ShieldAlert, ShieldCheck, Zap } from "lucide-react"

export function InteriorMutabilityVis() {
    const [borrowState, setBorrowState] = useState<'None' | 'Immutable' | 'Mutable' | 'Panic'>('None')

    const tryBorrow = (type: 'Immutable' | 'Mutable') => {
        if (type === 'Immutable') {
            if (borrowState === 'Mutable') setBorrowState('Panic')
            else setBorrowState('Immutable')
        } else {
            if (borrowState !== 'None') setBorrowState('Panic')
            else setBorrowState('Mutable')
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex gap-4">
                <Button onClick={() => tryBorrow('Immutable')} variant="outline">
                    Borrow Immutable
                </Button>
                <Button onClick={() => tryBorrow('Mutable')} variant="outline">
                    Borrow Mutable
                </Button>
                <Button onClick={() => setBorrowState('None')} variant="secondary">
                    Release Borrows
                </Button>
            </div>

            <div className="min-h-[400px] border rounded-xl bg-card p-6 flex flex-col items-center justify-center">
                <div className="mb-12 text-center">
                    <h3 className="text-xl font-bold mb-2">RefCell&lt;T&gt; Simulation</h3>
                    <p className="text-muted-foreground text-sm">
                        Moving the borrow checker from compile-time to <span className="text-primary italic">runtime</span>.
                    </p>
                </div>

                <div className="relative">
                    {/* The RefCell Container */}
                    <motion.div 
                        animate={{ 
                            borderColor: borrowState === 'Panic' ? '#ef4444' : borrowState === 'None' ? '#e2e8f0' : '#3b82f6',
                            scale: borrowState === 'Panic' ? [1, 1.1, 1] : 1
                        }}
                        transition={borrowState === 'Panic' ? { repeat: Infinity, duration: 0.5 } : {}}
                        className="w-48 h-48 border-4 rounded-full flex flex-col items-center justify-center bg-background shadow-inner relative z-10"
                    >
                        <Zap className={borrowState === 'None' ? 'text-muted-foreground' : 'text-yellow-500'} size={40} />
                        <div className="font-bold mt-2">Data</div>
                        <div className="text-xs font-mono">{borrowState === 'None' ? 'IDLE' : borrowState}</div>
                    </motion.div>

                    {/* Borrowing Indicators */}
                    <AnimatePresence>
                        {borrowState === 'Immutable' && (
                            <motion.div 
                                initial={{ opacity: 0, rotate: 0 }}
                                animate={{ opacity: 1, rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                                className="absolute -inset-4 border-2 border-dashed border-blue-400 rounded-full"
                            />
                        )}
                        {borrowState === 'Mutable' && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1.2 }}
                                transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
                                className="absolute -inset-6 border-4 border-blue-600 rounded-full"
                            />
                        )}
                    </AnimatePresence>

                    {/* Panic Warning */}
                    <AnimatePresence>
                        {borrowState === 'Panic' && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-64 text-center text-destructive"
                            >
                                <ShieldAlert className="mx-auto mb-1" />
                                <div className="font-bold">thread 'main' panicked</div>
                                <div className="text-[10px] font-mono leading-tight">already mutably borrowed: BorrowError</div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="mt-24 grid grid-cols-2 gap-4 w-full">
                    <Card className="p-4 bg-muted/30">
                        <div className="flex items-center gap-2 mb-2 font-bold text-sm">
                            <ShieldCheck className="text-green-500 w-4 h-4" /> Normal Rules
                        </div>
                        <p className="text-[10px] text-muted-foreground">
                            Borrow checker fails the BUILD if you violate rules.
                        </p>
                    </Card>
                    <Card className="p-4 bg-muted/30">
                        <div className="flex items-center gap-2 mb-2 font-bold text-sm">
                            <ShieldAlert className="text-blue-500 w-4 h-4" /> Interior Mutability
                        </div>
                        <p className="text-[10px] text-muted-foreground">
                            Build succeeds, but program CRASHES (panics) at runtime if rules are violated.
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    )
}

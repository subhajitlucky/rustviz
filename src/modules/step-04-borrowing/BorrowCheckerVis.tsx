import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export function BorrowCheckerVis() {
    const [borrows, setBorrows] = useState<{ id: string, type: 'immutable' | 'mutable', start: number, end: number }[]>([])

    const addImmutable = () => {
        // Simulate adding a reader
        const start = borrows.length * 10
        setBorrows(prev => [...prev, { id: `r${prev.length}`, type: 'immutable', start, end: start + 30 }])
    }

    const addMutable = () => {
        const start = borrows.length * 10
        setBorrows(prev => [...prev, { id: `m${prev.length}`, type: 'mutable', start, end: start + 30 }])
    }

    const reset = () => setBorrows([])

    // Naive check: does mutable overlap with anything?
    // Or do > 0 mutable exist at same time?
    // Logic: if ANY mutable exists, NO other borrow can exist in that overlap.

    // Let's optimize visual: Timeline axis.

    const hasError = borrows.some((b1, i) => {
        return borrows.some((b2, j) => {
            if (i === j) return false
            // Check overlap
            const overlap = b1.start < b2.end && b2.start < b1.end
            if (!overlap) return false

            if (b1.type === 'mutable' || b2.type === 'mutable') return true
            return false
        })
    })

    return (
        <div className="space-y-6">
            <div className="flex gap-4">
                <Button onClick={addImmutable} disabled={hasError} size="sm" variant="secondary">+ &T (Immutable)</Button>
                <Button onClick={addMutable} disabled={hasError} size="sm" variant="secondary">+ &mut T (Mutable)</Button>
                <Button onClick={reset} size="sm" variant="outline">Reset</Button>
            </div>

            <div className="relative min-h-[200px] border p-4 rounded-xl bg-card overflow-x-auto">
                <div className="absolute top-2 left-2 text-sm text-muted-foreground font-mono">Scope Execution ----&gt;</div>

                <div className="mt-8 space-y-2">
                    <div className="h-2 w-full bg-muted rounded mb-4" /> {/* Base timeline */}

                    {borrows.map((b) => (
                        <motion.div
                            key={b.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`h-8 rounded-md flex items-center px-2 text-xs font-bold border ${hasError ? 'opacity-50' : ''}`}
                            style={{
                                marginLeft: `${b.start}%`,
                                width: `${b.end - b.start}%`,
                                backgroundColor: b.type === 'mutable' ? 'var(--destructive)' : 'var(--blue-500)', // simplified color logic
                                borderColor: b.type === 'mutable' ? 'red' : 'blue',
                                color: 'white'
                            }}
                        >
                            {b.type === 'mutable' ? '&mut' : '&'}
                        </motion.div>
                    ))}
                </div>

                {hasError && (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10"
                    >
                        <div className="bg-destructive/10 text-destructive border border-destructive p-6 rounded-xl flex flex-col items-center gap-2 max-w-sm text-center shadow-lg">
                            <AlertCircle className="w-10 h-10" />
                            <h4 className="font-bold text-lg">Borrow Checker Error!</h4>
                            <p className="text-sm">
                                You cannot have a mutable reference while other references (mutable or immutable) exist.
                            </p>
                            <Button size="sm" variant="destructive" onClick={reset}>Crash! (Reset)</Button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}

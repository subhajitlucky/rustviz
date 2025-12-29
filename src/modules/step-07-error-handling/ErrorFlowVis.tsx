import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AlertOctagon, Check, Bomb } from "lucide-react"

export function ErrorFlowVis() {
    const [path, setPath] = useState<'unwrap' | 'match' | 'question'>('match')
    const [outcome, setOutcome] = useState<'success' | 'failure'>('success')
    const [state, setState] = useState<'idle' | 'running' | 'panicked' | 'handled'>('idle')

    const run = async () => {
        setState('running')
        await new Promise(r => setTimeout(r, 800))

        if (path === 'unwrap') {
            if (outcome === 'failure') {
                setState('panicked')
            } else {
                setState('handled') // technically successful unwrap
            }
        } else {
            setState('handled')
        }
    }

    const reset = () => setState('idle')

    return (
        <div className="space-y-6">
            <div className="flex gap-4 items-center flex-wrap">
                <div className="flex bg-muted p-1 rounded-md">
                    <Button size="sm" variant={path === 'unwrap' ? 'default' : 'ghost'} onClick={() => setPath('unwrap')}>.unwrap()</Button>
                    <Button size="sm" variant={path === 'match' ? 'default' : 'ghost'} onClick={() => setPath('match')}>match</Button>
                    <Button size="sm" variant={path === 'question' ? 'default' : 'ghost'} onClick={() => setPath('question')}>? (Operator)</Button>
                </div>

                <div className="flex bg-muted p-1 rounded-md">
                    <Button size="sm" variant={outcome === 'success' ? 'secondary' : 'ghost'} onClick={() => setOutcome('success')}>Success (Ok)</Button>
                    <Button size="sm" variant={outcome === 'failure' ? 'destructive' : 'ghost'} onClick={() => setOutcome('failure')}>Error (Err)</Button>
                </div>

                <Button onClick={run} disabled={state !== 'idle'}>Run</Button>
                <Button onClick={reset} variant="outline" disabled={state === 'idle'}>Reset</Button>
            </div>

            <div className="flex items-center justify-center min-h-[300px] border rounded-xl bg-background relative overflow-hidden">

                <AnimatePresence mode="wait">
                    {state === 'idle' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-muted-foreground">
                            Ready to execute...
                        </motion.div>
                    )}

                    {state === 'running' && (
                        <motion.div
                            className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold shadow-xl"
                            animate={{ x: [0, 100, 0] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                        >
                            Result
                        </motion.div>
                    )}

                    {state === 'panicked' && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center text-destructive">
                            <Bomb className="w-16 h-16 mb-4" />
                            <h3 className="text-2xl font-bold">PANIC!</h3>
                            <p>The program crashed because you unwrapped an Error.</p>
                        </motion.div>
                    )}

                    {state === 'handled' && (
                        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center">
                            {outcome === 'success' ? (
                                <>
                                    <Check className="w-16 h-16 text-green-500 mb-4" />
                                    <h3 className="text-xl font-bold text-green-500">Value Extracted</h3>
                                    <p className="text-muted-foreground">Execution continues normally.</p>
                                </>
                            ) : (path === 'unwrap' ? null : (
                                <>
                                    <AlertOctagon className="w-16 h-16 text-orange-500 mb-4" />
                                    <h3 className="text-xl font-bold text-orange-500">Error Handled Gracefully</h3>
                                    <p className="text-muted-foreground">
                                        {path === 'match' ? 'The Err branch executed.' : 'The error was propagated up (return Err).'}
                                    </p>
                                </>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    )
}

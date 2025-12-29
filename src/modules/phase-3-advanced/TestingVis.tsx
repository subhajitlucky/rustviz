import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, Play, Beaker } from "lucide-react"

export function TestingVis() {
    const [testState, setTestState] = useState<'idle' | 'running' | 'passed' | 'failed'>('idle')

    const runTests = () => {
        setTestState('running')
        setTimeout(() => {
            setTestState(Math.random() > 0.3 ? 'passed' : 'failed')
        }, 1500)
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <Button onClick={runTests} disabled={testState === 'running'}>
                    <Play className="mr-2 h-4 w-4" /> Run `cargo test`
                </Button>
                <div className="flex items-center gap-2 font-mono text-sm">
                    <Beaker className="text-primary" /> Test Runner v1.0
                </div>
            </div>

            <div className="min-h-[300px] border rounded-xl bg-slate-950 p-6 font-mono text-sm text-slate-300">
                <div className="mb-4 text-slate-500 italic"># Running unit tests...</div>
                
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span>test tests::it_works ...</span>
                        {testState === 'passed' || testState === 'failed' ? <span className="text-green-500">ok</span> : testState === 'running' ? <span className="animate-pulse text-yellow-500">running</span> : <span>-</span>}
                    </div>
                    <div className="flex justify-between">
                        <span>test tests::math_logic ...</span>
                        {testState === 'passed' ? <span className="text-green-500">ok</span> : testState === 'failed' ? <span className="text-red-500">FAILED</span> : testState === 'running' ? <span className="animate-pulse text-yellow-500">running</span> : <span>-</span>}
                    </div>
                </div>

                <AnimatePresence>
                    {testState === 'failed' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 p-4 bg-red-500/10 border border-red-500/50 rounded text-red-400">
                            <div className="font-bold">---- tests::math_logic stdout ----</div>
                            <div>assertion failed: `(left == right)`</div>
                            <div className="pl-4">left: `4`</div>
                            <div className="pl-4">right: `5`</div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {(testState === 'passed' || testState === 'failed') && (
                    <div className={`mt-8 pt-4 border-t border-slate-800 font-bold ${testState === 'passed' ? 'text-green-500' : 'text-red-500'}`}>
                        test result: {testState === 'passed' ? 'ok' : 'FAILED'}. 1 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out
                    </div>
                )}
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-8">
                <Card className="p-4 bg-muted/30">
                    <h4 className="font-bold mb-2 flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Unit Tests</h4>
                    <p className="text-xs text-muted-foreground">Small, focused tests usually living in the same file as the code (inside a `#[cfg(test)]` module).</p>
                </Card>
                <Card className="p-4 bg-muted/30">
                    <h4 className="font-bold mb-2 flex items-center gap-2"><Beaker className="w-4 h-4 text-blue-500" /> Integration Tests</h4>
                    <p className="text-xs text-muted-foreground">Tests in the `tests/` directory that treat your crate as an external library.</p>
                </Card>
            </div>
        </div>
    )
}

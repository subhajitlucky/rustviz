import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, Pause, RotateCcw, Zap, ArrowRight } from "lucide-react"

export function AsyncVis() {
    const [tasks, setTasks] = useState<{ id: number, status: 'pending' | 'running' | 'completed', progress: number }[]>([
        { id: 1, status: 'pending', progress: 0 },
        { id: 2, status: 'pending', progress: 0 },
        { id: 3, status: 'pending', progress: 0 },
    ])
    const [isRunning, setIsRunning] = useState(false)

    useEffect(() => {
        let interval: NodeJS.Timeout
        if (isRunning) {
            interval = setInterval(() => {
                setTasks(prev => prev.map(task => {
                    if (task.status === 'completed') return task
                    
                    const newProgress = task.progress + Math.random() * 15
                    if (newProgress >= 100) {
                        return { ...task, progress: 100, status: 'completed' }
                    }
                    return { ...task, progress: newProgress, status: 'running' }
                }))
            }, 500)
        }
        return () => clearInterval(interval)
    }, [isRunning])

    const reset = () => {
        setTasks(tasks.map(t => ({ ...t, status: 'pending', progress: 0 })))
        setIsRunning(false)
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <Button onClick={() => setIsRunning(!isRunning)} variant={isRunning ? "outline" : "default"}>
                        {isRunning ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                        {isRunning ? "Pause Runtime" : "Start Runtime"}
                    </Button>
                    <Button onClick={reset} variant="ghost">
                        <RotateCcw className="mr-2 h-4 w-4" /> Reset
                    </Button>
                </div>
                <div className="flex items-center gap-2 text-sm font-mono text-yellow-500">
                    <Zap className="h-4 w-4" /> Async Executor Active
                </div>
            </div>

            <div className="grid gap-4">
                {tasks.map((task) => (
                    <Card key={task.id} className="p-4 bg-muted/20">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-bold font-mono">Future #{task.id}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                                task.status === 'completed' ? 'bg-green-500/20 text-green-500' : 
                                task.status === 'running' ? 'bg-blue-500/20 text-blue-500 animate-pulse' : 
                                'bg-slate-500/20 text-slate-500'
                            }`}>
                                {task.status.toUpperCase()}
                            </span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <motion.div 
                                className="h-full bg-primary"
                                initial={{ width: 0 }}
                                animate={{ width: `${task.progress}%` }}
                                transition={{ type: "spring", bounce: 0 }}
                            />
                        </div>
                        <div className="mt-2 text-[10px] text-muted-foreground flex justify-between">
                            <span>.awaiting()</span>
                            <span>{Math.round(task.progress)}%</span>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="p-6 border rounded-xl bg-card">
                <h4 className="font-bold mb-4 flex items-center gap-2">
                    The State Machine Model
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    In Rust, <span className="font-mono text-foreground">async</span> functions don't run immediately. They return a <span className="font-bold text-foreground">Future</span>, which is a state machine. When you <span className="font-mono text-foreground">.await</span> it, the executor polls the future. If it's not ready, it yields control back to the thread, allowing other tasks to run.
                </p>
                
                <div className="mt-6 flex justify-center gap-8 items-center text-xs font-mono">
                    <div className="p-2 border rounded bg-background">Ready</div>
                    <ArrowRight className="text-muted-foreground" />
                    <div className="p-2 border rounded bg-primary/20 border-primary animate-pulse">Pending</div>
                    <ArrowRight className="text-muted-foreground" />
                    <div className="p-2 border rounded bg-background">Yield</div>
                </div>
            </div>
        </div>
    )
}

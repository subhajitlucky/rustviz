import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Play, RefreshCw } from "lucide-react"

export function DataRaceVis() {
    const [status, setStatus] = useState<"idle" | "running" | "crashed">("idle")
    const [value, setValue] = useState(0)

    const runSimulation = async () => {
        if (status === "running") return
        setStatus("running")
        setValue(0)

        // Simulate delay
        await new Promise((resolve) => setTimeout(resolve, 500))
        setStatus("crashed")
    }

    const reset = () => {
        setStatus("idle")
        setValue(0)
    }

    return (
        <div className="w-full max-w-2xl mx-auto p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
            <div className="flex items-center justify-between mb-8">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                    <AlertTriangle className="text-orange-500 h-5 w-5" />
                    Race Condition Simulator
                </h3>
                <div className="flex gap-2">
                    <Button size="sm" onClick={runSimulation} disabled={status !== "idle"}>
                        <Play className="h-4 w-4 mr-2" />
                        Simulate Race
                    </Button>
                    <Button size="sm" variant="outline" onClick={reset} disabled={status === "idle"}>
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="relative h-64 bg-muted/30 rounded-lg flex items-center justify-center overflow-hidden">
                {/* Shared Memory */}
                <div className="relative z-10 text-center">
                    <motion.div
                        className="w-32 h-32 bg-primary rounded-xl flex items-center justify-center text-4xl font-mono font-bold text-primary-foreground shadow-xl border-4 border-transparent"
                        animate={{
                            scale: status === "crashed" ? [1, 1.1, 0.9, 1] : 1,
                            borderColor: status === "crashed" ? "rgb(239 68 68)" : "transparent",
                            backgroundColor: status === "crashed" ? "rgb(75 85 99)" : "rgb(30, 41, 59)" // gray-600 vs primary (adjust based on theme)
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        {status === "crashed" ? "??" : value}
                    </motion.div>
                    <p className="mt-2 font-medium text-muted-foreground">Shared Memory</p>
                </div>

                {/* Thread A */}
                <motion.div
                    className="absolute left-10 top-1/2 -translate-y-1/2 flex items-center gap-4"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{
                        x: status === "running" || status === "crashed" ? 0 : -100,
                        opacity: status === "running" || status === "crashed" ? 1 : 0
                    }}
                >
                    <div className="flex flex-col items-center">
                        <span className="text-xs font-mono text-muted-foreground mb-1">Thread A</span>
                        <div className="h-2 w-20 bg-blue-500 rounded-full" />
                    </div>
                    <motion.div
                        className="h-10 w-10 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold border border-blue-500"
                        animate={{ x: status === "running" ? 60 : 0 }}
                        transition={{ duration: 1.5, ease: "linear" }}
                    >
                        +1
                    </motion.div>
                </motion.div>

                {/* Thread B */}
                <motion.div
                    className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-row-reverse items-center gap-4"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{
                        x: status === "running" || status === "crashed" ? 0 : 100,
                        opacity: status === "running" || status === "crashed" ? 1 : 0
                    }}
                >
                    <div className="flex flex-col items-center">
                        <span className="text-xs font-mono text-muted-foreground mb-1">Thread B</span>
                        <div className="h-2 w-20 bg-green-500 rounded-full" />
                    </div>
                    <motion.div
                        className="h-10 w-10 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center font-bold border border-green-500"
                        animate={{ x: status === "running" ? -60 : 0 }}
                        transition={{ duration: 1.2, ease: "linear" }} /* Slightly faster to cause 'collision' visual */
                    >
                        +1
                    </motion.div>
                </motion.div>

                {/* Crash Overlay */}
                <AnimatePresence>
                    {status === "crashed" && (
                        <motion.div
                            className="absolute inset-0 bg-destructive/10 backdrop-blur-[1px] flex items-center justify-center z-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <div className="bg-destructive text-destructive-foreground px-6 py-4 rounded-lg shadow-2xl flex flex-col items-center gap-2">
                                <AlertTriangle className="h-10 w-10" />
                                <h4 className="text-xl font-bold">DATA RACE!</h4>
                                <p className="text-sm opacity-90">Both threads wrote simultaneously.</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="mt-6 p-4 bg-muted rounded-md text-sm border-l-4 border-orange-500">
                <p>
                    <strong>The Problem:</strong> Without synchronization rules (like Rust's ownership), both threads verify the current value is 0, add 1, and save. One write overwrites the other.
                </p>
            </div>
        </div>
    )
}

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Lock, Key } from "lucide-react"

export function OwnershipTracker() {
    const [owner, setOwner] = useState<"var_a" | "var_b" | "dropped">("var_a")

    const moveOwnership = () => {
        if (owner === "var_a") setOwner("var_b")
    }

    const drop = () => {
        setOwner("dropped")
    }

    const reset = () => {
        setOwner("var_a")
    }

    return (
        <div className="flex flex-col gap-6 p-6 border rounded-xl bg-card">
            <div className="flex justify-between items-center mb-4 border-b pb-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <Key className="h-5 w-5 text-yellow-500" />
                    Ownership Tracker
                </h3>
                <div className="flex gap-2">
                    <Button onClick={moveOwnership} disabled={owner !== "var_a"} size="sm">
                        let b = a (Move)
                    </Button>
                    <Button onClick={drop} disabled={owner === "dropped"} variant="destructive" size="sm">
                        Drop (Out of Scope)
                    </Button>
                    <Button onClick={reset} variant="outline" size="sm">
                        Reset
                    </Button>
                </div>
            </div>

            <div className="flex items-center justify-around h-[200px] relative">

                {/* Variable A Scope */}
                <div className="flex flex-col items-center gap-2">
                    <div className="font-mono text-muted-foreground">let a</div>
                    <div className="w-32 h-32 border-2 border-dashed rounded-xl flex items-center justify-center relative">
                        <AnimatePresence>
                            {owner === "var_a" && (
                                <motion.div
                                    layoutId="resource"
                                    className="w-20 h-20 bg-primary rounded-lg shadow-xl flex items-center justify-center text-primary-foreground font-bold"
                                >
                                    Value
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {owner !== "var_a" && (
                            <div className="absolute inset-0 flex items-center justify-center bg-muted/50 rounded-xl">
                                <Lock className="text-muted-foreground h-8 w-8" />
                                <span className="sr-only">Invalidated</span>
                            </div>
                        )}
                    </div>
                </div>

                <ArrowRight className="text-muted-foreground w-8 h-8" />

                {/* Variable B Scope */}
                <div className="flex flex-col items-center gap-2">
                    <div className="font-mono text-muted-foreground">let b</div>
                    <div className="w-32 h-32 border-2 border-dashed rounded-xl flex items-center justify-center">
                        <AnimatePresence>
                            {owner === "var_b" && (
                                <motion.div
                                    layoutId="resource"
                                    className="w-20 h-20 bg-primary rounded-lg shadow-xl flex items-center justify-center text-primary-foreground font-bold"
                                >
                                    Value
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

            </div>

            {owner === "dropped" && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-destructive/10 text-destructive p-4 rounded-md text-center"
                >
                    <strong>Dropped!</strong> The value has been cleaned up from memory.
                </motion.div>
            )}
        </div>
    )
}

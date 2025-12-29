import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

export default function BooleanVis() {
    const [a, setA] = useState(true)
    const [b, setB] = useState(false)

    return (
        <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-4">
                <button 
                    onClick={() => setA(!a)}
                    className={`p-6 rounded-2xl border-2 transition-all flex items-center justify-between ${a ? 'border-primary bg-primary/5' : 'bg-card'}`}
                >
                    <span className="font-bold">Condition A</span>
                    <div className={`h-8 w-16 rounded-full relative transition-colors ${a ? 'bg-primary' : 'bg-muted'}`}>
                        <motion.div 
                            animate={{ x: a ? 32 : 4 }}
                            className="absolute top-1 h-6 w-6 rounded-full bg-white shadow-sm"
                        />
                    </div>
                </button>
                <button 
                    onClick={() => setB(!b)}
                    className={`p-6 rounded-2xl border-2 transition-all flex items-center justify-between ${b ? 'border-primary bg-primary/5' : 'bg-card'}`}
                >
                    <span className="font-bold">Condition B</span>
                    <div className={`h-8 w-16 rounded-full relative transition-colors ${b ? 'bg-primary' : 'bg-muted'}`}>
                        <motion.div 
                            animate={{ x: b ? 32 : 4 }}
                            className="absolute top-1 h-6 w-6 rounded-full bg-white shadow-sm"
                        />
                    </div>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-4 text-center space-y-2">
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">A && B (AND)</div>
                    <div className={`text-2xl font-bold ${(a && b) ? 'text-green-500' : 'text-red-500'}`}>{(a && b).toString()}</div>
                </Card>
                <Card className="p-4 text-center space-y-2">
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">A || B (OR)</div>
                    <div className={`text-2xl font-bold ${(a || b) ? 'text-green-500' : 'text-red-500'}`}>{(a || b).toString()}</div>
                </Card>
                <Card className="p-4 text-center space-y-2">
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">!A (NOT A)</div>
                    <div className={`text-2xl font-bold ${(!a) ? 'text-green-500' : 'text-red-500'}`}>{(!a).toString()}</div>
                </Card>
            </div>
        </div>
    )
}
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Binary } from "lucide-react"

export default function FloatVis() {
    const [precision, setPrecision] = useState(10)
    const pi = 3.141592653589793

    return (
        <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-6 space-y-4">
                    <h4 className="font-bold text-sm uppercase text-muted-foreground">Precision Slider</h4>
                    <input 
                        type="range" 
                        min="1" 
                        max="15" 
                        value={precision} 
                        onChange={(e) => setPrecision(parseInt(e.target.value))}
                        className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-xs font-mono">
                        <span>Low (1)</span>
                        <span>High (15)</span>
                    </div>
                </Card>

                <Card className="p-6 bg-slate-950 text-slate-300 font-mono text-sm space-y-4">
                    <div className="space-y-1">
                        <div className="text-blue-400">let pi_f32: f32 = ...;</div>
                        <div className="text-green-400 font-bold">{pi.toFixed(Math.min(precision, 7))}</div>
                    </div>
                    <div className="space-y-1 pt-4 border-t border-slate-800">
                        <div className="text-purple-400">let pi_f64: f64 = ...;</div>
                        <div className="text-green-400 font-bold">{pi.toFixed(precision)}</div>
                    </div>
                </Card>
            </div>

            <div className="p-4 bg-primary/5 border rounded-xl flex items-center gap-4">
                <Binary className="text-primary h-8 w-8" />
                <p className="text-sm">
                    <strong>Note:</strong> f32 vs f64 is about the trade-off between memory and decimal accuracy.
                </p>
            </div>
        </div>
    )
}
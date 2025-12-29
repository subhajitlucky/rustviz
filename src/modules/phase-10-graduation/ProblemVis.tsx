import { Card } from "@/components/ui/card"
import { Check, ArrowLeftRight } from "lucide-react"

export function ProblemVis() {
    // Scenarios for Two Sum [2, 7, 11, 15], target = 9
    // 1. Naive loop (borrowing conflict?)
    // 2. HashMap (Ownership move?)
    // Simple visual: We have vector. We iterate.

    return (
        <div className="space-y-6">
            <div className="flex gap-4 p-4 border rounded-xl bg-card justify-between items-center">
                <div>
                    <h3 className="font-bold">Two Sum</h3>
                    <p className="text-sm text-muted-foreground">Target: 9</p>
                </div>
                <div className="flex gap-2 font-mono text-lg">
                    <span className="bg-muted px-2 py-1 rounded">2</span>
                    <span className="bg-muted px-2 py-1 rounded">7</span>
                    <span className="bg-muted px-2 py-1 rounded">11</span>
                    <span className="bg-muted px-2 py-1 rounded">15</span>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-4 bg-muted/30">
                    <h4 className="font-bold mb-4">Naive Approach (Double Loop)</h4>
                    <div className="font-mono text-sm space-y-2">
                        <div>for (i, x) in nums.iter().enumerate() {'{'}</div>
                        <div className="pl-4">for (j, y) in nums.iter().enumerate() {'{'}</div>
                        <div className="pl-8 text-muted-foreground">// Valid? Yes.</div>
                        <div className="pl-8 text-muted-foreground">// Immutable borrows (iter) can exist simultaneously.</div>
                        <div className="pl-4">{'}'}</div>
                        <div>{'}'}</div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-green-500 font-bold">
                        <Check /> Rust Safe (O(n^2))
                    </div>
                </Card>

                <Card className="p-4 bg-muted/30">
                    <h4 className="font-bold mb-4">HashMap Approach (Optimization)</h4>
                    <div className="font-mono text-sm space-y-2">
                        <div>let mut map = HashMap::new();</div>
                        <div>for (i, x) in nums.iter().enumerate() {'{'}</div>
                        <div className="pl-4 text-orange-500">// Check map...</div>
                        <div className="pl-4">map.insert(x, i);</div>
                        <div className="pl-4 font-bold text-destructive animate-pulse">// ERROR if map owns reference? No.</div>
                        <div className="pl-4 text-muted-foreground">// We copy 'x' (i32) into map. Safe.</div>
                        <div>{'}'}</div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-green-500 font-bold">
                        <ArrowLeftRight /> Rust Safe (O(n))
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                        Works easily because `i32` is Copy. If `nums` contained `String`, we would need to clone or store references (with lifetimes).
                    </p>
                </Card>
            </div>
        </div>
    )
}

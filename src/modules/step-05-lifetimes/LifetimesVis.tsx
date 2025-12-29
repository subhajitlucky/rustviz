import { useState } from "react"
import { Button } from "@/components/ui/button"

export function LifetimesVis() {
    const [scenario, setScenario] = useState<'valid' | 'dangling'>('valid')

    return (
        <div className="space-y-6">
            <div className="flex gap-4">
                <Button onClick={() => setScenario('valid')} variant={scenario === 'valid' ? 'default' : 'outline'}>Valid Scenario</Button>
                <Button onClick={() => setScenario('dangling')} variant={scenario === 'dangling' ? 'destructive' : 'outline'}>Dangling Reference</Button>
            </div>

            <div className="relative border rounded-xl overflow-hidden bg-background p-8 font-mono text-sm min-h-[300px]">

                {/* Main Scope */}
                <div className="border-l-2 border-slate-500 pl-4 py-4 relative h-full">
                    <span className="text-slate-500 absolute -top-3 left-0 bg-background px-2">{'fn main() {'}</span>

                    {scenario === 'valid' ? (
                        <>
                            <div className="mb-4 text-primary">let x = 5; <span className="text-muted-foreground">// 'x creates data (Owner)</span></div>

                            {/* Inner Scope */}
                            <div className="border-l-2 border-blue-500 pl-4 py-4 my-4 relative bg-blue-500/5 rounded-r-lg">
                                <span className="text-blue-500 absolute -top-3 left-0 bg-background px-2">{'{'}</span>
                                <div className="mb-2 text-blue-400">let r = &x; <span className="text-muted-foreground">// Valid: 'x lives longer than 'r</span></div>
                                <div className="text-blue-400">println!("{ }", r);</div>
                                <span className="text-blue-500 absolute -bottom-3 left-0 bg-background px-2">{'}'}</span>
                            </div>

                            <div className="mt-4 text-muted-foreground">println!("{ }", x);</div>
                        </>
                    ) : (
                        <>
                            <div className="mb-4 text-primary">let r;</div>

                            {/* Inner Scope */}
                            <div className="border-l-2 border-red-500 pl-4 py-4 my-4 relative bg-red-500/5 rounded-r-lg">
                                <span className="text-red-500 absolute -top-3 left-0 bg-background px-2">{'{'}</span>
                                <div className="mb-2 text-red-500">let x = 5;</div>
                                <div className="mb-2 text-red-500">r = &x; <span className="font-bold text-red-600 animate-pulse">// ERROR: 'x will die here!</span></div>
                                <span className="text-red-500 absolute -bottom-3 left-0 bg-background px-2">{'}'}</span>
                            </div>

                            <div className="mt-4 text-red-400 opacity-50">println!("{ }", r); <span className="text-red-500">// 'r is now hanging (dangling)</span></div>
                        </>
                    )}

                    <span className="text-slate-500 absolute -bottom-3 left-0 bg-background px-2">{'}'}</span>
                </div>
            </div>
        </div>
    )
}

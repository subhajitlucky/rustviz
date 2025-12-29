import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronRight, RotateCcw, Play } from "lucide-react"

export interface Step {
    title: string
    description: string
    code: string
    highlightedLines?: number[] // 1-based index
    visualComponent: React.ReactNode
    output?: string
}

interface CodeWalkthroughProps {
    steps: Step[]
    title?: string
}

export function CodeWalkthrough({ steps, title }: CodeWalkthroughProps) {
    const [currentStep, setCurrentStep] = useState(0)
    const step = steps[currentStep]

    const next = () => setCurrentStep(Math.min(currentStep + 1, steps.length - 1))
    const reset = () => setCurrentStep(0)

    return (
        <div className="grid lg:grid-cols-2 gap-6 h-full">
            {/* Left Column: Code & Controls */}
            <div className="space-y-6 flex flex-col">
                <div className="space-y-2">
                    {title && <h2 className="text-2xl font-bold tracking-tight">{title}</h2>}
                    <h3 className="text-lg font-semibold text-primary">{step.title}</h3>
                    <p className="text-muted-foreground min-h-[3rem]">{step.description}</p>
                </div>

                <Card className="flex-1 bg-slate-950 text-slate-50 p-0 overflow-hidden border-none shadow-xl relative flex flex-col min-h-[300px]">
                    <div className="absolute top-3 right-4 z-10">
                        <span className="text-xs text-slate-500 font-mono">main.rs</span>
                    </div>
                    <div className="overflow-auto p-4 font-mono text-sm leading-6 flex-1">
                        {step.code.split('\n').map((line, i) => {
                            const isHighlighted = step.highlightedLines?.includes(i + 1)
                            return (
                                <div 
                                    key={i} 
                                    className={`px-2 rounded ${isHighlighted ? 'bg-slate-800 border-l-2 border-primary' : 'opacity-60'}`}
                                >
                                    <span className="text-slate-600 select-none mr-4 w-4 inline-block text-right">{i + 1}</span>
                                    <span>{line}</span>
                                </div>
                            )
                        })}
                    </div>
                    {step.output && (
                        <div className="border-t border-slate-800 p-3 bg-slate-900 font-mono text-xs">
                            <div className="text-slate-500 mb-1 uppercase tracking-wider text-[10px]">Terminal Output</div>
                            <div className="text-green-400">$ {step.output}</div>
                        </div>
                    )}
                </Card>

                <div className="flex gap-4">
                    {currentStep < steps.length - 1 ? (
                        <Button onClick={next} className="w-full gap-2" size="lg">
                            Next Step <ChevronRight className="h-4 w-4" />
                        </Button>
                    ) : (
                        <Button onClick={reset} variant="outline" className="w-full gap-2" size="lg">
                            <RotateCcw className="h-4 w-4" /> Reset Simulation
                        </Button>
                    )}
                </div>
            </div>

            {/* Right Column: Visualization */}
            <div className="bg-muted/30 rounded-xl border p-6 flex flex-col">
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Play className="h-3 w-3" /> Live Memory View
                </div>
                <div className="flex-1 relative">
                    {/* We use key to force re-render of animations if needed, or keep it stable */}
                    <div className="h-full">
                        {step.visualComponent}
                    </div>
                </div>
            </div>
        </div>
    )
}

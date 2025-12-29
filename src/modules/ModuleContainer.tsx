import { useAppStore } from '@/store/useAppStore'
import { learningPath } from '@/lib/learning-path'

interface ModuleContainerProps {
    title: string
    description: string
    currentStep?: number
    totalSteps?: number
    children: React.ReactNode
}

const allTopics = learningPath.flatMap(p => p.topics)

export function ModuleContainer({
    title,
    description,
    currentStep: propStep,
    totalSteps: propTotal,
    children,
}: ModuleContainerProps) {
    const { currentStep: storeStep } = useAppStore()
    
    const displayStep = propStep ?? storeStep
    const displayTotal = propTotal ?? allTopics.length

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2 border-b pb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                        <p className="text-muted-foreground mt-2 max-w-2xl">{description}</p>
                    </div>
                    <div className="text-right hidden sm:block">
                        <span className="text-muted-foreground text-sm">Step {displayStep} of {displayTotal}</span>
                        <div className="h-2 w-24 bg-secondary mt-2 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all duration-500"
                                style={{ width: `${(displayStep / displayTotal) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="min-h-[400px]">
                {children}
            </div>
        </div>
    )
}

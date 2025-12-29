import { motion } from "framer-motion"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { useAppStore } from "@/store/useAppStore"
import { cn } from "@/lib/utils"
import { learningPath } from "@/lib/learning-path"
import { useNavigate } from "react-router-dom"

const allTopics = learningPath.flatMap(p => p.topics)

export function Roadmap() {
    const { currentStep } = useAppStore()
    const navigate = useNavigate()

    return (
        <div className="py-8 md:py-12 px-4 max-w-4xl mx-auto space-y-12 md:space-y-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center tracking-tight">Learning Path</h2>
            
            {learningPath.map((phase) => (
                <div key={phase.id} className="relative">
                     <div className="flex items-center gap-4 mb-6">
                        <div className={cn("h-8 w-1 rounded-full", phase.color)} />
                        <h3 className="text-2xl font-bold">{phase.title}</h3>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {phase.topics.map((topic) => {
                            const globalIndex = allTopics.findIndex(t => t.id === topic.id) + 1
                            const isActive = currentStep === globalIndex
                            const isCompleted = currentStep > globalIndex

                            return (
                                <motion.div
                                    key={topic.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    className={cn(
                                        "p-5 rounded-xl border transition-all duration-200 cursor-pointer relative overflow-hidden",
                                        isActive 
                                            ? "border-primary bg-primary/5 shadow-md shadow-primary/10 ring-1 ring-primary/20" 
                                            : "hover:border-primary/50 bg-card"
                                    )}
                                    onClick={() => navigate(`/learn/${phase.id}/${topic.id}`)}
                                >
                                    {isActive && <div className={cn("absolute top-0 left-0 w-1 h-full", phase.color)} />}
                                    
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-mono text-muted-foreground">
                                            {String(globalIndex).padStart(2, '0')}
                                        </span>
                                        {isCompleted && (
                                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                                        )}
                                    </div>
                                    
                                    <h4 className="font-bold mb-1 leading-tight">{topic.title}</h4>
                                    <p className="text-xs text-muted-foreground line-clamp-2">{topic.description}</p>
                                    
                                    {isActive && (
                                        <div className="mt-3 flex items-center text-xs font-bold text-primary animate-pulse">
                                            Current Lesson <ArrowRight className="h-3 w-3 ml-1" />
                                        </div>
                                    )}
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    )
}

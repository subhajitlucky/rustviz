import { Topic } from "@/lib/learning-path"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Terminal, BookOpen, Code2, Zap, Lightbulb } from "lucide-react"
import { motion } from "framer-motion"

interface TopicContentProps {
    topic: Topic
    visualizer?: React.ReactNode
}

export function TopicContent({ topic, visualizer }: TopicContentProps) {
    // Enhanced default content if details are missing
    const definition = topic.details?.definition || `${topic.title} is a key concept in Rust. It focuses on ensuring memory safety and performance through strict compiler rules.`
    const syntax = topic.details?.syntax || `// Standard syntax for ${topic.title}\nfn main() {\n    println!("Exploring ${topic.title}");\n}`
    const practical = topic.details?.practical || `// Real-world application\nfn process() {\n    // Implementation of ${topic.title.toLowerCase()} in a system\n}`
    const explanation = topic.details?.explanation || `By using ${topic.title.toLowerCase()}, developers can write low-level code that is as safe as high-level languages.`

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {/* Header Section */}
            <div className="space-y-4 text-center max-w-3xl mx-auto">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-block p-2 bg-primary/10 rounded-full text-primary mb-2"
                >
                    <BookOpen size={24} />
                </motion.div>
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                    {topic.title}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    {topic.description}
                </p>
            </div>

            {/* Core Content Grid */}
            <div className="grid gap-8 lg:grid-cols-2">
                {/* Definition & Concept */}
                <Card className="border-2 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="bg-muted/30">
                        <CardTitle className="flex items-center gap-2">
                            <Lightbulb className="text-yellow-500" /> The Definition
                        </CardTitle>
                        <CardDescription>Conceptual understanding</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <p className="leading-relaxed text-lg">
                            {definition}
                        </p>
                        <div className="p-4 rounded-xl bg-primary/5 border-l-4 border-primary">
                            <p className="text-sm italic text-primary font-medium">
                                "In Rust, {topic.title.toLowerCase()} eliminates common bugs found in C++ by enforcing safety at compile-time."
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Syntax Example */}
                <Card className="border-2 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="bg-muted/30">
                        <CardTitle className="flex items-center gap-2">
                            <Code2 className="text-blue-500" /> Syntax Guide
                        </CardTitle>
                        <CardDescription>How to write it</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="bg-slate-950 text-slate-50 p-6 rounded-xl font-mono text-sm overflow-x-auto shadow-inner border border-white/10">
                            <pre className="whitespace-pre-wrap">{syntax}</pre>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Practical & Explanation Section */}
            <Card className="border-2 shadow-sm overflow-hidden">
                <div className="grid lg:grid-cols-2">
                    <div className="p-8 space-y-4">
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                            <Zap className="text-orange-500" /> Practical Application
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {explanation}
                        </p>
                        <div className="bg-muted p-4 rounded-lg border-dashed border-2">
                            <h4 className="font-bold text-sm mb-2 uppercase tracking-wider text-muted-foreground">Key Takeaway</h4>
                            <p className="text-sm">Understanding the interaction between memory and syntax is the first step to mastering Rust.</p>
                        </div>
                    </div>
                    <div className="bg-slate-950 p-8 flex flex-col justify-center">
                         <div className="text-[10px] text-slate-500 mb-2 uppercase font-bold tracking-tighter">real_world_example.rs</div>
                         <div className="bg-slate-900 p-4 rounded border border-slate-800 font-mono text-sm text-green-400">
                             <pre className="whitespace-pre-wrap">{practical}</pre>
                         </div>
                    </div>
                </div>
            </Card>

            {/* Interactive Section */}
            <div className="pt-12 border-t border-border/50">
                {visualizer ? (
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
                            <h3 className="text-2xl font-bold tracking-tight">Interactive Discovery</h3>
                        </div>
                        {visualizer}
                    </div>
                ) : (
                    <div className="relative group overflow-hidden rounded-3xl border-4 border-dashed border-primary/20 bg-card p-12 text-center transition-all hover:border-primary/40">
                        <motion.div 
                            whileHover={{ rotate: 5, scale: 1.1 }}
                            className="inline-block p-4 bg-primary/10 rounded-2xl text-primary mb-6"
                        >
                            <Terminal size={40} />
                        </motion.div>
                        <h3 className="text-3xl font-bold mb-4">Discovery Engine</h3>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-8">
                            We are initializing the specialized visualization for <strong>{topic.title}</strong>. 
                            Experiment with the mental model by running the code in the official playground.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button 
                                size="lg" 
                                className="rounded-full px-10 h-14 text-lg shadow-xl shadow-primary/20"
                                onClick={() => window.open(`https://play.rust-lang.org/?code=${encodeURIComponent(syntax)}`, '_blank')}
                            >
                                <Terminal className="mr-2" /> Open Playground
                            </Button>
                        </div>
                        
                        {/* Decorative elements */}
                        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 -translate-x-16 -translate-y-16 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/5 translate-x-16 translate-y-16 rounded-full blur-3xl" />
                    </div>
                )}
            </div>
        </div>
    )
}

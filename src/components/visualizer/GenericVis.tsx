import { Topic } from "@/lib/learning-path"
import { motion } from "framer-motion"
import { Box, Layers, Cpu, Database, Network } from "lucide-react"

interface GenericVisProps {
    topic: Topic
}

export function GenericVis({ topic }: GenericVisProps) {
    // Determine icon based on topic title keywords
    const getIcon = () => {
        const title = topic.title.toLowerCase()
        if (title.includes("memory") || title.includes("heap") || title.includes("stack")) return <Database className="w-12 h-12 text-emerald-400" />
        if (title.includes("thread") || title.includes("async") || title.includes("sync")) return <Network className="w-12 h-12 text-blue-400" />
        if (title.includes("struct") || title.includes("enum") || title.includes("trait")) return <Box className="w-12 h-12 text-purple-400" />
        if (title.includes("compiler") || title.includes("macro")) return <Cpu className="w-12 h-12 text-orange-400" />
        return <Layers className="w-12 h-12 text-primary" />
    }

    return (
        <div className="w-full h-[400px] bg-slate-900 rounded-lg overflow-hidden relative flex items-center justify-center border border-slate-800">
            {/* Background Grid Animation */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-8 max-w-2xl px-4">
                {/* Floating Icon */}
                <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="p-6 bg-slate-800/50 rounded-full border border-slate-700 shadow-2xl backdrop-blur-sm"
                >
                    {getIcon()}
                </motion.div>

                {/* Animated Code/Concept Block */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-full bg-slate-950 rounded-lg border border-slate-800 p-6 shadow-xl"
                >
                    <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                        </div>
                        <span className="text-xs text-slate-500 font-mono ml-2">concept_visualizer.rs</span>
                    </div>
                    
                    <div className="space-y-2 font-mono text-sm">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-purple-400"
                        >
                            // Visualizing: {topic.title}
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 }}
                            className="text-slate-300"
                        >
                            <span className="text-blue-400">fn</span> <span className="text-yellow-400">visualize</span>() {'{'}
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.1 }}
                            className="pl-4 text-slate-400"
                        >
                            {/* Truncate description to fit */}
                            {topic.description.slice(0, 60)}...
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.4 }}
                            className="text-slate-300"
                        >
                            {'}'}
                        </motion.div>
                    </div>
                </motion.div>

                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                    className="text-center text-muted-foreground text-sm"
                >
                    Interactive visualization coming soon for this advanced topic.
                </motion.p>
            </div>
        </div>
    )
}

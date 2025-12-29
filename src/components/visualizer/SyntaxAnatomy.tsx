import { motion } from "framer-motion"
import { HelpCircle } from "lucide-react"

export interface Token {
    label: string
    text: string
    description?: string
    color: "keyword" | "identifier" | "type" | "operator" | "value" | "punctuation" | "logic"
}

interface SyntaxAnatomyProps {
    tokens: Token[]
    summary?: string
}

const COLOR_MAP = {
    keyword: "bg-pink-500/20 text-pink-600 dark:text-pink-400 border-pink-500/50",
    logic: "bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/50",
    identifier: "bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/50",
    type: "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/50",
    operator: "bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-500/50",
    value: "bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/50",
    punctuation: "bg-slate-500/20 text-slate-600 dark:text-slate-400 border-slate-500/50"
}

export function SyntaxAnatomy({ tokens, summary }: SyntaxAnatomyProps) {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full p-4 overflow-x-auto">
            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest mb-10">
                <HelpCircle className="h-4 w-4 text-primary" />
                Understanding the Logic
            </div>
            
            <div className="flex flex-wrap gap-x-2 gap-y-12 justify-center items-start">
                {tokens.map((token, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex flex-col items-center gap-3 group relative"
                    >
                        {/* The "Human" Label (Top) */}
                        <div className="absolute -top-8 whitespace-nowrap">
                            <motion.span 
                                initial={{ y: 5, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-[10px] uppercase font-black tracking-tighter text-primary/80 bg-primary/5 px-2 py-0.5 rounded border border-primary/10"
                            >
                                {token.label}
                            </motion.span>
                        </div>

                        {/* Token Box */}
                        <div className={`
                            px-4 py-3 rounded-xl border-2 font-mono text-xl font-bold shadow-md
                            ${COLOR_MAP[token.color]}
                            min-w-[44px] text-center group-hover:scale-110 transition-transform cursor-help
                        `}>
                            {token.text}
                        </div>

                        {/* Connection Line */}
                        <div className="h-4 w-0.5 bg-border group-hover:bg-primary transition-colors" />

                        {/* Detailed Explanation (Bottom) */}
                        <div className="w-32 text-center">
                            <p className="text-[10px] leading-tight text-muted-foreground font-medium opacity-80 group-hover:opacity-100 group-hover:text-foreground transition-all">
                                {token.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {summary && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-16 p-6 bg-card border-2 border-dashed border-primary/20 rounded-2xl max-w-xl text-center"
                >
                    <div className="text-[10px] uppercase font-bold text-primary mb-2 tracking-widest">Plain English Translation</div>
                    <p className="text-lg font-medium italic text-card-foreground">
                        "{summary}"
                    </p>
                </motion.div>
            )}
        </div>
    )
}

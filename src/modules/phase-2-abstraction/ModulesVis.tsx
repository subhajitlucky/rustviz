import { CodeWalkthrough, Step } from "@/components/visualizer/CodeWalkthrough"
import { motion } from "framer-motion"
import { Lock, Unlock, Folder, FileCode } from "lucide-react"

export default function ModulesVis() {
    const steps: Step[] = [
        {
            title: "Private by Default",
            description: "Everything in Rust is private by default. Items in `module_a` cannot see items in `module_b` unless explicitly allowed.",
            code: `mod internal {
    fn secret() {} 
}

fn main() {
    // internal::secret(); // Error!
}`,
            highlightedLines: [2, 6],
            visualComponent: (
                <div className="flex flex-col items-center justify-center gap-8 h-full">
                    <div className="p-6 bg-slate-900 border-2 border-slate-800 rounded-2xl relative">
                        <div className="absolute -top-3 left-4 bg-background px-2 flex items-center gap-1 text-[10px] font-bold text-muted-foreground uppercase">
                            <Folder className="h-3 w-3" /> crate root
                        </div>
                        
                        <div className="p-6 bg-red-500/10 border-2 border-red-500/30 rounded-xl relative">
                            <div className="absolute -top-3 left-4 bg-background px-2 flex items-center gap-1 text-[10px] font-bold text-red-500 uppercase">
                                <FileCode className="h-3 w-3" /> mod internal
                            </div>
                            <div className="flex items-center gap-3">
                                <Lock className="h-5 w-5 text-red-500" />
                                <span className="font-mono text-sm text-red-200">fn secret()</span>
                            </div>
                        </div>

                        <div className="mt-8 p-4 border border-slate-700 rounded-lg opacity-50">
                            <div className="font-mono text-xs">fn main() {"{ ... }"}</div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "The 'pub' Keyword",
            description: "Using `pub` marks an item as public, reaching outside its current module.",
            code: `mod internal {
    pub fn open() {} 
}

fn main() {
    internal::open(); // Works!
}`,
            highlightedLines: [2, 6],
            visualComponent: (
                <div className="flex flex-col items-center justify-center gap-8 h-full">
                    <div className="p-6 bg-slate-900 border-2 border-slate-800 rounded-2xl relative">
                        <div className="absolute -top-3 left-4 bg-background px-2 flex items-center gap-1 text-[10px] font-bold text-muted-foreground uppercase">
                            <Folder className="h-3 w-3" /> crate root
                        </div>
                        
                        <motion.div 
                            initial={{ borderColor: "rgba(239, 68, 68, 0.3)" }}
                            animate={{ borderColor: "rgba(34, 197, 94, 0.5)" }}
                            className="p-6 bg-green-500/10 border-2 rounded-xl relative"
                        >
                            <div className="absolute -top-3 left-4 bg-background px-2 flex items-center gap-1 text-[10px] font-bold text-green-500 uppercase">
                                <FileCode className="h-3 w-3" /> mod internal
                            </div>
                            <div className="flex items-center gap-3">
                                <Unlock className="h-5 w-5 text-green-500" />
                                <span className="font-mono text-sm text-green-200">pub fn open()</span>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0.5 }}
                            animate={{ opacity: 1 }}
                            className="mt-8 p-4 border border-green-500/30 rounded-lg bg-green-500/5"
                        >
                            <div className="font-mono text-xs text-green-400">internal::open(); <span className="text-muted-foreground ml-2">// Success!</span></div>
                        </motion.div>
                    </div>
                </div>
            )
        }
    ]

    return <CodeWalkthrough steps={steps} title="Modules & Visibility" />
}

import { CodeWalkthrough, Step } from "@/components/visualizer/CodeWalkthrough"
import { motion } from "framer-motion"
import { Wand2 } from "lucide-react"

export default function DeriveVis() {
    const steps: Step[] = [
        {
            title: "The Problem",
            description: "By default, structs don't know how to print themselves or compare themselves. You'd have to write `impl Debug` and `impl PartialEq` manually.",
            code: `struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let p = Point { x: 1, y: 2 };
    // Error: Point doesn't implement Debug
    println!("{:?}", p); 
}`,
            highlightedLines: [8],
            visualComponent: (
                <div className="flex flex-col items-center justify-center h-full">
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded text-red-400 font-mono text-sm">
                        Error: `Point` cannot be formatted using `{"{:?}"}`
                    </div>
                </div>
            )
        },
        {
            title: "The Solution: Derive",
            description: "The `#[derive(...)]` attribute asks the compiler to generate default implementations for standard traits automatically.",
            code: `#[derive(Debug, Clone, PartialEq)]
struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let p = Point { x: 1, y: 2 };
    println!("{:?}", p); // Works!
}`,
            highlightedLines: [1],
            visualComponent: (
                <div className="flex flex-col items-center justify-center gap-6 h-full">
                    <motion.div 
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                        className="text-yellow-400"
                    >
                        <Wand2 className="h-12 w-12" />
                    </motion.div>
                    
                    <div className="grid grid-cols-1 gap-2 w-full max-w-xs">
                        <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="p-2 bg-blue-500/10 border border-blue-500/30 rounded text-center text-xs font-mono"
                        >
                            impl Debug for Point {"{ ... }"}
                        </motion.div>
                        <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="p-2 bg-green-500/10 border border-green-500/30 rounded text-center text-xs font-mono"
                        >
                            impl Clone for Point {"{ ... }"}
                        </motion.div>
                        <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="p-2 bg-purple-500/10 border border-purple-500/30 rounded text-center text-xs font-mono"
                        >
                            impl PartialEq for Point {"{ ... }"}
                        </motion.div>
                    </div>
                    <div className="text-xs text-muted-foreground uppercase tracking-widest">Code Generated Automatically</div>
                </div>
            )
        }
    ]

    return <CodeWalkthrough steps={steps} title="Derive Macros" />
}

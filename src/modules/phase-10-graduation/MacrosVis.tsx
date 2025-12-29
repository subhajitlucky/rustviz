import { CodeWalkthrough, Step } from "@/components/visualizer/CodeWalkthrough"
import { motion } from "framer-motion"

export function MacrosVis() {
    const steps: Step[] = [
        {
            title: "Declarative Macros",
            description: "macro_rules! uses pattern matching to transform code.",
            code: `macro_rules! say_hello {
    () => {
        println!("Hello!");
    };
}

fn main() {
    say_hello!();
}`,
            highlightedLines: [1, 2, 3, 7],
            visualComponent: (
                <div className="flex flex-col items-center justify-center gap-8 h-full">
                    <div className="flex gap-8 items-center">
                        <div className="flex flex-col items-center gap-2">
                            <div className="text-xs font-bold text-muted-foreground">Source Code</div>
                            <div className="px-3 py-1 bg-slate-800 rounded text-xs font-mono">say_hello!()</div>
                        </div>

                        <div className="flex flex-col items-center gap-1">
                            <div className="text-xs text-purple-400 font-bold">Expansion</div>
                            <motion.div 
                                animate={{ width: [0, 50, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="h-1 bg-purple-500"
                            />
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <div className="text-xs font-bold text-muted-foreground">Compiled Code</div>
                            <div className="px-3 py-1 bg-slate-800 rounded text-xs font-mono">println!("Hello!")</div>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground text-center max-w-[300px]">
                        Macros expand BEFORE the compiler checks types. It's code writing code.
                    </p>
                </div>
            )
        },
        {
            title: "Derive Macros",
            description: "Procedural macros that generate code for a struct or enum.",
            code: `#[derive(Debug, Clone)]
struct User {
    name: String,
    age: u32,
}

// The compiler automatically generates:
// impl Debug for User { ... }
// impl Clone for User { ... }`,
            highlightedLines: [1],
            visualComponent: (
                <div className="flex flex-col items-center justify-center gap-8 h-full">
                    <div className="relative p-6 border border-slate-700 rounded-lg bg-slate-800/50">
                        <div className="text-sm font-mono mb-4">struct User</div>
                        
                        <div className="absolute -top-3 -right-3 flex gap-2">
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5 }}
                                className="px-2 py-1 bg-blue-500 rounded text-[10px] font-bold text-white shadow-lg"
                            >
                                + impl Debug
                            </motion.div>
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1 }}
                                className="px-2 py-1 bg-green-500 rounded text-[10px] font-bold text-white shadow-lg"
                            >
                                + impl Clone
                            </motion.div>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground text-center max-w-[300px]">
                        The #[derive] attribute asks the compiler to generate trait implementations for you.
                    </p>
                </div>
            )
        }
    ]

    return <CodeWalkthrough steps={steps} title="Macros" />
}

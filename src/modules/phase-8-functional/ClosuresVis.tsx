import { CodeWalkthrough, Step } from "@/components/visualizer/CodeWalkthrough"
import { motion } from "framer-motion"

export default function ClosuresVis() {
    const steps: Step[] = [
        {
            title: "Environment Capture",
            description: "Closures can 'capture' variables from their surrounding scope. By default, they capture by reference.",
            code: `let x = 10;
let add_x = |y| y + x; // Captures x

println!("{}", add_x(5)); // Returns 15`,
            highlightedLines: [2],
            visualComponent: (
                <div className="flex flex-col items-center justify-center gap-6 h-full">
                    <div className="relative p-6 border-2 border-dashed border-muted-foreground/30 rounded-3xl">
                        <div className="absolute -top-3 left-6 bg-background px-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Outer Scope</div>
                        <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg font-mono text-sm mb-8">
                            let x = 10;
                        </div>
                        
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="p-6 bg-purple-500/10 border-2 border-purple-500 rounded-2xl relative shadow-lg shadow-purple-500/10"
                        >
                            <div className="absolute -top-3 left-4 bg-background px-2 text-[10px] font-bold uppercase tracking-widest text-purple-500">Closure</div>
                            <div className="font-mono text-sm text-purple-400">|y| y + <span className="underline decoration-2 underline-offset-4">x</span></div>
                            
                            {/* Connection line */}
                            <svg className="absolute top-0 right-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
                                <motion.path 
                                    d="M 50 -10 Q 50 -30 70 -30"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="text-purple-500 opacity-50"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                />
                            </svg>
                        </motion.div>
                    </div>
                </div>
            )
        },
        {
            title: "The 'move' Keyword",
            description: "If you want the closure to take ownership of its environment (e.g., to send it to another thread), use `move`.",
            code: `let s = String::from("hi");
let c = move || println!("{}", s);

// s is no longer valid here!`,
            highlightedLines: [2],
            visualComponent: (
                <div className="flex flex-col items-center justify-center gap-8 h-full">
                    <div className="flex gap-12 items-center">
                        <div className="flex flex-col items-center gap-2">
                            <div className="text-[10px] font-bold text-muted-foreground uppercase">Main Scope</div>
                            <motion.div 
                                animate={{ x: 50, opacity: 0, scale: 0.5 }}
                                transition={{ delay: 1, duration: 0.5 }}
                                className="p-3 bg-blue-500/20 border border-blue-500 rounded font-mono text-xs"
                            >
                                s: String
                            </motion.div>
                        </div>

                        <div className="text-2xl text-muted-foreground">→</div>

                        <div className="flex flex-col items-center gap-2">
                             <div className="text-[10px] font-bold text-purple-500 uppercase">Closure (move)</div>
                             <motion.div 
                                initial={{ x: -50, opacity: 0, scale: 0.5 }}
                                animate={{ x: 0, opacity: 1, scale: 1 }}
                                transition={{ delay: 1, duration: 0.5 }}
                                className="p-4 bg-purple-500/20 border-2 border-purple-500 rounded-lg font-mono text-sm text-purple-400"
                            >
                                contains: s
                            </motion.div>
                        </div>
                    </div>
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="text-xs text-red-500 font-bold bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20"
                    >
                        OWNERSHIP TRANSFERRED
                    </motion.div>
                </div>
            )
        },
        {
            title: "The Fn Traits",
            description: "Closures implement traits based on how they capture variables: Fn (borrow), FnMut (mutable borrow), or FnOnce (move).",
            code: `fn call_fn<F: Fn()>(f: F) { f() }
fn call_mut<F: FnMut()>(mut f: F) { f() }
fn call_once<F: FnOnce()>(f: F) { f() }`,
            highlightedLines: [1, 2, 3],
            visualComponent: (
                <div className="grid grid-cols-3 gap-4 h-full items-center">
                    <div className="p-4 border rounded-lg bg-blue-500/10 border-blue-500/30 flex flex-col items-center gap-2">
                        <div className="font-bold text-blue-400">Fn</div>
                        <div className="text-xs text-center text-muted-foreground">Captures by &T</div>
                        <div className="text-[10px] bg-blue-500/20 px-2 py-1 rounded">Callable many times</div>
                    </div>
                    <div className="p-4 border rounded-lg bg-yellow-500/10 border-yellow-500/30 flex flex-col items-center gap-2">
                        <div className="font-bold text-yellow-400">FnMut</div>
                        <div className="text-xs text-center text-muted-foreground">Captures by &mut T</div>
                        <div className="text-[10px] bg-yellow-500/20 px-2 py-1 rounded">Callable many times</div>
                    </div>
                    <div className="p-4 border rounded-lg bg-red-500/10 border-red-500/30 flex flex-col items-center gap-2">
                        <div className="font-bold text-red-400">FnOnce</div>
                        <div className="text-xs text-center text-muted-foreground">Captures by value</div>
                        <div className="text-[10px] bg-red-500/20 px-2 py-1 rounded">Callable ONCE</div>
                    </div>
                </div>
            )
        }
    ]

    return <CodeWalkthrough steps={steps} title="Closures & Capturing" />
}

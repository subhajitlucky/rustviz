import { CodeWalkthrough, Step } from "@/components/visualizer/CodeWalkthrough"
import { motion } from "framer-motion"

export function ThreadsVis() {
    const steps: Step[] = [
        {
            title: "Spawning a Thread",
            description: "Rust uses 1:1 threading. `thread::spawn` creates a new OS thread.",
            code: `use std::thread;
use std::time::Duration;

fn main() {
    thread::spawn(|| {
        for i in 1..10 {
            println!("hi number {} from the spawned thread!", i);
            thread::sleep(Duration::from_millis(1));
        }
    });

    for i in 1..5 {
        println!("hi number {} from the main thread!", i);
        thread::sleep(Duration::from_millis(1));
    }
}`,
            highlightedLines: [4, 5, 6, 7, 8, 9],
            visualComponent: (
                <div className="flex flex-col items-center justify-center gap-8 h-full">
                    <div className="flex gap-12 items-start h-[200px]">
                        {/* Main Thread */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="px-3 py-1 bg-blue-500/20 border border-blue-500 rounded text-blue-400 font-bold text-sm">Main Thread</div>
                            <div className="w-1 h-full bg-blue-500/20 relative">
                                <motion.div 
                                    animate={{ y: [0, 150] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                />
                            </div>
                        </div>

                        {/* Spawned Thread */}
                        <div className="flex flex-col items-center gap-2 mt-12">
                            <div className="px-3 py-1 bg-green-500/20 border border-green-500 rounded text-green-400 font-bold text-sm">Spawned Thread</div>
                            <div className="w-1 h-[150px] bg-green-500/20 relative">
                                <motion.div 
                                    animate={{ y: [0, 150] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                                />
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground text-center max-w-[300px]">
                        The main thread continues running while the spawned thread runs in parallel.
                    </p>
                </div>
            )
        },
        {
            title: "Move Closures",
            description: "To use data from the main thread in the spawned thread, the closure must take ownership.",
            code: `let v = vec![1, 2, 3];

let handle = thread::spawn(move || {
    println!("Here's a vector: {:?}", v);
});

handle.join().unwrap();`,
            highlightedLines: [3],
            visualComponent: (
                <div className="flex flex-col items-center justify-center gap-8 h-full">
                    <div className="flex gap-12 items-center">
                        <div className="p-4 border border-dashed border-slate-600 rounded-lg flex flex-col items-center gap-2 opacity-50">
                            <div className="text-xs text-muted-foreground">Main Thread Scope</div>
                            <div className="text-sm font-mono text-muted-foreground">v: Vec&lt;i32&gt;</div>
                        </div>
                        
                        <motion.div 
                            animate={{ x: [0, 20, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-xl text-yellow-500"
                        >
                            move ➜
                        </motion.div>

                        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex flex-col items-center gap-2">
                            <div className="text-xs text-green-400 font-bold">Thread Closure</div>
                            <div className="p-2 bg-slate-800 rounded border border-slate-700 font-mono text-white">
                                [1, 2, 3]
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground text-center max-w-[300px]">
                        The 'move' keyword forces the closure to take ownership of 'v', moving it into the new thread.
                    </p>
                </div>
            )
        }
    ]

    return <CodeWalkthrough steps={steps} title="Thread Spawning" />
}

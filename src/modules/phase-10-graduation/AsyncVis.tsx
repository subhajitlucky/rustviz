import { CodeWalkthrough, Step } from "@/components/visualizer/CodeWalkthrough"
import { motion } from "framer-motion"

export function AsyncVis() {
    const steps: Step[] = [
        {
            title: "The Future Trait",
            description: "A Future is a state machine. It does nothing until polled.",
            code: `trait Future {
    type Output;
    fn poll(self: Pin<&mut Self>, cx: &mut Context) -> Poll<Self::Output>;
}

enum Poll<T> {
    Ready(T),
    Pending,
}`,
            highlightedLines: [3, 7, 8],
            visualComponent: (
                <div className="flex flex-col items-center justify-center gap-8 h-full">
                    <div className="flex gap-8 items-center">
                        <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 flex flex-col items-center gap-2">
                            <div className="text-xs font-bold text-muted-foreground">Executor</div>
                            <motion.div 
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="px-3 py-1 bg-blue-500 rounded text-white text-xs font-bold"
                            >
                                poll()
                            </motion.div>
                        </div>

                        <div className="text-2xl text-muted-foreground">➜</div>

                        <div className="p-6 bg-purple-500/10 border border-purple-500/30 rounded-lg flex flex-col items-center gap-4 w-[200px]">
                            <div className="text-sm font-bold text-purple-400">Future State Machine</div>
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" />
                                <div className="text-xs text-yellow-500">Pending</div>
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground text-center max-w-[300px]">
                        The executor repeatedly calls poll(). If the future returns Pending, the executor puts it to sleep until woken up.
                    </p>
                </div>
            )
        },
        {
            title: "Async / Await",
            description: "Syntactic sugar for creating and polling futures.",
            code: `async fn get_data() -> String {
    "data".to_string()
}

async fn main() {
    let data = get_data().await;
    println!("{}", data);
}`,
            highlightedLines: [1, 5],
            visualComponent: (
                <div className="flex flex-col items-center justify-center gap-8 h-full">
                    <div className="flex flex-col gap-4 w-full max-w-[300px]">
                        <div className="flex items-center gap-4">
                            <div className="w-24 text-right text-xs font-mono">get_data()</div>
                            <div className="flex-1 h-8 bg-slate-800 rounded flex items-center justify-center text-xs text-muted-foreground">
                                Returns Future
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-24 text-right text-xs font-mono">.await</div>
                            <div className="flex-1 h-8 bg-blue-500/20 border border-blue-500/50 rounded flex items-center justify-center text-xs text-blue-400 font-bold">
                                Polls until Ready
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-24 text-right text-xs font-mono">Result</div>
                            <div className="flex-1 h-8 bg-green-500/20 border border-green-500/50 rounded flex items-center justify-center text-xs text-green-400 font-bold">
                                "data"
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "Concurrent Join",
            description: "Running multiple futures at the same time.",
            code: `let f1 = fetch_url("url1");
let f2 = fetch_url("url2");

let (r1, r2) = tokio::join!(f1, f2);`,
            highlightedLines: [4],
            visualComponent: (
                <div className="flex flex-col items-center justify-center gap-8 h-full">
                    <div className="flex gap-4 items-end h-[150px]">
                        <div className="flex flex-col items-center gap-2 w-20">
                            <div className="text-xs text-muted-foreground">Future 1</div>
                            <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: "100%" }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-full bg-blue-500/50 rounded-t"
                            />
                        </div>
                        <div className="flex flex-col items-center gap-2 w-20">
                            <div className="text-xs text-muted-foreground">Future 2</div>
                            <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: "80%" }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="w-full bg-purple-500/50 rounded-t"
                            />
                        </div>
                    </div>
                    <div className="px-4 py-2 bg-slate-800 rounded border border-slate-700 text-xs font-mono">
                        tokio::join!
                    </div>
                    <p className="text-xs text-muted-foreground text-center max-w-[300px]">
                        Both futures progress concurrently on the same thread (or multiple threads depending on the runtime).
                    </p>
                </div>
            )
        }
    ]

    return <CodeWalkthrough steps={steps} title="Async Rust" />
}

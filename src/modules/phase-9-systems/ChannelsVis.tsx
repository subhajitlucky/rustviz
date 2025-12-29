import { CodeWalkthrough, Step } from "@/components/visualizer/CodeWalkthrough"
import { motion } from "framer-motion"

export function ChannelsVis() {
    const steps: Step[] = [
        {
            title: "MPSC Channels",
            description: "Multiple Producer, Single Consumer. Threads communicate by sending messages.",
            code: `use std::sync::mpsc;
use std::thread;

let (tx, rx) = mpsc::channel();

thread::spawn(move || {
    let val = String::from("hi");
    tx.send(val).unwrap();
});

let received = rx.recv().unwrap();
println!("Got: {}", received);`,
            highlightedLines: [4, 8, 11],
            visualComponent: (
                <div className="flex flex-col items-center justify-center gap-8 h-full">
                    <div className="flex gap-8 items-center">
                        {/* Producer */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="px-3 py-1 bg-green-500/20 border border-green-500 rounded text-green-400 font-bold text-sm">Producer (tx)</div>
                            <motion.div 
                                animate={{ x: [0, 100], opacity: [1, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="p-2 bg-blue-500 rounded text-white text-xs font-bold"
                            >
                                "hi"
                            </motion.div>
                        </div>

                        {/* Channel */}
                        <div className="w-[100px] h-2 bg-slate-700 rounded relative overflow-hidden">
                            <div className="absolute inset-0 bg-slate-600/50 animate-pulse" />
                        </div>

                        {/* Consumer */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="px-3 py-1 bg-purple-500/20 border border-purple-500 rounded text-purple-400 font-bold text-sm">Consumer (rx)</div>
                            <motion.div 
                                animate={{ x: [-100, 0], opacity: [0, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                                className="p-2 bg-blue-500 rounded text-white text-xs font-bold"
                            >
                                "hi"
                            </motion.div>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground text-center max-w-[300px]">
                        Ownership of the message is transferred from the producer to the consumer.
                    </p>
                </div>
            )
        },
        {
            title: "Ownership Transfer",
            description: "Once sent, the producer loses ownership. This prevents data races.",
            code: `let val = String::from("hi");
tx.send(val).unwrap();
// println!("val is {}", val); // ERROR! val moved`,
            highlightedLines: [2, 3],
            visualComponent: (
                <div className="flex flex-col items-center justify-center gap-8 h-full">
                    <div className="flex gap-12 items-center">
                        <div className="flex flex-col items-center gap-2">
                            <div className="text-sm font-bold text-muted-foreground">Sender Scope</div>
                            <div className="p-4 border-2 border-dashed border-red-500/50 bg-red-500/10 rounded-lg flex items-center justify-center w-24 h-24">
                                <span className="text-red-500 font-bold text-xs">MOVED</span>
                            </div>
                        </div>

                        <div className="text-2xl text-muted-foreground">➜</div>

                        <div className="flex flex-col items-center gap-2">
                            <div className="text-sm font-bold text-muted-foreground">Receiver Scope</div>
                            <div className="p-4 border-2 border-green-500 bg-green-500/10 rounded-lg flex items-center justify-center w-24 h-24">
                                <span className="text-green-400 font-bold">"hi"</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    ]

    return <CodeWalkthrough steps={steps} title="Channels" />
}

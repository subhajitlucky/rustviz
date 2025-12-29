import { CodeWalkthrough, Step } from "@/components/visualizer/CodeWalkthrough"
import { motion } from "framer-motion"

export default function IteratorsVis() {
    const steps: Step[] = [
        {
            title: "The Lazy Pipeline",
            description: "Iterators in Rust are 'lazy'. They do nothing until you call a consumer like `collect()` or `sum()`.",
            code: `let v = vec![1, 2, 3];
let iter = v.iter()
            .map(|x| x * 2);
// Nothing has happened yet!`,
            highlightedLines: [2, 3],
            visualComponent: (
                <div className="flex flex-col items-center justify-center gap-8 h-full">
                    <div className="flex gap-4 items-center">
                         <div className="p-3 bg-muted rounded border font-mono">[1, 2, 3]</div>
                         <div className="text-xl">→</div>
                         <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded text-blue-400 font-bold">iter()</div>
                         <div className="text-xl">→</div>
                         <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded text-purple-400 font-bold">map(x*2)</div>
                    </div>
                    <div className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/50 rounded-full text-yellow-500 font-bold animate-pulse text-xs uppercase tracking-widest">
                        Status: LAZY (Waiting)
                    </div>
                </div>
            )
        },
        {
            title: "Consumption",
            description: "When we call `collect()`, the pipeline 'pulls' data through the adapters.",
            code: `let result: Vec<i32> = v.iter()
                        .map(|x| x * 2)
                        .collect();
// result is [2, 4, 6]`,
            highlightedLines: [3],
            visualComponent: (
                <div className="flex flex-col items-center justify-center gap-6 h-full">
                    <div className="relative w-full max-w-[300px] h-1 bg-slate-800 rounded">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.5, ease: "linear" }}
                            className="absolute inset-0 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                        />
                        <motion.div 
                            animate={{ x: [0, 300] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="absolute top-1/2 -translate-y-1/2 h-3 w-3 bg-white rounded-full shadow-lg"
                        />
                    </div>
                    <div className="flex gap-2">
                        {[2, 4, 6].map(n => (
                            <motion.div 
                                key={n}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: n * 0.2 }}
                                className="h-10 w-10 flex items-center justify-center bg-green-500/20 border border-green-500/50 rounded font-bold text-green-400"
                            >
                                {n}
                            </motion.div>
                        ))}
                    </div>
                    <div className="text-xs font-bold text-green-500 uppercase tracking-widest">Status: COLLECTED</div>
                </div>
            )
        },
        {
            title: "Fold & Reduce",
            description: "Condensing a sequence into a single value.",
            code: `let sum = vec![1, 2, 3]
    .iter()
    .fold(0, |acc, x| acc + x);
// sum is 6`,
            highlightedLines: [3],
            visualComponent: (
                <div className="flex flex-col items-center justify-center gap-6 h-full">
                    <div className="flex gap-4 items-center">
                        <div className="flex flex-col items-center gap-2">
                            <div className="text-xs text-muted-foreground">Accumulator</div>
                            <motion.div 
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white"
                            >
                                6
                            </motion.div>
                        </div>
                        <div className="text-2xl text-muted-foreground">←</div>
                        <div className="flex gap-2 opacity-50">
                            <div className="h-8 w-8 bg-slate-700 rounded flex items-center justify-center text-xs">1</div>
                            <div className="h-8 w-8 bg-slate-700 rounded flex items-center justify-center text-xs">2</div>
                            <div className="h-8 w-8 bg-slate-700 rounded flex items-center justify-center text-xs">3</div>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground max-w-[200px] text-center">
                        Fold starts with an initial value (0) and combines it with each element.
                    </p>
                </div>
            )
        },
        {
            title: "IntoIterator",
            description: "The trait that powers 'for' loops. It converts a collection into an iterator.",
            code: `let v = vec![1, 2, 3];
// Implicitly calls v.into_iter()
for x in v {
    println!("{}", x);
}`,
            highlightedLines: [3],
            visualComponent: (
                <div className="flex flex-col items-center justify-center gap-6 h-full">
                    <div className="p-4 border-2 border-dashed border-slate-600 rounded-lg flex items-center gap-4">
                        <div className="text-sm font-mono">Vec&lt;i32&gt;</div>
                        <div className="text-xl">→</div>
                        <div className="px-3 py-1 bg-primary/20 rounded text-primary font-bold text-xs">IntoIterator</div>
                        <div className="text-xl">→</div>
                        <div className="text-sm font-mono">Iterator</div>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                        This trait is the bridge between collections and loops.
                    </p>
                </div>
            )
        }
    ]

    return <CodeWalkthrough steps={steps} title="Iterators: Lazy Power" />
}

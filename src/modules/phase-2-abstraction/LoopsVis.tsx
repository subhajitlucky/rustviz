import { CodeWalkthrough, Step } from "@/components/visualizer/CodeWalkthrough"
import { motion } from "framer-motion"

export default function LoopsVis() {
    const steps: Step[] = [
        {
            title: "While Loop",
            description: "A `while` loop runs as long as a condition is true. It's useful when you don't know exactly how many times you need to loop.",
            code: `fn main() {
    let mut n = 3;

    while n > 0 {
        println!("{}!", n);
        n -= 1;
    }
    println!("LIFTOFF!");
}`,
            highlightedLines: [4, 5, 6, 7],
            visualComponent: (
                <div className="flex flex-col gap-4 items-center justify-center h-full">
                    <div className="flex gap-2">
                        {[3, 2, 1].map((num, i) => (
                            <motion.div
                                key={num}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.5 }}
                                className="w-12 h-12 bg-blue-500/20 border border-blue-500 rounded-full flex items-center justify-center font-bold"
                            >
                                {num}
                            </motion.div>
                        ))}
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5 }}
                        className="text-xl font-bold text-green-400"
                    >
                        LIFTOFF!
                    </motion.div>
                </div>
            ),
            output: "3!\n2!\n1!\nLIFTOFF!"
        },
        {
            title: "For Loop (Range)",
            description: "A `for` loop is the most common loop in Rust. It iterates over a collection or a range. Ranges are defined like `start..end` (exclusive) or `start..=end` (inclusive).",
            code: `fn main() {
    // 1..4 means 1, 2, 3 (4 is excluded)
    for i in 1..4 {
        println!("i is: {}", i);
    }
}`,
            highlightedLines: [3, 4, 5],
            visualComponent: (
                <div className="flex flex-col gap-2 items-center justify-center h-full">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                        <span>Range:</span>
                        <span className="font-mono bg-slate-800 px-2 py-1 rounded">1..4</span>
                    </div>
                    <div className="flex gap-4">
                        {[1, 2, 3].map((num) => (
                            <div key={num} className="flex flex-col items-center gap-2">
                                <div className="w-10 h-10 bg-purple-500/20 border border-purple-500 rounded flex items-center justify-center font-bold">
                                    {num}
                                </div>
                            </div>
                        ))}
                        <div className="flex flex-col items-center gap-2 opacity-50 grayscale">
                            <div className="w-10 h-10 bg-slate-700 border border-slate-600 rounded flex items-center justify-center font-bold relative">
                                4
                                <div className="absolute inset-0 flex items-center justify-center text-red-500 text-2xl font-bold">×</div>
                            </div>
                        </div>
                    </div>
                </div>
            ),
            output: "i is: 1\ni is: 2\ni is: 3"
        },
        {
            title: "For Loop (Iterators)",
            description: "You can iterate over arrays and other collections directly. This is safer than using an index variable because you can't go out of bounds.",
            code: `fn main() {
    let a = [10, 20, 30];

    for element in a {
        println!("value is: {}", element);
    }
}`,
            highlightedLines: [4, 5, 6],
            visualComponent: (
                <div className="flex flex-col gap-4 items-center justify-center h-full">
                    <div className="flex border-2 border-slate-700 rounded-lg overflow-hidden">
                        {[10, 20, 30].map((num, i) => (
                            <div key={i} className="p-4 border-r-2 border-slate-700 last:border-r-0 bg-slate-800">
                                {num}
                            </div>
                        ))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                        The loop visits each item in order.
                    </div>
                </div>
            ),
            output: "value is: 10\nvalue is: 20\nvalue is: 30"
        }
    ]

    return <CodeWalkthrough steps={steps} />
}

import { CodeWalkthrough, Step } from "@/components/visualizer/CodeWalkthrough"
import { StackView } from "@/components/visualizer/MemoryBlock"
import { motion } from "framer-motion"
import { AlertTriangle, Trash2 } from "lucide-react"

export default function PanicVis() {
    const steps: Step[] = [
        {
            title: "Normal Execution",
            description: "The program executes normally, pushing function calls onto the stack.",
            code: `fn main() {
    process_data();
}

fn process_data() {
    risky_operation();
}`,
            highlightedLines: [5],
            visualComponent: (
                <div className="h-full flex items-center justify-center">
                    <StackView 
                        title="Stack"
                        items={[
                            { id: "main", name: "main()", value: "frame", type: "fn" },
                            { id: "proc", name: "process_data()", value: "frame", type: "fn" },
                            { id: "risk", name: "risky_operation()", value: "frame", type: "fn", color: "bg-blue-500/10 border-blue-500/20" }
                        ]} 
                    />
                </div>
            )
        },
        {
            title: "Panic Triggered!",
            description: "A panic occurs when the program reaches an unrecoverable state (e.g., explicit panic! or index out of bounds).",
            code: `fn risky_operation() {
    // Something went wrong!
    panic!("Critical Failure");
}`,
            highlightedLines: [3],
            visualComponent: (
                <div className="h-full flex flex-col items-center justify-center gap-6">
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 1] }}
                        className="p-6 bg-red-500 text-white rounded-full shadow-xl flex flex-col items-center"
                    >
                        <AlertTriangle className="h-12 w-12 mb-2" />
                        <span className="font-bold text-xl">PANIC!</span>
                    </motion.div>
                    <StackView 
                        title="Stack (Frozen)"
                        items={[
                            { id: "main", name: "main()", value: "frame", type: "fn" },
                            { id: "proc", name: "process_data()", value: "frame", type: "fn" },
                            { id: "risk", name: "risky_operation()", value: "PANIC", type: "fn", color: "bg-red-500/20 border-red-500/40" }
                        ]} 
                    />
                </div>
            )
        },
        {
            title: "Unwinding (Cleanup)",
            description: "Rust walks back up the stack, cleaning up each function's data (dropping variables) before exiting. This prevents resource leaks.",
            code: `// Unwinding...
// Dropping risky_operation vars...
// Dropping process_data vars...
// Dropping main vars...
// Exit with code 101`,
            highlightedLines: [1, 2, 3, 4],
            visualComponent: (
                <div className="h-full flex flex-col items-center justify-center gap-4">
                    <div className="flex gap-2 mb-4">
                        <motion.div 
                            animate={{ opacity: [1, 0], y: -20 }}
                            transition={{ duration: 1, delay: 0 }}
                            className="flex items-center gap-2 text-red-400"
                        >
                            <Trash2 className="h-4 w-4" /> Dropping Frame 3
                        </motion.div>
                         <motion.div 
                            animate={{ opacity: [0, 1, 0], y: -20 }}
                            transition={{ duration: 1, delay: 1 }}
                            className="flex items-center gap-2 text-red-400"
                        >
                            <Trash2 className="h-4 w-4" /> Dropping Frame 2
                        </motion.div>
                    </div>
                    
                    <StackView 
                        title="Stack (Unwinding)"
                        items={[
                            { id: "main", name: "main()", value: "frame", type: "fn" }
                        ]} 
                    />
                    <p className="text-xs text-muted-foreground mt-4">
                        *If 'abort' strategy is set in Cargo.toml, this cleanup is skipped.
                    </p>
                </div>
            )
        }
    ]

    return <CodeWalkthrough steps={steps} title="The Panic Protocol" />
}

import { CodeWalkthrough, Step } from "@/components/visualizer/CodeWalkthrough"
import { SyntaxAnatomy, Token } from "@/components/visualizer/SyntaxAnatomy"
import { motion } from "framer-motion"

export default function SugarVis() {
    const ifLetTokens: Token[] = [
        { label: "Keyword", text: "if", color: "keyword" },
        { label: "Keyword", text: "let", color: "keyword", description: "Starts the pattern matching binding." },
        { label: "Pattern", text: "Some(x)", color: "type", description: "The pattern to match against." },
        { label: "Operator", text: "=", color: "operator" },
        { label: "Scrutinee", text: "opt_val", color: "identifier", description: "The value being tested." },
        { label: "Block", text: "{ ... }", color: "punctuation", description: "Code to run ONLY if it matches." },
    ]

    const steps: Step[] = [
        {
            title: "The Verbose Match",
            description: "Often you only care about one variant (e.g., Some) and want to ignore everything else (None). A full match is verbose.",
            code: `let config = Some("dark_mode");

match config {
    Some(mode) => println!("Mode: {}", mode),
    None => (), // Do nothing (boilerplate)
}`,
            highlightedLines: [3, 4, 5, 6],
            visualComponent: (
                <div className="p-6 border rounded-xl bg-muted/30 flex flex-col items-center justify-center h-full text-center">
                    <p className="mb-4 text-muted-foreground">Standard Match requires handling ALL cases.</p>
                    <div className="font-mono text-sm bg-background p-4 rounded border">
                        _ ={'>'} () <span className="text-slate-400">// Wasted space!</span>
                    </div>
                </div>
            )
        },
        {
            title: "if let Sugar",
            description: "`if let` is syntactic sugar. It reads: 'If `config` matches the pattern `Some(mode)`, then run this block'.",
            code: `let config = Some("dark_mode");

if let Some(mode) = config {
    println!("Mode: {}", mode);
}`,
            highlightedLines: [3, 4, 5],
            visualComponent: <SyntaxAnatomy 
                tokens={ifLetTokens} 
                summary="Combines 'if' and 'let' to unwrap a value in a single step. If the pattern doesn't match, the block is skipped."
            />
        },
        {
            title: "while let Loop",
            description: "`while let` is a loop that runs as long as the pattern matches. Perfect for consuming iterators.",
            code: `let mut stack = vec![1, 2, 3];

// Loop while pop() returns Some(x)
while let Some(top) = stack.pop() {
    println!("{}", top);
}
// Stops when pop() returns None`,
            highlightedLines: [4, 5, 6],
            visualComponent: (
                <div className="flex flex-col items-center justify-center gap-4 h-full">
                    <div className="flex gap-2">
                        <motion.div 
                            animate={{ opacity: [1, 0], scale: [1, 0.8] }}
                            transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
                            className="p-3 bg-blue-500/20 border border-blue-500 rounded text-blue-500 font-bold"
                        >
                            Some(3)
                        </motion.div>
                        <motion.div 
                            animate={{ opacity: [0, 1, 0], scale: [0.8, 1, 0.8] }}
                            transition={{ duration: 1, delay: 0.5, repeat: Infinity, repeatDelay: 0.5 }}
                            className="p-3 bg-blue-500/20 border border-blue-500 rounded text-blue-500 font-bold"
                        >
                            Some(2)
                        </motion.div>
                         <motion.div 
                            animate={{ opacity: [0, 0, 1, 0] }}
                            transition={{ duration: 1, delay: 1, repeat: Infinity, repeatDelay: 0.5 }}
                            className="p-3 bg-blue-500/20 border border-blue-500 rounded text-blue-500 font-bold"
                        >
                            Some(1)
                        </motion.div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        Loop continues...
                    </div>
                    <motion.div 
                        animate={{ opacity: [0, 0, 0, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="p-3 bg-slate-500/20 border border-slate-500 rounded text-slate-500 font-bold"
                    >
                        None (Stop)
                    </motion.div>
                </div>
            )
        }
    ]

    return <CodeWalkthrough steps={steps} title="Syntax Sugar: if let & while let" />
}

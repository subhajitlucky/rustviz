import { CodeWalkthrough, Step } from "@/components/visualizer/CodeWalkthrough"
import { StackView } from "@/components/visualizer/MemoryBlock"
import { motion } from "framer-motion"
import { SyntaxAnatomy, Token } from "@/components/visualizer/SyntaxAnatomy"

// Component to visualize Return Flow
const ReturnFlow = ({ value, isBlocked }: { value: string, isBlocked: boolean }) => (
    <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Expression Evaluation</div>
        <div className="relative flex items-center gap-4 p-6 bg-slate-900/50 rounded-xl border border-slate-800">
            <div className="flex flex-col items-center gap-2">
                <span className="text-xs text-slate-500">Operation</span>
                <span className="font-mono text-lg font-bold">5 + 1</span>
            </div>
            
            <div className="text-2xl text-slate-600">→</div>

            <div className="flex flex-col items-center gap-2">
                <span className="text-xs text-slate-500">Result</span>
                <motion.div 
                    key={isBlocked ? "blocked" : "value"}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`h-12 w-12 flex items-center justify-center rounded-lg font-bold border-2 ${isBlocked ? "border-slate-600 text-slate-500 bg-slate-800" : "border-green-500 text-green-400 bg-green-500/10"}`}
                >
                    {isBlocked ? "()" : value}
                </motion.div>
            </div>

            {isBlocked && (
                <motion.div 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded shadow-lg"
                >
                    Semicolon suppressed return!
                </motion.div>
            )}
        </div>
        <p className="text-center text-sm text-muted-foreground max-w-[250px]">
            {isBlocked 
                ? "The semicolon turns the expression into a statement. The block returns the unit type ()." 
                : "Without a semicolon, the last expression is implicitly returned."}
        </p>
    </div>
)

export default function FunctionsVis() {
    const funcSyntaxTokens: Token[] = [
        { label: "Keyword", text: "fn", color: "keyword", description: "Declares a function." },
        { label: "Identifier", text: "add_one", color: "identifier", description: "The name of the function." },
        { label: "Parameter", text: "(x: i32)", color: "type", description: "Input parameter 'x' of type i32." },
        { label: "Return Type", text: "-> i32", color: "logic", description: "Specifies the type of the returned value." },
        { label: "Block", text: "{ ... }", color: "punctuation", description: "The function body containing statements and expressions." },
    ]

    const steps: Step[] = [
        {
            title: "Function Signatures",
            description: "A function signature defines the contract: the name, what it takes (parameters), and what it gives back (return type).",
            code: `// Technical: Function definition with return type
fn add_one(x: i32) -> i32 {
    x + 1
}`,
            highlightedLines: [2],
            visualComponent: <SyntaxAnatomy 
                tokens={funcSyntaxTokens} 
                summary="A recipe called 'add_one' that needs a number to start and promises to give a number back when it's done."
            />
        },
        {
            title: "Stack Frames",
            description: "Functions run in their own isolated memory space called a 'Stack Frame'.",
            code: `fn main() {
    let a = 5;
    let b = add_one(a);
}

fn add_one(x: i32) -> i32 {
    x + 1
}`,
            highlightedLines: [2],
            visualComponent: (
                <StackView 
                    title="Stack Frame: main"
                    items={[
                        { id: "1", name: "a", value: "5", type: "i32" }
                    ]} 
                />
            )
        },
        {
            title: "Pass By Value",
            description: "Calling `add_one(a)` COPIES the value of `a` (5) into the new frame's argument `x`.",
            code: `fn main() {
    let a = 5;
    let b = add_one(a);
}

fn add_one(x: i32) -> i32 {
    x + 1
}`,
            highlightedLines: [3, 6], 
            visualComponent: (
                <div className="flex flex-col gap-4 h-full">
                     <StackView 
                        title="Stack Frame: add_one"
                        items={[
                            { id: "2", name: "x", value: "5", type: "i32", color: "bg-green-500/10 border-green-500/20" }
                        ]} 
                    />
                    <StackView 
                        title="Stack Frame: main"
                        items={[
                            { id: "1", name: "a", value: "5", type: "i32" }
                        ]} 
                    />
                </div>
            )
        },
        {
            title: "Implicit Return (Expression)",
            description: "Rust is an expression-based language. The line `x + 1` (no semicolon) evaluates to `6` and returns it.",
            code: `fn add_one(x: i32) -> i32 {
    // Expression (Returns 6)
    x + 1
}`,
            highlightedLines: [3],
            visualComponent: <ReturnFlow value="6" isBlocked={false} />
        },
        {
            title: "The Semicolon Trap (Statement)",
            description: "If we add a semicolon, it becomes a Statement. Statements perform an action but return `()`. This would cause a compilation error here!",
            code: `fn add_one(x: i32) -> i32 {
    // Statement (Returns unit type)
    x + 1; 
    // Error: expected i32, found ()
}`,
            highlightedLines: [3],
            visualComponent: <ReturnFlow value="6" isBlocked={true} />
        },
        {
            title: "Return & Cleanup",
            description: "The stack frame `add_one` is destroyed (popped). The result `6` is returned to `main`.",
            code: `fn main() {
    let a = 5;
    let b = add_one(a); // b becomes 6
    println!("{}", b);
}`,
            highlightedLines: [3],
            visualComponent: (
                 <StackView 
                    title="Stack Frame: main"
                    items={[
                        { id: "1", name: "a", value: "5", type: "i32" },
                        { id: "3", name: "b", value: "6", type: "i32", color: "bg-blue-500/10 border-blue-500/20" }
                    ]} 
                />
            ),
            output: "6"
        }
    ]

    return <CodeWalkthrough steps={steps} />
}
import { CodeWalkthrough, Step } from "@/components/visualizer/CodeWalkthrough"
import { motion } from "framer-motion"
import { SyntaxAnatomy, Token } from "@/components/visualizer/SyntaxAnatomy"

// A simple flowchart node component
function FlowNode({ label, active, type = "normal" }: { label: string, active: boolean, type?: "normal" | "diamond" }) {
    return (
        <motion.div 
            animate={{ 
                scale: active ? 1.1 : 1,
                backgroundColor: active ? (type === "diamond" ? "rgba(234, 179, 8, 0.2)" : "rgba(34, 197, 94, 0.2)") : "rgba(30, 41, 59, 0.5)",
                borderColor: active ? (type === "diamond" ? "rgba(234, 179, 8, 1)" : "rgba(34, 197, 94, 1)") : "rgba(71, 85, 105, 1)"
            }}
            className={`p-4 border-2 rounded-lg text-center font-bold text-sm min-w-[120px] transition-colors ${type === "diamond" ? "rotate-45" : ""}`}
        >
            <div className={type === "diamond" ? "-rotate-45" : ""}>{label}</div>
        </motion.div>
    )
}

export default function ControlFlowVis() {
    const ifSyntaxTokens: Token[] = [
        { label: "Keyword", text: "let", color: "keyword", description: "Variable binding start." },
        { label: "Identifier", text: "y", color: "identifier", description: "Receives the result of the expression." },
        { label: "Assignment", text: "=", color: "operator", description: "Binds the result of the 'if' block to 'y'." },
        { label: "Expression", text: "if", color: "logic", description: "Starts a conditional branch that returns a value." },
        { label: "Predicate", text: "x > 5", color: "value", description: "A boolean expression to evaluate." },
        { label: "Branch", text: "{ 10 }", color: "type", description: "Evaluates to 10 if the condition is true." },
        { label: "Keyword", text: "else", color: "logic", description: "Mandatory fallback for expressions." },
        { label: "Branch", text: "{ 0 }", color: "type", description: "Evaluates to 0 if the condition is false." },
        { label: "Terminator", text: ";", color: "punctuation" },
    ]

    const steps: Step[] = [
        {
            title: "The 'If' Expression",
            description: "Rust treats 'if' as an expression. This means the result of the chosen branch is returned and can be used immediately.",
            code: `// The result of the if/else block is assigned to y
let y = if x > 5 { 10 } else { 0 };`,
            highlightedLines: [3],
            visualComponent: <SyntaxAnatomy 
                tokens={ifSyntaxTokens} 
                summary="Depending on the answer to the question (x > 5), the computer picks one path and brings back that number." 
            />
        },
        {
            title: "Loop Start",
            description: "We start with a mutable variable `counter` set to 0. We will use a `loop` expression to find a value.",
            code: `fn main() {
    let mut counter = 0;

    let result = loop {
        counter += 1;

        if counter == 10 {
            break counter * 2;
        }
    };
}`,
            highlightedLines: [2],
            visualComponent: (
                <div className="flex flex-col items-center gap-8 py-8">
                    <FlowNode label="Start: counter = 0" active={true} />
                    <div className="h-8 w-0.5 bg-muted-foreground" />
                    <FlowNode label="Loop Start" active={false} />
                </div>
            )
        },
        {
            title: "Enter Loop",
            description: "We enter the `loop` block. Loops in Rust are infinite by default until `break` is called explicitly.",
            code: `fn main() {
    let mut counter = 0;

    let result = loop {
        counter += 1;

        if counter == 10 {
            break counter * 2;
        }
    };
}`,
            highlightedLines: [4],
            visualComponent: (
                <div className="flex flex-col items-center gap-8 py-8">
                    <FlowNode label="counter = 0" active={false} />
                    <div className="h-8 w-0.5 bg-muted-foreground" />
                    <FlowNode label="Loop Start" active={true} />
                     <div className="h-8 w-0.5 bg-muted-foreground" />
                    <FlowNode label="counter += 1" active={false} />
                </div>
            )
        },
        {
            title: "Increment",
            description: "We increment `counter`. Note that `loop` creates a new scope for variables defined inside it.",
            code: `fn main() {
    let mut counter = 0;

    let result = loop {
        counter += 1; // counter becomes 1

        if counter == 10 {
            break counter * 2;
        }
    };
}`,
            highlightedLines: [5],
            visualComponent: (
                <div className="flex flex-col items-center gap-8 py-8">
                    <FlowNode label="Loop Start" active={false} />
                    <div className="h-8 w-0.5 bg-muted-foreground" />
                    <FlowNode label="counter += 1" active={true} />
                     <div className="h-8 w-0.5 bg-muted-foreground" />
                    <FlowNode label="counter == 10?" active={false} type="diamond" />
                </div>
            )
        },
         {
            title: "Check Condition",
            description: "We check if `counter == 10`. If false, execution continues and the loop restarts.",
            code: `fn main() {
    let mut counter = 0;

    let result = loop {
        counter += 1;

        if counter == 10 { // false (1 != 10)
            break counter * 2;
        }
    };
}`,
            highlightedLines: [7],
            visualComponent: (
                <div className="flex flex-col items-center gap-8 py-8">
                    <FlowNode label="counter += 1" active={false} />
                    <div className="h-8 w-0.5 bg-muted-foreground" />
                    <FlowNode label="counter == 10?" active={true} type="diamond" />
                    <div className="flex gap-12 mt-4 text-xs font-mono">
                        <span className="text-red-500">NO (Loop again)</span>
                        <span className="text-muted-foreground">YES (Break)</span>
                    </div>
                </div>
            )
        },
        {
            title: "Break with Value",
            description: "Fast-forward: When `counter` reaches 10, the condition is true. We `break` with a value `counter * 2` (20), which is assigned to `result`.",
            code: `fn main() {
    let mut counter = 0;

    let result = loop {
        counter += 1;

        if counter == 10 { // true!
            break counter * 2; // returns 20
        }
    };
}`,
            highlightedLines: [8],
            visualComponent: (
                <div className="flex flex-col items-center gap-8 py-8">
                    <FlowNode label="counter == 10?" active={false} type="diamond" />
                    <div className="flex gap-12 mt-4 text-xs font-mono w-full justify-center relative">
                        <div className="absolute right-[55%] h-8 w-0.5 bg-green-500 top-0 rotate-45 origin-top" />
                        <span className="text-green-500 mt-8">YES (Break)</span>
                    </div>
                     <FlowNode label="Return 20" active={true} />
                </div>
            )
        }
    ]

    return <CodeWalkthrough steps={steps} />
}

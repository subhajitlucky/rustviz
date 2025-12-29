import { CodeWalkthrough, Step } from "@/components/visualizer/CodeWalkthrough"
import { motion } from "framer-motion"
import { SyntaxAnatomy, Token } from "@/components/visualizer/SyntaxAnatomy"

function Box({ label, content, color }: { label: string, content: string, color: string }) {
    return (
        <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`p-4 rounded-lg border-2 ${color} min-w-[120px] text-center`}
        >
            <div className="text-xs uppercase tracking-wider mb-1 opacity-70">{label}</div>
            <div className="font-bold text-lg">{content}</div>
        </motion.div>
    )
}

export default function OptionResultVis() {
    const matchSyntaxTokens: Token[] = [
        { label: "Expression", text: "match", color: "keyword", description: "Control flow operator for exhaustive pattern matching." },
        { label: "Scrutinee", text: "result", color: "identifier", description: "The value being inspected." },
        { label: "Scope", text: "{", color: "punctuation" },
        { label: "Variant", text: "Ok", color: "logic", description: "Match arm for the success variant." },
        { label: "Bind", text: "(v)", color: "identifier", description: "Binds the inner value to 'v' if matched." },
        { label: "Arm", text: "=>", color: "operator", description: "Separates pattern from expression." },
        { label: "Return", text: "v", color: "value", description: "The result of this arm." },
        { label: "Separator", text: ",", color: "punctuation" },
        { label: "Variant", text: "Err", color: "logic", description: "Match arm for the failure variant." },
        { label: "Wildcard", text: "(_)", color: "identifier", description: "Ignores the error value using the underscore." },
        { label: "Arm", text: "=>", color: "operator" },
        { label: "Fallback", text: "0", color: "value", description: "The result of this arm." },
        { label: "Scope", text: "}", color: "punctuation" },
    ]

    const steps: Step[] = [
        {
            title: "Safe Pattern Matching",
            description: "The 'match' expression ensures safety by requiring you to handle every possible variant of an enum (exhaustiveness).",
            code: `// Safely handle both Result variants
let value = match result {
    Ok(v) => v,
    Err(_) => 0,
};`,
            highlightedLines: [2, 3, 4],
            visualComponent: <SyntaxAnatomy 
                tokens={matchSyntaxTokens} 
                summary="Look inside the mystery envelope: If it's a success, keep the data. If it's an error, use a safe default like 0."
            />
        },
        {
            title: "Option Enum",
            description: "`Option<T>` can be either `Some(T)` or `None`. It replaces `null`. It forces you to think: 'What if this is empty?'",
            code: `fn main() {
    let some_number = Some(5);
    let absent_number: Option<i32> = None;
}`,
            highlightedLines: [2, 3],
            visualComponent: (
                <div className="flex justify-center gap-8 items-center h-full">
                    <Box label="some_number" content="Some(5)" color="border-green-500 bg-green-500/10" />
                    <Box label="absent_number" content="None" color="border-slate-500 bg-slate-500/10 text-slate-400" />
                </div>
            )
        },
        {
            title: "Result Enum",
            description: "`Result<T, E>` is `Ok(T)` or `Err(E)`. Used for recoverable errors (like File I/O).",
            code: `fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err("Div by zero".to_string())
    } else {
        Ok(a / b)
    }
}

fn main() {
    let success = divide(10.0, 2.0);
    let failure = divide(10.0, 0.0);
}`,
            highlightedLines: [10, 11],
            visualComponent: (
                <div className="flex justify-center gap-8 items-center h-full">
                    <Box label="success" content="Ok(5.0)" color="border-green-500 bg-green-500/10" />
                    <Box label="failure" content='Err("Div by zero")' color="border-red-500 bg-red-500/10" />
                </div>
            )
        },
         {
            title: "Unwrapping (The Danger Zone)",
            description: "`unwrap()` is a shortcut. It extracts the value from `Some/Ok` or crashes the program (panics) if it's `None/Err`. Use only when 100% sure.",
            code: `fn main() {
    let some_number = Some(5);
    let n = some_number.unwrap(); // Returns 5

    let absent = None;
    // absent.unwrap(); // PANIC!
}`,
            highlightedLines: [3],
            visualComponent: (
                <div className="flex flex-col items-center gap-8 py-8">
                     <div className="flex gap-4 items-center">
                        <Box label="some_number" content="Some(5)" color="border-green-500 bg-green-500/10" />
                        <span className="text-2xl">→</span>
                        <Box label="n" content="5" color="border-blue-500 bg-blue-500/10" />
                     </div>
                </div>
            )
        }
    ]

    return <CodeWalkthrough steps={steps} />
}

import { CodeWalkthrough, Step } from "@/components/visualizer/CodeWalkthrough"
import { SyntaxAnatomy, Token } from "@/components/visualizer/SyntaxAnatomy"

export default function MatchVis() {
    const matchTokens: Token[] = [
        { label: "Keyword", text: "match", color: "keyword", description: "Starts the pattern matching expression." },
        { label: "Value", text: "number", color: "identifier", description: "The value being compared against patterns." },
        { label: "Block", text: "{ ... }", color: "punctuation", description: "Contains the arms of the match." },
        { label: "Pattern", text: "1", color: "value", description: "A specific value to match against." },
        { label: "Arrow", text: "=>", color: "operator", description: "Separates the pattern from the code to run." },
        { label: "Expression", text: "\"One\"", color: "type", description: "The value returned if this arm matches." },
        { label: "Wildcard", text: "_", color: "keyword", description: "Matches anything not previously covered (default case)." },
    ]

    const steps: Step[] = [
        {
            title: "The Match Expression",
            description: "Rust's `match` is like a powerful `switch` statement. It compares a value against a series of patterns and executes the code for the first match.",
            code: `fn main() {
    let number = 1;

    let result = match number {
        1 => "One",
        2 => "Two",
        _ => "Other",
    };
    
    println!("{}", result);
}`,
            highlightedLines: [4, 5, 6, 7, 8],
            visualComponent: <SyntaxAnatomy 
                tokens={matchTokens} 
                summary="Think of it like a coin sorting machine. The value falls down and lands in the first slot that fits." 
            />,
            output: "One"
        },
        {
            title: "Exhaustiveness",
            description: "Match expressions must be exhaustive. You must cover every possible value. The `_` (wildcard) pattern acts as a catch-all.",
            code: `fn main() {
    let number = 3;

    let result = match number {
        1 => "One",
        2 => "Two",
        // Error! We didn't cover 3 (or any other number)
    };
}`,
            highlightedLines: [4, 7],
            visualComponent: (
                <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-200">
                    <h4 className="font-bold mb-2">Compilation Error</h4>
                    <p className="font-mono text-sm">error[E0004]: non-exhaustive patterns: `_` not covered</p>
                    <p className="text-sm mt-2">The compiler ensures you never forget a case.</p>
                </div>
            )
        },
        {
            title: "Matching with Option",
            description: "Match is commonly used with `Option` to handle values that might be missing (`None`).",
            code: `fn main() {
    let some_number = Some(5);

    match some_number {
        Some(n) => println!("We have a number: {}", n),
        None => println!("We have nothing!"),
    }
}`,
            highlightedLines: [4, 5, 6, 7],
            visualComponent: (
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4 p-4 bg-slate-800 rounded-lg border border-slate-700">
                        <span className="font-mono text-blue-400">Some(5)</span>
                        <span>matches</span>
                        <span className="font-mono text-green-400">Some(n)</span>
                    </div>
                    <div className="text-center text-sm text-muted-foreground">
                        The variable <code>n</code> binds to the inner value <code>5</code>.
                    </div>
                </div>
            ),
            output: "We have a number: 5"
        }
    ]

    return <CodeWalkthrough steps={steps} />
}

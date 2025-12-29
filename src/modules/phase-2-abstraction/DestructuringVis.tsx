import { CodeWalkthrough, Step } from "@/components/visualizer/CodeWalkthrough"
import { SyntaxAnatomy, Token } from "@/components/visualizer/SyntaxAnatomy"

export default function DestructuringVis() {
    const tupleTokens: Token[] = [
        { label: "Keyword", text: "let", color: "keyword", description: "Start of variable binding." },
        { label: "Pattern", text: "(x, y, z)", color: "identifier", description: "A tuple pattern that matches the structure of the value." },
        { label: "Assignment", text: "=", color: "operator", description: "Binds the values on the right to the names on the left." },
        { label: "Value", text: "(1, 2, 3)", color: "value", description: "The actual tuple data." },
        { label: "Terminator", text: ";", color: "punctuation" },
    ]

    const steps: Step[] = [
        {
            title: "Tuple Destructuring",
            description: "Destructuring allows you to unpack a tuple into separate variables in a single line.",
            code: `fn main() {
    let tuple = (10, 20, 30);
    
    // Unpack into x, y, and z
    let (x, y, z) = tuple;
    
    println!("y is {}", y);
}`,
            highlightedLines: [5],
            visualComponent: <SyntaxAnatomy 
                tokens={tupleTokens} 
                summary="We take the bundle (1, 2, 3) and assign each part to a new name: x=1, y=2, z=3." 
            />,
            output: "y is 20"
        },
        {
            title: "Struct Destructuring",
            description: "You can also destructure structs to access their fields directly.",
            code: `struct Point { x: i32, y: i32 }

fn main() {
    let p = Point { x: 0, y: 7 };

    let Point { x: a, y: b } = p;
    
    println!("a: {}, b: {}", a, b);
}`,
            highlightedLines: [6],
            visualComponent: (
                <div className="flex flex-col gap-4 items-center justify-center h-full">
                    <div className="p-4 bg-slate-800 border border-slate-700 rounded-lg">
                        <div className="text-xs text-muted-foreground mb-2">Struct Memory</div>
                        <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <span className="font-mono text-blue-400">x: 0</span>
                            </div>
                            <div className="w-px bg-slate-600" />
                            <div className="flex flex-col items-center">
                                <span className="font-mono text-blue-400">y: 7</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-2xl text-slate-500">↓</div>
                    <div className="flex gap-8">
                        <div className="p-3 bg-green-500/10 border border-green-500 rounded">
                            <span className="font-bold text-green-400">a = 0</span>
                        </div>
                        <div className="p-3 bg-green-500/10 border border-green-500 rounded">
                            <span className="font-bold text-green-400">b = 7</span>
                        </div>
                    </div>
                </div>
            ),
            output: "a: 0, b: 7"
        },
        {
            title: "Ignoring Values",
            description: "Use `_` to ignore parts of the data you don't need.",
            code: `fn main() {
    let tuple = (1, 2, 3, 4);

    let (first, _, third, _) = tuple;
    
    println!("first: {}, third: {}", first, third);
}`,
            highlightedLines: [4],
            visualComponent: (
                <div className="flex gap-2 items-center justify-center h-full">
                    <div className="p-2 bg-blue-500/20 border border-blue-500 rounded">1</div>
                    <div className="p-2 bg-slate-800 border border-slate-700 rounded opacity-50">2 (Ignored)</div>
                    <div className="p-2 bg-blue-500/20 border border-blue-500 rounded">3</div>
                    <div className="p-2 bg-slate-800 border border-slate-700 rounded opacity-50">4 (Ignored)</div>
                </div>
            ),
            output: "first: 1, third: 3"
        }
    ]

    return <CodeWalkthrough steps={steps} />
}

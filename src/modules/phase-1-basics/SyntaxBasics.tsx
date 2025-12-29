import { CodeWalkthrough, Step } from "@/components/visualizer/CodeWalkthrough"
import { StackView } from "@/components/visualizer/MemoryBlock"
import { SyntaxAnatomy, Token } from "@/components/visualizer/SyntaxAnatomy"

export default function SyntaxBasics() {
    const syntaxTokens: Token[] = [
        { label: "Keyword", text: "let", color: "keyword", description: "Declares a new variable binding on the stack." },
        { label: "Modifier", text: "mut", color: "logic", description: "Marks the binding as mutable, allowing the value to be overwritten." },
        { label: "Identifier", text: "x", color: "identifier", description: "The name used to reference this memory location." },
        { label: "Separator", text: ":", color: "punctuation" },
        { label: "Type", text: "i32", color: "type", description: "Type annotation: constrained to 32-bit signed integers." },
        { label: "Assignment", text: "=", color: "operator", description: "Binds the right-hand value to the identifier." },
        { label: "Literal", text: "42", color: "value", description: "The concrete data being stored." },
        { label: "Terminator", text: ";", color: "punctuation", description: "Ends the expression statement." },
    ]

    const steps: Step[] = [
        {
            title: "Variable Declaration & Binding",
            description: "In Rust, variables are immutable by default to ensure safety. We use 'let' to bind a name to a value on the stack.",
            code: `// Technical: Mutable variable declaration with type annotation
let mut x: i32 = 42;`,
            highlightedLines: [2],
            visualComponent: <SyntaxAnatomy 
                tokens={syntaxTokens} 
                summary="Create a named 'box' for a number. We add 'mut' so we can change the number inside later if we want to."
            />
        },
        {
            title: "Variable Declaration (Execution)",
            description: "Now, let's see what happens in memory. We declare an immutable integer `x`. It is pushed onto the stack.",
            code: `fn main() {
    let x = 42;
    let y = x;
    // x is still valid (Copy)
}`,
            highlightedLines: [2],
            visualComponent: (
                <StackView 
                    items={[
                        { id: "1", name: "x", value: "42", type: "i32" }
                    ]} 
                />
            )
        },
        {
            title: "Copy Semantics",
            description: "Because `i32` implements the `Copy` trait, assigning `x` to `y` copies the bits. Both variables exist independently.",
            code: `fn main() {
    let x = 42;
    let y = x;
    // x is still valid (Copy)
}`,
            highlightedLines: [3],
            visualComponent: (
                <StackView 
                    items={[
                        { id: "1", name: "x", value: "42", type: "i32" },
                        { id: "2", name: "y", value: "42", type: "i32", color: "bg-blue-500/10 border-blue-500/20" }
                    ]} 
                />
            )
        },
        {
            title: "Scope End",
            description: "At the end of the scope, items are popped off the stack in LIFO order (Last In, First Out).",
            code: `fn main() {
    let x = 42;
    let y = x;
    // x is still valid (Copy)
}`, // Implicit end of scope
            highlightedLines: [4],
            visualComponent: (
                 <StackView items={[]} />
            ),
            output: "Process finished"
        }
    ]

    return <CodeWalkthrough steps={steps} />
}

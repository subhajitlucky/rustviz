import { CodeWalkthrough, Step } from "@/components/visualizer/CodeWalkthrough"
import { StackView } from "@/components/visualizer/MemoryBlock"

export default function ShadowingVis() {
    const steps: Step[] = [
        {
            title: "Initial Binding",
            description: "We declare a variable `x` with the value 5. It is bound to a memory location on the stack.",
            code: `fn main() {
    let x = 5;
    println!("The value of x is: {}", x);
    
    let x = x + 1;
    let x = x * 2;
}`,
            highlightedLines: [2, 3],
            visualComponent: (
                <StackView 
                    items={[
                        { id: "1", name: "x", value: "5", type: "i32" }
                    ]} 
                />
            ),
            output: "The value of x is: 5"
        },
        {
            title: "Shadowing (First Time)",
            description: "We declare a NEW variable also named `x`. This 'shadows' the previous `x`. The old `x` still exists but is no longer accessible by name.",
            code: `fn main() {
    let x = 5;
    println!("The value of x is: {}", x);
    
    let x = x + 1;
    println!("The value of x is: {}", x);
    
    let x = x * 2;
}`,
            highlightedLines: [5, 6],
            visualComponent: (
                <StackView 
                    items={[
                        { id: "1", name: "x (shadowed)", value: "5", type: "i32", color: "opacity-50" },
                        { id: "2", name: "x", value: "6", type: "i32", color: "bg-primary/20 border-primary" }
                    ]} 
                />
            ),
            output: "The value of x is: 6"
        },
        {
            title: "Shadowing (Second Time)",
            description: "We shadow `x` again. Shadowing allows us to perform transformations without needing mutable variables or unique names like `x_plus_one`.",
            code: `fn main() {
    let x = 5;
    let x = x + 1;
    
    let x = x * 2;
    println!("The value of x is: {}", x);
}`,
            highlightedLines: [5, 6],
            visualComponent: (
                <StackView 
                    items={[
                        { id: "1", name: "x (shadowed)", value: "5", type: "i32", color: "opacity-30" },
                        { id: "2", name: "x (shadowed)", value: "6", type: "i32", color: "opacity-50" },
                        { id: "3", name: "x", value: "12", type: "i32", color: "bg-primary/20 border-primary" }
                    ]} 
                />
            ),
            output: "The value of x is: 12"
        },
        {
            title: "Type Changing",
            description: "Unlike `mut`, shadowing allows us to change the TYPE of the variable. Here we shadow `spaces` (string) with `spaces` (usize).",
            code: `let spaces = "   ";
let spaces = spaces.len();`,
            highlightedLines: [2],
            visualComponent: (
                <StackView 
                    items={[
                        { id: "4", name: "spaces (shadowed)", value: '"   "', type: "&str", color: "opacity-50" },
                        { id: "5", name: "spaces", value: "3", type: "usize", color: "bg-green-500/20 border-green-500" }
                    ]} 
                />
            )
        }
    ]

    return <CodeWalkthrough steps={steps} />
}

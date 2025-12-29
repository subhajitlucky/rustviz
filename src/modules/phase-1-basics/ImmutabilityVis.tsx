import { CodeWalkthrough, Step } from "@/components/visualizer/CodeWalkthrough"
import { StackView } from "@/components/visualizer/MemoryBlock"

export default function ImmutabilityVis() {
    const steps: Step[] = [
        {
            title: "Immutable by Default",
            description: "By default, variables in Rust are immutable. Once a value is bound to a name, you cannot change that value.",
            code: `fn main() {
    let x = 5;
    println!("The value of x is: {}", x);
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
            title: "Attempting Mutation",
            description: "If we try to assign a new value to an immutable variable, the compiler will throw an error.",
            code: `fn main() {
    let x = 5;
    x = 6; // Error!
}`,
            highlightedLines: [3],
            visualComponent: (
                <StackView 
                    items={[
                        { id: "1", name: "x", value: "5", type: "i32", color: "bg-red-500/20 border-red-500" }
                    ]} 
                />
            ),
            output: "error[E0384]: cannot assign twice to immutable variable `x`"
        },
        {
            title: "Mutability with 'mut'",
            description: "To make a variable mutable, we must add the `mut` keyword. This explicitly tells the compiler (and other programmers) that this value will change.",
            code: `fn main() {
    let mut x = 5;
    println!("The value of x is: {}", x);
    
    x = 6;
    println!("The value of x is: {}", x);
}`,
            highlightedLines: [2, 5],
            visualComponent: (
                <StackView 
                    items={[
                        { id: "1", name: "x", value: "6", type: "i32", color: "bg-green-500/20 border-green-500" }
                    ]} 
                />
            ),
            output: "The value of x is: 5\nThe value of x is: 6"
        }
    ]

    return (
        <CodeWalkthrough 
            title="Immutability & Mutability"
            steps={steps}
        />
    )
}

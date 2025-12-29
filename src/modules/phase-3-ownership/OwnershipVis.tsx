import { CodeWalkthrough, Step } from "@/components/visualizer/CodeWalkthrough"
import { StackView, HeapView } from "@/components/visualizer/MemoryBlock"

export default function OwnershipVis() {
    const steps: Step[] = [
        {
            title: "Rule 1: Each Value Has an Owner",
            description: "In Rust, every value has a single variable that owns it. When the owner goes out of scope, the value is dropped.",
            code: `fn main() {
    {
        let s = String::from("hello"); // s owns the string
        // do stuff with s
    } // s goes out of scope, "hello" is dropped
}`,
            highlightedLines: [3, 5],
            visualComponent: (
                <div className="flex gap-8 items-start justify-center h-full">
                    <StackView 
                        items={[
                            { id: "1", name: "s", value: "ptr ->", type: "String" }
                        ]} 
                    />
                    <HeapView
                        items={[
                            { id: "0x1234", name: "h1", value: "hello" }
                        ]}
                    />
                </div>
            )
        },
        {
            title: "Rule 2: Move Semantics",
            description: "When you assign a heap value to another variable, ownership moves. The original variable becomes invalid.",
            code: `fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // Move occurs here
    
    // println!("{}", s1); // Error! s1 is invalid
    println!("{}", s2); // s2 is the new owner
}`,
            highlightedLines: [3],
            visualComponent: (
                <div className="flex gap-8 items-start justify-center h-full">
                    <StackView 
                        items={[
                            { id: "1", name: "s1", value: "moved", type: "String", color: "opacity-50" },
                            { id: "2", name: "s2", value: "ptr ->", type: "String", color: "bg-green-500/20 border-green-500" }
                        ]} 
                    />
                    <HeapView
                        items={[
                            { id: "0x1234", name: "h1", value: "hello" }
                        ]}
                    />
                </div>
            ),
            output: "hello"
        },
        {
            title: "Rule 3: Clone (Deep Copy)",
            description: "If you want to keep both variables valid, you must explicitly `clone` the data. This copies the heap memory.",
            code: `fn main() {
    let s1 = String::from("hello");
    let s2 = s1.clone(); // Deep copy
    
    println!("s1 = {}, s2 = {}", s1, s2);
}`,
            highlightedLines: [3],
            visualComponent: (
                <div className="flex gap-8 items-start justify-center h-full">
                    <StackView 
                        items={[
                            { id: "1", name: "s1", value: "ptr ->", type: "String" },
                            { id: "2", name: "s2", value: "ptr ->", type: "String" }
                        ]} 
                    />
                    <div className="flex flex-col gap-4">
                        <HeapView
                            title="Heap (s1)"
                            items={[
                                { id: "0x1234", name: "h1", value: "hello" }
                            ]}
                        />
                        <HeapView
                            title="Heap (s2)"
                            items={[
                                { id: "0x5678", name: "h2", value: "hello" }
                            ]}
                        />
                    </div>
                </div>
            ),
            output: "s1 = hello, s2 = hello"
        },
        {
            title: "Copy Types (Stack Only)",
            description: "Simple types like integers live entirely on the stack. Assigning them copies the bits, so both remain valid. No `clone` needed.",
            code: `fn main() {
    let x = 5;
    let y = x; // Copy
    
    println!("x = {}, y = {}", x, y);
}`,
            highlightedLines: [3],
            visualComponent: (
                <StackView 
                    items={[
                        { id: "1", name: "x", value: "5", type: "i32" },
                        { id: "2", name: "y", value: "5", type: "i32" }
                    ]} 
                />
            ),
            output: "x = 5, y = 5"
        }
    ]

    return <CodeWalkthrough steps={steps} />
}

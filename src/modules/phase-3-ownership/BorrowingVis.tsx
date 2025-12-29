import { CodeWalkthrough, Step } from "@/components/visualizer/CodeWalkthrough"
import { StackView, HeapView } from "@/components/visualizer/MemoryBlock"

export default function BorrowingVis() {
    const steps: Step[] = [
        {
            title: "Immutable Borrowing",
            description: "You can create a reference (`&T`) to a value. This allows you to read the data without taking ownership.",
            code: `fn main() {
    let s1 = String::from("hello");
    let len = calculate_len(&s1); // Pass reference
    println!("The length of '{}' is {}.", s1, len);
}

fn calculate_len(s: &String) -> usize {
    s.len()
}`,
            highlightedLines: [3, 7],
            visualComponent: (
                <div className="flex gap-8 items-start justify-center h-full">
                    <div className="flex flex-col gap-4">
                        <StackView 
                            title="Stack (main)"
                            items={[
                                { id: "1", name: "s1", value: "ptr ->", type: "String" }
                            ]} 
                        />
                        <StackView 
                            title="Stack (calculate_len)"
                            items={[
                                { id: "2", name: "s", value: "ptr ->", type: "&String", color: "bg-blue-500/20 border-blue-500" }
                            ]} 
                        />
                    </div>
                    <HeapView
                        items={[
                            { id: "0x1234", name: "h1", value: "hello" }
                        ]}
                    />
                </div>
            ),
            output: "The length of 'hello' is 5."
        },
        {
            title: "Mutable Borrowing",
            description: "A mutable reference (`&mut T`) allows you to modify the data. You must have a mutable variable to create a mutable reference.",
            code: `fn main() {
    let mut s = String::from("hello");
    change(&mut s);
    println!("{}", s);
}

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}`,
            highlightedLines: [3, 8],
            visualComponent: (
                <div className="flex gap-8 items-start justify-center h-full">
                    <div className="flex flex-col gap-4">
                        <StackView 
                            title="Stack (main)"
                            items={[
                                { id: "1", name: "s", value: "ptr ->", type: "String" }
                            ]} 
                        />
                        <StackView 
                            title="Stack (change)"
                            items={[
                                { id: "2", name: "some_string", value: "ptr ->", type: "&mut String", color: "bg-red-500/20 border-red-500" }
                            ]} 
                        />
                    </div>
                    <HeapView
                        items={[
                            { id: "0x1234", name: "h1", value: "hello, world", color: "bg-red-500/10 border-red-500" }
                        ]}
                    />
                </div>
            ),
            output: "hello, world"
        },
        {
            title: "The Rules of Borrowing",
            description: "You can have EITHER one mutable reference OR any number of immutable references. This prevents data races.",
            code: `fn main() {
    let mut s = String::from("hello");

    let r1 = &s; // OK
    let r2 = &s; // OK
    // let r3 = &mut s; // BIG PROBLEM!
    
    println!("{}, {}", r1, r2);
}`,
            highlightedLines: [6],
            visualComponent: (
                <div className="flex flex-col gap-4 items-center justify-center h-full">
                    <div className="flex gap-4">
                        <div className="p-4 bg-blue-500/20 border border-blue-500 rounded-lg">
                            Reader 1 (&s)
                        </div>
                        <div className="p-4 bg-blue-500/20 border border-blue-500 rounded-lg">
                            Reader 2 (&s)
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-red-500">VS</div>
                    <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg opacity-50 grayscale">
                        Writer (&mut s)
                    </div>
                    <div className="text-sm text-muted-foreground text-center max-w-md">
                        You cannot have a writer while there are active readers.
                    </div>
                </div>
            )
        }
    ]

    return <CodeWalkthrough steps={steps} />
}

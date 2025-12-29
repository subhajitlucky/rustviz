import { CodeWalkthrough, Step } from "@/components/visualizer/CodeWalkthrough"
import { StackView, HeapView } from "@/components/visualizer/MemoryBlock"
import { SyntaxAnatomy, Token } from "@/components/visualizer/SyntaxAnatomy"

export default function SlicesVis() {
    const sliceSyntaxTokens: Token[] = [
        { label: "Reference", text: "&", color: "keyword", description: "Indicates a shared borrow (pointer) rather than taking ownership." },
        { label: "Scrutinee", text: "s", color: "identifier", description: "The collection being sliced." },
        { label: "Index", text: "[", color: "punctuation" },
        { label: "Start", text: "0", color: "value", description: "Inclusive start index of the range." },
        { label: "Range Op", text: "..", color: "operator", description: "The range operator (exclusive of end)." },
        { label: "End", text: "5", color: "value", description: "Exclusive end index." },
        { label: "Index", text: "]", color: "punctuation" },
    ]

    const steps: Step[] = [
        {
            title: "Slice Syntax & Ranges",
            description: "A slice is a dynamically sized view into a contiguous sequence. It consists of a pointer to the data and a length.",
            code: `// Create a slice referencing the first 5 bytes
let hello = &s[0..5];`,
            highlightedLines: [2],
            visualComponent: <SyntaxAnatomy 
                tokens={sliceSyntaxTokens} 
                summary="Borrow a look at the string, starting from the very beginning up until the 5th letter."
            />
        },
        {
            title: "String Literal",
            description: "A string literal is stored in the program's read-only memory (static). The variable `s` is a reference (slice) to it.",
            code: `fn main() {
    let s: &str = "Hello World";
    // s is a fat pointer (ptr + len)
}`,
            highlightedLines: [2],
            visualComponent: (
                <div className="grid grid-cols-2 gap-4 h-full">
                    <StackView 
                        title="Stack"
                        items={[
                            { id: "1", name: "s", value: "ptr: 0x100, len: 11", type: "&str" }
                        ]} 
                    />
                    <HeapView
                        title="Static Memory"
                        items={[
                            { id: "s1", name: "0x100", value: '"Hello World"', color: "bg-blue-500/10 border-blue-500/20" }
                        ]}
                    />
                </div>
            )
        },
        {
            title: "Slicing",
            description: "We create a sub-slice `hello`. It points to the same data but with a different start and length. This is safe because it's a read-only borrow.",
            code: `fn main() {
    let s: &str = "Hello World";
    let hello: &str = &s[0..5];
}`,
            highlightedLines: [3],
            visualComponent: (
                <div className="grid grid-cols-2 gap-4 h-full">
                    <StackView 
                        title="Stack"
                        items={[
                            { id: "1", name: "s", value: "ptr: 0x100, len: 11", type: "&str" },
                             { id: "2", name: "hello", value: "ptr: 0x100, len: 5", type: "&str", color: "bg-green-500/10 border-green-500/20" }
                        ]} 
                    />
                    <HeapView
                        title="Static Memory"
                        items={[
                            { id: "s1", name: "0x100", value: '"Hello World"', color: "bg-blue-500/10 border-blue-500/20" }
                        ]}
                    />
                </div>
            )
        },
        {
            title: "Slicing Middle",
            description: "We create a sub-slice `world`. It points to offset 6 of the original data. Note that `ptr` is 0x106.",
            code: `fn main() {
    let s: &str = "Hello World";
    let hello: &str = &s[0..5];
    let world: &str = &s[6..11];
}`,
            highlightedLines: [4],
            visualComponent: (
                <div className="grid grid-cols-2 gap-4 h-full">
                    <StackView 
                        title="Stack"
                        items={[
                            { id: "1", name: "s", value: "ptr: 0x100, len: 11", type: "&str" },
                             { id: "2", name: "hello", value: "ptr: 0x100, len: 5", type: "&str", color: "bg-green-500/10 border-green-500/20" },
                             { id: "3", name: "world", value: "ptr: 0x106, len: 5", type: "&str", color: "bg-yellow-500/10 border-yellow-500/20" }
                        ]} 
                    />
                    <HeapView
                        title="Static Memory"
                        items={[
                            { id: "s1", name: "0x100", value: '"Hello World"', color: "bg-blue-500/10 border-blue-500/20" }
                        ]}
                    />
                </div>
            )
        }
    ]

    return <CodeWalkthrough steps={steps} />
}
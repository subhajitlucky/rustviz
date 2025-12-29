import { CodeWalkthrough, Step } from "@/components/visualizer/CodeWalkthrough"
import { StackView, HeapView } from "@/components/visualizer/MemoryBlock"

export default function StringVis() {
    const steps: Step[] = [
        {
            title: "String vs &str",
            description: "A `String` is a growable, heap-allocated data structure. A `&str` (string slice) is a view into string data.",
            code: `let mut s = String::from("hello");
s.push_str(" world");`,
            highlightedLines: [1, 2],
            visualComponent: (
                <div className="grid grid-cols-2 gap-4 h-full">
                    <StackView 
                        title="Stack"
                        items={[
                            { id: "1", name: "s", value: "ptr: 0x100, len: 11, cap: 11", type: "String" }
                        ]} 
                    />
                    <HeapView
                        title="Heap"
                        items={[
                            { id: "0x100", name: "data", value: "hello world", color: "bg-green-500/10 border-green-500/20" }
                        ]}
                    />
                </div>
            )
        },
        {
            title: "UTF-8 Encoding",
            description: "Rust strings are always valid UTF-8. Some characters take more than 1 byte.",
            code: `let s = "Rust 🦀";
// '🦀' takes 4 bytes!`,
            highlightedLines: [1],
            visualComponent: (
                <div className="flex flex-col gap-4 items-center justify-center h-full">
                    <div className="flex gap-1">
                        {['R', 'u', 's', 't', ' ', '🦀'].map((char, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className="w-12 h-12 flex items-center justify-center border border-primary/30 bg-primary/5 rounded text-lg font-bold">
                                    {char}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1 font-mono">
                                    {char === '🦀' ? '4B' : '1B'}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-sm text-muted-foreground mt-4">
                        Total Size: 5 bytes (text) + 4 bytes (emoji) = 9 bytes
                    </div>
                </div>
            )
        }
    ]

    return <CodeWalkthrough steps={steps} />
}

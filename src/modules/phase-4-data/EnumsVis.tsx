import { CodeWalkthrough, Step } from "@/components/visualizer/CodeWalkthrough"
import { StackView } from "@/components/visualizer/MemoryBlock"
import { SyntaxAnatomy, Token } from "@/components/visualizer/SyntaxAnatomy"

export default function EnumsVis() {
    const enumSyntaxTokens: Token[] = [
        { label: "Keyword", text: "enum", color: "keyword", description: "Defines a type that can be one of several variants." },
        { label: "Name", text: "Message", color: "type", description: "The name of the enum." },
        { label: "Block", text: "{", color: "punctuation" },
        { label: "Variant", text: "Quit", color: "identifier", description: "A unit variant (no data)." },
        { label: "Separator", text: ",", color: "punctuation" },
        { label: "Variant", text: "Write", color: "identifier" },
        { label: "Data", text: "(String)", color: "type", description: "This variant holds a String." },
        { label: "Separator", text: ",", color: "punctuation" },
        { label: "Variant", text: "Move", color: "identifier" },
        { label: "Data", text: "{ x: i32, y: i32 }", color: "type", description: "This variant holds named fields." },
        { label: "Block", text: "}", color: "punctuation" },
    ]

    const steps: Step[] = [
        {
            title: "Defining an Enum",
            description: "Enums allow you to define a type by enumerating its possible variants. Unlike many other languages, Rust enums can store data.",
            code: `enum Message {
    Quit,
    Write(String),
    Move { x: i32, y: i32 },
}

fn main() {
    let msg1 = Message::Quit;
    let msg2 = Message::Write(String::from("hello"));
}`,
            highlightedLines: [1, 2, 3, 4, 5],
            visualComponent: <SyntaxAnatomy 
                tokens={enumSyntaxTokens} 
                summary="The 'Message' enum can be a 'Quit' signal, a 'Write' command with text, OR a 'Move' command with coordinates."
            />
        },
        {
            title: "Memory Layout (Tagged Union)",
            description: "Enums are stored as a 'discriminant' (tag) plus enough space for the largest variant. This is also known as a Tagged Union.",
            code: `enum Message {
    Quit,                   // Tag: 0
    Write(String),          // Tag: 1 + ptr + cap + len
    Move { x: i32, y: i32 } // Tag: 2 + 4 bytes + 4 bytes
}

let m = Message::Move { x: 10, y: 20 };`,
            highlightedLines: [7],
            visualComponent: (
                <div className="h-full flex items-center justify-center">
                    <StackView 
                        title="Stack (Message::Move)"
                        items={[
                            { id: "tag", name: "tag", value: "2 (Move)", type: "u8", color: "bg-yellow-500/10 border-yellow-500/20" },
                            { id: "pad", name: "padding", value: "---", type: "padding", color: "bg-slate-500/5 text-slate-400" },
                            { id: "x", name: "x", value: "10", type: "i32", color: "bg-blue-500/10 border-blue-500/20" },
                            { id: "y", name: "y", value: "20", type: "i32", color: "bg-blue-500/10 border-blue-500/20" },
                            { id: "unused", name: "unused", value: "...", type: "unused", color: "bg-slate-500/5 text-slate-400" }
                        ]} 
                    />
                </div>
            )
        },
        {
            title: "The Option Enum",
            description: "Rust uses `Option<T>` instead of null. It forces you to handle the case where a value might be missing.",
            code: `enum Option<T> {
    None,
    Some(T),
}

let x: Option<i32> = Some(5);
let y: Option<i32> = None;`,
            highlightedLines: [1, 2, 3, 4, 6, 7],
            visualComponent: (
                <div className="grid grid-cols-2 gap-8 h-full items-center">
                    <StackView 
                        title="Stack (Some(5))"
                        items={[
                            { id: "tag1", name: "tag", value: "1 (Some)", type: "u8", color: "bg-green-500/10 border-green-500/20" },
                            { id: "val1", name: "value", value: "5", type: "i32", color: "bg-green-500/10 border-green-500/20" }
                        ]} 
                    />
                    <StackView 
                        title="Stack (None)"
                        items={[
                            { id: "tag2", name: "tag", value: "0 (None)", type: "u8", color: "bg-red-500/10 border-red-500/20" },
                            { id: "val2", name: "value", value: "junk/unused", type: "i32", color: "bg-slate-500/5 text-slate-400" }
                        ]} 
                    />
                </div>
            )
        }
    ]

    return <CodeWalkthrough steps={steps} />
}

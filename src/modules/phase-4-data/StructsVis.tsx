import { CodeWalkthrough, Step } from "@/components/visualizer/CodeWalkthrough"
import { StackView } from "@/components/visualizer/MemoryBlock"
import { SyntaxAnatomy, Token } from "@/components/visualizer/SyntaxAnatomy"

export default function StructsVis() {
    const structSyntaxTokens: Token[] = [
        { label: "Keyword", text: "struct", color: "keyword", description: "Defines a new custom data type." },
        { label: "Name", text: "User", color: "type", description: "The name of the struct (PascalCase)." },
        { label: "Block", text: "{", color: "punctuation" },
        { label: "Field", text: "active", color: "identifier", description: "A named data field." },
        { label: "Separator", text: ":", color: "punctuation" },
        { label: "Type", text: "bool", color: "type", description: "The type of the field." },
        { label: "Separator", text: ",", color: "punctuation" },
        { label: "Field", text: "count", color: "identifier" },
        { label: "Separator", text: ":", color: "punctuation" },
        { label: "Type", text: "u64", color: "type" },
        { label: "Block", text: "}", color: "punctuation" },
    ]

    const steps: Step[] = [
        {
            title: "Defining a Struct",
            description: "A struct allows you to group related data together. It's like a blueprint for a custom data type.",
            code: `struct User {
    active: bool,
    count: u64,
}

fn main() {
    let user1 = User {
        active: true,
        count: 100,
    };
}`,
            highlightedLines: [1, 2, 3, 4],
            visualComponent: <SyntaxAnatomy 
                tokens={structSyntaxTokens} 
                summary="We define a 'User' type with two fields: a boolean 'active' flag and a 64-bit unsigned integer 'count'."
            />
        },
        {
            title: "Memory Layout",
            description: "Struct fields are stored contiguously in memory. The compiler may add padding to align fields for performance.",
            code: `struct User {
    active: bool, // 1 byte
    // 7 bytes padding
    count: u64,   // 8 bytes
}

let user1 = User { active: true, count: 100 };`,
            highlightedLines: [7],
            visualComponent: (
                <div className="h-full flex items-center justify-center">
                    <StackView 
                        title="Stack Frame"
                        items={[
                            { id: "1", name: "user1.active", value: "true (0x01)", type: "bool", color: "bg-blue-500/10 border-blue-500/20" },
                            { id: "pad", name: "<padding>", value: "-------", type: "7 bytes", color: "bg-slate-500/5 border-slate-500/10 text-slate-400" },
                            { id: "2", name: "user1.count", value: "100", type: "u64", color: "bg-green-500/10 border-green-500/20" }
                        ]} 
                    />
                </div>
            )
        },
        {
            title: "Tuple Structs",
            description: "Tuple structs have named types but unnamed fields. They are useful for wrapper types or distinct concepts like 'Color' vs 'Point'.",
            code: `struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

fn main() {
    let black = Color(0, 0, 0);
    let origin = Point(0, 0, 0);
    // black and origin are different types!
}`,
            highlightedLines: [1, 2, 5, 6],
            visualComponent: (
                <div className="grid grid-cols-2 gap-8 h-full items-center">
                    <StackView 
                        title="Stack (black)"
                        items={[
                            { id: "c1", name: "0", value: "0", type: "i32" },
                            { id: "c2", name: "1", value: "0", type: "i32" },
                            { id: "c3", name: "2", value: "0", type: "i32" }
                        ]} 
                    />
                    <StackView 
                        title="Stack (origin)"
                        items={[
                            { id: "p1", name: "0", value: "0", type: "i32" },
                            { id: "p2", name: "1", value: "0", type: "i32" },
                            { id: "p3", name: "2", value: "0", type: "i32" }
                        ]} 
                    />
                </div>
            )
        },
        {
            title: "Methods (impl)",
            description: "Methods are functions defined within the context of a struct. They usually take `&self` to access the instance data.",
            code: `struct Rectangle { width: u32, height: u32 }

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rect = Rectangle { width: 10, height: 5 };
    let a = rect.area(); // Automatic borrowing
}`,
            highlightedLines: [3, 4, 5, 6, 10],
            visualComponent: (
                <div className="h-full flex flex-col items-center justify-center gap-4">
                    <StackView 
                        title="Stack"
                        items={[
                            { id: "r1", name: "rect.width", value: "10", type: "u32" },
                            { id: "r2", name: "rect.height", value: "5", type: "u32" },
                            { id: "a", name: "a", value: "50", type: "u32", color: "bg-yellow-500/10 border-yellow-500/20" }
                        ]} 
                    />
                    <div className="p-4 bg-muted rounded-lg text-sm text-muted-foreground max-w-md text-center">
                        <code>rect.area()</code> is syntactic sugar for <code>Rectangle::area(&rect)</code>.
                    </div>
                </div>
            )
        }
    ]

    return <CodeWalkthrough steps={steps} />
}

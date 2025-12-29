import { CodeWalkthrough, Step } from "@/components/visualizer/CodeWalkthrough"
import { StackView } from "@/components/visualizer/MemoryBlock"

export default function IntegerVis() {
    const steps: Step[] = [
        {
            title: "Signed vs Unsigned",
            description: "Integers can be signed (i) or unsigned (u). Signed integers can be negative. Unsigned integers are always positive.",
            code: `fn main() {
    let a: i8 = -10; // Signed 8-bit
    let b: u8 = 10;  // Unsigned 8-bit
}`,
            highlightedLines: [2, 3],
            visualComponent: (
                <StackView 
                    items={[
                        { id: "1", name: "a", value: "-10", type: "i8" },
                        { id: "2", name: "b", value: "10", type: "u8" }
                    ]} 
                />
            )
        },
        {
            title: "Integer Overflow (Debug)",
            description: "In Debug mode, Rust checks for integer overflow. If a value exceeds the type's range, the program panics.",
            code: `fn main() {
    let mut x: u8 = 255;
    // x = x + 1; 
    // Panic: attempt to add with overflow
}`,
            highlightedLines: [3],
            visualComponent: (
                <StackView 
                    items={[
                        { id: "3", name: "x", value: "255", type: "u8", color: "bg-red-500/20 border-red-500" }
                    ]} 
                />
            ),
            output: "thread 'main' panicked at 'attempt to add with overflow'"
        },
        {
            title: "Integer Overflow (Release)",
            description: "In Release mode, Rust performs two's complement wrapping. 255 + 1 becomes 0 for a u8.",
            code: `fn main() {
    let mut x: u8 = 255;
    x = x.wrapping_add(1);
    println!("{}", x);
}`,
            highlightedLines: [3, 4],
            visualComponent: (
                <StackView 
                    items={[
                        { id: "3", name: "x", value: "0", type: "u8", color: "bg-yellow-500/20 border-yellow-500" }
                    ]} 
                />
            ),
            output: "0"
        }
    ]

    return <CodeWalkthrough steps={steps} />
}

import { CodeWalkthrough, Step } from "@/components/visualizer/CodeWalkthrough"
import { motion } from "framer-motion"

export function UnsafeVis() {
    const steps: Step[] = [
        {
            title: "Raw Pointers",
            description: "Raw pointers (*const T, *mut T) ignore borrowing rules. You can create them safely, but dereferencing them is unsafe.",
            code: `let mut num = 5;

let r1 = &num as *const i32;
let r2 = &mut num as *mut i32;

// Safe to create, but...
// println!("{}", *r1); // ERROR: unsafe operation`,
            highlightedLines: [3, 4],
            visualComponent: (
                <div className="flex flex-col items-center justify-center gap-8 h-full">
                    <div className="flex gap-8 items-center">
                        <div className="p-4 bg-slate-800 rounded border border-slate-700">
                            <div className="text-xs text-muted-foreground mb-1">Memory</div>
                            <div className="w-12 h-12 bg-blue-500/20 border border-blue-500 flex items-center justify-center font-bold text-blue-400">
                                5
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-24 h-1 bg-slate-600 relative">
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-600 rotate-45" />
                                </div>
                                <div className="px-2 py-1 bg-slate-700 rounded text-xs font-mono text-slate-300">*const</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-24 h-1 bg-slate-600 relative">
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-600 rotate-45" />
                                </div>
                                <div className="px-2 py-1 bg-slate-700 rounded text-xs font-mono text-slate-300">*mut</div>
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground text-center max-w-[300px]">
                        Raw pointers are just memory addresses. The compiler doesn't track their lifetimes or ownership.
                    </p>
                </div>
            )
        },
        {
            title: "The Unsafe Block",
            description: "To dereference a raw pointer, you must promise the compiler that the pointer is valid.",
            code: `let mut num = 5;
let r1 = &num as *const i32;

unsafe {
    println!("r1 is: {}", *r1);
}`,
            highlightedLines: [4, 5, 6],
            visualComponent: (
                <div className="flex flex-col items-center justify-center gap-8 h-full">
                    <div className="relative p-8 border-2 border-dashed border-red-500/50 rounded-xl bg-red-500/5">
                        <div className="absolute -top-3 left-4 px-2 bg-background text-red-500 text-xs font-bold">
                            unsafe scope
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <div className="text-sm font-mono text-muted-foreground">*r1</div>
                            <div className="text-xl">➜</div>
                            <motion.div 
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="w-12 h-12 bg-green-500/20 border border-green-500 flex items-center justify-center font-bold text-green-400 rounded"
                            >
                                5
                            </motion.div>
                        </div>
                    </div>
                    <p className="text-xs text-red-400 font-bold text-center max-w-[300px] animate-pulse">
                        YOU are now the borrow checker. If *r1 is invalid, the program will crash (segfault).
                    </p>
                </div>
            )
        },
        {
            title: "FFI (Foreign Function Interface)",
            description: "Calling functions from other languages (like C) is always unsafe.",
            code: `extern "C" {
    fn abs(input: i32) -> i32;
}

fn main() {
    unsafe {
        println!("Absolute value: {}", abs(-3));
    }
}`,
            highlightedLines: [1, 2, 3, 6, 7, 8],
            visualComponent: (
                <div className="flex flex-col items-center justify-center gap-8 h-full">
                    <div className="flex gap-8 items-center">
                        <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg flex flex-col items-center gap-2">
                            <div className="text-xs font-bold text-orange-400">Rust World</div>
                            <div className="px-3 py-1 bg-slate-800 rounded text-xs font-mono">main()</div>
                        </div>

                        <div className="flex flex-col items-center gap-1">
                            <div className="text-xs text-red-500 font-bold">unsafe call</div>
                            <div className="w-20 h-1 bg-red-500/50" />
                        </div>

                        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg flex flex-col items-center gap-2">
                            <div className="text-xs font-bold text-blue-400">C World</div>
                            <div className="px-3 py-1 bg-slate-800 rounded text-xs font-mono">abs(-3)</div>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground text-center max-w-[300px]">
                        Rust cannot verify the safety of C code, so calling it requires an unsafe block.
                    </p>
                </div>
            )
        }
    ]

    return <CodeWalkthrough steps={steps} title="Unsafe Rust" />
}

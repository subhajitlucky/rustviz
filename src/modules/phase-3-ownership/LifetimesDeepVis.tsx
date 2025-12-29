import { CodeWalkthrough, Step } from "@/components/visualizer/CodeWalkthrough"

export default function LifetimesDeepVis() {
    const steps: Step[] = [
        {
            title: "Dangling References",
            description: "Rust prevents 'dangling pointers'—references to data that has been cleaned up. The compiler ensures data lives longer than any reference to it.",
            code: `fn main() {
    let r;

    {
        let x = 5;
        r = &x; // Error: 'x does not live long enough
    } // x is dropped here

    println!("r: {}", r); // r would point to garbage!
}`,
            highlightedLines: [5, 7],
            visualComponent: (
                <div className="flex flex-col gap-4 items-center justify-center h-full">
                    <div className="relative p-6 border-2 border-slate-700 rounded-xl w-64">
                        <div className="absolute -top-3 left-4 bg-background px-2 text-slate-500">Outer Scope</div>
                        <div className="mb-4 font-mono">let r;</div>
                        
                        <div className="relative p-4 border-2 border-red-500/50 bg-red-500/5 rounded-lg">
                            <div className="absolute -top-3 left-4 bg-background px-2 text-red-500">Inner Scope</div>
                            <div className="font-mono">let x = 5;</div>
                            <div className="font-mono text-red-400">r = &x;</div>
                        </div>
                        <div className="text-xs text-red-500 mt-2 text-center">x dies here!</div>
                    </div>
                    <div className="text-red-400 font-bold">
                        Compiler Error: `x` dropped while still borrowed
                    </div>
                </div>
            )
        },
        {
            title: "Non-Lexical Lifetimes (NLL)",
            description: "Modern Rust is smart. A reference's lifetime ends the last time it is USED, not necessarily at the end of the scope.",
            code: `fn main() {
    let mut s = String::from("hello");

    let r1 = &s; 
    println!("Read: {}", r1); 
    // r1 is never used again. Its lifetime ends HERE.

    let r2 = &mut s; // This is now OK!
    r2.push_str(" world");
}`,
            highlightedLines: [6, 8],
            visualComponent: (
                <div className="flex flex-col gap-4 items-center justify-center h-full">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="font-mono text-sm">r1 created</span>
                    </div>
                    <div className="w-0.5 h-8 bg-blue-500" />
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="font-mono text-sm">r1 used (println)</span>
                    </div>
                    <div className="w-full border-t border-dashed border-slate-600 my-2 relative">
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-background px-2 text-xs text-slate-500">r1 dies (NLL)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="font-mono text-sm">r2 created (&mut)</span>
                    </div>
                    <div className="w-0.5 h-8 bg-red-500" />
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="font-mono text-sm">r2 used (push)</span>
                    </div>
                </div>
            )
        }
    ]

    return <CodeWalkthrough steps={steps} />
}

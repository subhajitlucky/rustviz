import { CodeWalkthrough, Step } from "@/components/visualizer/CodeWalkthrough"
import { SyntaxAnatomy, Token } from "@/components/visualizer/SyntaxAnatomy"
import { motion } from "framer-motion"

export default function TraitBoundsVis() {
    const boundSyntax: Token[] = [
        { label: "Keyword", text: "fn", color: "keyword" },
        { label: "Name", text: "notify", color: "identifier" },
        { label: "Generic", text: "<T:", color: "type" },
        { label: "Bound 1", text: "Summary", color: "type", description: "Must implement Summary" },
        { label: "Operator", text: "+", color: "operator", description: "AND" },
        { label: "Bound 2", text: "Display", color: "type", description: "Must implement Display" },
        { label: "Generic", text: ">", color: "type" },
        { label: "Param", text: "(item: T)", color: "identifier" },
    ]

    const steps: Step[] = [
        {
            title: "Multiple Bounds (+)",
            description: "Sometimes you need a type to do multiple things. The `+` syntax allows you to combine trait bounds.",
            code: `fn notify<T: Summary + Display>(item: T) {
    println!("Breaking news: {}", item.summarize());
    // Works because T is Display AND Summary
}`,
            highlightedLines: [1],
            visualComponent: <SyntaxAnatomy tokens={boundSyntax} />
        },
        {
            title: "Where Clauses",
            description: "When bounds get too long, `where` clauses make the function signature cleaner and easier to read.",
            code: `fn some_function<T, U>(t: &T, u: &U) -> i32
    where T: Display + Clone,
          U: Clone + Debug 
{
    // ...
}`,
            highlightedLines: [2, 3],
            visualComponent: (
                <div className="flex flex-col items-center justify-center gap-6 h-full">
                    <div className="p-4 border rounded-lg bg-muted/30 w-full max-w-md">
                        <div className="text-xs font-bold text-muted-foreground mb-2 uppercase">Visualizing Constraints</div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded flex flex-col items-center">
                                <span className="font-bold text-blue-400 text-lg">T</span>
                                <div className="flex gap-1 mt-2">
                                    <span className="text-[10px] bg-blue-500/20 px-1 rounded">Display</span>
                                    <span className="text-[10px] bg-blue-500/20 px-1 rounded">Clone</span>
                                </div>
                            </div>
                            <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded flex flex-col items-center">
                                <span className="font-bold text-purple-400 text-lg">U</span>
                                <div className="flex gap-1 mt-2">
                                    <span className="text-[10px] bg-purple-500/20 px-1 rounded">Clone</span>
                                    <span className="text-[10px] bg-purple-500/20 px-1 rounded">Debug</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "impl Trait Return",
            description: "You can return `impl Trait` to hide the concrete type. This is useful for closures or complex iterator chains.",
            code: `fn make_adder(a: i32) -> impl Fn(i32) -> i32 {
    move |b| a + b
}`,
            highlightedLines: [1],
            visualComponent: (
                <div className="flex flex-col items-center justify-center gap-4 h-full">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                            <span className="font-mono text-sm">fn make_adder()</span>
                        </div>
                        <div className="text-2xl">→</div>
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="p-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/50 rounded-lg relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-stripes opacity-10"></div>
                            <span className="font-bold text-indigo-300 relative z-10">impl Fn(...)</span>
                            <div className="text-[10px] text-indigo-400/70 mt-1 text-center relative z-10">(Opaque Type)</div>
                        </motion.div>
                    </div>
                    <p className="text-xs text-muted-foreground max-w-xs text-center">
                        The caller knows it's a function, but doesn't know (or care) about the exact internal closure type.
                    </p>
                </div>
            )
        }
    ]

    return <CodeWalkthrough steps={steps} title="Advanced Trait Bounds" />
}

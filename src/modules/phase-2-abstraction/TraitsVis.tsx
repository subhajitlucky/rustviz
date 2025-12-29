import { CodeWalkthrough, Step } from "@/components/visualizer/CodeWalkthrough"
import { SyntaxAnatomy, Token } from "@/components/visualizer/SyntaxAnatomy"
import { motion } from "framer-motion"

export default function TraitsVis() {
    const traitSyntax: Token[] = [
        { label: "Keyword", text: "trait", color: "keyword" },
        { label: "Name", text: "Speak", color: "type" },
        { label: "Block", text: "{", color: "punctuation" },
        { label: "Method", text: "fn say(&self);", color: "identifier", description: "Requirement" },
        { label: "Block", text: "}", color: "punctuation" },
    ]

    const steps: Step[] = [
        {
            title: "Syntax: Defining a Trait",
            description: "A trait defines a shared behavior that types must implement. It's a contract between the caller and the implementer.",
            code: `trait Speak {
    fn say(&self);
}`,
            highlightedLines: [1, 2, 3],
            visualComponent: <SyntaxAnatomy tokens={traitSyntax} />
        },
        {
            title: "The Implementation Contract",
            description: "When a type implements a trait, it promises to provide the logic for all required methods.",
            code: `struct Dog;

impl Speak for Dog {
    fn say(&self) {
        println!("Woof!");
    }
}`,
            highlightedLines: [3, 4, 5],
            visualComponent: (
                <div className="flex flex-col items-center justify-center gap-6 h-full">
                    <div className="flex gap-4 items-center">
                        <div className="p-4 rounded-lg border-2 border-dashed border-muted-foreground/50 opacity-50">
                            <div className="text-[10px] uppercase font-bold text-center mb-2">Trait: Speak</div>
                            <div className="font-mono text-xs">fn say(&amp;self)</div>
                        </div>
                        <div className="text-2xl">←</div>
                        <motion.div 
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="p-4 rounded-lg border-2 border-green-500 bg-green-500/10 shadow-lg shadow-green-500/10"
                        >
                            <div className="text-[10px] uppercase font-bold text-center mb-2">Impl for Dog</div>
                            <div className="font-mono text-xs text-green-400">say() {"{ println!(\"Woof!\") }"}</div>
                        </motion.div>
                    </div>
                </div>
            )
        },
        {
            title: "Trait Bounds",
            description: "You can restrict generics to only types that implement a specific trait. This is 'Parametric Polymorphism'.",
            code: `fn make_it_talk<T: Speak>(thing: T) {
    thing.say(); // Guaranteed to exist!
}`,
            highlightedLines: [1],
            visualComponent: (
                <div className="flex flex-col items-center justify-center gap-4 h-full text-center">
                    <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">The Guarantee</div>
                    <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800 max-w-[300px]">
                        <p className="text-sm italic text-slate-300">
                            "I don't care what type <span className="text-primary font-bold">T</span> is, as long as it has a <span className="text-green-400 font-bold">say()</span> method."
                        </p>
                    </div>
                </div>
            )
        }
    ]

    return <CodeWalkthrough steps={steps} title="Traits: Shared Behavior" />
}

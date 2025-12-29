import { CodeWalkthrough, Step } from "@/components/visualizer/CodeWalkthrough"

export default function IteratorsVsLoopsVis() {
    const steps: Step[] = [
        {
            title: "Imperative Loops",
            description: "Traditional loops require you to manage the state (index) and control flow explicitly. This can lead to off-by-one errors.",
            code: `let v = vec![1, 2, 3];
let mut result = Vec::new();
for i in 0..v.len() {
    result.push(v[i] * 2);
}`,
            highlightedLines: [3, 4],
            visualComponent: (
                <div className="flex flex-col items-center justify-center gap-6 h-full">
                    <div className="flex gap-2">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="flex flex-col items-center gap-2">
                                <div className="w-12 h-12 border border-border flex items-center justify-center rounded bg-card">
                                    {i + 1}
                                </div>
                                <div className="text-xs font-mono text-muted-foreground">v[{i}]</div>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-yellow-500 font-mono bg-yellow-500/10 px-4 py-2 rounded border border-yellow-500/20">
                        <span>i = 0</span>
                        <span>→</span>
                        <span>i = 1</span>
                        <span>→</span>
                        <span>i = 2</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Manual Index Management</div>
                </div>
            )
        },
        {
            title: "Declarative Iterators",
            description: "Iterators express *what* you want to do, not *how* to do it. This is often cleaner and eliminates bounds checks.",
            code: `let v = vec![1, 2, 3];
let result: Vec<_> = v.iter()
    .map(|x| x * 2)
    .collect();`,
            highlightedLines: [2, 3, 4],
            visualComponent: (
                <div className="flex flex-col items-center justify-center gap-6 h-full">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-card border rounded-lg shadow-sm">
                            Input Stream
                        </div>
                        <div className="text-2xl text-primary">→</div>
                        <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg shadow-sm text-primary font-bold">
                            Logic: x * 2
                        </div>
                        <div className="text-2xl text-primary">→</div>
                        <div className="p-4 bg-card border rounded-lg shadow-sm">
                            Collection
                        </div>
                    </div>
                    <div className="text-xs text-green-500 font-bold uppercase tracking-widest">
                        Zero-Cost Abstraction
                    </div>
                </div>
            )
        }
    ]

    return <CodeWalkthrough steps={steps} />
}

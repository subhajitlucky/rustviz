import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Terminal, Play, RefreshCw, ArrowDown, CheckCircle2, Box as BoxIcon } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Define the available concepts for visualization
type Concept = "ownership" | "borrowing" | "lifetimes" | "structs" | "concurrency" | "smart_pointers" | "error_handling" | "iterators";

interface ConceptData {
    id: Concept;
    name: string;
    code: string;
    description: string;
}

const CONCEPTS: ConceptData[] = [
    {
        id: "ownership",
        name: "Ownership Transfer",
        description: "Watch how ownership moves from one variable to another, invalidating the original.",
        code: `fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // Move occurs here
    
    // println!("{}", s1); // Error!
    println!("{}", s2);
}`
    },
    {
        id: "borrowing",
        name: "Borrowing & References",
        description: "See how references allow access without taking ownership.",
        code: `fn main() {
    let s1 = String::from("hello");
    let len = calculate_len(&s1);
    
    println!("The length of '{}' is {}.", s1, len);
}

fn calculate_len(s: &String) -> usize {
    s.len()
}`
    },
    {
        id: "lifetimes",
        name: "Lifetimes",
        description: "Visualize how long references remain valid.",
        code: `fn main() {
    let r;
    {
        let x = 5;
        r = &x; // Error: x dropped here
    }
    // println!("r: {}", r);
}`
    },
    {
        id: "structs",
        name: "Struct Memory Layout",
        description: "See how structs are stored in memory.",
        code: `struct User {
    active: bool,
    username: String,
    sign_in_count: u64,
}

fn main() {
    let user1 = User {
        email: String::from("someone@example.com"),
        username: String::from("someusername123"),
        active: true,
        sign_in_count: 1,
    };
}`
    },
    {
        id: "concurrency",
        name: "Threads & Channels",
        description: "Visualize message passing between threads.",
        code: `use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let val = String::from("hi");
        tx.send(val).unwrap();
    });

    let received = rx.recv().unwrap();
    println!("Got: {}", received);
}`
    },
    {
        id: "smart_pointers",
        name: "Smart Pointers (Box)",
        description: "See how Box<T> allocates data on the heap.",
        code: `fn main() {
    let b = Box::new(5);
    println!("b = {}", b);
    
    // Recursive types need Box
    enum List {
        Cons(i32, Box<List>),
        Nil,
    }
}`
    },
    {
        id: "error_handling",
        name: "Result & Option",
        description: "Visualize control flow with Result and Option types.",
        code: `fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("Division by zero"))
    } else {
        Ok(a / b)
    }
}

fn main() {
    match divide(10.0, 2.0) {
        Ok(val) => println!("Result: {}", val),
        Err(e) => println!("Error: {}", e),
    }
}`
    },
    {
        id: "iterators",
        name: "Iterators & Closures",
        description: "See how iterators process sequences lazily.",
        code: `fn main() {
    let v1 = vec![1, 2, 3];
    
    let v2: Vec<_> = v1.iter()
        .map(|x| x + 1)
        .collect();
        
    assert_eq!(v2, vec![2, 3, 4]);
}`
    }
];

export function Playground() {
    const [selectedConcept, setSelectedConcept] = useState<Concept>("ownership");
    const [isPlaying, setIsPlaying] = useState(false);
    const [step, setStep] = useState(0);

    const currentConcept = CONCEPTS.find(c => c.id === selectedConcept)!;

    const handleRun = () => {
        setIsPlaying(true);
        setStep(0);
        // Simulate animation steps
        const interval = setInterval(() => {
            setStep(prev => {
                if (prev >= 3) {
                    clearInterval(interval);
                    return prev;
                }
                return prev + 1;
            });
        }, 1500);
    };

    const handleReset = () => {
        setIsPlaying(false);
        setStep(0);
    };

    return (
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-4">
                <div>
                    <p className="text-muted-foreground">
                        Select a concept to visualize how Rust executes code and manages memory.
                    </p>
                </div>

                <div className="flex gap-4">
                    <select 
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={selectedConcept}
                        onChange={(e) => {
                            setSelectedConcept(e.target.value as Concept);
                            handleReset();
                        }}
                    >
                        {CONCEPTS.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>Code Editor</span>
                            <Badge variant="outline">main.rs</Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="min-h-[300px] rounded-md bg-slate-950 p-4 font-mono text-sm text-slate-50 overflow-auto">
                            <pre>{currentConcept.code}</pre>
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                            <Button variant="outline" onClick={handleReset} disabled={!isPlaying}>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Reset
                            </Button>
                            <Button onClick={handleRun} disabled={isPlaying && step < 3}>
                                {isPlaying && step < 3 ? (
                                    <>Running...</>
                                ) : (
                                    <>
                                        <Play className="mr-2 h-4 w-4" />
                                        Run Simulation
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Memory Visualization</h3>
                <Card className="h-[500px] border-dashed flex flex-col relative overflow-hidden bg-slate-50 dark:bg-slate-900/50">
                    <div className="absolute top-4 right-4 z-10">
                        <Badge variant={isPlaying ? "default" : "secondary"}>
                            {isPlaying ? `Step ${step + 1}/4` : "Ready"}
                        </Badge>
                    </div>
                    
                    <div className="flex-1 p-4 md:p-8 flex items-center justify-center overflow-x-auto">
                        <AnimatePresence mode="wait">
                            {!isPlaying ? (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-center text-muted-foreground"
                                >
                                    <Terminal className="h-12 w-12 mx-auto mb-4 opacity-20" />
                                    <p>Click "Run Simulation" to visualize {currentConcept.name}</p>
                                </motion.div>
                            ) : (
                                <VisualizationCanvas concept={selectedConcept} step={step} />
                            )}
                        </AnimatePresence>
                    </div>
                    
                    <div className="p-4 border-t bg-muted/20">
                        <p className="text-sm text-muted-foreground">
                            {currentConcept.description}
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    )
}

function VisualizationCanvas({ concept, step }: { concept: Concept, step: number }) {
    if (concept === "ownership") {
        return (
            <div className="relative w-full max-w-md h-64">
                {/* Stack Frame */}
                <div className="absolute left-0 top-0 bottom-0 w-32 border-r-2 border-dashed border-slate-300 dark:border-slate-700 pr-4 flex flex-col justify-center gap-8">
                    <div className="text-xs text-center font-bold text-muted-foreground mb-2">STACK</div>
                    
                    <motion.div 
                        className="p-2 border rounded bg-white dark:bg-slate-800 shadow-sm"
                        animate={{ opacity: step >= 1 ? 0.5 : 1 }}
                    >
                        <div className="text-xs font-mono text-muted-foreground">s1</div>
                        <div className="text-xs font-bold">ptr: 0x123</div>
                    </motion.div>

                    <motion.div 
                        className="p-2 border rounded bg-white dark:bg-slate-800 shadow-sm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: step >= 1 ? 1 : 0, x: step >= 1 ? 0 : -20 }}
                    >
                        <div className="text-xs font-mono text-muted-foreground">s2</div>
                        <div className="text-xs font-bold">ptr: 0x123</div>
                    </motion.div>
                </div>

                {/* Heap */}
                <div className="absolute right-0 top-0 bottom-0 w-48 pl-8 flex flex-col justify-center">
                    <div className="text-xs text-center font-bold text-muted-foreground mb-2">HEAP</div>
                    
                    <motion.div 
                        className="p-4 border-2 border-primary rounded-lg bg-primary/10"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ 
                            scale: 1, 
                            opacity: 1,
                            borderColor: step >= 1 ? "var(--primary)" : "var(--primary)",
                            x: step >= 1 ? 0 : 0
                        }}
                    >
                        <div className="text-center font-mono font-bold">"hello"</div>
                        <div className="text-[10px] text-center text-muted-foreground mt-1">addr: 0x123</div>
                    </motion.div>

                    {/* Connection Lines */}
                    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible">
                        {step === 0 && (
                            <motion.path 
                                d="M -20 100 C 10 100, 10 100, 30 100" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2"
                                markerEnd="url(#arrow)"
                                className="text-primary"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                            />
                        )}
                        {step >= 1 && (
                            <motion.path 
                                d="M -20 180 C 10 180, 10 100, 30 100" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2"
                                markerEnd="url(#arrow)"
                                className="text-primary"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                            />
                        )}
                        <defs>
                            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
                            </marker>
                        </defs>
                    </svg>
                </div>
            </div>
        )
    }

    if (concept === "iterators") {
        return (
            <div className="flex flex-col items-center gap-8 w-full max-w-2xl">
                <div className="flex flex-col items-center gap-2">
                    <div className="text-sm font-mono text-muted-foreground">v1</div>
                    <div className="flex gap-2">
                        {[1, 2, 3].map((val, idx) => (
                            <motion.div
                                key={idx}
                                className="w-12 h-12 border-2 border-slate-300 dark:border-slate-700 rounded flex items-center justify-center font-bold bg-white dark:bg-slate-800"
                                animate={{ 
                                    scale: step === 1 ? 1.1 : 1,
                                    borderColor: step >= 1 ? "var(--primary)" : undefined
                                }}
                            >
                                {val}
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="h-16 flex items-center justify-center relative w-full">
                    {step >= 1 && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center"
                        >
                            <div className="text-xs font-mono text-primary mb-1">.map(|x| x + 1)</div>
                            <ArrowDown className="h-6 w-6 text-primary" />
                        </motion.div>
                    )}
                </div>

                <div className="flex flex-col items-center gap-2">
                    <div className="text-sm font-mono text-muted-foreground">v2</div>
                    <div className="flex gap-2">
                        {[2, 3, 4].map((val, idx) => (
                            <motion.div
                                key={idx}
                                className="w-12 h-12 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded flex items-center justify-center font-bold bg-slate-50 dark:bg-slate-900"
                                initial={{ opacity: 0.3, scale: 0.8 }}
                                animate={{ 
                                    opacity: step >= 2 ? 1 : 0.3,
                                    scale: step >= 2 ? 1 : 0.8,
                                    borderColor: step >= 2 ? "var(--primary)" : undefined,
                                    borderStyle: step >= 3 ? "solid" : "dashed"
                                }}
                            >
                                {step >= 2 ? val : "?"}
                            </motion.div>
                        ))}
                    </div>
                </div>
                
                {step >= 3 && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-green-500 font-bold flex items-center gap-2"
                    >
                        <CheckCircle2 className="h-5 w-5" />
                        Collection Complete
                    </motion.div>
                )}
            </div>
        )
    }

    if (concept === "concurrency") {
        return (
            <div className="flex justify-between w-full max-w-lg px-8">
                <div className="flex flex-col items-center gap-4">
                    <div className="text-sm font-bold">Main Thread</div>
                    <div className="w-2 h-64 bg-slate-200 dark:bg-slate-800 rounded-full relative">
                        <motion.div 
                            className="absolute top-0 w-full bg-primary rounded-full"
                            initial={{ height: "0%" }}
                            animate={{ height: step >= 3 ? "100%" : "30%" }}
                        />
                        {step >= 3 && (
                            <motion.div 
                                className="absolute bottom-10 -right-24 bg-card border p-2 rounded shadow-sm text-xs"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                Got: "hi"
                            </motion.div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col items-center gap-4">
                    <div className="text-sm font-bold">Spawned Thread</div>
                    <div className="w-2 h-48 bg-slate-200 dark:bg-slate-800 rounded-full relative mt-16">
                         <motion.div 
                            className="absolute top-0 w-full bg-blue-500 rounded-full"
                            initial={{ height: "0%" }}
                            animate={{ height: step >= 1 ? "100%" : "0%" }}
                        />
                        {step >= 1 && step < 3 && (
                            <motion.div 
                                className="absolute top-1/2 -left-4 w-4 h-4 bg-yellow-400 rounded-full z-10"
                                initial={{ x: 0 }}
                                animate={{ x: -150 }}
                                transition={{ duration: 1 }}
                            />
                        )}
                    </div>
                </div>
            </div>
        )
    }

    if (concept === "smart_pointers") {
        return (
            <div className="relative w-full max-w-md h-64 flex items-center justify-center gap-16">
                 <div className="flex flex-col items-center gap-2">
                    <div className="text-xs font-bold text-muted-foreground">STACK</div>
                    <motion.div 
                        className="p-3 border-2 border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 shadow-sm w-24"
                        animate={{ borderColor: step >= 1 ? "var(--primary)" : undefined }}
                    >
                        <div className="text-xs font-mono text-muted-foreground">b</div>
                        <div className="text-sm font-bold">ptr</div>
                    </motion.div>
                 </div>

                 {step >= 1 && (
                     <motion.div 
                        className="h-0.5 w-16 bg-primary"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                     />
                 )}

                 <div className="flex flex-col items-center gap-2">
                    <div className="text-xs font-bold text-muted-foreground">HEAP</div>
                    <motion.div 
                        className="p-4 border-2 border-primary rounded-lg bg-primary/10 w-24 flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: step >= 1 ? 1 : 0, scale: step >= 1 ? 1 : 0.8 }}
                    >
                        <div className="text-xl font-bold">5</div>
                    </motion.div>
                 </div>
            </div>
        )
    }

    // Generic fallback for others
    return (
        <div className="text-center space-y-4">
            <div className="flex justify-center">
                <BoxIcon className="h-16 w-16 text-muted-foreground opacity-20" />
            </div>
            <div>
                <h3 className="text-lg font-semibold">Visualization Active</h3>
                <p className="text-muted-foreground">
                    Simulating {concept.replace('_', ' ')}...
                </p>
            </div>
            <div className="flex justify-center gap-2 mt-4">
                {[0, 1, 2, 3].map((s) => (
                    <motion.div
                        key={s}
                        className={`h-2 w-2 rounded-full ${step >= s ? "bg-primary" : "bg-slate-200 dark:bg-slate-800"}`}
                        animate={{ scale: step === s ? 1.5 : 1 }}
                    />
                ))}
            </div>
        </div>
    )
}

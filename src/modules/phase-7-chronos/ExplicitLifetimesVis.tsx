import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Timer, ArrowRight, Info, Box, EyeOff, Infinity } from "lucide-react"

export function ExplicitLifetimesVis() {
    const [activeTab, setActiveTab] = useState<'basics' | 'structs' | 'elision' | 'static'>('basics')
    const [highlight, setHighlight] = useState<string | null>(null)

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
                <Button 
                    variant={activeTab === 'basics' ? "default" : "outline"}
                    onClick={() => setActiveTab('basics')}
                    size="sm"
                >
                    Basics & Functions
                </Button>
                <Button 
                    variant={activeTab === 'structs' ? "default" : "outline"}
                    onClick={() => setActiveTab('structs')}
                    size="sm"
                >
                    Struct Lifetimes
                </Button>
                <Button 
                    variant={activeTab === 'elision' ? "default" : "outline"}
                    onClick={() => setActiveTab('elision')}
                    size="sm"
                >
                    Lifetime Elision
                </Button>
                <Button 
                    variant={activeTab === 'static' ? "default" : "outline"}
                    onClick={() => setActiveTab('static')}
                    size="sm"
                >
                    'static
                </Button>
            </div>

            <Card className="p-6 bg-muted/20 border-dashed min-h-[400px]">
                <AnimatePresence mode="wait">
                    {activeTab === 'basics' && (
                        <motion.div 
                            key="basics"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex flex-col md:flex-row gap-8"
                        >
                            <div className="flex-1 space-y-4">
                                <div className="font-mono text-sm bg-slate-950 text-slate-50 p-6 rounded-lg relative leading-relaxed">
                                    <div className="text-muted-foreground opacity-50">// The compiler needs to know which reference lives as long as the returned one</div>
                                    <div className="mt-4">
                                        <span className="text-purple-400">fn</span> <span className="text-blue-400">longest</span>
                                        <span 
                                            onMouseEnter={() => setHighlight('lifetime')} 
                                            onMouseLeave={() => setHighlight(null)}
                                            className={`cursor-help transition-colors ${highlight === 'lifetime' ? 'text-yellow-400 font-bold underline' : 'text-yellow-500'}`}
                                        >
                                            &lt;'a&gt;
                                        </span>
                                        (
                                            x: 
                                            <span 
                                                onMouseEnter={() => setHighlight('arg1')} 
                                                onMouseLeave={() => setHighlight(null)}
                                                className={`transition-colors ${highlight === 'arg1' ? 'bg-yellow-500/20' : ''}`}
                                            >
                                                &'a str
                                            </span>, 
                                            y: 
                                            <span 
                                                onMouseEnter={() => setHighlight('arg2')} 
                                                onMouseLeave={() => setHighlight(null)}
                                                className={`transition-colors ${highlight === 'arg2' ? 'bg-yellow-500/20' : ''}`}
                                            >
                                                &'a str
                                            </span>
                                        ) -&gt; 
                                        <span 
                                            onMouseEnter={() => setHighlight('ret')} 
                                            onMouseLeave={() => setHighlight(null)}
                                            className={`transition-colors ${highlight === 'ret' ? 'bg-yellow-500/20 font-bold' : ''}`}
                                        >
                                            &'a str
                                        </span> 
                                        {" {"}
                                    </div>
                                    <div className="pl-4 mt-2">
                                        <span className="text-purple-400">if</span> x.len() &gt; y.len() {"{"} x {"}"} <span className="text-purple-400">else</span> {"{"} y {"}"}
                                    </div>
                                    <div>{"}"}</div>
                                </div>

                                <div className="flex gap-2 flex-wrap">
                                    <Button size="sm" variant="outline" onMouseEnter={() => setHighlight('lifetime')} onMouseLeave={() => setHighlight(null)}>
                                        Highlight 'a
                                    </Button>
                                    <Button size="sm" variant="outline" onMouseEnter={() => setHighlight('ret')} onMouseLeave={() => setHighlight(null)}>
                                        Highlight Return
                                    </Button>
                                </div>
                            </div>

                            <div className="w-full md:w-64 flex flex-col justify-center">
                                <AnimatePresence mode="wait">
                                    {highlight === 'lifetime' && (
                                        <motion.div key="h-lt" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-2">
                                            <div className="flex items-center gap-2 font-bold text-yellow-500"><Timer className="w-4 h-4" /> Lifetime Name</div>
                                            <p className="text-xs text-muted-foreground">
                                                'a is a placeholder for some scope. It doesn't change how long things live, it just <span className="italic">labels</span> them.
                                            </p>
                                        </motion.div>
                                    )}
                                    {highlight === 'ret' && (
                                        <motion.div key="h-ret" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-2">
                                            <div className="flex items-center gap-2 font-bold text-blue-400"><ArrowRight className="w-4 h-4" /> The Return</div>
                                            <p className="text-xs text-muted-foreground">
                                                This says: "The returned reference will be valid for as long as the <span className="font-bold">shorter</span> of x and y."
                                            </p>
                                        </motion.div>
                                    )}
                                    {!highlight && (
                                        <motion.div key="h-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-muted-foreground">
                                            <Info className="w-8 h-8 mx-auto mb-2 opacity-20" />
                                            <p className="text-xs">Hover over code elements to see their purpose.</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'structs' && (
                        <motion.div 
                            key="structs"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-4">
                                <Box className="w-8 h-8 text-orange-500" />
                                <h3 className="text-lg font-bold">Structs Holding References</h3>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="font-mono text-sm bg-slate-950 text-slate-50 p-6 rounded-lg">
                                    <span className="text-purple-400">struct</span> ImportantExcerpt&lt;<span className="text-yellow-500">'a</span>&gt; {"{"}
                                    <div className="pl-4">
                                        part: <span className="text-yellow-500">&'a</span> str,
                                    </div>
                                    {"}"}
                                    <div className="mt-4 text-slate-500">// Usage</div>
                                    <div className="mt-1">
                                        <span className="text-purple-400">let</span> novel = String::from(<span className="text-green-400">"Call me Ishmael..."</span>);
                                    </div>
                                    <div className="mt-1">
                                        <span className="text-purple-400">let</span> first_sentence = novel.split(<span className="text-green-400">'.'</span>).next().unwrap();
                                    </div>
                                    <div className="mt-1">
                                        <span className="text-purple-400">let</span> i = ImportantExcerpt {"{"}
                                    </div>
                                    <div className="pl-4">
                                        part: first_sentence
                                    </div>
                                    <div>{"}"};</div>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-sm text-muted-foreground">
                                        If a struct holds a reference, it <strong>must</strong> have a lifetime annotation.
                                    </p>
                                    <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                                        <p className="text-xs font-bold text-orange-600 mb-2">Why?</p>
                                        <p className="text-xs text-muted-foreground">
                                            Rust needs to ensure that the struct instance (<code className="bg-black/10 px-1 rounded">i</code>) cannot outlive the data it points to (<code className="bg-black/10 px-1 rounded">novel</code>).
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'elision' && (
                        <motion.div 
                            key="elision"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-4">
                                <EyeOff className="w-8 h-8 text-blue-500" />
                                <h3 className="text-lg font-bold">Lifetime Elision Rules</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                You don't always need to write lifetimes. The compiler infers them based on 3 rules.
                            </p>
                            
                            <div className="space-y-4">
                                <div className="p-4 border rounded-lg bg-card">
                                    <h4 className="font-bold text-sm mb-2">Rule 1: Input Lifetimes</h4>
                                    <div className="flex items-center gap-4 text-xs font-mono">
                                        <div className="opacity-50">fn foo(x: &i32)</div>
                                        <ArrowRight className="w-4 h-4" />
                                        <div className="text-blue-500">fn foo&lt;'a&gt;(x: &'a i32)</div>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2">Each parameter gets its own lifetime.</p>
                                </div>

                                <div className="p-4 border rounded-lg bg-card">
                                    <h4 className="font-bold text-sm mb-2">Rule 2: Single Input</h4>
                                    <div className="flex items-center gap-4 text-xs font-mono">
                                        <div className="opacity-50">fn foo(x: &i32) -&gt; &i32</div>
                                        <ArrowRight className="w-4 h-4" />
                                        <div className="text-blue-500">fn foo&lt;'a&gt;(x: &'a i32) -&gt; &'a i32</div>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2">If there is exactly one input lifetime, it is assigned to all output lifetimes.</p>
                                </div>

                                <div className="p-4 border rounded-lg bg-card">
                                    <h4 className="font-bold text-sm mb-2">Rule 3: Methods (&self)</h4>
                                    <div className="flex items-center gap-4 text-xs font-mono">
                                        <div className="opacity-50">fn foo(&self, x: &str) -&gt; &str</div>
                                        <ArrowRight className="w-4 h-4" />
                                        <div className="text-blue-500">... -&gt; &'self str</div>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2">If there is &self or &mut self, the lifetime of self is assigned to all output lifetimes.</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'static' && (
                        <motion.div 
                            key="static"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-4">
                                <Infinity className="w-8 h-8 text-pink-500" />
                                <h3 className="text-lg font-bold">'static Lifetime</h3>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="font-mono text-sm bg-slate-950 text-slate-50 p-6 rounded-lg">
                                    <div className="text-slate-500">// String literals are always 'static</div>
                                    <span className="text-purple-400">let</span> s: <span className="text-pink-500">&'static</span> str = <span className="text-green-400">"I live forever!"</span>;
                                    
                                    <div className="mt-6 text-slate-500">// Global constants</div>
                                    <span className="text-purple-400">static</span> HELLO: <span className="text-pink-500">&'static</span> str = <span className="text-green-400">"Hello"</span>;
                                </div>
                                <div className="space-y-4">
                                    <p className="text-sm text-muted-foreground">
                                        The <code className="text-pink-500 font-bold">'static</code> lifetime means the reference can live for the <strong>entire duration</strong> of the program.
                                    </p>
                                    <div className="p-4 bg-pink-500/10 border border-pink-500/20 rounded-lg">
                                        <p className="text-xs font-bold text-pink-600 mb-2">Common Misconception</p>
                                        <p className="text-xs text-muted-foreground">
                                            T: 'static doesn't mean T must live forever. It means T <em>can</em> live forever (e.g., it owns all its data and holds no short-lived references).
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>
        </div>
    )
}

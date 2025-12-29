import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function DataShapeVis() {
    const [activeType, setActiveType] = useState<'struct' | 'enum'>('struct')
    const [enumVariant, setEnumVariant] = useState<'A' | 'B'>('A')

    return (
        <div className="space-y-6">
            <div className="flex gap-4">
                <Button onClick={() => setActiveType('struct')} variant={activeType === 'struct' ? 'default' : 'secondary'}>Struct</Button>
                <Button onClick={() => setActiveType('enum')} variant={activeType === 'enum' ? 'default' : 'secondary'}>Enum</Button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Code View */}
                <Card className="p-4 font-mono text-sm bg-muted/50">
                    {activeType === 'struct' ? (
                        <>
                            <div className="text-blue-500">struct <span className="text-foreground">Player</span> {'{'}</div>
                            <div className="pl-4">health: <span className="text-green-500">u8</span>,</div>
                            <div className="pl-4">score: <span className="text-green-500">u32</span>,</div>
                            <div>{'}'}</div>
                            <div className="mt-4 text-muted-foreground">// Total Size: 1 + 4 (+3 padding) = 8 bytes</div>
                        </>
                    ) : (
                        <>
                            <div className="text-blue-500">enum <span className="text-foreground">Command</span> {'{'}</div>
                            <div className={enumVariant === 'A' ? 'bg-primary/20 -mx-2 px-2 rounded' : 'pl-0'}>
                                <div className="pl-4">Quit,</div>
                            </div>
                            <div className={enumVariant === 'B' ? 'bg-primary/20 -mx-2 px-2 rounded' : 'pl-0'}>
                                <div className="pl-4">Move {'{'} x: <span className="text-green-500">i32</span>, y: <span className="text-green-500">i32</span> {'}'},</div>
                            </div>
                            <div>{'}'}</div>
                            <div className="mt-4 text-muted-foreground">// Size = Largest Variant + Tag</div>
                        </>
                    )}
                </Card>

                {/* Memory View */}
                <div className="border rounded-xl p-4 flex flex-col items-center justify-center min-h-[200px] bg-background">
                    <div className="mb-2 text-xs font-bold text-muted-foreground tracking-widest">MEMORY LAYOUT</div>

                    {activeType === 'struct' ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex border rounded overflow-hidden shadow-lg">
                            <div className="bg-red-500/20 p-4 border-r border-red-500/30 text-center w-24">
                                <div className="text-xs text-muted-foreground">0x00</div>
                                <div className="font-bold text-red-500">health</div>
                                <div className="text-xs text-muted-foreground">(1 byte)</div>
                            </div>
                            <div className="bg-slate-500/10 p-4 border-r border-slate-500/20 text-center w-20 flex items-center justify-center">
                                <div className="text-xs text-muted-foreground italic">padding</div>
                            </div>
                            <div className="bg-blue-500/20 p-4 text-center w-32">
                                <div className="text-xs text-muted-foreground">0x04</div>
                                <div className="font-bold text-blue-500">score</div>
                                <div className="text-xs text-muted-foreground">(4 bytes)</div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex gap-2 justify-center mb-4">
                                <Button size="sm" variant="outline" onClick={() => setEnumVariant('A')} className={enumVariant === 'A' ? 'border-primary' : ''}>Variant::Quit</Button>
                                <Button size="sm" variant="outline" onClick={() => setEnumVariant('B')} className={enumVariant === 'B' ? 'border-primary' : ''}>Variant::Move</Button>
                            </div>

                            <motion.div
                                key={enumVariant}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="flex border rounded overflow-hidden shadow-lg"
                            >
                                <div className="bg-yellow-500/20 p-4 border-r border-yellow-500/30 text-center w-24">
                                    <div className="font-bold text-yellow-500">TAG</div>
                                    <div className="text-xs text-muted-foreground">{enumVariant === 'A' ? '0 (Quit)' : '1 (Move)'}</div>
                                </div>

                                {enumVariant === 'A' ? (
                                    <div className="bg-muted p-4 text-center w-48 flex items-center justify-center text-muted-foreground text-sm">
                                        (Empty / Unused Space)
                                    </div>
                                ) : (
                                    <div className="bg-green-500/20 p-4 text-center w-48">
                                        <div className="font-bold text-green-500">{`{ x: 10, y: 20 }`}</div>
                                        <div className="text-xs text-muted-foreground">Variant Data</div>
                                    </div>
                                )}
                            </motion.div>
                            <p className="text-xs text-center text-muted-foreground max-w-xs mx-auto">
                                Enums are "Tagged Unions". They store a small integer "tag" to know which variant is active, plus enough space for the largest variant.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

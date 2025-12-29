import { useState } from "react"
import { motion } from "framer-motion"
import { Box, Layers, MousePointer2 } from "lucide-react"

export default function TupleVis() {
    const [hovered, setHovered] = useState<number | null>(null)
    const data = [
        { label: "i32", val: "500", color: "bg-blue-500" },
        { label: "f64", val: "6.4", color: "bg-purple-500" },
        { label: "u8", val: "1", color: "bg-green-500" }
    ]

    return (
        <div className="space-y-12">
            <div className="flex flex-col items-center justify-center p-12 bg-muted/20 rounded-3xl border-4 border-dashed relative">
                <div className="flex gap-4">
                    {data.map((item, i) => (
                        <motion.div
                            key={i}
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                            whileHover={{ y: -10, scale: 1.05 }}
                            className={`w-32 h-32 ${item.color} rounded-2xl flex flex-col items-center justify-center text-white shadow-xl cursor-help transition-all ${hovered !== null && hovered !== i ? 'opacity-30 grayscale' : 'opacity-100'}`}
                        >
                            <span className="text-[10px] font-bold opacity-80 uppercase tracking-widest">{item.label}</span>
                            <span className="text-2xl font-black">{item.val}</span>
                            <span className="text-[10px] mt-2 font-mono opacity-60">index {i}</span>
                        </motion.div>
                    ))}
                </div>
                
                <div className="mt-12 flex items-center gap-2 text-muted-foreground animate-bounce">
                    <MousePointer2 size={16} />
                    <span className="text-sm">Hover a part of the tuple</span>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h4 className="font-bold flex items-center gap-2"><Box className="text-primary" /> Destructuring</h4>
                    <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-blue-300">
                        <span className="text-purple-400">let</span> (x, y, z) = my_tuple;
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="font-bold flex items-center gap-2"><Layers className="text-primary" /> Dot Access</h4>
                    <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-blue-300">
                        <span className="text-purple-400">let</span> first = my_tuple.0;
                    </div>
                </div>
            </div>
        </div>
    )
}
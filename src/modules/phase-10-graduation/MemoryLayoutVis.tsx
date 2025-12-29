import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Binary, ArrowDownUp } from "lucide-react"

export function MemoryLayoutVis() {
    return (
        <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2"><Binary className="text-primary" /> Struct Layout (Packed)</h3>
                    <p className="text-sm text-muted-foreground">
                        Rust reorders fields by default to minimize padding and save space.
                    </p>
                    
                    <div className="font-mono text-xs bg-slate-950 text-slate-300 p-4 rounded-lg">
                        <div className="text-purple-400">struct</div> Data {"{"}
                        <div className="pl-4">a: i8, <span className="text-slate-500">// 1 byte</span></div>
                        <div className="pl-4">b: i64, <span className="text-slate-500">// 8 bytes</span></div>
                        <div className="pl-4">c: i32, <span className="text-slate-500">// 4 bytes</span></div>
                        <div>{"}"}</div>
                    </div>

                    <div className="space-y-2">
                        <div className="text-[10px] font-bold text-muted-foreground uppercase">Memory Alignment View</div>
                        <div className="flex border rounded overflow-hidden h-12 bg-muted/20">
                            <motion.div initial={{ width: 0 }} animate={{ width: '50%' }} className="bg-blue-500/40 border-r flex items-center justify-center text-[10px] font-bold">i64 (8b)</motion.div>
                            <motion.div initial={{ width: 0 }} animate={{ width: '25%' }} className="bg-green-500/40 border-r flex items-center justify-center text-[10px] font-bold">i32 (4b)</motion.div>
                            <motion.div initial={{ width: 0 }} animate={{ width: '6.25%' }} className="bg-yellow-500/40 border-r flex items-center justify-center text-[10px] font-bold">i8</motion.div>
                            <div className="flex-1 bg-slate-500/10 flex items-center justify-center text-[8px] text-muted-foreground">padding</div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2"><ArrowDownUp className="text-primary" /> Enum Layout (Tag + Union)</h3>
                    <p className="text-sm text-muted-foreground">
                        Enums use a "Tag" to identify the variant, followed by space for the largest variant.
                    </p>

                    <div className="font-mono text-xs bg-slate-950 text-slate-300 p-4 rounded-lg">
                        <div className="text-purple-400">enum</div> Message {"{"}
                        <div className="pl-4">Quit, <span className="text-slate-500">// No data</span></div>
                        <div className="pl-4">Move {'{'} x: i32, y: i32 {'}'}, <span className="text-slate-500">// 8 bytes</span></div>
                        <div>{"}"}</div>
                    </div>

                    <div className="space-y-2">
                        <div className="text-[10px] font-bold text-muted-foreground uppercase">Memory View (Enum)</div>
                        <div className="flex border rounded overflow-hidden h-12 bg-muted/20">
                            <div className="w-8 bg-purple-500/40 border-r flex items-center justify-center text-[10px] font-bold">TAG</div>
                            <div className="flex-1 bg-blue-500/20 flex items-center justify-center text-[10px] italic">Payload (Max Size)</div>
                        </div>
                    </div>
                </div>
            </div>

            <Card className="p-4 bg-muted/30 border-dashed">
                <h4 className="font-bold mb-2">The 'repr(C)' attribute</h4>
                <p className="text-xs text-muted-foreground">
                    If you need to talk to C code, you must use <span className="font-mono text-foreground">#[repr(C)]</span> to prevent Rust from reordering fields. This ensures the binary layout matches exactly what C expects.
                </p>
            </Card>
        </div>
    )
}

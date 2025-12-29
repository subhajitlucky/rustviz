import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Fingerprint } from "lucide-react"

export default function UnicodeVis() {
    const [char, setChar] = useState('🦀')
    
    const getUnicode = (c: string) => {
        const code = c.codePointAt(0)
        return code ? `U+${code.toString(16).toUpperCase().padStart(4, '0')}` : 'N/A'
    }

    const examples = ['A', 'Ω', '中', '🦀', 'λ', 'ぬ']

    return (
        <div className="space-y-8">
            <div className="flex justify-center gap-4 flex-wrap">
                {examples.map(e => (
                    <button 
                        key={e}
                        onClick={() => setChar(e)}
                        className={`w-16 h-16 rounded-xl border-2 text-2xl flex items-center justify-center transition-all ${char === e ? 'border-primary bg-primary/10 scale-110 shadow-lg' : 'bg-card hover:border-primary/50'}`}
                    >
                        {e}
                    </button>
                ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-8 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="text-[80px] leading-none mb-4">{char}</div>
                    <div className="space-y-1">
                        <div className="text-xs font-bold text-muted-foreground uppercase">Unicode Point</div>
                        <div className="text-2xl font-mono font-bold text-primary">{getUnicode(char)}</div>
                    </div>
                </Card>

                <Card className="p-8 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><Fingerprint size={20} /></div>
                        <h4 className="font-bold">Memory Size</h4>
                    </div>
                    <div className="flex gap-1 h-4">
                        {[1, 2, 3, 4].map(i => <div key={i} className="flex-1 bg-primary rounded-sm opacity-60" />)}
                    </div>
                    <div className="text-[10px] text-center text-muted-foreground font-mono">32 BITS / 4 BYTES</div>
                </Card>
            </div>
        </div>
    )
}
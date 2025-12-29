import { CodeWalkthrough, Step } from "@/components/visualizer/CodeWalkthrough"
import { motion } from "framer-motion"
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react"

export default function ErrorPatternsVis() {
    const steps: Step[] = [
        {
            title: "The Happy Path",
            description: "The `?` operator extracts the value from `Ok`. If successful, the function continues to the next line.",
            code: `fn get_username() -> Result<String, Error> {
    let id = find_user()?; // Success! id is extracted
    let name = fetch_name(id)?;
    Ok(name)
}`,
            highlightedLines: [2],
            visualComponent: (
                <div className="flex flex-col items-center justify-center gap-6 h-full">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-green-500/10 border-2 border-green-500 rounded-xl flex flex-col items-center">
                            <span className="font-mono font-bold text-green-400 text-lg">Ok(123)</span>
                            <span className="text-[10px] uppercase text-green-600 mt-1 font-bold">Input</span>
                        </div>
                        <motion.div 
                            animate={{ x: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="text-2xl text-slate-600"
                        >
                            →
                        </motion.div>
                        <div className="flex flex-col items-center gap-2">
                             <div className="p-2 bg-yellow-500/20 rounded-full text-yellow-500 font-bold text-xl">?</div>
                             <span className="text-[8px] uppercase font-bold text-muted-foreground">The Operator</span>
                        </div>
                        <div className="text-2xl text-slate-600">→</div>
                        <motion.div 
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="p-4 bg-blue-500/10 border-2 border-blue-500 rounded-xl flex flex-col items-center"
                        >
                            <span className="font-mono font-bold text-blue-400 text-lg">123</span>
                            <span className="text-[10px] uppercase text-blue-600 mt-1 font-bold">Assigned to ID</span>
                        </motion.div>
                    </div>
                    <div className="flex items-center gap-2 text-green-500 text-xs font-bold uppercase tracking-widest">
                        <CheckCircle2 className="h-4 w-4" /> Happy path continues
                    </div>
                </div>
            )
        },
        {
            title: "The Early Return",
            description: "If `?` encounters an `Err`, it immediately returns that error from the current function. Code after the `?` is never executed.",
            code: `fn get_username() -> Result<String, Error> {
    let id = find_user()?; // Error encountered!
    let name = fetch_name(id)?; // Never reached
    Ok(name)
}`,
            highlightedLines: [2],
            visualComponent: (
                <div className="flex flex-col items-center justify-center gap-6 h-full">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-red-500/10 border-2 border-red-500 rounded-xl flex flex-col items-center">
                            <span className="font-mono font-bold text-red-400 text-lg italic">Err(NotFnd)</span>
                            <span className="text-[10px] uppercase text-red-600 mt-1 font-bold">Input</span>
                        </div>
                        <div className="text-2xl text-slate-600">→</div>
                        <div className="p-2 bg-red-500 rounded-full text-white font-bold text-xl">?</div>
                        <motion.div 
                            animate={{ y: [0, 40], opacity: [1, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="flex flex-col items-center gap-1"
                        >
                             <ArrowRight className="h-6 w-6 text-red-500 rotate-90" />
                        </motion.div>
                    </div>
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-3 bg-red-500/10 border border-red-500/30 rounded text-red-500 font-bold text-xs uppercase tracking-widest flex items-center gap-2"
                    >
                        <XCircle className="h-4 w-4" /> Function exited early
                    </motion.div>
                </div>
            )
        }
    ]

    return <CodeWalkthrough steps={steps} title="Error Handling: The ? Operator" />
}

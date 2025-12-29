import { motion } from "framer-motion"
import { Trophy, Star, Heart, Github, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/store/useAppStore"
import Confetti from "react-confetti"
import { useEffect, useState } from "react"

export default function Congrats() {
    const { setView } = useAppStore()
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

    useEffect(() => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }, [])

    return (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-8 relative overflow-hidden">
            <Confetti
                width={windowSize.width}
                height={windowSize.height}
                numberOfPieces={200}
                recycle={false}
                colors={['#f59e0b', '#ef4444', '#3b82f6', '#10b981', '#8b5cf6']}
            />
            
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12, stiffness: 200 }}
                className="bg-primary/10 p-8 rounded-full"
            >
                <Trophy className="w-24 h-24 text-primary animate-bounce" />
            </motion.div>

            <div className="space-y-4">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-extrabold tracking-tight lg:text-7xl"
                >
                    Certification Complete!
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-muted-foreground max-w-2xl mx-auto"
                >
                    You've successfully navigated the treacherous waters of Ownership, Borrows, and Lifetimes. You are now equipped to build safe, blazing-fast systems in Rust.
                </motion.p>
            </div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-3 gap-8 w-full max-w-lg pt-12"
            >
                <div className="flex flex-col items-center gap-2">
                    <div className="h-12 w-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                        <Star />
                    </div>
                    <span className="text-sm font-bold">100% Mastery</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="h-12 w-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                        <Heart />
                    </div>
                    <span className="text-sm font-bold">Safe Coder</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                        <Trophy />
                    </div>
                    <span className="text-sm font-bold">Rustacean</span>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex gap-4 pt-12"
            >
                <Button size="lg" className="rounded-full px-8 h-14 text-lg" onClick={() => setView('home')}>
                    Return to Home
                </Button>
                <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg gap-2">
                    <Github className="w-5 h-5" /> Share on GitHub
                </Button>
            </motion.div>

            <div className="pt-20 text-muted-foreground flex items-center gap-6">
                <a href="#" className="hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="hover:text-primary transition-colors"><Github className="w-5 h-5" /></a>
            </div>
        </div>
    )
}

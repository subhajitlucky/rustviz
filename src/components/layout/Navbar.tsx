import { Terminal, BookOpen, Layers, Sun, Moon } from "lucide-react"
import { useAppStore } from "@/store/useAppStore"
import { cn } from "@/lib/utils"
import { learningPath } from "@/lib/learning-path"

const allTopics = learningPath.flatMap(p => p.topics)

export function Navbar() {
    const { view, setView, currentStep, theme, toggleTheme } = useAppStore()

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div
                    className="flex items-center gap-2 cursor-pointer group"
                    onClick={() => setView('home')}
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground group-hover:rotate-12 transition-transform">
                        <Terminal className="h-5 w-5" />
                    </div>
                    <span className="text-lg font-bold tracking-tight">RustViz</span>
                </div>

                <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <button
                        onClick={() => setView('home')}
                        className={cn(
                            "flex items-center gap-2 transition-colors hover:text-primary",
                            view === 'home' ? "text-foreground" : "text-muted-foreground"
                        )}
                    >
                        Home
                    </button>
                    <button
                        onClick={() => setView('roadmap')}
                        className={cn(
                            "flex items-center gap-2 transition-colors hover:text-primary",
                            view === 'roadmap' ? "text-foreground" : "text-muted-foreground"
                        )}
                    >
                        <Layers className="h-4 w-4" />
                        Learning Path
                    </button>
                    <button
                        onClick={() => setView('playground')}
                        className={cn(
                            "flex items-center gap-2 transition-colors hover:text-primary",
                            view === 'playground' ? "text-foreground" : "text-muted-foreground"
                        )}
                    >
                        <BookOpen className="h-4 w-4" />
                        Playground
                    </button>
                    <button
                        onClick={toggleTheme}
                        className="flex items-center gap-2 transition-colors text-muted-foreground hover:text-primary ml-2"
                        title="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    {view === 'module' && (
                        <div className="text-xs font-mono text-muted-foreground hidden lg:block">
                            STEP: {currentStep}/{allTopics.length}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

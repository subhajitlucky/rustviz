import { Terminal, BookOpen, Layers, Sun, Moon } from "lucide-react"
import { useAppStore } from "@/store/useAppStore"
import { cn } from "@/lib/utils"
import { learningPath } from "@/lib/learning-path"
import { Link, useLocation } from "react-router-dom"

const allTopics = learningPath.flatMap(p => p.topics)

export function Navbar() {
    const { currentStep, theme, toggleTheme } = useAppStore()
    const location = useLocation()
    const isModule = location.pathname.startsWith('/learn')

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between relative">
                <Link
                    to="/"
                    className="flex items-center gap-2 cursor-pointer group"
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground group-hover:rotate-12 transition-transform">
                        <Terminal className="h-5 w-5" />
                    </div>
                    <span className="text-lg font-bold tracking-tight">RustViz</span>
                </Link>

                <div className="hidden md:flex items-center gap-6 text-sm font-medium absolute left-1/2 -translate-x-1/2">
                    <Link
                        to="/"
                        className={cn(
                            "flex items-center gap-2 transition-colors hover:text-primary",
                            location.pathname === '/' ? "text-foreground" : "text-muted-foreground"
                        )}
                    >
                        Home
                    </Link>
                    <Link
                        to="/learn"
                        className={cn(
                            "flex items-center gap-2 transition-colors hover:text-primary",
                            location.pathname === '/learn' ? "text-foreground" : "text-muted-foreground"
                        )}
                    >
                        <Layers className="h-4 w-4" />
                        Learning Path
                    </Link>
                    <Link
                        to="/playground"
                        className={cn(
                            "flex items-center gap-2 transition-colors hover:text-primary",
                            location.pathname === '/playground' ? "text-foreground" : "text-muted-foreground"
                        )}
                    >
                        <BookOpen className="h-4 w-4" />
                        Playground
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    {isModule && (
                        <div className="text-xs font-mono text-muted-foreground hidden lg:block">
                            STEP: {currentStep}/{allTopics.length}
                        </div>
                    )}
                    <button
                        onClick={toggleTheme}
                        className="flex items-center justify-center transition-colors text-muted-foreground hover:text-primary"
                        title="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>
                </div>
            </div>
        </nav>
    )
}

import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { Layers, BookOpen, Terminal } from "lucide-react"

export default function Home() {
  const navigate = useNavigate()
  return (
    <div className="space-y-12 md:space-y-24 py-8 md:py-12">
      <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-6 text-center animate-in fade-in zoom-in duration-700 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight lg:text-7xl max-w-4xl leading-tight">
          Master Rust Internals Through <span className="text-primary italic drop-shadow-sm">Visual Discovery</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-[700px] leading-relaxed">
          Stop fighting the compiler and start understanding how it thinks. We visualize memory, ownership, and concurrency so you can build with confidence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-6 w-full sm:w-auto px-4 sm:px-0">
          <Button size="lg" className="h-12 sm:h-14 px-8 sm:px-10 text-base sm:text-lg rounded-full shadow-lg shadow-primary/20 w-full sm:w-auto" onClick={() => navigate('/learn')}>
            View Learning Path
          </Button>
          <Button variant="outline" size="lg" className="h-12 sm:h-14 px-8 sm:px-10 text-base sm:text-lg rounded-full w-full sm:w-auto" onClick={() => navigate('/playground')}>
            Rust Playground ↗
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 container mx-auto px-4">
        <div className="p-8 rounded-2xl bg-card border hover:border-primary/50 transition-colors">
          <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
            <Layers className="text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-3">Interactive Modules</h3>
          <p className="text-muted-foreground">Phased learning from mental models to advanced systems programming.</p>
        </div>
        <div className="p-8 rounded-2xl bg-card border hover:border-primary/50 transition-colors">
          <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
            <BookOpen className="text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-3">Mental Models</h3>
          <p className="text-muted-foreground">We focus on building the correct mental model of the compiler's logic, not just syntax.</p>
        </div>
        <div className="p-8 rounded-2xl bg-card border hover:border-primary/50 transition-colors">
          <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
            <Terminal className="text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-3">Real-world Tasks</h3>
          <p className="text-muted-foreground">Apply your knowledge to common Rust traps found in production systems.</p>
        </div>
      </div>
    </div>
  )
}

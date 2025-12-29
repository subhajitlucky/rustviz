import { Layout } from '@/components/layout/Layout'
import { Button } from '@/components/ui/button'

import { lazy, Suspense, useEffect } from 'react'
import { Loader2 } from "lucide-react"
import { GenericVis } from "@/components/visualizer/GenericVis"

// Lazy Load Modules
const WhyRust = lazy(() => import("@/modules/step-01-why-rust/WhyRust"))
const MemoryModel = lazy(() => import("@/modules/step-02-memory/MemoryModel"))
const OwnershipRules = lazy(() => import("@/modules/step-03-ownership/OwnershipRules"))
const Borrowing = lazy(() => import("@/modules/step-04-borrowing/Borrowing"))
const Lifetimes = lazy(() => import("@/modules/step-05-lifetimes/Lifetimes"))
const StructsEnums = lazy(() => import("@/modules/step-06-structs/StructsEnums"))
const ErrorHandling = lazy(() => import("@/modules/step-07-error-handling/ErrorHandling"))
const Concurrency = lazy(() => import("@/modules/step-08-concurrency/Concurrency"))

// Phase 1 Modules
const SyntaxBasics = lazy(() => import("@/modules/phase-1-basics/SyntaxBasics"))
const FunctionsVis = lazy(() => import("@/modules/phase-1-basics/FunctionsVis"))
const ControlFlowVis = lazy(() => import("@/modules/phase-1-basics/ControlFlowVis"))
const SlicesVis = lazy(() => import("@/modules/phase-1-basics/SlicesVis"))
const OptionResultVis = lazy(() => import("@/modules/phase-1-basics/OptionResultVis"))
const PrintMacros = lazy(() => import("@/modules/phase-1-basics/PrintMacros"))

// Phase 1 Additional
const FloatVis = lazy(() => import("@/modules/phase-1-basics/FloatVis"))
const BooleanVis = lazy(() => import("@/modules/phase-1-basics/BooleanVis"))
const UnicodeVis = lazy(() => import("@/modules/phase-1-basics/UnicodeVis"))
const TupleVis = lazy(() => import("@/modules/phase-1-basics/TupleVis"))

// Phase 2 Modules
const ModulesVis = lazy(() => import("@/modules/phase-2-abstraction/ModulesVis"))
const GenericsVis = lazy(() => import("@/modules/phase-2-abstraction/GenericsVis"))
const TraitsVis = lazy(() => import("@/modules/phase-2-abstraction/TraitsVis"))
const IteratorsVis = lazy(() => import("@/modules/phase-2-abstraction/IteratorsVis"))
const ClosuresVis = lazy(() => import("@/modules/phase-2-abstraction/ClosuresVis"))
const CollectionsVis = lazy(() => import("@/modules/phase-2-abstraction/CollectionsVis"))
const ErrorPatternsVis = lazy(() => import("@/modules/phase-2-abstraction/ErrorPatternsVis"))

// Phase 3 Modules (Named Exports)
const SmartPointersVis = lazy(() => import("@/modules/phase-3-advanced/SmartPointersVis").then(m => ({ default: m.SmartPointersVis })))
const InteriorMutabilityVis = lazy(() => import("@/modules/phase-3-advanced/InteriorMutabilityVis").then(m => ({ default: m.InteriorMutabilityVis })))
const ExplicitLifetimesVis = lazy(() => import("@/modules/phase-3-advanced/ExplicitLifetimesVis").then(m => ({ default: m.ExplicitLifetimesVis })))
const TestingVis = lazy(() => import("@/modules/phase-3-advanced/TestingVis").then(m => ({ default: m.TestingVis })))
const CargoVis = lazy(() => import("@/modules/phase-3-advanced/CargoVis").then(m => ({ default: m.CargoVis })))

// Phase 4 Modules (Named Exports)
const AsyncVis = lazy(() => import("@/modules/phase-4-systems/AsyncVis").then(m => ({ default: m.AsyncVis })))
const UnsafeVis = lazy(() => import("@/modules/phase-4-systems/UnsafeVis").then(m => ({ default: m.UnsafeVis })))
const MemoryLayoutVis = lazy(() => import("@/modules/phase-4-systems/MemoryLayoutVis").then(m => ({ default: m.MemoryLayoutVis })))
const AdvancedTraitsVis = lazy(() => import("@/modules/phase-4-systems/AdvancedTraitsVis").then(m => ({ default: m.AdvancedTraitsVis })))
const MacrosVis = lazy(() => import("@/modules/phase-4-systems/MacrosVis").then(m => ({ default: m.MacrosVis })))

// Graduation Modules
const CompilerLogic = lazy(() => import("@/modules/step-09-compiler/CompilerLogic"))
const ProblemSolving = lazy(() => import("@/modules/step-10-problems/ProblemSolving"))
const Congrats = lazy(() => import("@/modules/graduation/Congrats"))
const Playground = lazy(() => import("@/components/playground/Playground").then(m => ({ default: m.Playground })))

import { useAppStore } from '@/store/useAppStore'
import { Roadmap } from '@/components/Roadmap'
import { Layers, BookOpen, Terminal, List } from "lucide-react"
import { learningPath } from '@/lib/learning-path'
import { TopicContent } from '@/components/TopicContent'

const allTopics = learningPath.flatMap(p => p.topics)

const COMPONENT_MAP: Record<string, React.ComponentType> = {
  "why-rust": WhyRust,
  "memory-model": MemoryModel,
  "ownership": OwnershipRules,
  "borrowing": Borrowing,
  "lifetimes": Lifetimes,
  "structs-enums": StructsEnums,
  "error-handling": ErrorHandling,
  "concurrency": Concurrency,
  "syntax-basics": SyntaxBasics,
  "functions": FunctionsVis,
  "control-flow": ControlFlowVis,
  "slices": SlicesVis,
  "option-result": OptionResultVis,
  "println-macro": PrintMacros,
  "float-precision": FloatVis,
  "boolean-logic": BooleanVis,
  "unicode-char": UnicodeVis,
  "tuple-compound": TupleVis,
  "modules": ModulesVis,
  "generics": GenericsVis,
  "traits": TraitsVis,
  "iterators": IteratorsVis,
  "closures": ClosuresVis,
  "collections": CollectionsVis,
  "error-patterns": ErrorPatternsVis,
  "smart-pointers": SmartPointersVis,
  "interior-mutability": InteriorMutabilityVis,
  "explicit-lifetimes": ExplicitLifetimesVis,
  "testing": TestingVis,
  "cargo": CargoVis,
  "async": AsyncVis,
  "unsafe": UnsafeVis,
  "memory-layout": MemoryLayoutVis,
  "advanced-traits": AdvancedTraitsVis,
  "macros": MacrosVis,
  "compiler-logic": CompilerLogic,
  "problem-solving": ProblemSolving,
  "congrats": Congrats,
}

export default function App() {
  const { view, setView, currentStep, setCurrentStep, theme } = useAppStore()

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }, [theme])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentStep, view])

  const next = () => setCurrentStep(Math.min(currentStep + 1, allTopics.length))
  const prev = () => {
    if (currentStep === 1) setView('home')
    else setCurrentStep(Math.max(currentStep - 1, 0))
  }

  const currentTopic = allTopics[currentStep - 1]
  const CurrentComponent = currentTopic?.componentId ? COMPONENT_MAP[currentTopic.componentId] : null

  useEffect(() => {
    if (currentTopic) {
      document.title = `${currentTopic.title} - RustViz`
    } else {
      document.title = "RustViz - Interactive Rust Learning"
    }
  }, [currentTopic])

  return (
    <Layout>
      {view === 'home' && (
        <div className="space-y-24 py-12">
          <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-6 text-center animate-in fade-in zoom-in duration-700">
            <h1 className="text-5xl font-extrabold tracking-tight lg:text-7xl max-w-4xl leading-tight">
              Master Rust Internals Through <span className="text-primary italic drop-shadow-sm">Visual Discovery</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-[700px] leading-relaxed">
              Stop fighting the compiler and start understanding how it thinks. We visualize memory, ownership, and concurrency so you can build with confidence.
            </p>
            <div className="flex gap-4 pt-6">
              <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-lg shadow-primary/20" onClick={() => setView('roadmap')}>
                View Learning Path
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-10 text-lg rounded-full" onClick={() => setView('playground')}>
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
      )}

      {view === 'roadmap' && (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
          <Roadmap />
          <div className="flex justify-center mt-12 mb-20">
            <Button size="lg" className="rounded-full px-8" onClick={() => setCurrentStep(1)}>
              Start Learning Journey
            </Button>
          </div>
        </div>
      )}

      {view === 'playground' && (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 max-w-6xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold">Interactive Playground</h2>
            <Button variant="outline" onClick={() => setView('home')}>Back to Home</Button>
          </div>
          <Suspense fallback={<div className="h-[600px] flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>}>
            <Playground />
          </Suspense>
        </div>
      )}

      {view === 'module' && currentTopic && (
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
             <TopicContent 
                topic={currentTopic} 
                visualizer={
                  CurrentComponent ? (
                    <Suspense fallback={<div className="h-[400px] flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>}>
                      <CurrentComponent />
                    </Suspense>
                  ) : <GenericVis topic={currentTopic} />
                } 
             />
          </div>

          <div className="flex justify-between border-t border-border/50 pt-8 pb-12">
            <Button variant="ghost" onClick={prev} className="flex gap-2">
              ← {currentStep === 1 ? 'Home' : 'Previous'}
            </Button>
            
            <Button variant="outline" onClick={() => setView('roadmap')} className="flex gap-2 rounded-full">
              <List className="h-4 w-4" /> Back to Roadmap
            </Button>

            <div className="flex flex-col items-center gap-1">
              <div className="text-muted-foreground text-xs font-mono uppercase tracking-widest">
                {currentTopic.title}
              </div>
              <div className="text-sm font-bold opacity-50">{currentStep}/{allTopics.length}</div>
            </div>
            <Button onClick={next} className="flex gap-2 min-w-[120px]">
              {currentStep === allTopics.length ? 'Course Complete!' : 'Next'} →
            </Button>
          </div>
        </div>
      )}
    </Layout>
  )
}




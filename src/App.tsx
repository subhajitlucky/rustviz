import { Layout } from '@/components/layout/Layout'
import { Button } from '@/components/ui/button'

// Modules
import WhyRust from "@/modules/step-01-why-rust/WhyRust"
import MemoryModel from "@/modules/step-02-memory/MemoryModel"
import OwnershipRules from "@/modules/step-03-ownership/OwnershipRules"
import Borrowing from "@/modules/step-04-borrowing/Borrowing"
import Lifetimes from "@/modules/step-05-lifetimes/Lifetimes"
import StructsEnums from "@/modules/step-06-structs/StructsEnums"
import ErrorHandling from "@/modules/step-07-error-handling/ErrorHandling"
import Concurrency from "@/modules/step-08-concurrency/Concurrency"

// Phase 1 Modules
import SyntaxBasics from "@/modules/phase-1-basics/SyntaxBasics"
import FunctionsVis from "@/modules/phase-1-basics/FunctionsVis"
import ControlFlowVis from "@/modules/phase-1-basics/ControlFlowVis"
import SlicesVis from "@/modules/phase-1-basics/SlicesVis"
import OptionResultVis from "@/modules/phase-1-basics/OptionResultVis"
import PrintMacros from "@/modules/phase-1-basics/PrintMacros"

// Phase 1 Additional
import FloatVis from "@/modules/phase-1-basics/FloatVis"
import BooleanVis from "@/modules/phase-1-basics/BooleanVis"
import UnicodeVis from "@/modules/phase-1-basics/UnicodeVis"
import TupleVis from "@/modules/phase-1-basics/TupleVis"

// Phase 2 Modules
import ModulesVis from "@/modules/phase-2-abstraction/ModulesVis"
import GenericsVis from "@/modules/phase-2-abstraction/GenericsVis"
import TraitsVis from "@/modules/phase-2-abstraction/TraitsVis"
import IteratorsVis from "@/modules/phase-2-abstraction/IteratorsVis"
import ClosuresVis from "@/modules/phase-2-abstraction/ClosuresVis"
import CollectionsVis from "@/modules/phase-2-abstraction/CollectionsVis"
import ErrorPatternsVis from "@/modules/phase-2-abstraction/ErrorPatternsVis"

// Phase 3 Modules
import SmartPointers from "@/modules/phase-3-advanced/SmartPointers"
import InteriorMutability from "@/modules/phase-3-advanced/InteriorMutability"
import ExplicitLifetimes from "@/modules/phase-3-advanced/ExplicitLifetimes"
import Testing from "@/modules/phase-3-advanced/Testing"
import Cargo from "@/modules/phase-3-advanced/Cargo"

// Phase 4 Modules
import Async from "@/modules/phase-4-systems/Async"
import Unsafe from "@/modules/phase-4-systems/Unsafe"
import MemoryLayout from "@/modules/phase-4-systems/MemoryLayout"
import AdvancedTraits from "@/modules/phase-4-systems/AdvancedTraits"
import Macros from "@/modules/phase-4-systems/Macros"

// Graduation Modules
import CompilerLogic from "@/modules/step-09-compiler/CompilerLogic"
import ProblemSolving from "@/modules/step-10-problems/ProblemSolving"
import Congrats from "@/modules/graduation/Congrats"

import { useAppStore } from '@/store/useAppStore'
import { Roadmap } from '@/components/Roadmap'
import { Layers, BookOpen, Terminal, List } from "lucide-react"
import { useEffect } from 'react'
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
  "smart-pointers": SmartPointers,
  "interior-mutability": InteriorMutability,
  "explicit-lifetimes": ExplicitLifetimes,
  "testing": Testing,
  "cargo": Cargo,
  "async": Async,
  "unsafe": Unsafe,
  "memory-layout": MemoryLayout,
  "advanced-traits": AdvancedTraits,
  "macros": Macros,
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
              <Button variant="outline" size="lg" className="h-14 px-10 text-lg rounded-full" onClick={() => window.open('https://play.rust-lang.org/', '_blank')}>
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

      {view === 'module' && currentTopic && (
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
             <TopicContent 
                topic={currentTopic} 
                visualizer={CurrentComponent ? <CurrentComponent /> : null} 
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




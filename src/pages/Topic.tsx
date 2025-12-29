import { lazy, Suspense, useEffect } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Loader2, List } from "lucide-react"
import { GenericVis } from "@/components/visualizer/GenericVis"
import { TopicContent } from '@/components/TopicContent'
import { learningPath } from '@/lib/learning-path'
import { useAppStore } from '@/store/useAppStore'

// Lazy Load Modules
const WhyRust = lazy(() => import("@/modules/step-01-why-rust/WhyRust"))
const MemoryModel = lazy(() => import("@/modules/step-02-memory/MemoryModel"))
const OwnershipRules = lazy(() => import("@/modules/step-03-ownership/OwnershipRules"))
const Borrowing = lazy(() => import("@/modules/step-04-borrowing/Borrowing"))
const Lifetimes = lazy(() => import("@/modules/step-05-lifetimes/Lifetimes"))
const ErrorHandling = lazy(() => import("@/modules/step-07-error-handling/ErrorHandling"))
const Concurrency = lazy(() => import("@/modules/phase-9-systems/Concurrency"))

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
const ImmutabilityVis = lazy(() => import("@/modules/phase-1-basics/ImmutabilityVis"))
const ShadowingVis = lazy(() => import("@/modules/phase-1-basics/ShadowingVis"))
const IntegerVis = lazy(() => import("@/modules/phase-1-basics/IntegerVis"))

// Phase 6 Abstraction Modules
const GenericsVis = lazy(() => import("@/modules/phase-6-abstraction/GenericsVis"))
const TraitsVis = lazy(() => import("@/modules/phase-6-abstraction/TraitsVis"))
const TraitBoundsVis = lazy(() => import("@/modules/phase-6-abstraction/TraitBoundsVis"))
const DeriveVis = lazy(() => import("@/modules/phase-6-abstraction/DeriveVis"))

// Phase 2 Modules
const ModulesVis = lazy(() => import("@/modules/phase-2-abstraction/ModulesVis"))
const MatchVis = lazy(() => import("@/modules/phase-2-abstraction/MatchVis"))
const LoopsVis = lazy(() => import("@/modules/phase-2-abstraction/LoopsVis"))
const DestructuringVis = lazy(() => import("@/modules/phase-2-abstraction/DestructuringVis"))

// Phase 8 Functional Modules
const ClosuresVis = lazy(() => import("@/modules/phase-8-functional/ClosuresVis"))
const IteratorsVis = lazy(() => import("@/modules/phase-8-functional/IteratorsVis"))

// Phase 3 Modules
const OwnershipVis = lazy(() => import("@/modules/phase-3-ownership/OwnershipVis"))
const BorrowingVis = lazy(() => import("@/modules/phase-3-ownership/BorrowingVis"))
const LifetimesDeepVis = lazy(() => import("@/modules/phase-3-ownership/LifetimesDeepVis"))
// Phase 3 Modules (Named Exports)
const SmartPointersVis = lazy(() => import("@/modules/phase-9-systems/SmartPointersVis").then(m => ({ default: m.SmartPointersVis })))
const InteriorMutabilityVis = lazy(() => import("@/modules/phase-9-systems/InteriorMutabilityVis").then(m => ({ default: m.InteriorMutabilityVis })))
const ExplicitLifetimesVis = lazy(() => import("@/modules/phase-7-chronos/ExplicitLifetimesVis").then(m => ({ default: m.ExplicitLifetimesVis })))
const TestingVis = lazy(() => import("@/modules/phase-3-advanced/TestingVis").then(m => ({ default: m.TestingVis })))
const CargoVis = lazy(() => import("@/modules/phase-3-advanced/CargoVis").then(m => ({ default: m.CargoVis })))

// Phase 10 Graduation Modules (Named Exports)
const AsyncVis = lazy(() => import("@/modules/phase-10-graduation/AsyncVis").then(m => ({ default: m.AsyncVis })))
const UnsafeVis = lazy(() => import("@/modules/phase-10-graduation/UnsafeVis").then(m => ({ default: m.UnsafeVis })))
const MemoryLayoutVis = lazy(() => import("@/modules/phase-10-graduation/MemoryLayoutVis").then(m => ({ default: m.MemoryLayoutVis })))
const AdvancedTraitsVis = lazy(() => import("@/modules/phase-7-chronos/AdvancedTraitsVis").then(m => ({ default: m.AdvancedTraitsVis })))
const MacrosVis = lazy(() => import("@/modules/phase-10-graduation/MacrosVis").then(m => ({ default: m.MacrosVis })))

// Phase 4 Data Modules
const StructsVis = lazy(() => import("@/modules/phase-4-data/StructsVis"))
const EnumsVis = lazy(() => import("@/modules/phase-4-data/EnumsVis"))

// Phase 5 Safety Modules
const PanicVis = lazy(() => import("@/modules/phase-5-safety/PanicVis"))
const SugarVis = lazy(() => import("@/modules/phase-5-safety/SugarVis"))
const ErrorPatternsVis = lazy(() => import("@/modules/phase-5-safety/ErrorPatternsVis"))
const CollectionsVis = lazy(() => import("@/modules/phase-5-safety/CollectionsVis"))

// Graduation Modules
const CompilerLogic = lazy(() => import("@/modules/phase-10-graduation/CompilerLogic"))
const ProblemSolving = lazy(() => import("@/modules/phase-10-graduation/ProblemSolving"))
const Congrats = lazy(() => import("@/modules/phase-10-graduation/Congrats"))

const COMPONENT_MAP: Record<string, React.ComponentType> = {
  "why-rust": WhyRust,
  "memory-model": MemoryModel,
  "ownership": OwnershipRules,
  "borrowing": Borrowing,
  "lifetimes": Lifetimes,
  "error-handling": ErrorHandling,
  "concurrency": Concurrency,
  "syntax-basics": SyntaxBasics,
  "functions": FunctionsVis,
  "control-flow": ControlFlowVis,
  "match": MatchVis,
  "loops": LoopsVis,
  "destructuring": DestructuringVis,
  "ownership-vis": OwnershipVis,
  "borrowing-vis": BorrowingVis,
  "lifetimes-vis": LifetimesDeepVis,
  "slices": SlicesVis,
  "option-result": OptionResultVis,
  "println-macro": PrintMacros,
  "immutability": ImmutabilityVis,
  "shadowing": ShadowingVis,
  "integers": IntegerVis,
  "float-precision": FloatVis,
  "boolean-logic": BooleanVis,
  "unicode-char": UnicodeVis,
  "tuple-compound": TupleVis,
  "modules": ModulesVis,
  "generics": GenericsVis,
  "traits": TraitsVis,
  "iterators": IteratorsVis,
  "closures": ClosuresVis,
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
  "structs": StructsVis,
  "enums": EnumsVis,
  "panic": PanicVis,
  "sugar": SugarVis,
  "error-patterns": ErrorPatternsVis,
  "collections": CollectionsVis,
  "trait-bounds": TraitBoundsVis,
  "derive": DeriveVis,
  "compiler-logic": CompilerLogic,
  "problem-solving": ProblemSolving,
  "congrats": Congrats,
}

export default function Topic() {
    const { phaseId, topicId } = useParams()
    const navigate = useNavigate()
    const { setCurrentStep } = useAppStore()

    const allTopicsWithPhase = learningPath.flatMap(p => p.topics.map(t => ({ ...t, phaseId: p.id })))
    
    const currentIndex = allTopicsWithPhase.findIndex(t => t.phaseId === phaseId && t.id === topicId)
    const currentTopic = currentIndex !== -1 ? allTopicsWithPhase[currentIndex] : null

    useEffect(() => {
        if (currentIndex !== -1) {
            setCurrentStep(currentIndex + 1)
        }
    }, [currentIndex, setCurrentStep])

    if (!currentTopic) return <Navigate to="/learn" />

    const CurrentComponent = currentTopic.componentId ? COMPONENT_MAP[currentTopic.componentId] : null

    const next = () => {
        if (currentIndex < allTopicsWithPhase.length - 1) {
            const nextTopic = allTopicsWithPhase[currentIndex + 1]
            navigate(`/learn/${nextTopic.phaseId}/${nextTopic.id}`)
        } else {
            navigate('/learn')
        }
    }

    const prev = () => {
        if (currentIndex > 0) {
            const prevTopic = allTopicsWithPhase[currentIndex - 1]
            navigate(`/learn/${prevTopic.phaseId}/${prevTopic.id}`)
        } else {
            navigate('/')
        }
    }

    return (
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
              ← {currentIndex === 0 ? 'Home' : 'Previous'}
            </Button>
            
            <Button variant="outline" onClick={() => navigate('/learn')} className="flex gap-2 rounded-full">
              <List className="h-4 w-4" /> Back to Roadmap
            </Button>

            <div className="flex flex-col items-center gap-1">
              <div className="text-muted-foreground text-xs font-mono uppercase tracking-widest">
                {currentTopic.title}
              </div>
              <div className="text-sm font-bold opacity-50">{currentIndex + 1}/{allTopicsWithPhase.length}</div>
            </div>
            <Button onClick={next} className="flex gap-2 min-w-[120px]">
              {currentIndex === allTopicsWithPhase.length - 1 ? 'Course Complete!' : 'Next'} →
            </Button>
          </div>
        </div>
    )
}

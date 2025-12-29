import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Loader2 } from "lucide-react"

const PlaygroundComponent = lazy(() => import("@/components/playground/Playground").then(m => ({ default: m.Playground })))

export default function Playground() {
  const navigate = useNavigate()
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left">Interactive Playground</h2>
        <Button variant="outline" onClick={() => navigate('/')} className="w-full md:w-auto">Back to Home</Button>
      </div>
      <Suspense fallback={<div className="h-[600px] flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>}>
        <PlaygroundComponent />
      </Suspense>
    </div>
  )
}

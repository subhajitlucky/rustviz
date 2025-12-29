import { Roadmap } from '@/components/Roadmap'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { learningPath } from '@/lib/learning-path'

export default function Learn() {
  const navigate = useNavigate()
  
  const startJourney = () => {
    const firstPhase = learningPath[0]
    const firstTopic = firstPhase.topics[0]
    navigate(`/learn/${firstPhase.id}/${firstTopic.id}`)
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 px-4">
      <Roadmap />
      <div className="flex justify-center mt-8 md:mt-12 mb-20">
        <Button size="lg" className="rounded-full px-8 w-full md:w-auto" onClick={startJourney}>
          Start Learning Journey
        </Button>
      </div>
    </div>
  )
}

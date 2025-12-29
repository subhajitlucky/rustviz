import { useState } from "react"
import { Lock, Unlock } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MutexVis() {
    const [mutexState, setMutexState] = useState<'unlocked' | 'locked_thread_1' | 'locked_thread_2'>('unlocked')
    const [data, setData] = useState(0)

    const access = async (thread: 1 | 2) => {
        if (mutexState !== 'unlocked') return // Blocked

        setMutexState(thread === 1 ? 'locked_thread_1' : 'locked_thread_2')

        // Simulate work
        await new Promise(r => setTimeout(r, 1000))

        setData(prev => prev + 1)
        setMutexState('unlocked')
    }

    return (
        <div className="space-y-6">
            <div className="flex gap-4 p-4 border rounded-xl bg-card items-center justify-between">
                <h3 className="font-bold flex items-center gap-2">
                    {mutexState === 'unlocked' ? <Unlock className="text-green-500" /> : <Lock className="text-red-500" />}
                    Mutex&lt;i32&gt;
                </h3>
                <div className="text-2xl font-mono font-bold">{data}</div>
            </div>

            <div className="grid grid-cols-2 gap-8">
                {/* Thread 1 */}
                <div className={`border p-4 rounded-xl transition-colors ${mutexState === 'locked_thread_1' ? 'border-primary bg-primary/10' : 'opacity-60'}`}>
                    <div className="font-bold mb-4">Thread 1</div>
                    <Button
                        onClick={() => access(1)}
                        disabled={mutexState !== 'unlocked'}
                        size="sm"
                        variant={mutexState === 'locked_thread_1' ? 'default' : 'secondary'}
                    >
                        {mutexState === 'locked_thread_1' ? 'Executing...' : 'Try Lock()'}
                    </Button>
                    {mutexState === 'locked_thread_2' && <div className="mt-2 text-xs text-orange-500 font-bold">Blocked</div>}
                </div>

                {/* Thread 2 */}
                <div className={`border p-4 rounded-xl transition-colors ${mutexState === 'locked_thread_2' ? 'border-primary bg-primary/10' : 'opacity-60'}`}>
                    <div className="font-bold mb-4">Thread 2</div>
                    <Button
                        onClick={() => access(2)}
                        disabled={mutexState !== 'unlocked'}
                        size="sm"
                        variant={mutexState === 'locked_thread_2' ? 'default' : 'secondary'}
                    >
                        {mutexState === 'locked_thread_2' ? 'Executing...' : 'Try Lock()'}
                    </Button>
                    {mutexState === 'locked_thread_1' && <div className="mt-2 text-xs text-orange-500 font-bold">Blocked</div>}
                </div>
            </div>
        </div>
    )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Terminal } from "lucide-react"

export function Playground() {
    return (
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Interactive Playground</h2>
                    <p className="text-muted-foreground">
                        Write (simulated) Rust code and see how the memory model reacts in real-time.
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>Code Editor</span>
                            <Badge variant="outline">main.rs</Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="min-h-[300px] rounded-md bg-muted/50 p-4 font-mono text-sm">
                            <span className="text-purple-400">fn</span> <span className="text-blue-400">main</span>() {"{"} <br />
                            &nbsp;&nbsp;<span className="text-muted-foreground">// Your code here</span> <br />
                            {"}"}
                        </div>
                        <div className="mt-4 flex justify-end">
                            <Button>
                                <Terminal className="mr-2 h-4 w-4" />
                                Run Simulation
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Memory Visualization</h3>
                <Card className="h-[430px] border-dashed flex items-center justify-center">
                    <p className="text-muted-foreground">Visualization will appear here</p>
                </Card>
            </div>
        </div>
    )
}

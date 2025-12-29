import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Bug, ShieldCheck } from "lucide-react"
import { DataRaceVis } from "./DataRaceVis"
import { FixLogic } from "./FixLogic"

export default function WhyRust() {
    return (
        <div className="space-y-12">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
                <Card className="bg-red-500/10 border-red-500/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-500">
                            <Bug className="h-5 w-5" />
                            Memory Leaks
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Forgetting to free memory causes programs to consume more RAM until they crash.
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-orange-500/10 border-orange-500/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-orange-500">
                            <AlertTriangle className="h-5 w-5" />
                            Data Races
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Two threads writing to the same data at the same time corrupts it unpredictably.
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-blue-500/10 border-blue-500/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-blue-500">
                            <ShieldCheck className="h-5 w-5" />
                            Rust's Promise
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Rust guarantees these bugs are impossible at compile time. It refuses to build unsafe code.
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                <div className="py-8">
                    <DataRaceVis />
                </div>
                <FixLogic />
            </div>
        </div>
    )
}
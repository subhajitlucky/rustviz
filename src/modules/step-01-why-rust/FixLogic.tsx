import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function FixLogic() {
    const [selected, setSelected] = useState<string | null>(null)
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

    const handleCheck = () => {
        if (!selected) return
        setIsCorrect(selected === "ownership")
    }

    return (
        <div className="space-y-4 pt-8 border-t">
            <div className="space-y-2">
                <h3 className="text-xl font-bold">Concept Check</h3>
                <p className="text-muted-foreground">
                    Which Rust mechanism prevents the Data Race shown above?
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card
                    className={cn(
                        "cursor-pointer transition-all hover:border-primary/50",
                        selected === "gc" && "border-primary ring-2 ring-primary/20"
                    )}
                    onClick={() => { setSelected("gc"); setIsCorrect(null); }}
                >
                    <CardHeader className="p-4"><CardTitle className="text-base">Garbage Collection</CardTitle></CardHeader>
                    <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                        Pausing execution to clean up unused memory automatically.
                    </CardContent>
                </Card>

                <Card
                    className={cn(
                        "cursor-pointer transition-all hover:border-primary/50",
                        selected === "ownership" && "border-primary ring-2 ring-primary/20"
                    )}
                    onClick={() => { setSelected("ownership"); setIsCorrect(null); }}
                >
                    <CardHeader className="p-4"><CardTitle className="text-base">Ownership & Borrowing</CardTitle></CardHeader>
                    <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                        Compile-time rules ensuring only one writer (mut) or many readers exists.
                    </CardContent>
                </Card>

                <Card
                    className={cn(
                        "cursor-pointer transition-all hover:border-primary/50",
                        selected === "manual" && "border-primary ring-2 ring-primary/20"
                    )}
                    onClick={() => { setSelected("manual"); setIsCorrect(null); }}
                >
                    <CardHeader className="p-4"><CardTitle className="text-base">Manual Management</CardTitle></CardHeader>
                    <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                        Programmer explicitly allocating and freeing memory (malloc/free).
                    </CardContent>
                </Card>
            </div>

            <div className="flex items-center gap-4">
                <Button onClick={handleCheck} disabled={!selected}>Check Answer</Button>

                {isCorrect === true && (
                    <span className="flex items-center text-green-500 font-medium animate-in fade-in">
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Correct! Rust's ownership model prevents data races at compile time.
                    </span>
                )}

                {isCorrect === false && (
                    <span className="flex items-center text-destructive font-medium animate-in fade-in">
                        <XCircle className="mr-2 h-5 w-5" />
                        Incorrect. Try again!
                    </span>
                )}
            </div>
        </div>
    )
}

import { ModuleContainer } from "@/modules/ModuleContainer"
import { MacrosVis } from "./MacrosVis"

export default function Macros() {
    return (
        <ModuleContainer
            title="Macros"
            description="Metaprogramming: writing code that writes code."
            currentStep={29}
            totalSteps={32}
        >
            <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Code Generation</h2>
                    <p className="text-muted-foreground mb-6">
                        Macros are a way of writing code that generates other code, which is known as metaprogramming. They allow you to extend the language and reduce boilerplate.
                    </p>
                    <MacrosVis />
                </div>
            </div>
        </ModuleContainer>
    )
}

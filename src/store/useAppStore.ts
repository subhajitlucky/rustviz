import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
    currentStep: number
    completedModules: string[]
    theme: 'light' | 'dark'
    setCurrentStep: (step: number) => void
    completeModule: (id: string) => void
    toggleTheme: () => void
}

export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            currentStep: 1,
            completedModules: [],
            theme: 'dark',
            setCurrentStep: (step) => set({ currentStep: step }),
            completeModule: (id) =>
                set((state) => ({
                    completedModules: state.completedModules.includes(id)
                        ? state.completedModules
                        : [...state.completedModules, id],
                })),
            toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
        }),
        {
            name: 'rustviz-storage',
        }
    )
)

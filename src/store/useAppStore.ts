import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
    view: 'home' | 'roadmap' | 'module'
    currentStep: number
    completedModules: string[]
    theme: 'light' | 'dark'
    setView: (view: 'home' | 'roadmap' | 'module') => void
    setCurrentStep: (step: number) => void
    completeModule: (id: string) => void
    toggleTheme: () => void
}

export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            view: 'home',
            currentStep: 1,
            completedModules: [],
            theme: 'dark',
            setView: (view) => set({ view }),
            setCurrentStep: (step) => set({ currentStep: step, view: 'module' }),
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

import { Layout } from '@/components/layout/Layout'
import { Suspense, useEffect } from 'react'
import { Loader2 } from "lucide-react"
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'

import Home from '@/pages/Home'
import Learn from '@/pages/Learn'
import PlaygroundPage from '@/pages/Playground'
import Topic from '@/pages/Topic'

export default function App() {
  const { theme } = useAppStore()

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <Layout>
      <Suspense fallback={<div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/:phaseId/:topicId" element={<Topic />} />
          <Route path="/playground" element={<PlaygroundPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}




import { useState, useEffect, useCallback } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { AnnotationLayer } from '@/components/annotation/AnnotationLayer'
import { scenarioMap } from '@/data/scenarios'
import { moduleMeta, slideMeta, toolMeta } from '@/data/siteMeta'

function getPageName(pathname: string): string | undefined {
  if (pathname === '/') return '首頁'
  if (pathname.startsWith('/scenario/')) {
    const id = pathname.split('/')[2]
    return scenarioMap[id]?.title || '情境模擬'
  }
  if (pathname.startsWith('/tools/')) {
    const id = pathname.split('/')[2]
    return toolMeta[id as keyof typeof toolMeta]?.title || '決策工具'
  }
  if (pathname.startsWith('/content/')) {
    const id = pathname.split('/')[2]
    return moduleMeta[id as keyof typeof moduleMeta]?.title || '課程模組'
  }
  if (pathname.startsWith('/slides/')) {
    const id = pathname.split('/')[2] ?? 'M01'
    return slideMeta[id as keyof typeof slideMeta]?.title || '投影片'
  }
  if (pathname === '/handout') return '學員講義'
  if (pathname.startsWith('/quiz')) return '評量測驗'
  return undefined
}

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev)
  }, [])

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  // Listen for mobile bottom bar "more" button
  useEffect(() => {
    const handler = () => toggleSidebar()
    window.addEventListener('toggle-sidebar', handler)
    return () => window.removeEventListener('toggle-sidebar', handler)
  }, [toggleSidebar])

  const pageName = getPageName(location.pathname)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPageName={pageName} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <main className="pt-14 pb-16 lg:pl-60 lg:pb-0">
        <div className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>

      {import.meta.env.DEV && <AnnotationLayer />}
    </div>
  )
}

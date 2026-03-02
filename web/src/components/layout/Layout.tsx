import { useState, useEffect, useCallback } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { AnnotationLayer } from '@/components/annotation/AnnotationLayer'

function getPageName(pathname: string): string | undefined {
  if (pathname === '/') return '首頁'
  if (pathname.startsWith('/scenario/')) {
    const id = pathname.split('/')[2]
    const names: Record<string, string> = {
      S01: '心因性休克',
      S02: '張力性氣胸',
      S03: '過敏性休克',
      S04: '敗血性休克',
      S05: '急性肺栓塞',
    }
    return names[id] || '情境模擬'
  }
  if (pathname.startsWith('/tools/')) {
    const id = pathname.split('/')[2]
    const names: Record<string, string> = {
      'pump-pipe-tank': 'Pump-Pipe-Tank',
      'nohria-stevenson': 'Nohria-Stevenson',
      pseudopea: 'Pseudo-PEA',
      oxygenation: 'Oxy vs Vent',
    }
    return names[id] || '決策工具'
  }
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

      <AnnotationLayer />
    </div>
  )
}

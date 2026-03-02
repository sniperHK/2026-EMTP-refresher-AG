import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const scenarioLinks = [
  { id: 'S01', label: '心因性休克', color: 'var(--medical-red)' },
  { id: 'S02', label: '張力性氣胸', color: 'var(--medical-blue)' },
  { id: 'S03', label: '過敏性休克', color: 'var(--medical-orange)' },
  { id: 'S04', label: '敗血性休克', color: 'var(--medical-purple)' },
  { id: 'S05', label: '急性肺栓塞', color: 'var(--medical-teal)' },
]

const toolLinks = [
  { id: 'pump-pipe-tank', label: 'Pump-Pipe-Tank' },
  { id: 'nohria-stevenson', label: 'Nohria-Stevenson' },
  { id: 'pseudopea', label: 'Pseudo-PEA' },
  { id: 'oxygenation', label: 'Oxy vs Vent' },
]

const contentLinks = [
  { id: 'M01', label: 'M01 病生理學' },
  { id: 'M02', label: 'M02 PK-PD' },
  { id: 'M02-dosing', label: 'M02 劑量對接表' },
]

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation()

  const navContent = (
    <nav className="flex flex-col gap-6 p-4">
      {/* 課程模組（移至最前） */}
      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
          課程模組
        </h3>
        <div className="space-y-0.5">
          {contentLinks.map((c) => {
            const path = `/content/${c.id}`
            const isActive = location.pathname === path
            return (
              <Link
                key={c.id}
                to={path}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors',
                  isActive
                    ? 'bg-gray-100 font-medium text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-purple-400" />
                <span>{c.label}</span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* 情境模擬 */}
      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
          情境模擬
        </h3>
        <div className="space-y-0.5">
          {scenarioLinks.map((s) => {
            const path = `/scenario/${s.id}`
            const isActive = location.pathname === path
            return (
              <Link
                key={s.id}
                to={path}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors',
                  isActive
                    ? 'bg-gray-100 font-medium text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: s.color }}
                />
                <span>{s.id} {s.label}</span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* 決策工具 */}
      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
          決策工具
        </h3>
        <div className="space-y-0.5">
          {toolLinks.map((t) => {
            const path = `/tools/${t.id}`
            const isActive = location.pathname === path
            return (
              <Link
                key={t.id}
                to={path}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors',
                  isActive
                    ? 'bg-gray-100 font-medium text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-gray-400" />
                <span>{t.label}</span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* 學員資源 */}
      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
          學員資源
        </h3>
        <div className="space-y-0.5">
          {[
            { to: '/handout', label: '學員講義', dot: 'bg-blue-600' },
            { to: '/quiz', label: '評量測驗', dot: 'bg-red-500' },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={cn(
                'flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors',
                location.pathname.startsWith(item.to)
                  ? 'bg-gray-100 font-medium text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <span className={cn('h-2.5 w-2.5 shrink-0 rounded-full', item.dot)} />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* 返回首頁 */}
      <div className="border-t pt-4">
        <Link
          to="/"
          onClick={onClose}
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-colors"
        >
          &#8592; 返回首頁
        </Link>
      </div>
    </nav>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed left-0 top-14 bottom-0 w-60 overflow-y-auto border-r bg-white">
        {navContent}
      </aside>

      {/* Tablet/Mobile drawer overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
          />
          {/* Drawer */}
          <aside className="animate-in slide-in-from-left duration-300 absolute left-0 top-0 bottom-0 w-64 overflow-y-auto bg-white shadow-xl">
            <div className="flex items-center justify-between border-b p-4">
              <span
                className="text-base font-bold"
                style={{ color: 'var(--medical-navy)' }}
              >
                導覽
              </span>
              <button
                onClick={onClose}
                className="rounded-md p-1 text-gray-400 hover:text-gray-600"
              >
                &#10005;
              </button>
            </div>
            {navContent}
          </aside>
        </div>
      )}

      {/* Mobile bottom tab bar */}
      <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t bg-white/95 py-1.5 backdrop-blur-sm">
        <Link
          to="/"
          className={cn(
            'flex flex-col items-center gap-0.5 px-2 py-1 text-[10px]',
            location.pathname === '/' ? 'text-gray-900 font-medium' : 'text-gray-500'
          )}
        >
          <span className="text-base">&#9776;</span>
          <span>首頁</span>
        </Link>
        {scenarioLinks.slice(0, 3).map((s) => (
          <Link
            key={s.id}
            to={`/scenario/${s.id}`}
            className={cn(
              'flex flex-col items-center gap-0.5 px-2 py-1 text-[10px]',
              location.pathname === `/scenario/${s.id}` ? 'font-medium' : 'text-gray-500'
            )}
            style={{
              color: location.pathname === `/scenario/${s.id}` ? s.color : undefined,
            }}
          >
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: s.color }}
            />
            <span>{s.id}</span>
          </Link>
        ))}
        <button
          onClick={() => {
            // Open the drawer for more items
            const event = new CustomEvent('toggle-sidebar')
            window.dispatchEvent(event)
          }}
          className="flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] text-gray-500"
        >
          <span className="text-base">&#8230;</span>
          <span>更多</span>
        </button>
      </div>
    </>
  )
}

import { useFullscreen } from '@/hooks/useFullscreen'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  currentPageName?: string
}

export function Header({ currentPageName }: HeaderProps) {
  const { isFullscreen, toggleFullscreen } = useFullscreen()

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b bg-white/95 px-4 backdrop-blur-sm md:px-6">
      {/* Left: Course title */}
      <div className="flex items-center gap-2">
        <span
          className="text-base font-bold md:text-lg"
          style={{ color: 'var(--medical-navy)' }}
        >
          2026 EMTP 複訓
        </span>
      </div>

      {/* Center: Current page name */}
      {currentPageName && (
        <div className="absolute left-1/2 -translate-x-1/2">
          <span className="text-sm font-medium text-gray-600 md:text-base">
            {currentPageName}
          </span>
        </div>
      )}

      {/* Right: Fullscreen toggle */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleFullscreen}
          className="text-xs text-gray-500 hover:text-gray-800"
        >
          {isFullscreen ? '結束全螢幕' : '全螢幕'}
        </Button>
      </div>
    </header>
  )
}

import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type ShareTarget = 'learner' | 'instructor'

interface ScenarioQuickEntryCardProps {
  scenarioId: string
  scenarioTitle: string
  instructorMode: boolean
  onInstructorModeChange: (enabled: boolean) => void
}

function makeShareLink(target: ShareTarget) {
  if (typeof window === 'undefined') return ''

  const url = new URL(window.location.href)
  if (target === 'instructor') {
    url.searchParams.set('mode', 'instructor')
  } else {
    url.searchParams.delete('mode')
  }
  return url.toString()
}

export function ScenarioQuickEntryCard({
  scenarioId,
  scenarioTitle,
  instructorMode,
  onInstructorModeChange,
}: ScenarioQuickEntryCardProps) {
  const [shareTarget, setShareTarget] = useState<ShareTarget>(
    instructorMode ? 'instructor' : 'learner'
  )
  const [qrDataUrl, setQrDataUrl] = useState('')
  const [copyFeedback, setCopyFeedback] = useState('')

  const learnerLink = makeShareLink('learner')
  const instructorLink = makeShareLink('instructor')
  const activeLink = shareTarget === 'instructor' ? instructorLink : learnerLink

  useEffect(() => {
    setShareTarget(instructorMode ? 'instructor' : 'learner')
  }, [instructorMode])

  useEffect(() => {
    if (!activeLink) {
      setQrDataUrl('')
      return
    }

    let cancelled = false

    QRCode.toDataURL(activeLink, {
      margin: 1,
      width: 180,
      color: {
        dark: '#0F172A',
        light: '#FFFFFF',
      },
    }).then((dataUrl) => {
      if (!cancelled) {
        setQrDataUrl(dataUrl)
      }
    }).catch(() => {
      if (!cancelled) {
        setQrDataUrl('')
      }
    })

    return () => {
      cancelled = true
    }
  }, [activeLink])

  const handleCopy = async () => {
    if (!activeLink) return

    try {
      await navigator.clipboard.writeText(activeLink)
      setCopyFeedback('已複製連結')
    } catch {
      setCopyFeedback('複製失敗')
    }

    window.setTimeout(() => {
      setCopyFeedback('')
    }, 1800)
  }

  return (
    <Card className="gap-4 border-gray-200 bg-white">
      <CardHeader className="gap-2 border-b pb-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle className="text-base">Instructor Mode</CardTitle>
            <p className="mt-1 text-sm text-gray-500">
              前端單機版講師工具，提供 QR 快速進題、deep link 與匯出。
            </p>
          </div>
          <Badge
            variant={instructorMode ? 'default' : 'secondary'}
            className="text-[10px]"
          >
            {instructorMode ? 'ON' : 'OFF'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={instructorMode ? 'outline' : 'default'}
            size="sm"
            onClick={() => onInstructorModeChange(!instructorMode)}
          >
            {instructorMode ? '切回學員模式' : '開啟講師模式'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(activeLink, '_blank', 'noopener,noreferrer')}
          >
            開新頁測試
          </Button>
        </div>

        <div className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-700">
          {scenarioId} / {scenarioTitle}
        </div>

        <div className="flex gap-2">
          <Button
            variant={shareTarget === 'learner' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShareTarget('learner')}
          >
            學員連結
          </Button>
          <Button
            variant={shareTarget === 'instructor' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShareTarget('instructor')}
          >
            講師連結
          </Button>
        </div>

        <div className="grid gap-3 sm:grid-cols-[180px_1fr]">
          <div className="flex justify-center rounded-lg border bg-white p-3">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt={`${shareTarget} mode QR code`}
                className="h-[180px] w-[180px]"
              />
            ) : (
              <div className="flex h-[180px] w-[180px] items-center justify-center text-xs text-gray-400">
                QR 產生中
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                Deep Link
              </p>
              <p className="mt-1 break-all text-xs text-gray-700">
                {activeLink}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                複製連結
              </Button>
              {shareTarget === 'instructor' && !instructorMode && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onInstructorModeChange(true)}
                >
                  同步切到講師模式
                </Button>
              )}
            </div>

            <p className="min-h-5 text-xs text-gray-500">
              {copyFeedback || 'QR 與連結都只依賴 URL query params，不需後端。'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

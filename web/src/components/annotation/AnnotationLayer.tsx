import { useState, useEffect, useCallback, useRef } from 'react'
import { useLocation } from 'react-router-dom'

// ── Data model ───────────────────────────────────────────────────────────────

interface Annotation {
  id: string
  page: string         // route path (e.g. "/content/M01")
  x: number            // click X in px (relative to document)
  y: number            // click Y in px (relative to document)
  viewportW: number    // viewport width at time of annotation
  viewportH: number    // viewport height at time of annotation
  text: string
  timestamp: string    // ISO 8601
  resolved: boolean
}

// ── Persistence ──────────────────────────────────────────────────────────────

const LOCAL_KEY = 'emtp-annotations-v2'

async function apiLoad(): Promise<Record<string, Annotation[]>> {
  try {
    const res = await fetch('/api/annotations')
    if (!res.ok) throw new Error('not ok')
    return await res.json()
  } catch {
    try { return JSON.parse(localStorage.getItem(LOCAL_KEY) ?? '{}') } catch { return {} }
  }
}

async function apiSave(data: Record<string, Annotation[]>): Promise<void> {
  const body = JSON.stringify(data, null, 2)
  localStorage.setItem(LOCAL_KEY, body)
  try {
    await fetch('/api/annotations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    })
  } catch { /* silent */ }
}

// ── Pin marker (shown on page at annotation location) ────────────────────────

function PinMarker({ note, onResolve, onDelete }: {
  note: Annotation
  onResolve: (id: string) => void
  onDelete: (id: string) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const markerRef = useRef<HTMLDivElement>(null)

  // Close when clicking outside
  useEffect(() => {
    if (!expanded) return
    const handler = (e: MouseEvent) => {
      if (markerRef.current && !markerRef.current.contains(e.target as Node)) {
        setExpanded(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [expanded])

  const left = note.x
  const top = note.y

  return (
    <div
      ref={markerRef}
      style={{ position: 'absolute', left, top, zIndex: 9998, transform: 'translate(-50%, -100%)' }}
    >
      {/* Pin icon */}
      <div
        onClick={() => setExpanded(v => !v)}
        style={{
          width: 24, height: 24, borderRadius: '50% 50% 50% 0',
          background: note.resolved ? '#9CA3AF' : '#EF4444',
          transform: 'rotate(-45deg)',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
          transition: 'transform 0.15s',
        }}
        title={note.text}
      >
        <span style={{ transform: 'rotate(45deg)', fontSize: 10, color: 'white', fontWeight: 700 }}>
          {note.resolved ? '✓' : '!'}
        </span>
      </div>

      {/* Tooltip popup */}
      {expanded && (
        <div style={{
          position: 'absolute', top: 28, left: -8, width: 260,
          background: 'white', borderRadius: 8,
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          border: '1px solid #e5e7eb',
          padding: '10px 12px', fontSize: 13, lineHeight: 1.5,
          color: '#374151',
        }}>
          <p style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{note.text}</p>
          <div style={{ marginTop: 8, display: 'flex', gap: 6, justifyContent: 'flex-end', fontSize: 11 }}>
            <span style={{ color: '#9CA3AF', marginRight: 'auto', fontSize: 10 }}>
              {new Date(note.timestamp).toLocaleString('zh-TW', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </span>
            {!note.resolved && (
              <button
                onClick={() => { onResolve(note.id); setExpanded(false) }}
                style={{
                  background: '#10B981', color: 'white', border: 'none', borderRadius: 4,
                  padding: '2px 8px', cursor: 'pointer', fontWeight: 600,
                }}
              >已處理</button>
            )}
            <button
              onClick={() => { onDelete(note.id); setExpanded(false) }}
              style={{
                background: '#EF4444', color: 'white', border: 'none', borderRadius: 4,
                padding: '2px 8px', cursor: 'pointer', fontWeight: 600,
              }}
            >刪除</button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Input form (appears at click position) ───────────────────────────────────

function AnnotationInput({ x, y, onSubmit, onCancel }: {
  x: number
  y: number
  onSubmit: (text: string) => void
  onCancel: () => void
}) {
  const [text, setText] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = () => {
    const trimmed = text.trim()
    if (trimmed) onSubmit(trimmed)
    else onCancel()
  }

  // Convert document coords to viewport for positioning the fixed input
  const viewLeft = x - window.scrollX
  const viewTop = y - window.scrollY

  return (
    <div style={{
      position: 'fixed', left: viewLeft, top: viewTop, zIndex: 10001,
      transform: 'translate(-4px, 8px)',
    }}>
      <div style={{
        background: 'white', borderRadius: 10, padding: '10px 12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
        border: '2px solid #3B82F6',
        width: 280,
      }}>
        <textarea
          ref={inputRef}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit() }
            if (e.key === 'Escape') onCancel()
          }}
          placeholder="輸入意見或問題…"
          rows={3}
          style={{
            width: '100%', border: '1px solid #E5E7EB', borderRadius: 6,
            padding: '6px 8px', fontSize: 13, lineHeight: 1.5,
            resize: 'vertical', outline: 'none', fontFamily: 'inherit',
          }}
        />
        <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end', marginTop: 6 }}>
          <button
            onClick={onCancel}
            style={{
              background: '#F3F4F6', color: '#6B7280', border: 'none', borderRadius: 6,
              padding: '4px 12px', cursor: 'pointer', fontSize: 12, fontWeight: 500,
            }}
          >取消</button>
          <button
            onClick={handleSubmit}
            style={{
              background: '#3B82F6', color: 'white', border: 'none', borderRadius: 6,
              padding: '4px 12px', cursor: 'pointer', fontSize: 12, fontWeight: 600,
            }}
          >送出</button>
        </div>
      </div>
    </div>
  )
}

// ── Annotation summary panel ─────────────────────────────────────────────────

function AnnotationPanel({ notes, onResolve, onDelete, onClearResolved }: {
  notes: Annotation[]
  onResolve: (id: string) => void
  onDelete: (id: string) => void
  onClearResolved: () => void
}) {
  const [open, setOpen] = useState(false)
  const pending = notes.filter(n => !n.resolved)
  const resolved = notes.filter(n => n.resolved)

  if (!open) return null

  return (
    <div style={{
      position: 'fixed', right: 12, bottom: 68, zIndex: 10000,
      width: 320, maxHeight: '60vh', overflowY: 'auto',
      background: 'white', borderRadius: 12,
      boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
      border: '1px solid #e5e7eb',
    }}>
      <div style={{
        padding: '10px 14px', borderBottom: '1px solid #e5e7eb',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontWeight: 700, fontSize: 14, color: '#1F2937' }}>
          此頁註記 ({notes.length})
        </span>
        <button
          onClick={() => setOpen(false)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#9CA3AF' }}
        >✕</button>
      </div>

      {pending.length === 0 && resolved.length === 0 && (
        <p style={{ padding: 14, color: '#9CA3AF', fontSize: 13, textAlign: 'center' }}>尚無註記</p>
      )}

      {pending.map(note => (
        <div key={note.id} style={{ padding: '8px 14px', borderBottom: '1px solid #f3f4f6' }}>
          <p style={{ margin: 0, fontSize: 13, color: '#374151', lineHeight: 1.5 }}>{note.text}</p>
          <div style={{ display: 'flex', gap: 6, marginTop: 4, alignItems: 'center' }}>
            <span style={{ fontSize: 10, color: '#9CA3AF' }}>
              ({Math.round(note.x)}, {Math.round(note.y)})
            </span>
            <span style={{ fontSize: 10, color: '#9CA3AF', marginRight: 'auto' }}>
              {new Date(note.timestamp).toLocaleString('zh-TW', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </span>
            <button
              onClick={() => onResolve(note.id)}
              style={{ fontSize: 10, color: '#10B981', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
            >已處理</button>
            <button
              onClick={() => onDelete(note.id)}
              style={{ fontSize: 10, color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
            >刪除</button>
          </div>
        </div>
      ))}

      {resolved.length > 0 && (
        <>
          <div style={{ padding: '6px 14px', background: '#F9FAFB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600 }}>已處理 ({resolved.length})</span>
            <button
              onClick={onClearResolved}
              style={{ fontSize: 10, color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer' }}
            >全部清除</button>
          </div>
          {resolved.map(note => (
            <div key={note.id} style={{ padding: '6px 14px', borderBottom: '1px solid #f3f4f6', opacity: 0.6 }}>
              <p style={{ margin: 0, fontSize: 12, color: '#6B7280', textDecoration: 'line-through' }}>{note.text}</p>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

// ── Main Annotation Layer ────────────────────────────────────────────────────

export function AnnotationLayer() {
  const location = useLocation()
  const path = location.pathname

  const [active, setActive] = useState(false)
  const [showPanel, setShowPanel] = useState(false)
  const [allNotes, setAllNotes] = useState<Record<string, Annotation[]>>({})
  const [loaded, setLoaded] = useState(false)
  const [pendingClick, setPendingClick] = useState<{ x: number; y: number } | null>(null)
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved')

  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── Load ──
  useEffect(() => {
    apiLoad().then(data => {
      setAllNotes(data)
      setLoaded(true)
    })
  }, [])

  // ── Debounced save ──
  useEffect(() => {
    if (!loaded) return
    setSaveStatus('saving')
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(async () => {
      await apiSave(allNotes)
      setSaveStatus('saved')
    }, 400)
    return () => { if (saveTimer.current) clearTimeout(saveTimer.current) }
  }, [allNotes, loaded])

  const notes: Annotation[] = allNotes[path] ?? []

  const setNotes = useCallback((updater: (prev: Annotation[]) => Annotation[]) => {
    setAllNotes(prev => ({ ...prev, [path]: updater(prev[path] ?? []) }))
  }, [path])

  // Click on overlay → record position, show input form
  const handleOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!active) return
    const docX = e.clientX + window.scrollX
    const docY = e.clientY + window.scrollY
    setPendingClick({ x: docX, y: docY })
  }, [active])

  // Submit annotation text
  const handleSubmit = useCallback((text: string) => {
    if (!pendingClick) return
    const newNote: Annotation = {
      id: Date.now().toString(),
      page: path,
      x: pendingClick.x,
      y: pendingClick.y,
      viewportW: window.innerWidth,
      viewportH: window.innerHeight,
      text,
      timestamp: new Date().toISOString(),
      resolved: false,
    }
    setNotes(prev => [...prev, newNote])
    setPendingClick(null)
  }, [pendingClick, path, setNotes])

  const handleResolve = useCallback((id: string) =>
    setNotes(prev => prev.map(n => n.id === id ? { ...n, resolved: true } : n)), [setNotes])

  const handleDelete = useCallback((id: string) =>
    setNotes(prev => prev.filter(n => n.id !== id)), [setNotes])

  const handleClearResolved = useCallback(() =>
    setNotes(prev => prev.filter(n => !n.resolved)), [setNotes])

  // Escape → exit annotation mode
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (pendingClick) setPendingClick(null)
        else setActive(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [pendingClick])

  const pendingCount = notes.filter(n => !n.resolved).length

  return (
    <>
      {/* Click-capture overlay */}
      {active && !pendingClick && (
        <div
          onClick={handleOverlayClick}
          style={{
            position: 'fixed', inset: 0, zIndex: 9990,
            cursor: 'crosshair', background: 'rgba(59,130,246,0.05)', pointerEvents: 'all',
          }}
        />
      )}

      {/* Pin markers on page */}
      <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
        <div style={{ pointerEvents: 'auto' }}>
          {notes.filter(n => !n.resolved).map(note => (
            <PinMarker key={note.id} note={note} onResolve={handleResolve} onDelete={handleDelete} />
          ))}
        </div>
      </div>

      {/* Input form at click position */}
      {pendingClick && (
        <AnnotationInput
          x={pendingClick.x}
          y={pendingClick.y}
          onSubmit={handleSubmit}
          onCancel={() => setPendingClick(null)}
        />
      )}

      {/* Annotation panel */}
      {showPanel && (
        <AnnotationPanel
          notes={notes}
          onResolve={handleResolve}
          onDelete={handleDelete}
          onClearResolved={handleClearResolved}
        />
      )}

      {/* Toolbar */}
      <div style={{
        position: 'fixed', bottom: 68, left: 12, zIndex: 10000,
        display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start',
      }}>
        {active && (
          <div style={{
            background: '#1e40af', color: 'white', fontSize: 11, fontWeight: 600,
            padding: '4px 10px', borderRadius: 6, pointerEvents: 'none',
            whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
          }}>
            點擊任意位置加入註記　Esc 退出
          </div>
        )}

        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {/* Toggle annotation mode */}
          <button
            onClick={() => { setActive(v => !v); setPendingClick(null) }}
            title={active ? '退出註記模式（Esc）' : '開啟註記模式'}
            style={{
              width: 38, height: 38, borderRadius: '50%', border: 'none',
              cursor: 'pointer', fontSize: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
              background: active ? '#1e40af' : '#ffffff',
              color: active ? '#ffffff' : '#374151',
              transition: 'background 0.2s, color 0.2s',
            }}
          >&#9998;</button>

          {/* Show panel with count */}
          {notes.length > 0 && (
            <button
              onClick={() => setShowPanel(v => !v)}
              title="檢視此頁註記"
              style={{
                height: 38, padding: '0 12px', borderRadius: 19,
                border: '1px solid #e5e7eb', cursor: 'pointer', fontSize: 12,
                background: showPanel ? '#EFF6FF' : '#ffffff',
                color: pendingCount > 0 ? '#EF4444' : '#6b7280',
                fontWeight: pendingCount > 0 ? 700 : 400,
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              }}
            >
              {pendingCount > 0 ? `${pendingCount} 待處理` : `${notes.length} 則`}
            </button>
          )}

          {saveStatus === 'saving' && (
            <span style={{
              fontSize: 10, color: '#9ca3af',
              background: 'white', padding: '2px 8px', borderRadius: 10,
              boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
            }}>
              儲存中…
            </span>
          )}
        </div>
      </div>
    </>
  )
}

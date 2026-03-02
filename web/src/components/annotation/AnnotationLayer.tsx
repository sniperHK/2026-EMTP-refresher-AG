import { useState, useEffect, useCallback, useRef } from 'react'
import { useLocation } from 'react-router-dom'

interface Annotation {
  id: string
  pageX: number   // absolute page X (clientX + scrollX)
  pageY: number   // absolute page Y (clientY + scrollY)
  text: string
  color: string
}

const COLORS = ['#FEF08A', '#BBF7D0', '#BFDBFE', '#FED7AA', '#F9A8D4']

// ── Persistence (file-backed via dev server; localStorage fallback for static) ──

const LOCAL_KEY = 'emtp-annotations'

async function apiLoad(): Promise<Record<string, Annotation[]>> {
  try {
    const res = await fetch('/api/annotations')
    if (!res.ok) throw new Error('not ok')
    return await res.json()
  } catch {
    // Fallback: read from localStorage when running without dev server
    try { return JSON.parse(localStorage.getItem(LOCAL_KEY) ?? '{}') } catch { return {} }
  }
}

async function apiSave(data: Record<string, Annotation[]>): Promise<void> {
  const body = JSON.stringify(data, null, 2)
  // Always mirror to localStorage as fast local cache
  localStorage.setItem(LOCAL_KEY, body)
  try {
    await fetch('/api/annotations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    })
  } catch {
    // silent — localStorage already has the data
  }
}

// ── Single sticky note ───────────────────────────────────────────────────────

interface NoteProps {
  note: Annotation
  onUpdate: (id: string, text: string) => void
  onDelete: (id: string) => void
  onDragEnd: (id: string, pageX: number, pageY: number) => void
}

function StickyNote({ note, onUpdate, onDelete, onDragEnd }: NoteProps) {
  const [editing, setEditing] = useState(!note.text)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const dragging = useRef(false)
  const dragOffset = useRef({ x: 0, y: 0 })

  const left = note.pageX - window.scrollX
  const top  = note.pageY - window.scrollY

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).tagName === 'TEXTAREA') return
    if ((e.target as HTMLElement).tagName === 'BUTTON') return
    dragging.current = true
    dragOffset.current = {
      x: e.clientX - (note.pageX - window.scrollX),
      y: e.clientY - (note.pageY - window.scrollY),
    }
    e.preventDefault()
  }

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return
      const el = document.getElementById(`note-${note.id}`)
      if (el) {
        el.style.left = `${e.clientX - dragOffset.current.x}px`
        el.style.top  = `${e.clientY - dragOffset.current.y}px`
      }
    }
    const onMouseUp = (e: MouseEvent) => {
      if (!dragging.current) return
      dragging.current = false
      onDragEnd(
        note.id,
        e.clientX - dragOffset.current.x + window.scrollX,
        e.clientY - dragOffset.current.y + window.scrollY,
      )
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [note.id, onDragEnd])

  useEffect(() => {
    if (editing) textareaRef.current?.focus()
  }, [editing])

  return (
    <div
      id={`note-${note.id}`}
      style={{
        position: 'fixed', left, top, zIndex: 9999, width: 200,
        background: note.color, borderRadius: 8,
        boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
        pointerEvents: 'all', cursor: 'grab', userSelect: 'none',
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Title bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '4px 6px 2px', borderBottom: '1px solid rgba(0,0,0,0.1)',
      }}>
        <span style={{ fontSize: 10, fontWeight: 600, opacity: 0.6 }}>注記</span>
        <div style={{ display: 'flex', gap: 4 }}>
          <button
            onClick={() => setEditing(v => !v)}
            style={{ fontSize: 10, background: 'none', border: 'none', cursor: 'pointer', padding: '0 2px', opacity: 0.6 }}
            title={editing ? '完成' : '編輯'}
          >{editing ? '✓' : '✏'}</button>
          <button
            onClick={() => onDelete(note.id)}
            style={{ fontSize: 10, background: 'none', border: 'none', cursor: 'pointer', padding: '0 2px', opacity: 0.6 }}
            title="刪除"
          >✕</button>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '6px 8px 8px' }}>
        {editing ? (
          <textarea
            ref={textareaRef}
            value={note.text}
            onChange={e => onUpdate(note.id, e.target.value)}
            onBlur={() => { if (note.text) setEditing(false) }}
            placeholder="輸入注記…"
            style={{
              width: '100%', minHeight: 64, border: 'none', background: 'transparent',
              resize: 'vertical', fontSize: 12, lineHeight: 1.5, outline: 'none',
              fontFamily: 'inherit', cursor: 'text',
            }}
          />
        ) : (
          <p
            style={{ margin: 0, fontSize: 12, lineHeight: 1.5, whiteSpace: 'pre-wrap', wordBreak: 'break-word', minHeight: 20 }}
            onDoubleClick={() => setEditing(true)}
          >
            {note.text || <span style={{ opacity: 0.4 }}>（空白）</span>}
          </p>
        )}
      </div>
    </div>
  )
}

// ── Annotation Layer ─────────────────────────────────────────────────────────

type SaveStatus = 'saved' | 'saving' | 'error'

export function AnnotationLayer() {
  const location = useLocation()
  const path = location.pathname

  const [active, setActive] = useState(false)
  const [allNotes, setAllNotes] = useState<Record<string, Annotation[]>>({})
  const [colorIdx, setColorIdx] = useState(0)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('saved')
  const [loaded, setLoaded] = useState(false)

  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── Load from file on first mount ──
  useEffect(() => {
    apiLoad().then(data => {
      setAllNotes(data)
      setLoaded(true)
    })
  }, [])

  // ── Debounced save whenever allNotes changes (skip initial load) ──
  useEffect(() => {
    if (!loaded) return
    setSaveStatus('saving')
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(async () => {
      try {
        await apiSave(allNotes)
        setSaveStatus('saved')
      } catch {
        setSaveStatus('error')
      }
    }, 400)
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
    }
  }, [allNotes, loaded])

  const notes: Annotation[] = allNotes[path] ?? []

  const setNotes = useCallback((updater: (prev: Annotation[]) => Annotation[]) => {
    setAllNotes(prev => ({ ...prev, [path]: updater(prev[path] ?? []) }))
  }, [path])

  const handleOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!active) return
    setNotes(prev => [...prev, {
      id: Date.now().toString(),
      pageX: e.clientX + window.scrollX,
      pageY: e.clientY + window.scrollY,
      text: '',
      color: COLORS[colorIdx % COLORS.length],
    }])
    setColorIdx(i => (i + 1) % COLORS.length)
  }, [active, colorIdx, setNotes])

  const handleUpdate   = useCallback((id: string, text: string) =>
    setNotes(prev => prev.map(n => n.id === id ? { ...n, text } : n)), [setNotes])

  const handleDelete   = useCallback((id: string) =>
    setNotes(prev => prev.filter(n => n.id !== id)), [setNotes])

  const handleDragEnd  = useCallback((id: string, pageX: number, pageY: number) =>
    setNotes(prev => prev.map(n => n.id === id ? { ...n, pageX, pageY } : n)), [setNotes])

  const clearAll = useCallback(() => setNotes(() => []), [setNotes])

  // Escape → exit annotation mode
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActive(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      {/* Click-capture overlay */}
      {active && (
        <div
          onClick={handleOverlayClick}
          style={{
            position: 'fixed', inset: 0, zIndex: 9990,
            cursor: 'crosshair', background: 'rgba(59,130,246,0.05)', pointerEvents: 'all',
          }}
        />
      )}

      {/* Sticky notes */}
      {notes.map(note => (
        <StickyNote
          key={note.id}
          note={note}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onDragEnd={handleDragEnd}
        />
      ))}

      {/* Toolbar */}
      <div style={{
        position: 'fixed', bottom: 68, left: 12, zIndex: 10000,
        display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start',
      }}>
        {/* Mode hint */}
        {active && (
          <div style={{
            background: '#1e40af', color: 'white', fontSize: 11, fontWeight: 600,
            padding: '4px 10px', borderRadius: 6, pointerEvents: 'none',
            whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
          }}>
            點擊任意位置加入注記　Esc 退出
          </div>
        )}

        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {/* Toggle */}
          <button
            onClick={() => setActive(v => !v)}
            title={active ? '退出注記模式（Esc）' : '開啟注記模式'}
            style={{
              width: 38, height: 38, borderRadius: '50%', border: 'none',
              cursor: 'pointer', fontSize: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
              background: active ? '#1e40af' : '#ffffff',
              color: active ? '#ffffff' : '#374151',
              transition: 'background 0.2s, color 0.2s',
            }}
          >✏️</button>

          {/* Clear */}
          {notes.length > 0 && (
            <button
              onClick={clearAll}
              title={`清除此頁全部注記（${notes.length} 則）`}
              style={{
                height: 38, padding: '0 10px', borderRadius: 19,
                border: '1px solid #e5e7eb', cursor: 'pointer', fontSize: 11,
                background: '#ffffff', color: '#6b7280',
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              }}
            >清除 ({notes.length})</button>
          )}

          {/* Save status indicator */}
          {saveStatus !== 'saved' && (
            <span style={{
              fontSize: 10, color: saveStatus === 'error' ? '#ef4444' : '#9ca3af',
              background: 'white', padding: '2px 8px', borderRadius: 10,
              boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
            }}>
              {saveStatus === 'saving' ? '儲存中…' : '儲存失敗'}
            </span>
          )}
        </div>
      </div>
    </>
  )
}

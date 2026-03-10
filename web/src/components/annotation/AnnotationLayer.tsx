import { useState, useEffect, useCallback, useRef } from 'react'
import { useLocation } from 'react-router-dom'

// ── Data model ───────────────────────────────────────────────────────────────

interface Annotation {
  id: string
  anchor: string      // CSS selector for the target element
  relX: number        // 0-1 relative X within anchor element
  relY: number        // 0-1 relative Y within anchor element
  text: string
  color: string
  // Legacy fallback (old absolute positioning)
  pageX?: number
  pageY?: number
}

const COLORS = ['#FEF08A', '#BBF7D0', '#BFDBFE', '#FED7AA', '#F9A8D4']

// ── DOM anchor utilities ─────────────────────────────────────────────────────

const BLOCK_TAGS = new Set([
  'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'DIV', 'SECTION', 'ARTICLE',
  'TABLE', 'TR', 'LI', 'PRE', 'BLOCKQUOTE', 'MAIN', 'HEADER', 'FOOTER',
  'NAV', 'ASIDE', 'FIGURE', 'FIGCAPTION', 'DETAILS', 'SUMMARY',
])

/** Walk up from an element to find a meaningful block-level anchor */
function findAnchorElement(el: Element | null): Element {
  let current = el
  while (current && current !== document.body) {
    if (current.id || BLOCK_TAGS.has(current.tagName)) return current
    current = current.parentElement
  }
  return document.body
}

/** Generate a unique CSS selector for an element */
function getSelector(el: Element): string {
  if (el === document.body) return 'body'
  if (el.id) return `#${CSS.escape(el.id)}`

  const parts: string[] = []
  let current: Element | null = el

  while (current && current !== document.body) {
    if (current.id) {
      parts.unshift(`#${CSS.escape(current.id)}`)
      break
    }

    let selector = current.tagName.toLowerCase()
    const parent = current.parentElement
    if (parent) {
      const sameTag = Array.from(parent.children).filter(c => c.tagName === current!.tagName)
      if (sameTag.length > 1) {
        const idx = sameTag.indexOf(current) + 1
        selector += `:nth-of-type(${idx})`
      }
    }
    parts.unshift(selector)
    current = current.parentElement
  }

  return parts.join(' > ')
}

/** Resolve anchor position — returns viewport-relative coords */
function resolvePosition(note: Annotation): { left: number; top: number } | null {
  if (note.anchor && note.anchor !== 'body') {
    try {
      const el = document.querySelector(note.anchor)
      if (el) {
        const rect = el.getBoundingClientRect()
        return {
          left: rect.left + rect.width * note.relX,
          top: rect.top + rect.height * note.relY,
        }
      }
    } catch { /* invalid selector */ }
  }
  // Legacy fallback
  if (note.pageX != null && note.pageY != null) {
    return { left: note.pageX - window.scrollX, top: note.pageY - window.scrollY }
  }
  return null
}

// ── Persistence ──────────────────────────────────────────────────────────────

const LOCAL_KEY = 'emtp-annotations'

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

// ── StickyNote component ─────────────────────────────────────────────────────

interface NoteProps {
  note: Annotation
  onUpdate: (id: string, text: string) => void
  onDelete: (id: string) => void
  onDragEnd: (id: string, anchor: string, relX: number, relY: number) => void
}

function StickyNote({ note, onUpdate, onDelete, onDragEnd }: NoteProps) {
  const [editing, setEditing] = useState(!note.text)
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const dragging = useRef(false)
  const dragOffset = useRef({ x: 0, y: 0 })

  // Recalculate position on scroll/resize
  useEffect(() => {
    const update = () => setPos(resolvePosition(note))
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [note.anchor, note.relX, note.relY, note.pageX, note.pageY])

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).tagName === 'TEXTAREA') return
    if ((e.target as HTMLElement).tagName === 'BUTTON') return
    if (!pos) return
    dragging.current = true
    dragOffset.current = { x: e.clientX - pos.left, y: e.clientY - pos.top }
    e.preventDefault()
  }

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return
      const el = document.getElementById(`note-${note.id}`)
      if (el) {
        el.style.left = `${e.clientX - dragOffset.current.x}px`
        el.style.top = `${e.clientY - dragOffset.current.y}px`
      }
    }
    const onMouseUp = (e: MouseEvent) => {
      if (!dragging.current) return
      dragging.current = false
      const dropX = e.clientX - dragOffset.current.x
      const dropY = e.clientY - dragOffset.current.y
      // Find new anchor at drop position
      const target = document.elementFromPoint(dropX, dropY)
      const anchorEl = findAnchorElement(target)
      const selector = getSelector(anchorEl)
      const rect = anchorEl.getBoundingClientRect()
      const relX = rect.width > 0 ? (dropX - rect.left) / rect.width : 0
      const relY = rect.height > 0 ? (dropY - rect.top) / rect.height : 0
      onDragEnd(note.id, selector, relX, relY)
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

  if (!pos) return null

  return (
    <div
      id={`note-${note.id}`}
      style={{
        position: 'fixed', left: pos.left, top: pos.top, zIndex: 9999, width: 200,
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
  const [slideHash, setSlideHash] = useState('')

  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── Slidev iframe hash tracking ──
  const isSlides = path.startsWith('/slides/')

  useEffect(() => {
    if (!isSlides) {
      setSlideHash('')
      return
    }

    let hashCleanup: (() => void) | undefined

    function attachIframeListener() {
      const iframe = document.querySelector('iframe') as HTMLIFrameElement | null
      if (!iframe) return false

      const onLoad = () => {
        try {
          const win = iframe.contentWindow
          if (!win) return
          setSlideHash(win.location.hash || '#/1')
          const onHashChange = () => setSlideHash(win.location.hash || '#/1')
          win.addEventListener('hashchange', onHashChange)
          hashCleanup = () => {
            try { win.removeEventListener('hashchange', onHashChange) } catch { /* noop */ }
          }
        } catch { /* cross-origin fallback */ }
      }

      if (iframe.contentDocument?.readyState === 'complete') {
        onLoad()
      }
      iframe.addEventListener('load', onLoad)
      return true
    }

    if (!attachIframeListener()) {
      const observer = new MutationObserver(() => {
        if (attachIframeListener()) observer.disconnect()
      })
      observer.observe(document.body, { childList: true, subtree: true })
      return () => { observer.disconnect(); hashCleanup?.() }
    }

    return () => hashCleanup?.()
  }, [isSlides, path])

  const annotationKey = isSlides && slideHash ? `${path}${slideHash}` : path

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

  const notes: Annotation[] = allNotes[annotationKey] ?? []

  const setNotes = useCallback((updater: (prev: Annotation[]) => Annotation[]) => {
    setAllNotes(prev => ({ ...prev, [annotationKey]: updater(prev[annotationKey] ?? []) }))
  }, [annotationKey])

  const handleOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!active) return
    const overlay = e.currentTarget
    // Temporarily disable overlay to find element underneath
    overlay.style.pointerEvents = 'none'
    const target = document.elementFromPoint(e.clientX, e.clientY)
    overlay.style.pointerEvents = 'all'

    const anchorEl = findAnchorElement(target)
    const selector = getSelector(anchorEl)
    const rect = anchorEl.getBoundingClientRect()
    const relX = rect.width > 0 ? (e.clientX - rect.left) / rect.width : 0
    const relY = rect.height > 0 ? (e.clientY - rect.top) / rect.height : 0

    setNotes(prev => [...prev, {
      id: Date.now().toString(),
      anchor: selector,
      relX,
      relY,
      text: '',
      color: COLORS[colorIdx % COLORS.length],
    }])
    setColorIdx(i => (i + 1) % COLORS.length)
  }, [active, colorIdx, setNotes])

  const handleUpdate = useCallback((id: string, text: string) =>
    setNotes(prev => prev.map(n => n.id === id ? { ...n, text } : n)), [setNotes])

  const handleDelete = useCallback((id: string) =>
    setNotes(prev => prev.filter(n => n.id !== id)), [setNotes])

  const handleDragEnd = useCallback((id: string, anchor: string, relX: number, relY: number) =>
    setNotes(prev => prev.map(n => n.id === id ? { ...n, anchor, relX, relY } : n)), [setNotes])

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
        {isSlides && slideHash && (
          <div style={{
            background: '#0f172a', color: '#94a3b8', fontSize: 10, fontWeight: 500,
            padding: '3px 8px', borderRadius: 5, pointerEvents: 'none',
            whiteSpace: 'nowrap', boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
          }}>
            Slide {slideHash.replace('#/', '')}
            {notes.length > 0 && ` · ${notes.length} 則注記`}
          </div>
        )}

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

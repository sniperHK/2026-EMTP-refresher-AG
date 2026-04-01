import { type ChangeEvent, type FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import {
  AlertCircle,
  Heart,
  ImagePlus,
  LoaderCircle,
  MessageCircleReply,
  Pin,
  RefreshCcw,
  SendHorizontal,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  MESSAGE_IMAGE_SIZE_LIMIT_BYTES,
  MESSAGE_MAX_LENGTH,
  MESSAGE_NICKNAME_MAX_LENGTH,
  REPLY_MAX_LENGTH,
  createMessage,
  createReply,
  fetchMessageThreads,
  isMessageBoardConfigured,
  type MessageThread,
  updateMessageLikes,
} from '@/lib/message-board'
import { loadParticipantProfile } from '@/lib/quiz-results'
import { cn } from '@/lib/utils'

const LIKED_STORAGE_KEY = 'emtp-message-liked'

function loadLikedMessageIds() {
  if (typeof window === 'undefined') return []

  try {
    const parsed = JSON.parse(window.localStorage.getItem(LIKED_STORAGE_KEY) ?? '[]')
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : []
  } catch {
    return []
  }
}

function persistLikedMessageIds(ids: string[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(LIKED_STORAGE_KEY, JSON.stringify(ids))
}

function getInitial(nickname: string) {
  return nickname.trim().charAt(0).toUpperCase() || '匿'
}

function formatTimeAgo(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '剛剛'

  const diffMinutes = Math.floor((Date.now() - date.getTime()) / 60000)
  if (diffMinutes < 1) return '剛剛'
  if (diffMinutes < 60) return `${diffMinutes} 分鐘前`

  const diffHours = Math.floor(diffMinutes / 60)
  if (diffHours < 24) return `${diffHours} 小時前`

  const diffDays = Math.floor(diffHours / 24)
  if (diffDays < 7) return `${diffDays} 天前`

  return date.toLocaleString('zh-TW', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

interface MessageCardProps {
  thread: MessageThread
  defaultNickname: string
  liked: boolean
  likePending: boolean
  onToggleLike: (thread: MessageThread) => Promise<void>
  onReplySubmit: (messageId: string, payload: { nickname: string; content: string }) => Promise<void>
}

function MessageCard({
  thread,
  defaultNickname,
  liked,
  likePending,
  onToggleLike,
  onReplySubmit,
}: MessageCardProps) {
  const [replyOpen, setReplyOpen] = useState(false)
  const [replyNickname, setReplyNickname] = useState(defaultNickname)
  const [replyContent, setReplyContent] = useState('')
  const [replyError, setReplyError] = useState<string | null>(null)
  const [replySubmitting, setReplySubmitting] = useState(false)

  async function handleReplySubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setReplyError(null)

    try {
      setReplySubmitting(true)
      await onReplySubmit(thread.id, {
        nickname: replyNickname,
        content: replyContent,
      })
      setReplyContent('')
      setReplyOpen(false)
    } catch (error) {
      console.error(error)
      setReplyError(error instanceof Error ? error.message : '回覆送出失敗，請稍後再試。')
    } finally {
      setReplySubmitting(false)
    }
  }

  return (
    <Card className="border-slate-200 shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="gap-3 border-b border-slate-100 pb-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
              style={{ background: 'linear-gradient(135deg, var(--medical-navy), var(--medical-blue))' }}
            >
              {getInitial(thread.nickname)}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle className="text-base text-slate-900">{thread.nickname}</CardTitle>
                {thread.pinned && (
                  <Badge
                    variant="secondary"
                    className="border border-blue-200 bg-blue-50 text-blue-700"
                  >
                    <Pin className="mr-1 size-3.5" />
                    置頂
                  </Badge>
                )}
              </div>
              <CardDescription className="mt-1 text-xs text-slate-500">
                {formatTimeAgo(thread.createdAt)}
              </CardDescription>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              size="sm"
              variant={liked ? 'default' : 'outline'}
              className={cn(
                'h-8 gap-1.5 rounded-full px-3',
                liked && 'bg-rose-600 text-white hover:bg-rose-500',
              )}
              disabled={likePending}
              onClick={() => void onToggleLike(thread)}
            >
              {likePending ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <Heart className={cn('size-4', liked && 'fill-current')} />
              )}
              <span>{thread.likes}</span>
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="h-8 gap-1.5 rounded-full px-3"
              onClick={() => setReplyOpen((prev) => !prev)}
            >
              <MessageCircleReply className="size-4" />
              <span>回覆 {thread.replies.length > 0 ? `(${thread.replies.length})` : ''}</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-5">
        <p className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-700">
          {thread.content}
        </p>

        {thread.imageUrl && (
          <button
            type="button"
            className="block overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
            onClick={() => window.open(thread.imageUrl ?? '', '_blank', 'noopener,noreferrer')}
          >
            <img
              src={thread.imageUrl}
              alt={`${thread.nickname} 上傳的留言圖片`}
              className="max-h-[26rem] w-full object-cover"
              loading="lazy"
            />
          </button>
        )}

        {(thread.replies.length > 0 || replyOpen) && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
            <div className="space-y-3">
              {thread.replies.map((reply) => (
                <div
                  key={reply.id}
                  className="flex gap-3 rounded-xl border border-white/60 bg-white/80 px-3 py-3"
                >
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700">
                    {getInitial(reply.nickname)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-slate-800">{reply.nickname}</span>
                      <span className="text-xs text-slate-500">{formatTimeAgo(reply.createdAt)}</span>
                    </div>
                    <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-6 text-slate-700">
                      {reply.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {replyOpen && (
              <form className="mt-4 space-y-3" onSubmit={handleReplySubmit}>
                <div className="grid gap-3 md:grid-cols-[160px_1fr]">
                  <input
                    value={replyNickname}
                    onChange={(event) => setReplyNickname(event.target.value.slice(0, MESSAGE_NICKNAME_MAX_LENGTH))}
                    placeholder="你的暱稱"
                    maxLength={MESSAGE_NICKNAME_MAX_LENGTH}
                    className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-slate-400"
                  />
                  <textarea
                    value={replyContent}
                    onChange={(event) => setReplyContent(event.target.value.slice(0, REPLY_MAX_LENGTH))}
                    placeholder="補充想法或回應前一則留言"
                    maxLength={REPLY_MAX_LENGTH}
                    rows={2}
                    className="min-h-24 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm leading-6 outline-none transition focus:border-slate-400"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-slate-500">
                    {replyContent.length}/{REPLY_MAX_LENGTH}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setReplyOpen(false)}
                    >
                      取消
                    </Button>
                    <Button type="submit" disabled={replySubmitting || !replyContent.trim()}>
                      {replySubmitting ? (
                        <LoaderCircle className="size-4 animate-spin" />
                      ) : (
                        <SendHorizontal className="size-4" />
                      )}
                      送出回覆
                    </Button>
                  </div>
                </div>

                {replyError && (
                  <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                    {replyError}
                  </p>
                )}
              </form>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function MessageBoardPage() {
  const configured = isMessageBoardConfigured()
  const initialNickname = useMemo(() => loadParticipantProfile().name.slice(0, MESSAGE_NICKNAME_MAX_LENGTH), [])
  const [threads, setThreads] = useState<MessageThread[]>([])
  const [loading, setLoading] = useState(configured)
  const [pageError, setPageError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [likedIds, setLikedIds] = useState<string[]>(() => loadLikedMessageIds())
  const [pendingLikeIds, setPendingLikeIds] = useState<string[]>([])
  const [nickname, setNickname] = useState(initialNickname)
  const [content, setContent] = useState('')
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const totalReplies = useMemo(
    () => threads.reduce((sum, thread) => sum + thread.replies.length, 0),
    [threads],
  )

  useEffect(() => {
    persistLikedMessageIds(likedIds)
  }, [likedIds])

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const loadBoard = useCallback(async () => {
    if (!configured) return

    setLoading(true)
    setPageError(null)

    try {
      const nextThreads = await fetchMessageThreads()
      setThreads(nextThreads)
    } catch (error) {
      console.error(error)
      setPageError('留言板讀取失敗，請稍後重新整理。')
    } finally {
      setLoading(false)
    }
  }, [configured])

  useEffect(() => {
    void loadBoard()
  }, [loadBoard])

  function clearSelectedImage() {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setSelectedImage(null)
    setPreviewUrl(null)
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null
    setSubmitError(null)

    if (!file) {
      clearSelectedImage()
      return
    }

    if (!file.type.startsWith('image/')) {
      setSubmitError('只能上傳圖片檔。')
      event.target.value = ''
      return
    }

    if (file.size > MESSAGE_IMAGE_SIZE_LIMIT_BYTES) {
      setSubmitError('圖片需小於 5 MB。')
      event.target.value = ''
      return
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }

    setSelectedImage(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!configured) {
      setSubmitError('目前尚未設定留言板 backend。')
      return
    }

    setSubmitting(true)
    setSubmitError(null)

    try {
      await createMessage({
        nickname,
        content,
        imageFile: selectedImage,
      })
      setContent('')
      clearSelectedImage()
      await loadBoard()
    } catch (error) {
      console.error(error)
      setSubmitError(error instanceof Error ? error.message : '留言送出失敗，請稍後再試。')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleReplySubmit(messageId: string, payload: { nickname: string; content: string }) {
    await createReply(messageId, payload)
    await loadBoard()
  }

  async function handleToggleLike(thread: MessageThread) {
    const isLiked = likedIds.includes(thread.id)
    const delta = isLiked ? -1 : 1
    const previousLikedIds = likedIds
    const nextLikedIds = isLiked
      ? likedIds.filter((id) => id !== thread.id)
      : [...likedIds, thread.id]

    setLikedIds(nextLikedIds)
    setPendingLikeIds((prev) => [...prev, thread.id])
    setThreads((prev) =>
      prev.map((item) =>
        item.id === thread.id
          ? { ...item, likes: Math.max(0, item.likes + delta) }
          : item,
      ),
    )

    try {
      const nextLikes = await updateMessageLikes(thread.id, delta as 1 | -1)
      setThreads((prev) =>
        prev.map((item) => (item.id === thread.id ? { ...item, likes: nextLikes } : item)),
      )
    } catch (error) {
      console.error(error)
      setLikedIds(previousLikedIds)
      setThreads((prev) =>
        prev.map((item) =>
          item.id === thread.id
            ? { ...item, likes: thread.likes }
            : item,
        ),
      )
      setPageError('愛心更新失敗，請稍後再試。')
    } finally {
      setPendingLikeIds((prev) => prev.filter((id) => id !== thread.id))
    }
  }

  if (!configured) {
    return (
      <div className="mx-auto max-w-5xl space-y-6">
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-amber-100 p-2 text-amber-700">
                <AlertCircle className="size-5" />
              </div>
              <div>
                <CardTitle className="text-amber-900">留言板尚未啟用</CardTitle>
                <CardDescription className="text-amber-800">
                  需要先設定 `VITE_SUPABASE_URL` 與 `VITE_SUPABASE_ANON_KEY`，並推送本次 migration。
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="text-sm leading-7 text-amber-900/90">
            這一頁已經接好前端與 schema，等 Supabase 環境變數生效後就能使用。
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <div
          className="border-b border-slate-200 px-6 py-8 md:px-8"
          style={{
            background:
              'linear-gradient(135deg, color-mix(in srgb, var(--medical-blue) 12%, white), color-mix(in srgb, var(--medical-teal) 14%, white))',
          }}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <Badge
                variant="secondary"
                className="border border-white/70 bg-white/80 text-slate-700"
              >
                課後提問 / 盲點補充 / 現場回饋
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                互動留言板
              </h1>
              <p className="text-sm leading-7 text-slate-700 md:text-base">
                把課堂上沒來得及問完的問題、現場經驗、流程疑義留在這裡。每則留言都能接續回覆，讓複訓後的討論不會斷在教室門口。
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                { label: '主留言', value: threads.length, color: 'var(--medical-blue)' },
                { label: '回覆數', value: totalReplies, color: 'var(--medical-teal)' },
                { label: '已置頂', value: threads.filter((thread) => thread.pinned).length, color: 'var(--medical-red)' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-sm">
                  <div className="text-xs font-medium text-slate-500">{item.label}</div>
                  <div className="mt-1 text-2xl font-bold" style={{ color: item.color }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 px-6 py-6 lg:grid-cols-[minmax(0,1fr)_280px] md:px-8">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-3 md:grid-cols-[180px_1fr]">
              <input
                value={nickname}
                onChange={(event) => setNickname(event.target.value.slice(0, MESSAGE_NICKNAME_MAX_LENGTH))}
                placeholder="你的暱稱（選填）"
                maxLength={MESSAGE_NICKNAME_MAX_LENGTH}
                className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-slate-400"
              />
              <textarea
                value={content}
                onChange={(event) => setContent(event.target.value.slice(0, MESSAGE_MAX_LENGTH))}
                placeholder="例如：Push-dose epi 在台北市 SOP 和你們單位現場習慣有沒有差異？"
                maxLength={MESSAGE_MAX_LENGTH}
                rows={4}
                className="min-h-32 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-7 outline-none transition focus:border-slate-400"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400">
                <ImagePlus className="size-4" />
                附圖
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

              <span className="text-xs text-slate-500">
                暱稱 {nickname.length}/{MESSAGE_NICKNAME_MAX_LENGTH} ・內容 {content.length}/{MESSAGE_MAX_LENGTH} ・圖片上限 5 MB
              </span>
            </div>

            {previewUrl && (
              <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <img src={previewUrl} alt="留言圖片預覽" className="h-20 w-20 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-800">{selectedImage?.name}</p>
                  <p className="text-xs text-slate-500">
                    {selectedImage ? `${Math.max(1, Math.round(selectedImage.size / 1024))} KB` : ''}
                  </p>
                </div>
                <Button type="button" variant="ghost" onClick={clearSelectedImage}>
                  移除
                </Button>
              </div>
            )}

            {submitError && (
              <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {submitError}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs leading-6 text-slate-500">
                按 `Ctrl/Cmd + Enter` 目前未綁定；使用按鈕送出可以保留圖片與錯誤提示。
              </div>
              <Button type="submit" size="lg" disabled={submitting || !content.trim()}>
                {submitting ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : (
                  <SendHorizontal className="size-4" />
                )}
                送出留言
              </Button>
            </div>
          </form>

          <Card className="border-slate-200 bg-slate-50/80 shadow-none">
            <CardHeader className="gap-2">
              <CardTitle className="text-lg text-slate-900">使用建議</CardTitle>
              <CardDescription className="text-sm text-slate-600">
                讓留言板更接近課後教學延伸，而不是單純閒聊。
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-7 text-slate-700">
              <p>1. 把問題寫到可回答：病例條件、你卡住的 decision point、你考慮過的選項。</p>
              <p>2. 如果是在討論 SOP 差異，最好直接寫明「你單位目前怎麼做」。</p>
              <p>3. 圖片適合放監視器畫面、流程節點或白板截圖，但避免含可識別病人資訊。</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="flex items-center justify-between gap-3">
        <div className="text-sm text-slate-500">
          {loading ? '正在同步最新留言…' : `共 ${threads.length} 則主留言，${totalReplies} 則回覆`}
        </div>
        <Button type="button" variant="outline" onClick={() => void loadBoard()} disabled={loading}>
          {loading ? <LoaderCircle className="size-4 animate-spin" /> : <RefreshCcw className="size-4" />}
          重新整理
        </Button>
      </div>

      {pageError && (
        <Card className="border-rose-200 bg-rose-50">
          <CardContent className="flex items-start gap-3 pt-6 text-sm text-rose-700">
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <span>{pageError}</span>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <Card className="border-dashed border-slate-300 shadow-none">
          <CardContent className="flex min-h-56 flex-col items-center justify-center gap-3 pt-6 text-slate-500">
            <LoaderCircle className="size-6 animate-spin" />
            <span>載入留言中…</span>
          </CardContent>
        </Card>
      ) : threads.length === 0 ? (
        <Card className="border-dashed border-slate-300 shadow-none">
          <CardContent className="flex min-h-56 flex-col items-center justify-center gap-3 pt-6 text-center text-slate-500">
            <div
              className="flex size-14 items-center justify-center rounded-full text-white"
              style={{ background: 'linear-gradient(135deg, var(--medical-blue), var(--medical-teal))' }}
            >
              <MessageCircleReply className="size-6" />
            </div>
            <div className="space-y-1">
              <p className="text-base font-semibold text-slate-700">還沒有留言</p>
              <p className="text-sm">用第一則問題開場，通常比等別人先問更有效。</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {threads.map((thread) => (
            <MessageCard
              key={thread.id}
              thread={thread}
              defaultNickname={nickname}
              liked={likedIds.includes(thread.id)}
              likePending={pendingLikeIds.includes(thread.id)}
              onToggleLike={handleToggleLike}
              onReplySubmit={handleReplySubmit}
            />
          ))}
        </div>
      )}
    </div>
  )
}

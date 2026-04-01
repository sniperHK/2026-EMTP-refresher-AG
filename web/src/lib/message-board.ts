import { isSupabaseConfigured, supabase } from '@/lib/supabase'

export const MESSAGE_BOARD_BUCKET = 'message-board-images'
export const MESSAGE_MAX_LENGTH = 500
export const REPLY_MAX_LENGTH = 240
export const MESSAGE_NICKNAME_MAX_LENGTH = 20
export const MESSAGE_IMAGE_SIZE_LIMIT_BYTES = 5 * 1024 * 1024

interface MessageRow {
  id: string
  nickname: string | null
  content: string
  image_url: string | null
  likes: number | null
  pinned: boolean | null
  created_at: string
}

interface ReplyRow {
  id: string
  message_id: string
  nickname: string | null
  content: string
  created_at: string
}

export interface MessageReply {
  id: string
  messageId: string
  nickname: string
  content: string
  createdAt: string
}

export interface MessageThread {
  id: string
  nickname: string
  content: string
  imageUrl: string | null
  likes: number
  pinned: boolean
  createdAt: string
  replies: MessageReply[]
}

interface CreateMessageInput {
  nickname?: string
  content: string
  imageFile?: File | null
}

interface CreateReplyInput {
  nickname?: string
  content: string
}

function ensureConfigured() {
  if (!supabase) {
    throw new Error('Supabase client is not configured.')
  }
}

function normalizeNickname(raw?: string) {
  const nickname = raw?.trim().slice(0, MESSAGE_NICKNAME_MAX_LENGTH)
  return nickname || '匿名'
}

function normalizeContent(raw: string, maxLength: number) {
  return raw.trim().slice(0, maxLength)
}

function mapReplyRow(row: ReplyRow): MessageReply {
  return {
    id: row.id,
    messageId: row.message_id,
    nickname: normalizeNickname(row.nickname ?? undefined),
    content: row.content,
    createdAt: row.created_at,
  }
}

function mapMessageRow(row: MessageRow, replies: MessageReply[]): MessageThread {
  return {
    id: row.id,
    nickname: normalizeNickname(row.nickname ?? undefined),
    content: row.content,
    imageUrl: row.image_url,
    likes: row.likes ?? 0,
    pinned: row.pinned ?? false,
    createdAt: row.created_at,
    replies,
  }
}

function buildObjectPath(file: File) {
  const safeExtension = file.name.includes('.')
    ? file.name.split('.').pop()?.toLowerCase()
    : undefined
  const extension = safeExtension || file.type.split('/')[1] || 'jpg'
  return `${Date.now()}-${crypto.randomUUID()}.${extension}`
}

export function isMessageBoardConfigured() {
  return isSupabaseConfigured()
}

export async function fetchMessageThreads(): Promise<MessageThread[]> {
  ensureConfigured()

  const [messagesRes, repliesRes] = await Promise.all([
    supabase!
      .from('messages')
      .select('*')
      .order('pinned', { ascending: false })
      .order('created_at', { ascending: false }),
    supabase!
      .from('replies')
      .select('*')
      .order('created_at', { ascending: true }),
  ])

  if (messagesRes.error) throw messagesRes.error
  if (repliesRes.error) throw repliesRes.error

  const replyMap = new Map<string, MessageReply[]>()

  for (const row of (repliesRes.data ?? []) as ReplyRow[]) {
    const reply = mapReplyRow(row)
    const existing = replyMap.get(reply.messageId) ?? []
    existing.push(reply)
    replyMap.set(reply.messageId, existing)
  }

  return ((messagesRes.data ?? []) as MessageRow[]).map((row) =>
    mapMessageRow(row, replyMap.get(row.id) ?? []),
  )
}

export async function uploadMessageImage(file: File) {
  ensureConfigured()

  if (!file.type.startsWith('image/')) {
    throw new Error('只能上傳圖片檔。')
  }

  if (file.size > MESSAGE_IMAGE_SIZE_LIMIT_BYTES) {
    throw new Error('圖片需小於 5 MB。')
  }

  const objectPath = buildObjectPath(file)
  const { error: uploadError } = await supabase!.storage
    .from(MESSAGE_BOARD_BUCKET)
    .upload(objectPath, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (uploadError) throw uploadError

  const { data } = supabase!.storage.from(MESSAGE_BOARD_BUCKET).getPublicUrl(objectPath)
  return data.publicUrl
}

export async function createMessage(input: CreateMessageInput) {
  ensureConfigured()

  const content = normalizeContent(input.content, MESSAGE_MAX_LENGTH)
  if (!content) {
    throw new Error('留言內容不可空白。')
  }

  let imageUrl: string | null = null
  if (input.imageFile) {
    imageUrl = await uploadMessageImage(input.imageFile)
  }

  const { error } = await supabase!.from('messages').insert({
    nickname: normalizeNickname(input.nickname),
    content,
    image_url: imageUrl,
  })

  if (error) throw error
}

export async function createReply(messageId: string, input: CreateReplyInput) {
  ensureConfigured()

  const content = normalizeContent(input.content, REPLY_MAX_LENGTH)
  if (!content) {
    throw new Error('回覆內容不可空白。')
  }

  const { error } = await supabase!.from('replies').insert({
    message_id: messageId,
    nickname: normalizeNickname(input.nickname),
    content,
  })

  if (error) throw error
}

export async function updateMessageLikes(messageId: string, delta: 1 | -1) {
  ensureConfigured()

  const { data, error } = await supabase!.rpc('increment_message_likes', {
    target_message_id: messageId,
    delta,
  })

  if (error) throw error

  return typeof data === 'number' ? data : Number(data ?? 0)
}

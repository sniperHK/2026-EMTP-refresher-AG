import type { Session } from '@supabase/supabase-js'
import type { CognitiveLevel, QuizModule } from '@/data/questions'
import { getQuizBackendKind, supabase } from '@/lib/supabase'

export type QuizType = 'pre' | 'post' | 'all'
export type QuizTypeInput = QuizType | 'pretest' | 'posttest'
export type QuizGroup = 'G1' | 'G2' | 'G3' | 'G4' | 'G5' | '未分組'
export type OptionKey = 'A' | 'B' | 'C' | 'D'

export interface ParticipantProfile {
  name: string
  group: QuizGroup
}

export interface QuizAnswerRecord {
  questionId: number
  selected: OptionKey
  correctAnswer: OptionKey
  isCorrect: boolean
  module: QuizModule
  level: CognitiveLevel
}

export interface QuizSubmission {
  id: string
  quizType: QuizType
  participantName: string
  participantGroup: QuizGroup
  score: number
  total: number
  percent: number
  startedAt: string
  submittedAt: string
  durationSeconds: number
  answers: QuizAnswerRecord[]
}

interface QuizSubmissionRow {
  id: string
  quiz_type: QuizType
  participant_name: string
  participant_group: string
  score: number
  total: number
  percent: number
  started_at: string
  submitted_at: string
  duration_seconds: number
  answers: QuizAnswerRecord[]
}

export interface QuizResultsPayload {
  submissions: QuizSubmission[]
}

export const QUIZ_RESULTS_API = '/api/quiz-results'
export const QUIZ_PARTICIPANT_KEY = 'emtp-quiz-participant'

const QUIZ_GROUPS: QuizGroup[] = ['G1', 'G2', 'G3', 'G4', 'G5', '未分組']

function mapSubmissionToRow(submission: QuizSubmission): QuizSubmissionRow {
  return {
    id: submission.id,
    quiz_type: submission.quizType,
    participant_name: submission.participantName,
    participant_group: submission.participantGroup,
    score: submission.score,
    total: submission.total,
    percent: submission.percent,
    started_at: submission.startedAt,
    submitted_at: submission.submittedAt,
    duration_seconds: submission.durationSeconds,
    answers: submission.answers,
  }
}

function mapRowToSubmission(row: QuizSubmissionRow): QuizSubmission {
  return {
    id: row.id,
    quizType: row.quiz_type,
    participantName: row.participant_name,
    participantGroup: QUIZ_GROUPS.includes(row.participant_group as QuizGroup)
      ? row.participant_group as QuizGroup
      : '未分組',
    score: row.score,
    total: row.total,
    percent: row.percent,
    startedAt: row.started_at,
    submittedAt: row.submitted_at,
    durationSeconds: row.duration_seconds,
    answers: row.answers ?? [],
  }
}

async function saveViaDevApi(submission: QuizSubmission) {
  const response = await fetch(QUIZ_RESULTS_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(submission),
  })

  if (!response.ok) {
    throw new Error(`Quiz submission failed: ${response.status}`)
  }
}

async function fetchViaDevApi(): Promise<QuizResultsPayload> {
  const response = await fetch(QUIZ_RESULTS_API)
  if (!response.ok) {
    throw new Error(`Quiz results fetch failed: ${response.status}`)
  }

  return response.json() as Promise<QuizResultsPayload>
}

async function clearViaDevApi() {
  const response = await fetch(QUIZ_RESULTS_API, { method: 'DELETE' })
  if (!response.ok) {
    throw new Error(`Quiz results reset failed: ${response.status}`)
  }
}

export function getQuizGroups(): QuizGroup[] {
  return QUIZ_GROUPS
}

export function normalizeQuizType(type?: string): QuizType | null {
  if (!type) return null
  if (type === 'pre' || type === 'post' || type === 'all') return type
  if (type === 'pretest') return 'pre'
  if (type === 'posttest') return 'post'
  return null
}

export function getQuizBackendLabel() {
  const backend = getQuizBackendKind()
  if (backend === 'supabase') return 'Supabase'
  if (backend === 'dev-api') return '本機 dev API'
  return '未設定'
}

export function loadParticipantProfile(): ParticipantProfile {
  if (typeof window === 'undefined') {
    return { name: '', group: '未分組' }
  }

  try {
    const raw = window.localStorage.getItem(QUIZ_PARTICIPANT_KEY)
    if (!raw) return { name: '', group: '未分組' }
    const parsed = JSON.parse(raw) as Partial<ParticipantProfile>
    return {
      name: typeof parsed.name === 'string' ? parsed.name : '',
      group: QUIZ_GROUPS.includes(parsed.group as QuizGroup) ? parsed.group as QuizGroup : '未分組',
    }
  } catch {
    return { name: '', group: '未分組' }
  }
}

export function saveParticipantProfile(profile: ParticipantProfile) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(QUIZ_PARTICIPANT_KEY, JSON.stringify(profile))
}

export async function saveQuizSubmission(submission: QuizSubmission) {
  const backend = getQuizBackendKind()

  if (backend === 'supabase') {
    if (!supabase) throw new Error('Supabase client is not configured.')
    const { error } = await supabase.from('quiz_submissions').insert(mapSubmissionToRow(submission))
    if (error) throw error
    return
  }

  if (backend === 'dev-api') {
    await saveViaDevApi(submission)
    return
  }

  throw new Error('No quiz backend configured.')
}

export async function fetchQuizResults(): Promise<QuizResultsPayload> {
  const backend = getQuizBackendKind()

  if (backend === 'supabase') {
    if (!supabase) throw new Error('Supabase client is not configured.')
    const { data, error } = await supabase
      .from('quiz_submissions')
      .select('*')
      .order('submitted_at', { ascending: false })

    if (error) throw error
    return { submissions: (data ?? []).map((row) => mapRowToSubmission(row as QuizSubmissionRow)) }
  }

  if (backend === 'dev-api') {
    return fetchViaDevApi()
  }

  throw new Error('No quiz backend configured.')
}

export async function clearQuizResults() {
  const backend = getQuizBackendKind()

  if (backend === 'supabase') {
    if (!supabase) throw new Error('Supabase client is not configured.')
    const { error } = await supabase
      .from('quiz_submissions')
      .delete()
      .not('id', 'is', null)

    if (error) throw error
    return
  }

  if (backend === 'dev-api') {
    await clearViaDevApi()
    return
  }

  throw new Error('No quiz backend configured.')
}

export async function getTeacherSession(): Promise<Session | null> {
  if (!supabase) return null
  const { data, error } = await supabase.auth.getSession()
  if (error) throw error
  return data.session
}

export function subscribeToTeacherAuth(listener: (session: Session | null) => void) {
  if (!supabase) return () => {}

  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    listener(session)
  })

  return () => data.subscription.unsubscribe()
}

export async function signInTeacher(email: string, password: string) {
  if (!supabase) throw new Error('Supabase client is not configured.')
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
}

export async function signOutTeacher() {
  if (!supabase) return
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

import type { CognitiveLevel, QuizModule } from '@/data/questions'

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

export interface QuizResultsPayload {
  submissions: QuizSubmission[]
}

export const QUIZ_RESULTS_API = '/api/quiz-results'
export const QUIZ_PARTICIPANT_KEY = 'emtp-quiz-participant'

const QUIZ_GROUPS: QuizGroup[] = ['G1', 'G2', 'G3', 'G4', 'G5', '未分組']

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
  const response = await fetch(QUIZ_RESULTS_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(submission),
  })

  if (!response.ok) {
    throw new Error(`Quiz submission failed: ${response.status}`)
  }
}

export async function fetchQuizResults(): Promise<QuizResultsPayload> {
  const response = await fetch(QUIZ_RESULTS_API)
  if (!response.ok) {
    throw new Error(`Quiz results fetch failed: ${response.status}`)
  }

  return response.json() as Promise<QuizResultsPayload>
}

export async function clearQuizResults() {
  const response = await fetch(QUIZ_RESULTS_API, { method: 'DELETE' })
  if (!response.ok) {
    throw new Error(`Quiz results reset failed: ${response.status}`)
  }
}

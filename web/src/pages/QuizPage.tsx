import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getQuiz } from '@/data/questions'
import { QuizPlayer, type QuizFinishResult } from '@/components/quiz/QuizPlayer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  type ParticipantProfile,
  type QuizGroup,
  type QuizSubmission,
  type QuizType,
  getQuizBackendLabel,
  getQuizGroups,
  loadParticipantProfile,
  normalizeQuizType,
  saveParticipantProfile,
  saveQuizSubmission,
} from '@/lib/quiz-results'

const quizGroups = getQuizGroups()
const backendLabel = getQuizBackendLabel()

const quizMeta: Record<QuizType, { title: string; description: string; count: number; color: string }> = {
  pre: {
    title: '前測（Pre-test）',
    description: '課前評估基礎知識，10 題，涵蓋 M01 & M02 重點。',
    count: 10,
    color: 'var(--medical-blue)',
  },
  post: {
    title: '後測（Post-test）',
    description: '課後驗收學習成效，20 題，強調臨床應用與分析。',
    count: 20,
    color: 'var(--medical-orange)',
  },
  all: {
    title: '完整題庫（37 題）',
    description: '所有題目混合練習，適合課後複習或自我評估。',
    count: 37,
    color: 'var(--medical-navy)',
  },
}

type Phase = 'select' | 'playing' | 'result'
type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

function makeSubmissionId() {
  const cryptoApi = globalThis.crypto

  if (cryptoApi?.randomUUID) {
    return cryptoApi.randomUUID()
  }

  if (cryptoApi?.getRandomValues) {
    const bytes = cryptoApi.getRandomValues(new Uint8Array(16))
    bytes[6] = (bytes[6] & 0x0f) | 0x40
    bytes[8] = (bytes[8] & 0x3f) | 0x80
    const hex = [...bytes].map((byte) => byte.toString(16).padStart(2, '0'))
    return `${hex.slice(0, 4).join('')}-${hex.slice(4, 6).join('')}-${hex.slice(6, 8).join('')}-${hex.slice(8, 10).join('')}-${hex.slice(10, 16).join('')}`
  }

  return '00000000-0000-4000-8000-000000000000'
}

export function QuizPage() {
  const { type } = useParams<{ type?: string }>()
  const normalizedType = normalizeQuizType(type)
  const initialProfile = loadParticipantProfile()

  const [phase, setPhase] = useState<Phase>(normalizedType && initialProfile.name.trim() ? 'playing' : 'select')
  const [activeType, setActiveType] = useState<QuizType>(normalizedType ?? 'pre')
  const [finalScore, setFinalScore] = useState<{ score: number; total: number } | null>(null)
  const [participant, setParticipant] = useState<ParticipantProfile>(initialProfile)
  const [nameInput, setNameInput] = useState(initialProfile.name)
  const [groupInput, setGroupInput] = useState<QuizGroup>(initialProfile.group)
  const [attemptStartedAt, setAttemptStartedAt] = useState<string | null>(
    normalizedType && initialProfile.name.trim() ? new Date().toISOString() : null,
  )
  const [profileError, setProfileError] = useState<string | null>(null)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const [saveError, setSaveError] = useState<string | null>(null)

  useEffect(() => {
    setActiveType(normalizedType ?? 'pre')
    setFinalScore(null)
    setSaveStatus('idle')
    setSaveError(null)

    if (normalizedType && participant.name.trim()) {
      setPhase('playing')
      setAttemptStartedAt(new Date().toISOString())
      return
    }

    setPhase('select')
    setAttemptStartedAt(null)
  }, [normalizedType, participant.name])

  const questions = getQuiz(activeType)
  const meta = quizMeta[activeType]

  const persistParticipant = () => {
    const name = nameInput.trim()
    if (!name) {
      setProfileError('請先輸入學員姓名、代號或座號。')
      return null
    }

    const nextProfile = { name, group: groupInput }
    saveParticipantProfile(nextProfile)
    setParticipant(nextProfile)
    setNameInput(name)
    setProfileError(null)
    return nextProfile
  }

  const handleStart = (quizType: QuizType) => {
    const profile = persistParticipant()
    if (!profile) return

    setActiveType(quizType)
    setFinalScore(null)
    setSaveStatus('idle')
    setSaveError(null)
    setAttemptStartedAt(new Date().toISOString())
    setPhase('playing')
  }

  const handleFinish = (result: QuizFinishResult) => {
    const startedAt = attemptStartedAt ?? new Date().toISOString()
    const submittedAt = new Date().toISOString()
    const durationSeconds = Math.max(0, Math.round((Date.parse(submittedAt) - Date.parse(startedAt)) / 1000))
    const submission: QuizSubmission = {
      id: makeSubmissionId(),
      quizType: activeType,
      participantName: participant.name || nameInput.trim() || '未命名學員',
      participantGroup: participant.group ?? groupInput,
      score: result.score,
      total: result.total,
      percent: Math.round((result.score / result.total) * 100),
      startedAt,
      submittedAt,
      durationSeconds,
      answers: result.answers,
    }

    setFinalScore({ score: result.score, total: result.total })
    setSaveStatus('saving')
    setSaveError(null)
    setPhase('result')

    void saveQuizSubmission(submission)
      .then(() => setSaveStatus('saved'))
      .catch((error) => {
        console.error(error)
        setSaveStatus('error')
        setSaveError('結果未送出到教師儀表板。請確認 Supabase 環境變數已設定，或目前是在本機 dev 模式。')
      })
  }

  const handleReset = () => {
    setFinalScore(null)
    setSaveStatus('idle')
    setSaveError(null)
    setPhase('select')
  }

  if (phase === 'select') {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="text-center">
          <h1
            className="text-2xl font-bold md:text-3xl"
            style={{ color: 'var(--medical-navy)' }}
          >
            評量測驗
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            選擇測驗類型；完成後會把成績送到教師儀表板
          </p>
          {type && !normalizedType && (
            <p className="mt-2 text-xs font-medium text-orange-600">
              找不到測驗類型「{type}」，已切回預設測驗頁。
            </p>
          )}
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold" style={{ color: 'var(--medical-navy)' }}>
                作答識別
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                同一裝置只要填一次，前測與後測會沿用這份資料。
              </p>
            </div>
            <Badge variant="outline" className="text-xs">
              教師儀表板可追蹤
            </Badge>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)]">
            <label className="space-y-1.5 text-sm">
              <span className="font-medium text-gray-700">姓名 / 座號 / 代號</span>
              <input
                value={nameInput}
                onChange={(event) => setNameInput(event.target.value)}
                placeholder="例如：王小明 / 12 號 / A07"
                className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none transition-colors focus:border-blue-400"
              />
            </label>

            <label className="space-y-1.5 text-sm">
              <span className="font-medium text-gray-700">組別</span>
              <select
                value={groupInput}
                onChange={(event) => setGroupInput(event.target.value as QuizGroup)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 outline-none transition-colors focus:border-blue-400"
              >
                {quizGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {profileError && (
            <p className="mt-3 text-sm font-medium text-red-600">{profileError}</p>
          )}

          <p className="mt-3 text-xs text-gray-500">
            若你從課程地圖直接進入前測或後測，輸入完資料後按對應卡片即可開始。當前資料來源：{backendLabel}。
          </p>
        </div>

        <div className="grid gap-4">
          {(Object.entries(quizMeta) as [QuizType, typeof meta][]).map(([key, item]) => (
            <button
              key={key}
              onClick={() => handleStart(key)}
              className="group rounded-xl border-2 bg-white p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-md"
              style={{ borderColor: item.color }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold" style={{ color: item.color }}>
                    {item.title}
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                </div>
                <Badge
                  className="shrink-0 text-sm font-bold"
                  style={{ backgroundColor: `${item.color}15`, color: item.color }}
                >
                  {item.count} 題
                </Badge>
              </div>
            </button>
          ))}
        </div>

        <div className="rounded-lg border bg-gray-50 p-4 text-xs text-gray-500">
          <strong>說明：</strong>所有題目出自 2026 北市 EMTP 複訓題庫（Q1-Q35）。
          題目分類：M01 ALS 病生理學 / M02 藥物動力學/藥效學。
          認知層級：Remember / Apply / Analyze。
        </div>
      </div>
    )
  }

  if (phase === 'result' && finalScore) {
    const pct = Math.round((finalScore.score / finalScore.total) * 100)
    const passThreshold = activeType === 'pre' ? null : 80
    const passed = passThreshold === null ? null : pct >= passThreshold

    return (
      <div className="mx-auto max-w-xl space-y-6 py-8 text-center">
        <div
          className={cn(
            'rounded-2xl border-4 p-8',
            passed === null
              ? 'border-blue-300 bg-blue-50'
              : passed
                ? 'border-green-400 bg-green-50'
                : 'border-orange-400 bg-orange-50',
          )}
        >
          <div
            className={cn(
              'text-6xl font-black',
              passed === null
                ? 'text-blue-600'
                : passed
                  ? 'text-green-600'
                  : 'text-orange-500',
            )}
          >
            {pct}%
          </div>
          <div className="mt-2 text-lg font-semibold text-gray-700">
            {finalScore.score} / {finalScore.total} 題答對
          </div>
          {passed === null ? (
            <div className="mt-2 text-sm font-medium text-blue-700">
              基線測驗完成
            </div>
          ) : (
            <div className={cn('mt-2 text-sm font-medium', passed ? 'text-green-700' : 'text-orange-600')}>
              {passed ? `通過（>= ${passThreshold}%）` : `未達標（目標 >= ${passThreshold}%）`}
            </div>
          )}
          <p className="mt-3 text-sm text-gray-500">
            {meta.title}
          </p>
          {activeType === 'pre' ? (
            <p className="mt-2 text-xs text-gray-500">
              前測用於課前基線評估，不作為通過門檻。
            </p>
          ) : (
            <p className="mt-2 text-xs text-gray-500">
              依課程 blueprint，後測建議通過門檻為 80%。
            </p>
          )}
        </div>

        <div className="rounded-xl border bg-white p-4 text-sm">
          {saveStatus === 'saving' && (
            <p className="font-medium text-blue-700">正在送出結果到教師儀表板...</p>
          )}
          {saveStatus === 'saved' && (
            <p className="font-medium text-green-700">
              已送出：{participant.group}／{participant.name}
            </p>
          )}
          {saveStatus === 'error' && (
            <div className="space-y-1">
              <p className="font-medium text-red-600">送出失敗</p>
              {saveError && <p className="text-xs text-gray-500">{saveError}</p>}
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Button onClick={() => handleStart(activeType)}>
            再做一次
          </Button>
          <Button variant="outline" onClick={handleReset}>
            選擇其他測驗
          </Button>
          <Button variant="outline" asChild>
            <Link to="/">返回首頁</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <h1 className="text-xl font-bold md:text-2xl" style={{ color: meta.color }}>
          {meta.title}
        </h1>
        <Badge variant="outline">
          {participant.group} / {participant.name}
        </Badge>
      </div>
      <QuizPlayer
        questions={questions}
        onFinish={handleFinish}
        onReset={handleReset}
      />
    </div>
  )
}

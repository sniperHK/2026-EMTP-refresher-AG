import { type FormEvent, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Session } from '@supabase/supabase-js'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { questions } from '@/data/questions'
import { cn } from '@/lib/utils'
import {
  clearQuizResults,
  fetchQuizResults,
  getQuizBackendLabel,
  getTeacherSession,
  signInTeacher,
  signOutTeacher,
  subscribeToTeacherAuth,
  type QuizSubmission,
} from '@/lib/quiz-results'
import { getQuizBackendKind } from '@/lib/supabase'

interface ParticipantRow {
  key: string
  name: string
  group: string
  pre?: QuizSubmission
  post?: QuizSubmission
}

const questionPromptMap = new Map(
  questions.map((question) => [question.id, question.question]),
)

function formatPercent(value: number | null) {
  if (value === null || Number.isNaN(value)) return '—'
  return `${Math.round(value)}%`
}

function formatDateTime(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleString('zh-TW', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function buildParticipantRows(submissions: QuizSubmission[]) {
  const sorted = [...submissions].sort((a, b) => Date.parse(b.submittedAt) - Date.parse(a.submittedAt))
  const latestByParticipant = new Map<string, ParticipantRow>()

  for (const submission of sorted) {
    const key = `${submission.participantGroup}::${submission.participantName}`
    const existing = latestByParticipant.get(key) ?? {
      key,
      name: submission.participantName,
      group: submission.participantGroup,
    }

    if (submission.quizType === 'pre' && !existing.pre) existing.pre = submission
    if (submission.quizType === 'post' && !existing.post) existing.post = submission

    latestByParticipant.set(key, existing)
  }

  return [...latestByParticipant.values()].sort((a, b) => {
    if (a.group === b.group) return a.name.localeCompare(b.name, 'zh-Hant')
    return a.group.localeCompare(b.group, 'zh-Hant')
  })
}

function buildWeakQuestions(submissions: QuizSubmission[]) {
  const stats = new Map<number, { attempts: number; correct: number }>()

  for (const submission of submissions) {
    for (const answer of submission.answers) {
      const current = stats.get(answer.questionId) ?? { attempts: 0, correct: 0 }
      current.attempts += 1
      if (answer.isCorrect) current.correct += 1
      stats.set(answer.questionId, current)
    }
  }

  return [...stats.entries()]
    .map(([questionId, stat]) => ({
      questionId,
      prompt: questionPromptMap.get(questionId) ?? `Q${questionId}`,
      attempts: stat.attempts,
      accuracy: stat.attempts === 0 ? 0 : (stat.correct / stat.attempts) * 100,
    }))
    .sort((a, b) => a.accuracy - b.accuracy || b.attempts - a.attempts)
    .slice(0, 5)
}

function downloadCsv(submissions: QuizSubmission[]) {
  const headers = ['submitted_at', 'quiz_type', 'group', 'participant', 'score', 'total', 'percent', 'duration_seconds']
  const rows = submissions.map((submission) => [
    submission.submittedAt,
    submission.quizType,
    submission.participantGroup,
    submission.participantName,
    String(submission.score),
    String(submission.total),
    String(submission.percent),
    String(submission.durationSeconds),
  ])

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(','))
    .join('\n')

  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `quiz-results-${new Date().toISOString().slice(0, 10)}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

export function TeacherDashboardPage() {
  const backendKind = getQuizBackendKind()
  const backendLabel = getQuizBackendLabel()
  const [submissions, setSubmissions] = useState<QuizSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [resetting, setResetting] = useState(false)
  const [session, setSession] = useState<Session | null>(null)
  const [authLoading, setAuthLoading] = useState(backendKind === 'supabase')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState<string | null>(null)
  const [signingIn, setSigningIn] = useState(false)

  useEffect(() => {
    if (backendKind !== 'supabase') {
      setAuthLoading(false)
      return
    }

    let active = true

    void getTeacherSession()
      .then((nextSession) => {
        if (!active) return
        setSession(nextSession)
      })
      .catch((loadError) => {
        console.error(loadError)
        if (!active) return
        setAuthError('無法讀取教師登入狀態。')
      })
      .finally(() => {
        if (active) setAuthLoading(false)
      })

    const unsubscribe = subscribeToTeacherAuth((nextSession) => {
      setSession(nextSession)
      setAuthLoading(false)
      setAuthError(null)
    })

    return () => {
      active = false
      unsubscribe()
    }
  }, [backendKind])

  useEffect(() => {
    if (backendKind === 'none') {
      setLoading(false)
      setSubmissions([])
      return
    }

    if (backendKind === 'supabase' && !session) {
      setLoading(false)
      setSubmissions([])
      return
    }

    let active = true
    setLoading(true)
    setError(null)

    void fetchQuizResults()
      .then((payload) => {
        if (!active) return
        const sorted = [...payload.submissions].sort((a, b) => Date.parse(b.submittedAt) - Date.parse(a.submittedAt))
        setSubmissions(sorted)
      })
      .catch((loadError) => {
        console.error(loadError)
        if (!active) return
        setError(
          backendKind === 'supabase'
            ? '讀取失敗。請確認教師帳號已登入，且 Supabase RLS / 環境變數設定正確。'
            : '讀取失敗。請確認目前在本機 Vite dev server。',
        )
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [backendKind, session])

  const participantRows = useMemo(() => buildParticipantRows(submissions), [submissions])
  const weakestQuestions = useMemo(() => buildWeakQuestions(submissions), [submissions])
  const latestPre = participantRows.filter((row) => row.pre).map((row) => row.pre!)
  const latestPost = participantRows.filter((row) => row.post).map((row) => row.post!)
  const deltaRows = participantRows.filter((row) => row.pre && row.post)
  const averagePre = latestPre.length
    ? latestPre.reduce((sum, item) => sum + item.percent, 0) / latestPre.length
    : null
  const averagePost = latestPost.length
    ? latestPost.reduce((sum, item) => sum + item.percent, 0) / latestPost.length
    : null
  const averageDelta = deltaRows.length
    ? deltaRows.reduce((sum, row) => sum + (row.post!.percent - row.pre!.percent), 0) / deltaRows.length
    : null

  const handleRefresh = async () => {
    setLoading(true)
    setError(null)

    try {
      const payload = await fetchQuizResults()
      const sorted = [...payload.submissions].sort((a, b) => Date.parse(b.submittedAt) - Date.parse(a.submittedAt))
      setSubmissions(sorted)
    } catch (loadError) {
      console.error(loadError)
      setError('重新整理失敗，請稍後再試。')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = async () => {
    const confirmed = window.confirm('確定要清空所有測驗紀錄嗎？此動作會刪除目前的前測與後測結果。')
    if (!confirmed) return

    setResetting(true)
    try {
      await clearQuizResults()
      await handleRefresh()
    } catch (resetError) {
      console.error(resetError)
      setError('清空失敗，請稍後再試。')
    } finally {
      setResetting(false)
    }
  }

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.trim() || !password) {
      setAuthError('請輸入教師帳號與密碼。')
      return
    }

    setSigningIn(true)
    setAuthError(null)

    try {
      const loginEmail = email.trim().includes('@') ? email.trim() : `${email.trim().toLowerCase()}@2026-emtp.local`
      await signInTeacher(loginEmail, password)
      setPassword('')
    } catch (signInError) {
      console.error(signInError)
      setAuthError('登入失敗。請確認教師帳號已在 Supabase Auth 建立，且密碼正確。')
    } finally {
      setSigningIn(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOutTeacher()
      setSubmissions([])
    } catch (signOutError) {
      console.error(signOutError)
      setError('登出失敗，請稍後再試。')
    }
  }

  if (backendKind === 'none') {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold md:text-3xl" style={{ color: 'var(--medical-navy)' }}>
            教師儀表板
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            目前沒有設定任何測驗後端。GitHub Pages 需要在 build 時注入 `VITE_SUPABASE_URL` 與 `VITE_SUPABASE_ANON_KEY`。
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="outline" asChild>
              <Link to="/roadmap">回課程地圖</Link>
            </Button>
            <Badge variant="outline">資料來源：{backendLabel}</Badge>
          </div>
        </section>
      </div>
    )
  }

  if (backendKind === 'supabase' && (authLoading || !session)) {
    return (
      <div className="mx-auto max-w-xl space-y-6">
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold md:text-3xl" style={{ color: 'var(--medical-navy)' }}>
                教師儀表板
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                目前資料來源：{backendLabel}。為避免全班成績外露，查看班級結果前需先以教師帳號登入。
              </p>
            </div>
            <Badge variant="outline">教師登入</Badge>
          </div>

          {authLoading ? (
            <p className="mt-6 text-sm text-gray-500">讀取登入狀態中...</p>
          ) : (
            <form className="mt-6 space-y-4" onSubmit={handleSignIn}>
              <label className="block space-y-1.5 text-sm">
                <span className="font-medium text-gray-700">教師帳號</span>
                <input
                  type="text"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="輸入帳號名稱"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none transition-colors focus:border-blue-400"
                />
              </label>

              <label className="block space-y-1.5 text-sm">
                <span className="font-medium text-gray-700">密碼</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="輸入教師密碼"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none transition-colors focus:border-blue-400"
                />
              </label>

              {authError && (
                <p className="text-sm font-medium text-red-600">{authError}</p>
              )}

              <div className="flex flex-wrap gap-2">
                <Button type="submit" disabled={signingIn}>
                  {signingIn ? '登入中...' : '登入教師儀表板'}
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/roadmap">回課程地圖</Link>
                </Button>
              </div>

              <p className="text-xs text-gray-500">
                輸入帳號名稱（不含 @），系統會自動補全。如有完整 email 也可直接輸入。
              </p>
            </form>
          )}
        </section>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <section className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold md:text-3xl" style={{ color: 'var(--medical-navy)' }}>
                教師儀表板
              </h1>
              <Badge variant="outline">資料來源：{backendLabel}</Badge>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              集中查看前測 / 後測作答結果、班級進步幅度與常錯題目
            </p>
            {backendKind === 'supabase' && session?.user.email && (
              <p className="mt-2 text-xs text-gray-400">
                已登入教師帳號：{session.user.email}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" asChild>
              <Link to="/roadmap">回課程地圖</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/quiz/pre">開前測</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/quiz/post">開後測</Link>
            </Button>
            <Button variant="outline" onClick={() => void handleRefresh()}>
              重新整理
            </Button>
            <Button variant="outline" onClick={() => downloadCsv(submissions)} disabled={submissions.length === 0}>
              匯出 CSV
            </Button>
            <Button variant="destructive" onClick={() => void handleReset()} disabled={resetting || submissions.length === 0}>
              清空紀錄
            </Button>
            {backendKind === 'supabase' && (
              <Button variant="outline" onClick={() => void handleSignOut()}>
                登出
              </Button>
            )}
          </div>
        </div>
      </section>

      {error && (
        <section className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </section>
      )}

      <section className="grid gap-4 md:grid-cols-4">
        {[
          { label: '學員數', value: String(participantRows.length), hint: '依姓名 / 組別去重' },
          { label: '前測完成', value: String(latestPre.length), hint: `平均 ${formatPercent(averagePre)}` },
          { label: '後測完成', value: String(latestPost.length), hint: `平均 ${formatPercent(averagePost)}` },
          { label: '平均進步', value: averageDelta === null ? '—' : `${Math.round(averageDelta)}%`, hint: '僅計算有前後測者' },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="text-sm font-medium text-gray-500">{item.label}</div>
            <div className="mt-2 text-3xl font-black" style={{ color: 'var(--medical-navy)' }}>
              {item.value}
            </div>
            <div className="mt-2 text-xs text-gray-400">{item.hint}</div>
          </div>
        ))}
      </section>

      <section className="rounded-xl border bg-white p-4 shadow-sm md:p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold" style={{ color: 'var(--medical-navy)' }}>
              學員進度
            </h2>
            <p className="text-sm text-gray-500">
              以每位學員最新的前測與後測結果為主
            </p>
          </div>
          <Badge variant="outline">{participantRows.length} 位</Badge>
        </div>

        {participantRows.length === 0 ? (
          <p className="text-sm text-gray-500">目前還沒有作答紀錄。</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="border-b bg-gray-50 text-left text-gray-500">
                  <th className="px-3 py-2 font-medium">組別</th>
                  <th className="px-3 py-2 font-medium">學員</th>
                  <th className="px-3 py-2 font-medium">前測</th>
                  <th className="px-3 py-2 font-medium">後測</th>
                  <th className="px-3 py-2 font-medium">進步</th>
                  <th className="px-3 py-2 font-medium">最後更新</th>
                </tr>
              </thead>
              <tbody>
                {participantRows.map((row) => {
                  const delta = row.pre && row.post ? row.post.percent - row.pre.percent : null
                  const latestTime = row.post?.submittedAt ?? row.pre?.submittedAt ?? ''
                  return (
                    <tr key={row.key} className="border-b last:border-b-0">
                      <td className="px-3 py-2 font-medium text-gray-700">{row.group}</td>
                      <td className="px-3 py-2 text-gray-700">{row.name}</td>
                      <td className="px-3 py-2 text-gray-600">
                        {row.pre ? `${row.pre.score}/${row.pre.total} (${row.pre.percent}%)` : '—'}
                      </td>
                      <td className="px-3 py-2 text-gray-600">
                        {row.post ? `${row.post.score}/${row.post.total} (${row.post.percent}%)` : '—'}
                      </td>
                      <td
                        className={cn(
                          'px-3 py-2 font-medium',
                          delta === null ? 'text-gray-400' : delta >= 0 ? 'text-green-700' : 'text-red-600',
                        )}
                      >
                        {delta === null ? '—' : `${delta > 0 ? '+' : ''}${delta}%`}
                      </td>
                      <td className="px-3 py-2 text-gray-500">{formatDateTime(latestTime)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.25fr_0.95fr]">
        <div className="rounded-xl border bg-white p-4 shadow-sm md:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold" style={{ color: 'var(--medical-navy)' }}>
                最近作答紀錄
              </h2>
              <p className="text-sm text-gray-500">
                最新 12 筆，方便課間快速掌握狀況
              </p>
            </div>
            <Badge variant="outline">{submissions.length} 筆</Badge>
          </div>

          {submissions.length === 0 ? (
            <p className="text-sm text-gray-500">目前還沒有作答紀錄。</p>
          ) : (
            <div className="space-y-2">
              {submissions.slice(0, 12).map((submission) => (
                <div key={submission.id} className="rounded-lg border bg-gray-50 p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline">{submission.quizType.toUpperCase()}</Badge>
                      <span className="text-sm font-medium text-gray-800">
                        {submission.participantGroup} / {submission.participantName}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">{formatDateTime(submission.submittedAt)}</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    {submission.score}/{submission.total} 題答對（{submission.percent}%）｜作答 {submission.durationSeconds} 秒
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border bg-white p-4 shadow-sm md:p-5">
          <div className="mb-4">
            <h2 className="text-lg font-semibold" style={{ color: 'var(--medical-navy)' }}>
              常錯題目
            </h2>
            <p className="text-sm text-gray-500">
              依所有已送出的答題紀錄統計
            </p>
          </div>

          {weakestQuestions.length === 0 ? (
            <p className="text-sm text-gray-500">累積作答後，這裡會顯示班級最容易錯的題目。</p>
          ) : (
            <div className="space-y-3">
              {weakestQuestions.map((item) => (
                <div key={item.questionId} className="rounded-lg border bg-gray-50 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-sm font-medium text-gray-800">Q{item.questionId}</div>
                    <Badge
                      className={cn(
                        item.accuracy >= 80 ? 'bg-green-100 text-green-700' :
                        item.accuracy >= 60 ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700',
                      )}
                    >
                      正答率 {Math.round(item.accuracy)}%
                    </Badge>
                  </div>
                  <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                    {item.prompt}
                  </p>
                  <p className="mt-2 text-xs text-gray-400">
                    作答次數：{item.attempts}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {loading && (
        <section className="rounded-xl border bg-white p-4 text-sm text-gray-500 shadow-sm">
          讀取儀表板資料中...
        </section>
      )}
    </div>
  )
}

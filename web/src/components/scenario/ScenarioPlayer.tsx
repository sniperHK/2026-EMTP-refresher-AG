import type { Scenario } from '@/data/types'
import { useScenario } from '@/hooks/useScenario'
import { useFullscreen } from '@/hooks/useFullscreen'
import { VitalsMonitor } from '@/components/scenario/VitalsMonitor'
import { NarrativePanel } from '@/components/scenario/NarrativePanel'
import { ActionSelector } from '@/components/scenario/ActionSelector'
import { FeedbackPanel } from '@/components/scenario/FeedbackPanel'
import { StageProgress } from '@/components/scenario/StageProgress'
import { CriticalActions } from '@/components/scenario/CriticalActions'
import { AssessmentPathwayCard } from '@/components/scenario/AssessmentPathwayCard'
import { DebriefCard } from '@/components/scenario/DebriefCard'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

interface ScenarioPlayerProps {
  scenario: Scenario
}

export function ScenarioPlayer({ scenario }: ScenarioPlayerProps) {
  const {
    currentStageIndex,
    selectedOptionId,
    isAnswered,
    isCorrect,
    completedActions,
    showTeachingPoint,
    showAnswer,
    currentStage,
    progress,
    selectOption,
    submitAnswer,
    nextStage,
    prevStage,
    goToStage,
    toggleTeachingPoint,
    toggleShowAnswer,
    resetScenario,
  } = useScenario(scenario)

  const { isFullscreen, toggleFullscreen } = useFullscreen()

  if (!currentStage) return null

  const pptLabel =
    scenario.pumpPipeTank === 'pump'
      ? 'Pump'
      : scenario.pumpPipeTank === 'pipe'
      ? 'Pipe'
      : 'Tank'

  const isLastStage = currentStageIndex >= scenario.stages.length - 1
  const hasDecision = !!currentStage.decision

  return (
    <div className="mx-auto max-w-6xl space-y-4 pb-24 md:space-y-6">
      {/* Header: 情境標題 */}
      <div className="flex flex-wrap items-center gap-2">
        <h1
          className="text-xl font-bold md:text-2xl"
          style={{ color: 'var(--medical-navy)' }}
        >
          {scenario.title}
        </h1>
        <Badge
          variant="outline"
          className="text-xs"
          style={{ borderColor: scenario.color, color: scenario.color }}
        >
          {pptLabel}
        </Badge>
        <span className="text-sm text-gray-500">{scenario.subtitle}</span>
      </div>

      {/* Progress bar */}
      <Progress value={progress} className="h-2" />

      {scenario.assessmentPathway && (
        <AssessmentPathwayCard
          pathway={scenario.assessmentPathway}
          accentColor={scenario.color}
        />
      )}

      {/* Stage Progress Steps */}
      <StageProgress
        stages={scenario.stages}
        currentIndex={currentStageIndex}
        onStageClick={goToStage}
        accentColor={scenario.color}
      />

      {/* Main content area */}
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        {/* Left column: vitals + narrative + action */}
        <div className="space-y-4">
          {/* Vitals Monitor */}
          <VitalsMonitor vitals={currentStage.vitals} />

          {/* Narrative */}
          <NarrativePanel
            narrative={currentStage.narrative}
            findings={currentStage.findings}
            accentColor={scenario.color}
          />

          {/* Decision / Continue */}
          {hasDecision ? (
            <ActionSelector
              decision={currentStage.decision!}
              selectedId={selectedOptionId}
              isAnswered={isAnswered}
              isCorrect={isCorrect}
              onSelect={selectOption}
              onSubmit={submitAnswer}
            />
          ) : (
            <div className="flex justify-center py-4">
              <Button
                onClick={nextStage}
                size="lg"
                disabled={isLastStage}
                className="min-w-[200px]"
                style={{ backgroundColor: 'var(--medical-blue)' }}
              >
                {isLastStage ? '情境結束' : '繼續下一階段'}
              </Button>
            </div>
          )}

          {/* Feedback (after answering) */}
          {isAnswered && currentStage.decision && selectedOptionId && (
            <FeedbackPanel
              decision={currentStage.decision}
              selectedOptionId={selectedOptionId}
              isCorrect={isCorrect!}
              teachingPoint={currentStage.teachingPoint}
              showTeachingPoint={showTeachingPoint}
              onToggleTeachingPoint={toggleTeachingPoint}
            />
          )}

          {/* Instructor: show answer toggle */}
          {hasDecision && !isAnswered && (
            <div className="flex justify-center">
              <button
                onClick={toggleShowAnswer}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showAnswer ? '隱藏答案' : '講師模式：顯示答案'}
              </button>
            </div>
          )}
          {showAnswer && !isAnswered && currentStage.decision && (
            <div className="rounded-md border border-purple-200 bg-purple-50 p-3">
              <p className="text-xs font-semibold text-purple-600">講師參考</p>
              <p className="mt-1 text-sm text-purple-800">
                正確答案：{currentStage.decision.options.find((o) => o.correct)?.text}
              </p>
              {currentStage.teachingPoint && (
                <p className="mt-2 text-sm text-purple-700">
                  {currentStage.teachingPoint}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Right sidebar: critical actions */}
        <div className="order-first space-y-4 lg:order-last">
          <CriticalActions
            actions={scenario.criticalActions}
            completedIds={completedActions}
          />
          <DebriefCard debrief={scenario.debrief} />
        </div>
      </div>

      {/* Footer toolbar (fixed at bottom) */}
      <div className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-between border-t bg-white/95 px-4 py-2 backdrop-blur-sm md:px-6">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={prevStage}
            disabled={currentStageIndex <= 0}
          >
            &#9664; 上一階段
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextStage}
            disabled={isLastStage}
          >
            下一階段 &#9654;
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden text-xs text-gray-400 md:inline">
            {scenario.duration}
          </span>
          <Button variant="ghost" size="sm" onClick={toggleFullscreen}>
            {isFullscreen ? '結束全螢幕' : '全螢幕'}
          </Button>
          <Button variant="ghost" size="sm" onClick={resetScenario} className="text-red-500 hover:text-red-700">
            重置
          </Button>
        </div>
      </div>
    </div>
  )
}

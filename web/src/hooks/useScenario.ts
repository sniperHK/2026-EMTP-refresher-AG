import { useState, useCallback, useMemo } from 'react'
import type { Scenario } from '@/data/types'

interface ScenarioState {
  currentStageIndex: number
  selectedOptionId: string | null
  isAnswered: boolean
  isCorrect: boolean | null
  completedActions: Set<string>
  showTeachingPoint: boolean
  showAnswer: boolean
}

const initialState: ScenarioState = {
  currentStageIndex: 0,
  selectedOptionId: null,
  isAnswered: false,
  isCorrect: null,
  completedActions: new Set<string>(),
  showTeachingPoint: false,
  showAnswer: false,
}

export function useScenario(scenario: Scenario) {
  const [state, setState] = useState<ScenarioState>(initialState)

  const currentStage = useMemo(
    () => scenario.stages[state.currentStageIndex],
    [scenario.stages, state.currentStageIndex]
  )

  const progress = useMemo(
    () =>
      scenario.stages.length > 0
        ? Math.round(((state.currentStageIndex + 1) / scenario.stages.length) * 100)
        : 0,
    [state.currentStageIndex, scenario.stages.length]
  )

  const completedCriticalActions = useMemo(() => {
    return scenario.criticalActions.filter((a) => state.completedActions.has(a.id))
  }, [scenario.criticalActions, state.completedActions])

  const selectOption = useCallback((optionId: string) => {
    setState((prev) => {
      if (prev.isAnswered) return prev
      return { ...prev, selectedOptionId: optionId }
    })
  }, [])

  const submitAnswer = useCallback(() => {
    setState((prev) => {
      if (prev.isAnswered || !prev.selectedOptionId) return prev
      const decision = scenario.stages[prev.currentStageIndex]?.decision
      if (!decision) return prev

      const selectedOption = decision.options.find((o) => o.id === prev.selectedOptionId)
      const correct = selectedOption?.correct ?? false

      // 自動完成該階段關聯的 critical actions（若答對）
      const newCompleted = new Set(prev.completedActions)
      if (correct) {
        const stageId = scenario.stages[prev.currentStageIndex].id
        scenario.criticalActions
          .filter((a) => a.stageId === stageId)
          .forEach((a) => newCompleted.add(a.id))
      }

      return {
        ...prev,
        isAnswered: true,
        isCorrect: correct,
        completedActions: newCompleted,
      }
    })
  }, [scenario])

  const nextStage = useCallback(() => {
    setState((prev) => {
      if (prev.currentStageIndex >= scenario.stages.length - 1) return prev
      return {
        ...prev,
        currentStageIndex: prev.currentStageIndex + 1,
        selectedOptionId: null,
        isAnswered: false,
        isCorrect: null,
        showTeachingPoint: false,
        showAnswer: false,
      }
    })
  }, [scenario.stages.length])

  const prevStage = useCallback(() => {
    setState((prev) => {
      if (prev.currentStageIndex <= 0) return prev
      return {
        ...prev,
        currentStageIndex: prev.currentStageIndex - 1,
        selectedOptionId: null,
        isAnswered: false,
        isCorrect: null,
        showTeachingPoint: false,
        showAnswer: false,
      }
    })
  }, [])

  const goToStage = useCallback(
    (index: number) => {
      if (index < 0 || index >= scenario.stages.length) return
      setState((prev) => ({
        ...prev,
        currentStageIndex: index,
        selectedOptionId: null,
        isAnswered: false,
        isCorrect: null,
        showTeachingPoint: false,
        showAnswer: false,
      }))
    },
    [scenario.stages.length]
  )

  const toggleTeachingPoint = useCallback(() => {
    setState((prev) => ({ ...prev, showTeachingPoint: !prev.showTeachingPoint }))
  }, [])

  const toggleShowAnswer = useCallback(() => {
    setState((prev) => ({ ...prev, showAnswer: !prev.showAnswer }))
  }, [])

  const resetScenario = useCallback(() => {
    setState({ ...initialState, completedActions: new Set<string>() })
  }, [])

  return {
    ...state,
    currentStage,
    progress,
    completedCriticalActions,
    selectOption,
    submitAnswer,
    nextStage,
    prevStage,
    goToStage,
    toggleTeachingPoint,
    toggleShowAnswer,
    resetScenario,
  }
}

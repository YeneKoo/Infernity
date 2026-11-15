import { useEffect, useReducer, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import {
  ArrowRight,
  Gauge,
  HelpCircle,
  RotateCcw,
  Search,
  ShieldCheck,
} from "lucide-react"
import { EndScreen } from "@/components/game/end-screen"
import { LivesBar } from "@/components/game/lives-bar"
import { QuestionCard } from "@/components/game/question-card"
import { ScoreBoard } from "@/components/game/score-board"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { missions, type Mission, type Question } from "@/data/game"
import {
  QUESTION_SECONDS,
  QUESTIONS_PER_RUN,
  STARTING_LIVES,
  buildRun,
  missionQuestionCount,
  scoreForCorrect,
} from "@/lib/game"

export const Route = createFileRoute("/play")({
  head: () => ({
    meta: [
      { title: "Fire Marshal: Mission Training — Infernity" },
      {
        name: "description",
        content:
          "A short game about NASA microgravity fire safety: prevention, detection, and suppression.",
      },
    ],
  }),
  component: PlayPage,
})

type Screen = "start" | "question" | "feedback" | "end"

interface GameState {
  screen: Screen
  mission: Mission | null
  questions: Question[]
  index: number
  selectedId: string | null
  isCorrect: boolean
  timedOut: boolean
  score: number
  lives: number
  streak: number
  bestStreak: number
  correctCount: number
  missedIds: string[]
}

type GameAction =
  | { type: "START"; mission: Mission; questions: Question[] }
  | { type: "ANSWER"; optionId: string | null; timedOut?: boolean }
  | { type: "NEXT" }
  | { type: "RESET" }

const initialState: GameState = {
  screen: "start",
  mission: null,
  questions: [],
  index: 0,
  selectedId: null,
  isCorrect: false,
  timedOut: false,
  score: 0,
  lives: STARTING_LIVES,
  streak: 0,
  bestStreak: 0,
  correctCount: 0,
  missedIds: [],
}

function reducer(state: GameState, action: GameAction): GameState {
  if (action.type === "START") {
    return {
      ...initialState,
      screen: "question",
      mission: action.mission,
      questions: action.questions,
    }
  }

  if (action.type === "RESET") return initialState

  if (action.type === "ANSWER") {
    if (state.screen !== "question") return state
    const question = state.questions[state.index]
    const isCorrect = action.optionId === question.correctId
    const nextStreak = isCorrect ? state.streak + 1 : 0
    const missedIds = isCorrect
      ? state.missedIds
      : Array.from(
          new Set([...state.missedIds, ...(question.investigationIds ?? [])])
        )

    return {
      ...state,
      screen: "feedback",
      selectedId: action.optionId,
      isCorrect,
      timedOut: Boolean(action.timedOut),
      score: isCorrect
        ? state.score + scoreForCorrect(nextStreak)
        : state.score,
      lives: isCorrect ? state.lives : Math.max(0, state.lives - 1),
      streak: nextStreak,
      bestStreak: Math.max(state.bestStreak, nextStreak),
      correctCount: state.correctCount + (isCorrect ? 1 : 0),
      missedIds,
    }
  }

  if (state.screen !== "feedback") return state
  const isLast = state.index >= state.questions.length - 1
  if (state.lives <= 0 || isLast) {
    return { ...state, screen: "end" }
  }
  return {
    ...state,
    screen: "question",
    index: state.index + 1,
    selectedId: null,
    isCorrect: false,
    timedOut: false,
  }
}

const missionIcons = {
  pillar: ShieldCheck,
  match: Search,
  o2: Gauge,
}

function PlayPage() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [timerEnabled, setTimerEnabled] = useState(true)
  const [timeLeft, setTimeLeft] = useState(QUESTION_SECONDS)
  const mission = missions.find((item) => item.id === state.mission)
  const question =
    state.screen === "question" || state.screen === "feedback"
      ? state.questions[state.index]
      : undefined

  function startMission(nextMission: Mission) {
    dispatch({
      type: "START",
      mission: nextMission,
      questions: buildRun(nextMission),
    })
    setTimeLeft(QUESTION_SECONDS)
  }

  useEffect(() => {
    if (!timerEnabled || state.screen !== "question") return
    setTimeLeft(QUESTION_SECONDS)
    let remaining = QUESTION_SECONDS
    const timer = setInterval(() => {
      remaining -= 1
      setTimeLeft(Math.max(0, remaining))
      if (remaining <= 0) {
        clearInterval(timer)
        dispatch({ type: "ANSWER", optionId: null, timedOut: true })
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [timerEnabled, state.screen, state.index])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return
      const target = event.target instanceof HTMLElement ? event.target : null
      if (target?.closest("input, textarea, select, [contenteditable=true]")) {
        return
      }

      if (state.screen === "question" && question) {
        const number = Number(event.key)
        if (
          Number.isInteger(number) &&
          number >= 1 &&
          number <= question.options.length
        ) {
          event.preventDefault()
          dispatch({
            type: "ANSWER",
            optionId: question.options[number - 1].id,
          })
        }
      }

      if (state.screen === "feedback" && event.key === "Enter") {
        if (target?.closest("a")) return
        event.preventDefault()
        dispatch({ type: "NEXT" })
      }
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [state.screen, state.index, state.questions, question])

  if (state.screen === "start") {
    return (
      <StartScreen
        timerEnabled={timerEnabled}
        onTimerChange={setTimerEnabled}
        onStart={startMission}
      />
    )
  }

  if (state.screen === "end") {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <EndScreen
          missionLabel={mission?.label ?? "Mission"}
          score={state.score}
          correctCount={state.correctCount}
          bestStreak={state.bestStreak}
          missedIds={state.missedIds}
          onPlayAgain={() => {
            if (state.mission) startMission(state.mission)
          }}
          onChooseMission={() => dispatch({ type: "RESET" })}
        />
      </div>
    )
  }

  if (!mission || !question) return null
  const timerValue = Math.max(0, (timeLeft / QUESTION_SECONDS) * 100)

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-primary">
            <span className="h-px w-8 bg-primary" />
            {mission.label.toUpperCase()} / {mission.difficulty.toUpperCase()}
          </p>
          <h1 className="mt-2 text-2xl font-medium tracking-tight sm:text-3xl">
            Fire Marshal: Mission Training
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <LivesBar lives={state.lives} />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch({ type: "RESET" })}
          >
            <RotateCcw data-icon="inline-start" />
            Quit
          </Button>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <Progress
          value={((state.index + 1) / state.questions.length) * 100}
          className="flex-1"
        />
        <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
          {state.index + 1} / {state.questions.length}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <ScoreBoard
          score={state.score}
          streak={state.streak}
          correctCount={state.correctCount}
        />
        {timerEnabled ? (
          <div className="flex w-40 items-center gap-2">
            <span className="font-mono text-[9px] text-muted-foreground">
              TIME
            </span>
            <Progress value={timerValue} className="flex-1" />
            <span className="w-6 text-right font-mono text-[10px] text-muted-foreground tabular-nums">
              {timeLeft}s
            </span>
          </div>
        ) : (
          <Badge variant="outline" className="font-mono text-[9px]">
            TIMER OFF
          </Badge>
        )}
      </div>

      <div className="mt-5">
        <QuestionCard
          question={question}
          questionNumber={state.index + 1}
          totalQuestions={state.questions.length}
          selectedId={state.selectedId}
          answered={state.screen === "feedback"}
          isCorrect={state.isCorrect}
          timedOut={state.timedOut}
          lives={state.lives}
          onSelect={(optionId) => dispatch({ type: "ANSWER", optionId })}
          onNext={() => dispatch({ type: "NEXT" })}
        />
      </div>

      <p className="mt-4 border-t pt-3 text-[9px] leading-relaxed text-muted-foreground">
        Educational game based on NASA PSI combustion investigations. No score
        is saved; state resets on refresh.
      </p>
    </div>
  )
}

function StartScreen({
  timerEnabled,
  onTimerChange,
  onStart,
}: {
  timerEnabled: boolean
  onTimerChange: (enabled: boolean) => void
  onStart: (mission: Mission) => void
}) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-primary">
            <span className="h-px w-8 bg-primary" />
            FIRE MARSHAL / MISSION TRAINING
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl font-medium tracking-tight sm:text-4xl">
            Learn the three lines of fire defense.
          </h1>
          <p className="mt-3 max-w-2xl text-[12px] leading-relaxed text-muted-foreground">
            Three short missions. Eight questions each. Use the investigations
            from the catalog to make the call.
          </p>
        </div>
        <HowToPlayDialog />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4 border bg-card/60 p-3">
        <div className="flex items-center gap-2">
          <Checkbox
            id="timer-toggle"
            checked={timerEnabled}
            onCheckedChange={(checked) => onTimerChange(Boolean(checked))}
          />
          <Label htmlFor="timer-toggle" className="text-[11px]">
            20-second timer
          </Label>
        </div>
        <div className="flex flex-wrap items-center gap-1">
          <Badge variant="outline" className="font-mono text-[9px]">
            {STARTING_LIVES} LIVES
          </Badge>
          <Badge variant="outline" className="font-mono text-[9px]">
            {QUESTIONS_PER_RUN} QUESTIONS
          </Badge>
          <Badge variant="outline" className="font-mono text-[9px]">
            3-5 MIN
          </Badge>
        </div>
        <p className="text-[10px] text-muted-foreground">
          Timeouts count as wrong. Turn the timer off for a relaxed run.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {missions.map((mission) => {
          const Icon = missionIcons[mission.id]
          return (
            <Card key={mission.id} className="hairline flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-start justify-between gap-2">
                  <span className="flex size-9 items-center justify-center border border-primary/30 bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </span>
                  <Badge
                    variant="outline"
                    className="font-mono text-[9px] uppercase"
                  >
                    {mission.difficulty}
                  </Badge>
                </div>
                <CardTitle className="mt-3 text-lg">{mission.label}</CardTitle>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  {mission.description}
                </p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col pt-3">
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="font-mono text-[9px]">
                    {missionQuestionCount(mission.id)} question bank
                  </Badge>
                  <Badge variant="outline" className="font-mono text-[9px]">
                    {QUESTIONS_PER_RUN} per run
                  </Badge>
                </div>
                <Button
                  className="mt-4 w-full"
                  onClick={() => onStart(mission.id)}
                >
                  Start mission
                  <ArrowRight data-icon="inline-end" />
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <p className="mt-5 border-t pt-3 text-[9px] leading-relaxed text-muted-foreground">
        Educational game based on NASA PSI combustion investigations. No score
        is saved; state resets on refresh.
      </p>
    </div>
  )
}

function HowToPlayDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>
        <HelpCircle data-icon="inline-start" />
        How to play
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>How to play</DialogTitle>
          <DialogDescription>
            Pick a mission, answer eight questions, and keep three flames alive.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 text-[11px] leading-relaxed text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">Scoring.</span>{" "}
            Correct answers earn 100 points plus a streak bonus of 25 per step,
            capped at 100.
          </p>
          <p>
            <span className="font-medium text-foreground">Lives.</span> A wrong
            answer or timeout costs one flame. At zero, the mission ends.
          </p>
          <p>
            <span className="font-medium text-foreground">Controls.</span> Press
            1-4 to answer and Enter for the next question. Tapping works too.
          </p>
          <p>
            <span className="font-medium text-foreground">Learn.</span> Every
            explanation links back to the NASA PSI investigations behind it.
          </p>
        </div>
        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  )
}

import { useEffect, useState } from "react"
import { Link } from "@tanstack/react-router"
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Question } from "@/data/game"
import { investigations } from "@/data/investigations"
import { cn } from "@/lib/utils"

const investigationTitles = new Map(
  investigations.map((item) => [item.id, item.title]),
)

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedId,
  answered,
  isCorrect,
  timedOut,
  lives,
  onSelect,
  onNext,
}: {
  question: Question
  questionNumber: number
  totalQuestions: number
  selectedId: string | null
  answered: boolean
  isCorrect: boolean
  timedOut: boolean
  lives: number
  onSelect: (optionId: string) => void
  onNext: () => void
}) {
  const [flash, setFlash] = useState(false)
  const isLast = questionNumber >= totalQuestions
  const nextLabel = lives <= 0 || isLast ? "See results" : "Next"

  useEffect(() => {
    if (!answered || isCorrect) {
      setFlash(false)
      return
    }
    setFlash(true)
    const timer = setTimeout(() => setFlash(false), 450)
    return () => clearTimeout(timer)
  }, [answered, isCorrect])

  return (
    <Card className="hairline">
      <CardHeader className="border-b">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge variant="outline" className="font-mono text-[9px]">
            QUESTION {questionNumber} / {totalQuestions}
          </Badge>
          {answered ? null : (
            <span className="font-mono text-[9px] text-muted-foreground">
              1-4 TO ANSWER
            </span>
          )}
        </div>
        <CardTitle className="mt-3 text-xl leading-snug sm:text-2xl">
          {question.prompt}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 pt-4">
        {question.options.map((option, index) => {
          const chosen = selectedId === option.id
          const correctOption = option.id === question.correctId
          const showCorrect = answered && correctOption
          const showWrong = answered && chosen && !correctOption

          return (
            <Button
              key={option.id}
              variant="outline"
              disabled={answered}
              onClick={() => onSelect(option.id)}
              className={cn(
                "h-auto min-h-12 w-full justify-start gap-3 whitespace-normal px-3 py-3 text-left text-sm leading-snug disabled:opacity-100",
                showCorrect &&
                  "border-emerald-500/60 bg-emerald-500/10 text-emerald-300",
                showWrong &&
                  "border-destructive/60 bg-destructive/10 text-destructive",
                showWrong && flash && "animate-pulse",
              )}
            >
              <span className="flex size-5 shrink-0 items-center justify-center border border-border/70 font-mono text-[9px] text-muted-foreground">
                {index + 1}
              </span>
              <span className="flex-1">{option.label}</span>
              {showCorrect ? (
                <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
              ) : null}
              {showWrong ? (
                <XCircle className="size-4 shrink-0 text-destructive" />
              ) : null}
            </Button>
          )
        })}

        {answered ? (
          <div className="space-y-3 pt-2">
            <Alert
              variant={isCorrect ? "default" : "destructive"}
              className={cn(
                "animate-in fade-in duration-200",
                isCorrect && "border-emerald-500/30 bg-emerald-500/[0.04]",
              )}
            >
              {isCorrect ? (
                <CheckCircle2 className="text-emerald-500" />
              ) : (
                <XCircle />
              )}
              <AlertTitle>
                {isCorrect ? "Correct" : timedOut ? "Time's up" : "Not quite"}
              </AlertTitle>
              <AlertDescription>
                <span>{question.explanation}</span>
                {question.investigationIds?.length ? (
                  <span className="mt-2 flex flex-wrap gap-1">
                    {question.investigationIds.map((id) => (
                      <Badge
                        key={id}
                        variant="outline"
                        className="text-[9px] font-normal hover:border-primary/40 hover:text-primary"
                        render={
                          <Link to="/investigations/$id" params={{ id }} />
                        }
                      >
                        {investigationTitles.get(id) ?? id}
                      </Badge>
                    ))}
                  </span>
                ) : null}
              </AlertDescription>
            </Alert>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-[9px] text-muted-foreground">
                PRESS ENTER FOR {nextLabel.toUpperCase()}
              </span>
              <Button onClick={onNext}>
                {nextLabel}
                <ArrowRight data-icon="inline-end" />
              </Button>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

import { Link } from "@tanstack/react-router"
import { ArrowRight, Flame, RotateCcw, Target, Trophy } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { investigations } from "@/data/investigations"
import { rankForScore } from "@/lib/game"

export function EndScreen({
  missionLabel,
  score,
  correctCount,
  bestStreak,
  missedIds,
  onPlayAgain,
  onChooseMission,
}: {
  missionLabel: string
  score: number
  correctCount: number
  bestStreak: number
  missedIds: string[]
  onPlayAgain: () => void
  onChooseMission: () => void
}) {
  const rank = rankForScore(score)
  const missed = Array.from(new Set(missedIds))
    .map((id) => investigations.find((item) => item.id === id))
    .filter((item): item is (typeof investigations)[number] => Boolean(item))

  return (
    <Card className="hairline mx-auto w-full max-w-2xl">
      <CardHeader className="border-b text-center">
        <div className="mx-auto flex size-12 items-center justify-center border border-primary/30 bg-primary/10 text-primary">
          <Trophy className="size-5" />
        </div>
        <p className="mt-4 font-mono text-[9px] tracking-[0.18em] text-muted-foreground">
          {missionLabel.toUpperCase()} / TRAINING COMPLETE
        </p>
        <CardTitle className="mt-2 text-2xl">Mission report</CardTitle>
        <div className="mt-2 flex justify-center">
          <Badge
            variant={rank.label === "Fire Marshal" ? "default" : "outline"}
            className="gap-1.5 px-2.5 py-1 text-[10px]"
          >
            <Flame className="size-3" />
            {rank.label}
          </Badge>
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">
          {rank.description}
        </p>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="grid grid-cols-3 border border-border/70">
          <div className="border-r border-border/70 p-3 text-center">
            <p className="font-mono text-[9px] text-muted-foreground">SCORE</p>
            <p className="mt-1 text-xl font-medium tabular-nums">{score}</p>
          </div>
          <div className="border-r border-border/70 p-3 text-center">
            <p className="font-mono text-[9px] text-muted-foreground">
              CORRECT
            </p>
            <p className="mt-1 text-xl font-medium tabular-nums">
              {correctCount}
            </p>
          </div>
          <div className="p-3 text-center">
            <p className="font-mono text-[9px] text-muted-foreground">
              BEST STREAK
            </p>
            <p className="mt-1 text-xl font-medium tabular-nums">
              x{bestStreak}
            </p>
          </div>
        </div>

        <div className="mt-4 border-t pt-3">
          <p className="flex items-center gap-1.5 text-[10px] tracking-[0.14em] text-muted-foreground">
            <Target className="size-3" />
            {missed.length > 0
              ? "REVIEW THESE INVESTIGATIONS"
              : "NO MISSED INVESTIGATIONS"}
          </p>
          {missed.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-1">
              {missed.map((item) => (
                <Badge
                  key={item.id}
                  variant="outline"
                  className="h-auto max-w-full py-1 text-left text-[9px] font-normal whitespace-normal hover:border-primary/40 hover:text-primary"
                  render={
                    <Link to="/investigations/$id" params={{ id: item.id }} />
                  }
                >
                  {item.title}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-[11px] text-muted-foreground">
              Clean run. Every question linked back to a catalog record you can
              revisit.
            </p>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button onClick={onPlayAgain}>
            <RotateCcw data-icon="inline-start" />
            Play again
          </Button>
          <Button variant="outline" onClick={onChooseMission}>
            Try another mission
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>

        <p className="mt-4 border-t pt-3 text-[9px] leading-relaxed text-muted-foreground">
          Scores reset when the page refreshes. Educational game based on NASA
          PSI combustion investigations.
        </p>
      </CardContent>
    </Card>
  )
}

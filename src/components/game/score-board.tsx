import { Badge } from "@/components/ui/badge"

export function ScoreBoard({
  score,
  streak,
  correctCount,
}: {
  score: number
  streak: number
  correctCount: number
}) {
  return (
    <div
      className="flex flex-wrap items-center gap-2"
      aria-live="polite"
      aria-label={`Score ${score}, streak ${streak}, ${correctCount} correct`}
    >
      <Badge variant="outline" className="gap-1.5 font-mono text-[10px]">
        <span className="text-muted-foreground">SCORE</span>
        <span className="text-foreground">{score}</span>
      </Badge>
      <Badge variant="outline" className="gap-1.5 font-mono text-[10px]">
        <span className="text-muted-foreground">STREAK</span>
        <span className="text-primary">x{streak}</span>
      </Badge>
      <Badge variant="outline" className="gap-1.5 font-mono text-[10px]">
        <span className="text-muted-foreground">CORRECT</span>
        <span className="text-foreground">{correctCount}</span>
      </Badge>
    </div>
  )
}

import { Flame } from "lucide-react"
import { STARTING_LIVES } from "@/lib/game"
import { cn } from "@/lib/utils"

export function LivesBar({
  lives,
  max = STARTING_LIVES,
}: {
  lives: number
  max?: number
}) {
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`${lives} of ${max} lives remaining`}
    >
      {Array.from({ length: max }).map((_, index) => (
        <Flame
          key={index}
          className={cn(
            "size-4 transition-all duration-200",
            index < lives
              ? "fill-primary/20 text-primary"
              : "text-muted-foreground/20",
          )}
        />
      ))}
    </div>
  )
}

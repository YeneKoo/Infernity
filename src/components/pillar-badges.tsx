import { Badge } from "@/components/ui/badge"
import type { Pillar } from "@/data/investigations"
import { pillarLabel, pillarTone } from "@/lib/display"
import { cn } from "@/lib/utils"

export function PillarBadges({
  pillars,
  className,
}: {
  pillars: Pillar[]
  className?: string
}) {
  return (
    <div className={cn("flex flex-wrap gap-1", className)}>
      {pillars.map((pillar) => (
        <Badge
          key={pillar}
          variant="outline"
          className={cn("text-[10px] tracking-wide", pillarTone[pillar])}
        >
          {pillarLabel[pillar]}
        </Badge>
      ))}
    </div>
  )
}

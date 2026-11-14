import { Link } from "@tanstack/react-router"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { PillarBadges } from "@/components/pillar-badges"
import {
  getHardwareGroup,
  type Investigation,
} from "@/data/investigations"
import {
  environmentLabel,
  fuelPhaseLabel,
  groupLabel,
  initials,
} from "@/lib/display"

export function InvestigationCard({ item }: { item: Investigation }) {
  const group = getHardwareGroup(item.id)
  const oxygen = item.conditions.oxygenPct
  const environments = item.fireSafetyRelevance.environments

  return (
    <Card className="hairline group h-full transition-colors hover:bg-muted/20">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 text-[9px] tracking-[0.14em] text-muted-foreground">
              <span>{groupLabel(group).toUpperCase()}</span>
              <span className="text-border">/</span>
              <span>{fuelPhaseLabel[item.fuel.phase].toUpperCase()}</span>
            </div>
            <Link
              to="/investigations/$id"
              params={{ id: item.id }}
              className="mt-1.5 block text-sm font-medium leading-snug hover:text-primary"
            >
              {item.title}
            </Link>
          </div>
          <Badge
            variant="outline"
            className="shrink-0 text-[9px] tracking-widest text-muted-foreground"
          >
            {initials(item.title)}
          </Badge>
        </div>
        <PillarBadges pillars={item.pillars} className="mt-2.5" />
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-3">
        <p className="line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
          {item.objectives}
        </p>

        <dl className="grid grid-cols-2 gap-x-3 gap-y-2 border-y border-border/60 py-2.5">
          <div>
            <dt className="text-[9px] tracking-[0.12em] text-muted-foreground">
              O2
            </dt>
            <dd className="mt-0.5 font-mono text-[11px] tabular-nums">
              {oxygen === undefined ? "Varies / n.s." : `${oxygen}%`}
            </dd>
          </div>
          <div>
            <dt className="text-[9px] tracking-[0.12em] text-muted-foreground">
              PRESSURE
            </dt>
            <dd className="mt-0.5 font-mono text-[11px] tabular-nums">
              {item.conditions.pressurePsi === undefined
                ? "Varies / n.s."
                : `${item.conditions.pressurePsi} psi`}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-[9px] tracking-[0.12em] text-muted-foreground">
              HARDWARE
            </dt>
            <dd className="mt-0.5 line-clamp-1 text-[11px]">
              {item.hardware.facility ?? "Not specified"}
            </dd>
          </div>
        </dl>

        <div className="flex flex-wrap items-center gap-1">
          {environments.slice(0, 2).map((environment) => (
            <Badge
              key={environment}
              variant="ghost"
              className="h-4 border border-border/70 px-1.5 text-[9px] text-muted-foreground"
            >
              {environmentLabel[environment]}
            </Badge>
          ))}
          {environments.length > 2 ? (
            <span className="text-[9px] text-muted-foreground">
              +{environments.length - 2} more
            </span>
          ) : null}
        </div>
      </CardContent>

      <CardFooter className="justify-between gap-2">
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground"
        >
          PSI
          <ArrowUpRight className="size-3" />
        </a>
        <Button
          size="sm"
          variant="outline"
          render={
            <Link to="/investigations/$id" params={{ id: item.id }} />
          }
        >
          View
          <ArrowRight data-icon="inline-end" />
        </Button>
      </CardFooter>
    </Card>
  )
}

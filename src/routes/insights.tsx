import { createFileRoute, Link } from "@tanstack/react-router"
import { Layers } from "lucide-react"
import { DataGapAlert } from "@/components/data-gap-alert"
import { HardwareGroupCards } from "@/components/hardware-group-cards"
import { O2Chart } from "@/components/o2-chart"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ungroupedIds } from "@/data/investigations"
import {
  ENVIRONMENTS,
  FUEL_PHASES,
  PILLARS,
  countByPhase,
  countByPillar,
  environmentLabel,
  fuelPhaseLabel,
  pillarDot,
  pillarLabel,
} from "@/lib/display"
import { listInvestigations } from "@/server/functions"

export const Route = createFileRoute("/insights")({
  loader: () => listInvestigations({ data: {} }),
  component: InsightsPage,
})

function InsightsPage() {
  const items = Route.useLoaderData()
  const maxPillar = Math.max(
    ...PILLARS.map((pillar) => countByPillar(items, pillar))
  )
  const maxPhase = Math.max(
    ...FUEL_PHASES.map((phase) => countByPhase(items, phase))
  )
  const environmentCounts = ENVIRONMENTS.map((environment) => ({
    environment,
    count: items.filter((item) =>
      item.fireSafetyRelevance.environments.includes(environment)
    ).length,
  })).filter((entry) => entry.count > 0)
  const maxEnvironment = Math.max(
    ...environmentCounts.map((entry) => entry.count)
  )

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <p className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-primary">
        <span className="h-px w-8 bg-primary" />
        INSIGHTS / PURE CLIENT
      </p>
      <h1 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
        Oxygen, hardware, and the data gap
      </h1>
      <p className="mt-2 max-w-2xl text-[12px] leading-relaxed text-muted-foreground">
        A structural view of the curated catalog: where oxygen conditions sit,
        which hardware family produced what, and what NASA has not measured yet.
      </p>

      <div className="mt-6">
        <DataGapAlert />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.65fr_1fr]">
        <O2Chart items={items} />

        <Card className="hairline">
          <CardHeader className="border-b">
            <CardTitle>Catalog coverage</CardTitle>
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              Counts overlap: one investigation can serve several pillars, fuels
              or environments.
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-5 pt-4">
            <div>
              <p className="text-[10px] tracking-[0.14em] text-muted-foreground">
                BY PILLAR
              </p>
              <div className="mt-2 flex flex-col gap-2">
                {PILLARS.map((pillar) => {
                  const count = countByPillar(items, pillar)
                  return (
                    <div
                      key={pillar}
                      className="grid grid-cols-[5.5rem_1fr_1.5rem] items-center gap-2"
                    >
                      <span className="flex items-center gap-1.5 text-[10px]">
                        <span className={`size-1.5 ${pillarDot[pillar]}`} />
                        {pillarLabel[pillar]}
                      </span>
                      <div className="h-1 bg-muted">
                        <div
                          className="h-full bg-primary/70"
                          style={{
                            width: `${(count / maxPillar) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-right font-mono text-[10px]">
                        {count}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-[10px] tracking-[0.14em] text-muted-foreground">
                BY FUEL PHASE
              </p>
              <div className="mt-2 flex flex-col gap-2">
                {FUEL_PHASES.map((phase) => {
                  const count = countByPhase(items, phase)
                  return (
                    <div
                      key={phase}
                      className="grid grid-cols-[5.5rem_1fr_1.5rem] items-center gap-2"
                    >
                      <span className="text-[10px]">
                        {fuelPhaseLabel[phase]}
                      </span>
                      <div className="h-1 bg-muted">
                        <div
                          className="h-full bg-sky-500/70"
                          style={{
                            width: `${(count / maxPhase) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-right font-mono text-[10px]">
                        {count}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-[10px] tracking-[0.14em] text-muted-foreground">
                BY TARGET ENVIRONMENT
              </p>
              <div className="mt-2 flex flex-col gap-2">
                {environmentCounts.map((entry) => (
                  <div
                    key={entry.environment}
                    className="grid grid-cols-[6.5rem_1fr_1.5rem] items-center gap-2"
                  >
                    <span className="truncate text-[10px]">
                      {environmentLabel[entry.environment]}
                    </span>
                    <div className="h-1 bg-muted">
                      <div
                        className="h-full bg-emerald-500/70"
                        style={{
                          width: `${(entry.count / maxEnvironment) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-right font-mono text-[10px]">
                      {entry.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <section className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b pb-3">
          <div>
            <p className="text-[10px] tracking-[0.2em] text-primary">
              HARDWARE MAP
            </p>
            <h2 className="mt-1.5 text-xl font-medium tracking-tight">
              Three families, plus the free-flyers
            </h2>
          </div>
          <Link
            to="/investigations"
            className="text-[11px] text-muted-foreground hover:text-primary"
          >
            Filter the catalog
          </Link>
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          <HardwareGroupCards items={items} />
        </div>

        <Card className="mt-3 border-dashed">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <CardTitle className="flex items-center gap-2">
                <Layers className="size-3.5 text-muted-foreground" />
                Ungrouped records
              </CardTitle>
              <p className="text-[10px] text-muted-foreground">
                Saffire I-III fly on free-flying Cygnus vehicles. Detection
                investigations use dedicated MSG or cabin hardware.
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {ungroupedIds.map((id) => {
                const item = items.find((entry) => entry.id === id)
                if (!item) return null
                return (
                  <Badge
                    key={id}
                    variant="outline"
                    className="text-[9px] font-normal text-muted-foreground hover:border-primary/40 hover:text-primary"
                    render={<Link to="/investigations/$id" params={{ id }} />}
                  >
                    {item.title.replace(/\s*\(.*\)$/, "")}
                  </Badge>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </section>

      <p className="mt-8 border-t pt-3 text-[9px] leading-relaxed text-muted-foreground">
        Built only from the curated catalog and public NASA/PSI summaries. No
        partial-gravity combustion data exists in PSI yet; LUCI and FM2 are the
        expected additions. Rocket and propellant fire safety is out of scope.
      </p>
    </div>
  )
}

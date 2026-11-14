import { createFileRoute, Link } from "@tanstack/react-router"
import {
  ArrowLeft,
  ArrowUpRight,
  Cpu,
  ExternalLink,
  Flame,
  Gauge,
  Layers,
  Microscope,
  Waves,
} from "lucide-react"
import { AiSummary } from "@/components/ai-summary"
import { DataGapAlert } from "@/components/data-gap-alert"
import { PillarBadges } from "@/components/pillar-badges"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getHardwareGroup } from "@/data/investigations"
import {
  environmentLabel,
  environmentTone,
  fuelPhaseLabel,
  groupLabel,
} from "@/lib/display"
import { getInvestigation } from "@/server/functions"

export const Route = createFileRoute("/investigations/$id")({
  loader: ({ params }) => getInvestigation({ data: params.id }),
  component: DetailPage,
  errorComponent: () => (
    <div className="mx-auto flex min-h-[60svh] w-full max-w-2xl flex-col items-start justify-center gap-3 px-4">
      <p className="font-mono text-[10px] tracking-[0.2em] text-primary">
        RECORD NOT FOUND
      </p>
      <h1 className="text-2xl font-medium tracking-tight">
        This investigation is not in the catalog.
      </h1>
      <Button
        variant="outline"
        render={<Link to="/investigations" />}
      >
        <ArrowLeft data-icon="inline-start" />
        Back to catalog
      </Button>
    </div>
  ),
})

function DetailPage() {
  const item = Route.useLoaderData()
  const group = getHardwareGroup(item.id)

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      <Link
        to="/investigations"
        className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.14em] text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3" />
        CATALOG
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4 border-b pb-6">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 text-[10px] tracking-[0.14em] text-muted-foreground">
            <span>{groupLabel(group).toUpperCase()}</span>
            <span className="text-border">/</span>
            <span>{fuelPhaseLabel[item.fuel.phase].toUpperCase()} FUEL</span>
            <span className="text-border">/</span>
            <span className="font-mono">{item.id.toUpperCase()}</span>
          </div>
          <h1 className="mt-2 text-2xl font-medium leading-tight tracking-tight sm:text-3xl">
            {item.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <PillarBadges pillars={item.pillars} />
            {item.fireSafetyRelevance.environments.slice(0, 3).map((env) => (
              <Badge
                key={env}
                variant="outline"
                className={`text-[9px] ${environmentTone}`}
              >
                {environmentLabel[env]}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            render={<Link to="/compare" search={{ ids: item.id }} />}
          >
            <Layers data-icon="inline-start" />
            Compare
          </Button>
          <Button
            render={
              <a href={item.sourceUrl} target="_blank" rel="noreferrer" />
            }
          >
            <ExternalLink data-icon="inline-start" />
            PSI record
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.55fr_1fr]">
        <div className="flex min-w-0 flex-col gap-4">
          <AiSummary id={item.id} />

          <Card className="hairline">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Flame className="size-3.5 text-primary" />
                Experimental setup
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-5 pt-4 sm:grid-cols-2">
              <div>
                <p className="text-[10px] tracking-[0.14em] text-muted-foreground">
                  FUEL
                </p>
                <dl className="mt-2 flex flex-col gap-2 text-[11px]">
                  <div>
                    <dt className="text-muted-foreground">Phase</dt>
                    <dd className="mt-0.5">
                      {fuelPhaseLabel[item.fuel.phase]}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Material</dt>
                    <dd className="mt-0.5 leading-relaxed">
                      {item.fuel.material ?? "Not specified"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Shape</dt>
                    <dd className="mt-0.5 leading-relaxed">
                      {item.fuel.shape ?? "Not specified"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Size</dt>
                    <dd className="mt-0.5 leading-relaxed">
                      {item.fuel.sizeMm ?? "Not specified"}
                    </dd>
                  </div>
                </dl>
              </div>

              <div>
                <p className="text-[10px] tracking-[0.14em] text-muted-foreground">
                  CONDITIONS
                </p>
                <dl className="mt-2 flex flex-col gap-2 text-[11px]">
                  <div>
                    <dt className="text-muted-foreground">
                      O2 concentration
                    </dt>
                    <dd className="mt-0.5 font-mono">
                      {item.conditions.oxygenPct === undefined
                        ? "Varied / not specified"
                        : `${item.conditions.oxygenPct}%`}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Pressure</dt>
                    <dd className="mt-0.5 font-mono">
                      {item.conditions.pressurePsi === undefined
                        ? "Varied / not specified"
                        : `${item.conditions.pressurePsi} psi`}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Airflow</dt>
                    <dd className="mt-0.5 font-mono">
                      {item.conditions.airflowCmS === undefined
                        ? "Varied / not specified"
                        : `${item.conditions.airflowCmS} cm/s`}
                    </dd>
                  </div>
                </dl>
                <p className="mt-3 border-t pt-2 text-[9px] leading-relaxed text-muted-foreground">
                  Single values are documented test conditions, not
                  flammability limits. Ranges appear under variables tested.
                </p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-[10px] tracking-[0.14em] text-muted-foreground">
                  OBJECTIVES
                </p>
                <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
                  {item.objectives}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="hairline">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2">
                  <Microscope className="size-3.5 text-primary" />
                  Sensors & measurements
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-3">
                <ul className="flex flex-col gap-2">
                  {item.sensors.map((sensor) => (
                    <li
                      key={sensor}
                      className="flex gap-2 text-[11px] leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-1.5 size-1 shrink-0 bg-primary" />
                      {sensor}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="hairline">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2">
                  <Gauge className="size-3.5 text-primary" />
                  Variables tested
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-3">
                <ul className="flex flex-col gap-2">
                  {item.variablesTested.map((variable) => (
                    <li
                      key={variable}
                      className="flex gap-2 text-[11px] leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-1.5 size-1 shrink-0 bg-sky-500" />
                      {variable}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="hairline">
            <CardHeader className="border-b">
              <CardTitle>Key findings</CardTitle>
            </CardHeader>
            <CardContent className="pt-3">
              <ol className="flex flex-col gap-3">
                {item.keyFindings.map((finding, index) => (
                  <li key={finding} className="flex gap-3 text-[12px] leading-relaxed">
                    <span className="font-mono text-[10px] text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-muted-foreground">{finding}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>

        <aside className="flex flex-col gap-4">
          <Card className="hairline">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Cpu className="size-3.5 text-primary" />
                Hardware
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pt-3 text-[11px]">
              <div>
                <p className="text-[10px] tracking-[0.14em] text-muted-foreground">
                  FACILITY
                </p>
                <p className="mt-1 leading-relaxed">
                  {item.hardware.facility ?? "Not specified"}
                </p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.14em] text-muted-foreground">
                  MODULE / VEHICLE
                </p>
                <p className="mt-1 leading-relaxed">
                  {item.hardware.module ?? "Not specified"}
                </p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.14em] text-muted-foreground">
                  HARDWARE GROUP
                </p>
                <p className="mt-1">{groupLabel(group)}</p>
              </div>
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 border-t pt-3 text-[10px] text-muted-foreground hover:text-primary"
              >
                Open NASA PSI search
                <ArrowUpRight className="size-3" />
              </a>
            </CardContent>
          </Card>

          <Card className="hairline">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Waves className="size-3.5 text-primary" />
                Fire-safety relevance
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="flex flex-wrap gap-1">
                {item.fireSafetyRelevance.environments.map((env) => (
                  <Badge
                    key={env}
                    variant="outline"
                    className={`text-[9px] ${environmentTone}`}
                  >
                    {environmentLabel[env]}
                  </Badge>
                ))}
              </div>
              <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
                {item.fireSafetyRelevance.why}
              </p>
            </CardContent>
          </Card>

          <DataGapAlert compact />
        </aside>
      </div>
    </div>
  )
}

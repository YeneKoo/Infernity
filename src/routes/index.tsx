import { createFileRoute, Link } from "@tanstack/react-router"
import {
  ArrowRight,
  ArrowUpRight,
  Droplets,
  Orbit,
  Radio,
  Shield,
  Wind,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FlameOrb } from "@/components/flame-orb"
import { IncidentCards } from "@/components/incident-cards"
import { PillarBadges } from "@/components/pillar-badges"
import { earthSpinoff } from "@/data/incidents"
import { hardwareGroups } from "@/data/investigations"
import { countByPillar, pillarLabel } from "@/lib/display"
import { listInvestigations } from "@/server/functions"

export const Route = createFileRoute("/")({
  loader: () => listInvestigations({ data: {} }),
  component: Landing,
})

const pillarCards = [
  {
    pillar: "prevention" as const,
    icon: Shield,
    title: "Prevention",
    blurb:
      "Control ignition sources and select materials using flammability limits that hold in low gravity and elevated oxygen.",
    examples: ["BASS-II", "Saffire-I", "ACME"],
  },
  {
    pillar: "detection" as const,
    icon: Radio,
    title: "Detection",
    blurb:
      "Catch pyrolysis products before a flame establishes, and reject the dust that triggers nuisance alarms.",
    examples: ["SAME", "SAME-R", "DAFT"],
  },
  {
    pillar: "suppression" as const,
    icon: Wind,
    title: "Suppression",
    blurb:
      "Dilute the atmosphere with inert gas and find the limiting oxygen index where steady burning cannot continue.",
    examples: ["FLEX", "FLEX-2", "BASS"],
  },
]

function Landing() {
  const items = Route.useLoaderData()

  return (
    <div>
      <section className="relative overflow-hidden border-b">
        <div className="space-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_60%_40%,black_10%,transparent_75%)] opacity-40" />
        <div className="pointer-events-none absolute -top-40 right-0 h-[32rem] w-[32rem] rounded-full bg-primary/10 blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:py-20">
          <div>
            <p className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground">
              <span className="h-px w-8 bg-primary" />
              2026 NASA SPACE APPS CHALLENGE
              <span className="text-border">/</span>
              SPACE EXPLORATION
            </p>

            <h1 className="mt-5 max-w-xl text-4xl leading-[1.03] font-medium tracking-tight sm:text-5xl lg:text-6xl">
              When gravity fades,
              <br />
              <span className="text-primary">fire transforms.</span>
            </h1>

            <p className="mt-5 max-w-lg text-[13px] leading-relaxed text-muted-foreground">
              Decades of microgravity combustion research sit in NASA's PSI
              repository. Infernity turns that record into a fire-safety
              instrument: filter it, compare it, and rank it against the habitat
              you are protecting.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button size="lg" render={<Link to="/investigations" />}>
                Explore the catalog
                <ArrowRight data-icon="inline-end" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                render={<Link to="/investigations" />}
              >
                Rank a scenario
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Droplets className="size-3 text-sky-500" />0 g diffusion flames
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Orbit className="size-3 text-primary" />
                ISS, Cygnus and ground labs
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                In-memory, no database
              </span>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <FlameOrb />
          </div>
        </div>
      </section>

      <section className="border-b">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 divide-x divide-y border-x sm:grid-cols-4 sm:divide-y-0">
          {[
            {
              value: String(items.length).padStart(2, "0"),
              label: "investigations curated",
            },
            { value: "03", label: "fire-safety pillars" },
            { value: "03", label: "hardware families" },
            { value: "00", label: "partial-gravity datasets" },
          ].map((stat) => (
            <div key={stat.label} className="px-4 py-5 sm:px-6">
              <p className="font-mono text-2xl font-medium tracking-tight tabular-nums">
                {stat.value}
              </p>
              <p className="mt-1 text-[10px] tracking-[0.12em] text-muted-foreground">
                {stat.label.toUpperCase()}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] tracking-[0.2em] text-primary">
              THE FIRE-SAFETY LENS
            </p>
            <h2 className="mt-2 text-xl font-medium tracking-tight sm:text-2xl">
              One fire, three lines of defense
            </h2>
          </div>
          <Link
            to="/investigations"
            className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary"
          >
            Open the full catalog
            <ArrowRight className="size-3" />
          </Link>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {pillarCards.map((card) => {
            const Icon = card.icon
            const count = countByPillar(items, card.pillar)
            return (
              <Card key={card.pillar} className="hairline">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <span className="flex size-8 items-center justify-center border border-primary/30 bg-primary/10 text-primary">
                      <Icon className="size-4" />
                    </span>
                    <Badge
                      variant="secondary"
                      className="font-mono text-[10px]"
                    >
                      {String(count).padStart(2, "0")}
                    </Badge>
                  </div>
                  <CardTitle className="mt-3">{card.title}</CardTitle>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    {card.blurb}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1">
                    {card.examples.map((example) => (
                      <Badge
                        key={example}
                        variant="outline"
                        className="text-[9px] font-normal text-muted-foreground"
                      >
                        {example}
                      </Badge>
                    ))}
                  </div>
                  <p className="mt-3 text-[9px] text-muted-foreground">
                    {pillarLabel[card.pillar]} records in the catalog
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      <section className="border-y bg-muted/20">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[10px] tracking-[0.2em] text-primary">
                WHY THIS EXISTS
              </p>
              <h2 className="mt-2 text-xl font-medium tracking-tight sm:text-2xl">
                Three moments that defined the risk
              </h2>
            </div>
            <p className="max-w-md text-[11px] leading-relaxed text-muted-foreground">
              Smoke alarms, suppressant bottles and material choices are
              designed against these failure modes. One Earth spinoff is shown
              alongside them.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <IncidentCards />

            <a
              href={earthSpinoff.href}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col border border-dashed bg-background p-4 transition-colors hover:border-primary/40"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-widest text-sky-500">
                  {earthSpinoff.id}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {earthSpinoff.year}
                </span>
              </div>
              <h3 className="mt-3 text-sm leading-snug font-medium">
                {earthSpinoff.title}
              </h3>
              <p className="mt-2 flex-1 text-[11px] leading-relaxed text-muted-foreground">
                {earthSpinoff.body}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-[10px] text-muted-foreground group-hover:text-primary">
                NASA spinoff
                <ArrowUpRight className="size-3" />
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] tracking-[0.2em] text-primary">
              HARDWARE FAMILIES
            </p>
            <h2 className="mt-2 text-xl font-medium tracking-tight sm:text-2xl">
              Three racks, one question
            </h2>
          </div>
          <Link
            to="/insights"
            className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary"
          >
            See the hardware map
            <ArrowRight className="size-3" />
          </Link>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-3">
          {hardwareGroups.map((group) => (
            <Card key={group.id} className="hairline">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{group.label}</CardTitle>
                  <Badge variant="outline" className="font-mono text-[9px]">
                    {group.facility}
                  </Badge>
                </div>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  {group.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {group.members.map((id) => {
                    const item = items.find((entry) => entry.id === id)
                    if (!item) return null
                    return (
                      <Badge
                        key={id}
                        variant="outline"
                        className="text-[9px] font-normal hover:border-primary/40 hover:text-primary"
                        render={
                          <Link to="/investigations/$id" params={{ id }} />
                        }
                      >
                        {item.title.replace(/\s*\(.*\)$/, "")}
                      </Badge>
                    )
                  })}
                </div>
                {group.subExperiments.length > 0 ? (
                  <p className="mt-3 text-[9px] leading-relaxed text-muted-foreground">
                    Six ACME sub-experiments: {group.subExperiments.join(" / ")}
                  </p>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2 border border-dashed px-3 py-2 text-[10px] text-muted-foreground">
          <span className="tracking-[0.14em] text-foreground">UNGROUPED</span>
          Saffire I-III fly on free-flying Cygnus vehicles. SAME, SAME-R, DAFT
          and DAFT-2 use dedicated detection hardware in the MSG or cabin.
          <Link
            to="/investigations/$id"
            params={{ id: "saffire-i" }}
            className="inline-flex items-center gap-1 hover:text-primary"
          >
            Open Saffire-I
            <ArrowRight className="size-3" />
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6">
        <div className="relative overflow-hidden border bg-card p-6 sm:p-10">
          <div className="pointer-events-none absolute -top-24 right-0 size-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="relative flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-xl">
              <p className="text-[10px] tracking-[0.2em] text-primary">
                SCENARIO RANKING
              </p>
              <h2 className="mt-2 text-2xl font-medium tracking-tight sm:text-3xl">
                Describe the habitat.
                <br />
                Get a ranked shortlist.
              </h2>
              <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground">
                Set environment, O2 concentration, pressure and priorities. The
                catalog is scored by relevance, with a one-sentence
                justification and any assumptions surfaced.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3">
              <div className="flex flex-wrap gap-1">
                <PillarBadges
                  pillars={["prevention", "detection", "suppression"]}
                />
              </div>
              <Button size="lg" render={<Link to="/investigations" />}>
                Launch scenario ranking
                <ArrowRight data-icon="inline-end" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                render={<Link to="/play" />}
              >
                Train as a Fire Marshal
                <ArrowRight data-icon="inline-end" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

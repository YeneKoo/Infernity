import { useEffect, useState } from "react"
import { createFileRoute, Link } from "@tanstack/react-router"
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Database,
  Flame,
  Layers,
  ListFilter,
  Mail,
  Maximize2,
  Minimize2,
  Orbit,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import { DataGapAlert } from "@/components/data-gap-alert"
import { FlameOrb } from "@/components/flame-orb"
import { HardwareGroupCards } from "@/components/hardware-group-cards"
import { IncidentCards } from "@/components/incident-cards"
import { MarkdownView } from "@/components/markdown-view"
import { O2Chart } from "@/components/o2-chart"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Investigation } from "@/data/investigations"
import {
  SUPPORT_EMAIL,
  pitchSlides,
  pitchTeam,
  type PitchSlide,
} from "@/data/pitch"
import { cn } from "@/lib/utils"
import { listInvestigations } from "@/server/functions"

export const Route = createFileRoute("/pitch")({
  loader: () => listInvestigations({ data: {} }),
  head: () => ({
    meta: [
      { title: "Pitch deck — Infernity" },
      {
        name: "description",
        content:
          "The Infernity pitch deck: NASA microgravity fire data, ranked and interpreted for safer space habitats.",
      },
    ],
  }),
  component: PitchPage,
})

const problemSteps = [
  {
    label: "Find",
    detail: "Search across decades of experiments and facilities.",
  },
  {
    label: "Compare",
    detail: "Different fuels, oxygen levels and hardware families.",
  },
  {
    label: "Interpret",
    detail: "The fire-safety answer is buried in the details.",
  },
]

const solutionCards = [
  {
    icon: Sparkles,
    title: "Summarize",
    body: "Plain-language AI summaries for researchers and students.",
  },
  {
    icon: ListFilter,
    title: "Rank",
    body: "Score investigations against the habitat you are protecting.",
  },
  {
    icon: Search,
    title: "Interpret",
    body: "Compare fuels, oxygen, hardware and fire-safety pillars.",
  },
]

const rankDemo = [
  {
    id: "BASS",
    justification:
      "Solid-fuel spread and nitrogen suppression at spacecraft pressure.",
  },
  {
    id: "Saffire-I",
    justification:
      "Meter-scale solid-fuel fire growth in a free-flying spacecraft.",
  },
]

const stackCards = [
  {
    icon: Layers,
    title: "TanStack Start",
    body: "File-based routes and five typed server functions.",
  },
  {
    icon: Sparkles,
    title: "shadcn/ui + Tailwind",
    body: "One theme and component system across every page.",
  },
  {
    icon: Orbit,
    title: "Bring your own model",
    body: "Any OpenAI-compatible endpoint, including Cerebras. The key stays in the browser.",
  },
  {
    icon: Database,
    title: "Curated NASA data",
    body: "In-memory catalog. No database, no RAG, no invented numbers.",
  },
]

function PitchPage() {
  const items = Route.useLoaderData()
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [fullscreen, setFullscreen] = useState(false)
  const slide = pitchSlides[index]
  const total = pitchSlides.length

  function goTo(next: number) {
    const clamped = Math.max(0, Math.min(next, total - 1))
    if (clamped === index) return
    setDirection(clamped > index ? 1 : -1)
    setIndex(clamped)
  }

  useEffect(() => {
    const root = document.documentElement
    root.classList.add("pitch-mode")
    return () => root.classList.remove("pitch-mode")
  }, [])

  useEffect(() => {
    const sync = () => setFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener("fullscreenchange", sync)
    return () => document.removeEventListener("fullscreenchange", sync)
  }, [])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return
      const target = event.target as HTMLElement | null
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return
      }

      if (event.key === "ArrowRight") {
        event.preventDefault()
        setDirection(1)
        setIndex((current) => Math.min(current + 1, total - 1))
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        setDirection(-1)
        setIndex((current) => Math.max(current - 1, 0))
      }
      if (event.key.toLowerCase() === "f") {
        event.preventDefault()
        toggleFullscreen()
      }
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [total])

  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden",
        fullscreen ? "h-svh" : "h-[calc(100svh-3.5rem)]"
      )}
    >
      <div className="h-1 w-full shrink-0 bg-muted">
        <div
          className="h-full bg-primary transition-[width] duration-300"
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
      </div>

      <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col px-4 sm:px-6">
        <div className="flex shrink-0 items-center justify-between border-b py-3">
          <div className="flex items-center gap-2">
            <Flame className="size-3.5 text-primary" />
            <p className="font-mono text-[9px] tracking-[0.18em] text-muted-foreground">
              INFERNITY / PITCH / 2026 NASA SPACE APPS
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="hidden font-mono text-[9px] sm:inline-flex"
            >
              F FOR FULLSCREEN
            </Badge>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={toggleFullscreen}
              aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              title={fullscreen ? "Exit fullscreen (F)" : "Fullscreen (F)"}
            >
              {fullscreen ? (
                <Minimize2 className="size-3.5" />
              ) : (
                <Maximize2 className="size-3.5" />
              )}
            </Button>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 items-center overflow-y-auto py-6">
          <div
            key={index}
            className={cn(
              "w-full animate-in duration-300 fade-in",
              direction > 0 ? "slide-in-from-right-8" : "slide-in-from-left-8"
            )}
          >
            <SlideBody slide={slide} items={items} index={index} />
          </div>
        </div>

        <div className="shrink-0 border-t py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div
              className="flex items-center gap-1.5"
              aria-label="Pitch slides"
            >
              {pitchSlides.map((entry, dotIndex) => (
                <button
                  key={entry.title}
                  type="button"
                  aria-current={dotIndex === index ? "step" : undefined}
                  aria-label={`Go to slide ${dotIndex + 1}: ${entry.title}`}
                  onClick={() => goTo(dotIndex)}
                  className={cn(
                    "h-1.5 transition-all",
                    dotIndex === index
                      ? "w-7 bg-primary"
                      : "w-3 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                  )}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="mr-2 font-mono text-[10px] text-muted-foreground tabular-nums">
                {index + 1} / {total}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => goTo(index - 1)}
                disabled={index === 0}
              >
                <ArrowLeft data-icon="inline-start" />
                Prev
              </Button>
              <Button
                size="sm"
                onClick={() => goTo(index + 1)}
                disabled={index === total - 1}
              >
                Next
                <ArrowRight data-icon="inline-end" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SlideBody({
  slide,
  items,
  index,
}: {
  slide: PitchSlide
  items: Investigation[]
  index: number
}) {
  const wide = slide.visual === "insights"

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-6xl",
        wide
          ? "space-y-5"
          : "grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.92fr_1.08fr]"
      )}
    >
      <div className={cn("min-w-0", wide && "max-w-3xl")}>
        <SlideHeading slide={slide} index={index} wide={wide} />
      </div>

      {wide ? (
        <div className="grid min-w-0 grid-cols-1 items-start gap-3 xl:grid-cols-[1.4fr_0.6fr]">
          <O2Chart items={items} compact />
          <div className="flex min-w-0 flex-col gap-3">
            <HardwareGroupCards items={items} compact />
          </div>
        </div>
      ) : (
        <div className="min-w-0">
          <SlideVisual visual={slide.visual} />
        </div>
      )}
    </div>
  )
}

function SlideHeading({
  slide,
  index,
  wide,
}: {
  slide: PitchSlide
  index: number
  wide: boolean
}) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline" className="font-mono text-[9px]">
          SLIDE {String(index + 1).padStart(2, "0")}
        </Badge>
        <span className="font-mono text-[9px] tracking-[0.16em] text-muted-foreground">
          {pitchSlides.length} SLIDES / LIVE DEMO INCLUDED
        </span>
      </div>
      <h1 className="mt-4 text-4xl leading-[1.03] font-medium tracking-tight sm:text-5xl lg:text-6xl">
        {slide.title}
      </h1>
      <p className="mt-4 w-full max-w-[calc(100vw-2rem)] text-xl leading-relaxed text-muted-foreground sm:max-w-2xl sm:text-2xl">
        {slide.subtitle}
      </p>
      <ul
        className={cn(
          "mt-6 grid max-w-[calc(100vw-2rem)] gap-2.5 sm:max-w-2xl",
          wide && "sm:grid-cols-2"
        )}
      >
        {slide.bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex gap-2.5 text-lg leading-snug text-foreground/90 sm:text-xl"
          >
            <span className="mt-2 size-1.5 shrink-0 bg-primary" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SlideVisual({ visual }: { visual: PitchSlide["visual"] }) {
  if (visual === "title") {
    return (
      <div className="flex justify-center">
        <FlameOrb className="max-w-[320px] sm:max-w-[380px]" />
      </div>
    )
  }

  if (visual === "incidents") {
    return (
      <div className="grid gap-3 md:grid-cols-3">
        <IncidentCards />
      </div>
    )
  }

  if (visual === "microgravity") {
    return (
      <div className="flex justify-center">
        <FlameOrb className="max-w-[320px] sm:max-w-[400px]" />
      </div>
    )
  }

  if (visual === "risk") {
    return (
      <div className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <Card className="hairline">
            <CardHeader className="border-b">
              <p className="font-mono text-[9px] tracking-[0.18em] text-muted-foreground">
                EARTH AIR
              </p>
              <CardTitle className="mt-1 text-4xl font-medium">21%</CardTitle>
            </CardHeader>
            <CardContent className="pt-3 text-sm text-muted-foreground">
              O2 at 14.7 psi
            </CardContent>
          </Card>
          <Card className="hairline border-primary/30 bg-primary/[0.04]">
            <CardHeader className="border-b border-primary/20">
              <p className="font-mono text-[9px] tracking-[0.18em] text-primary">
                MOON BASE / ROVER
              </p>
              <CardTitle className="mt-1 text-4xl font-medium">30%+</CardTitle>
            </CardHeader>
            <CardContent className="pt-3 text-sm text-muted-foreground">
              O2 at 10.2 psi or less
            </CardContent>
          </Card>
        </div>
        <Alert className="border-primary/25 bg-primary/[0.04]">
          <Flame className="text-primary" />
          <AlertDescription>
            More than 40% more oxygen than Earth air. Materials become much more
            flammable.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (visual === "problem") {
    return (
      <Card className="hairline">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between gap-2">
            <span className="flex size-8 items-center justify-center border border-primary/30 bg-primary/10 text-primary">
              <Database className="size-4" />
            </span>
            <Badge variant="outline" className="font-mono text-[9px]">
              NASA PSI
            </Badge>
          </div>
          <CardTitle className="mt-3 text-xl">
            Public data, hard answers
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 pt-4">
          {problemSteps.map((step, stepIndex) => (
            <div
              key={step.label}
              className="flex gap-3 border-b border-border/50 pb-3 last:border-b-0 last:pb-0"
            >
              <span className="font-mono text-[10px] text-primary">
                0{stepIndex + 1}
              </span>
              <div>
                <p className="text-sm font-medium">{step.label}</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
                  {step.detail}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  if (visual === "solution") {
    return (
      <div className="grid gap-3">
        {solutionCards.map((card) => {
          const Icon = card.icon
          return (
            <Card key={card.title} className="hairline">
              <CardContent className="flex items-start gap-3 pt-4">
                <span className="flex size-8 shrink-0 items-center justify-center border border-primary/30 bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-medium">{card.title}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                    {card.body}
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    )
  }

  if (visual === "demo-rank") {
    return (
      <Card className="hairline">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between gap-2">
            <Badge variant="outline" className="font-mono text-[9px]">
              SCENARIO
            </Badge>
            <Badge variant="secondary" className="font-mono text-[9px]">
              ILLUSTRATIVE RANKING
            </Badge>
          </div>
          <CardTitle className="mt-2 text-lg">
            Lunar base · 30% O2 · solid fuel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 pt-3">
          {rankDemo.map((item) => (
            <div key={item.id} className="border border-border/70 p-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium">{item.id}</span>
                <Badge
                  variant="outline"
                  className="h-4 border-primary/30 px-1.5 text-[9px] text-primary"
                >
                  TOP MATCH
                </Badge>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                {item.justification}
              </p>
            </div>
          ))}
          <p className="border-t pt-2 text-[10px] leading-relaxed text-muted-foreground">
            Then open FLEX for the streamed CO2/helium summary, or compare three
            records side by side.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" render={<Link to="/investigations" />}>
              Open live demo
              <ArrowUpRight data-icon="inline-end" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              render={<Link to="/investigations/$id" params={{ id: "flex" }} />}
            >
              FLEX summary
            </Button>
            <Button
              size="sm"
              variant="outline"
              render={
                <Link to="/compare" search={{ ids: "flex,bass,saffire-i" }} />
              }
            >
              Compare
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (visual === "demo-explore") {
    return (
      <Card className="hairline">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between gap-2">
            <Badge variant="outline" className="font-mono text-[9px]">
              FLEX / AI SUMMARY
            </Badge>
            <Badge variant="secondary" className="font-mono text-[9px]">
              STREAMING
            </Badge>
          </div>
          <CardTitle className="mt-2 text-lg">
            CO2 and helium suppression
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3">
          <p className="text-sm leading-relaxed text-muted-foreground">
            FLEX tested carbon dioxide and helium as inert-gas suppressants for
            methanol and heptane droplets in microgravity.
          </p>
          <div className="mt-3 border-l-2 border-primary pl-3">
            <MarkdownView>{`**Example summary:** FLEX mapped the no-flame limit and measured how **burning rate**, radiation and soot respond to oxygen, pressure and suppressant.`}</MarkdownView>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              size="sm"
              render={<Link to="/investigations/$id" params={{ id: "flex" }} />}
            >
              Open live demo
              <ArrowUpRight data-icon="inline-end" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              render={
                <Link to="/compare" search={{ ids: "flex,bass,saffire-i" }} />
              }
            >
              Open compare
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (visual === "stack") {
    return (
      <div className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          {stackCards.map((card) => {
            const Icon = card.icon
            return (
              <Card key={card.title} className="hairline">
                <CardContent className="flex items-start gap-2.5 pt-4">
                  <Icon className="mt-0.5 size-4 shrink-0 text-primary" />
                  <div>
                    <p className="text-[12px] font-medium">{card.title}</p>
                    <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">
                      {card.body}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
        <Alert className="border-emerald-500/25 bg-emerald-500/[0.04]">
          <ShieldCheck className="text-emerald-500" />
          <AlertDescription>
            Invented IDs rejected. AI text labeled. Numbers come from source
            records.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (visual === "roadmap") {
    return (
      <div className="space-y-3">
        <DataGapAlert compact />
        <div className="grid gap-3 sm:grid-cols-2">
          <Card className="hairline">
            <CardHeader className="border-b">
              <Badge variant="outline" className="w-fit font-mono text-[9px]">
                OUT OF SCOPE
              </Badge>
              <CardTitle className="mt-2 flex items-center gap-2 text-base">
                <Rocket className="size-4 text-muted-foreground" />
                Rocket fire
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-3 text-[11px] leading-relaxed text-muted-foreground">
              At rocket velocities, combustion is effectively
              gravity-independent. Infernity stays focused on habitats.
            </CardContent>
          </Card>
          <Card className="hairline">
            <CardHeader className="border-b">
              <Badge variant="outline" className="w-fit font-mono text-[9px]">
                NEXT
              </Badge>
              <CardTitle className="mt-2 flex items-center gap-2 text-base">
                <Orbit className="size-4 text-primary" />
                Live PSI + LUCI / FM2
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-3 text-[11px] leading-relaxed text-muted-foreground">
              Ingest live PSI data, add the coming partial-gravity experiments,
              and extend the Earth spinoff view.
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (visual === "closing") {
    return (
      <Card className="hairline">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl">Thank you</CardTitle>
          <p className="text-sm text-muted-foreground">Team {pitchTeam.name}</p>
        </CardHeader>
        <CardContent className="pt-3">
          <div className="grid gap-1.5 text-sm">
            {pitchTeam.members.map((member) => (
              <p key={member.name}>
                <span className="font-medium">{member.name}</span>
                <span className="text-muted-foreground"> — {member.role}</span>
              </p>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="sm" render={<a href={`mailto:${SUPPORT_EMAIL}`} />}>
              <Mail data-icon="inline-start" />
              Email the team
            </Button>
            <Button
              size="sm"
              variant="outline"
              render={<Link to="/investigations" />}
            >
              Open live demo
              <ArrowUpRight data-icon="inline-end" />
            </Button>
          </div>
          <p className="mt-3 font-mono text-[10px] text-muted-foreground">
            {SUPPORT_EMAIL}
          </p>
        </CardContent>
      </Card>
    )
  }

  return null
}

async function toggleFullscreen() {
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen()
    } else {
      await document.documentElement.requestFullscreen()
    }
  } catch {
    return
  }
}

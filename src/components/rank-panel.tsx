import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { Sparkles, TriangleAlert } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Environment, Investigation, Pillar } from "@/data/investigations"
import {
  PILLARS,
  environmentLabel,
  pillarDot,
  pillarLabel,
  pillarTone,
} from "@/lib/display"
import { cn } from "@/lib/utils"
import { rankInvestigations, type RankedItem } from "@/server/functions"
import { loadAiConfig, requestAiSettings } from "@/lib/ai-settings"

const rankingEnvironments: Environment[] = [
  "spacecraft",
  "space_station",
  "lunar_base",
  "mars_base",
  "pressurized_rover",
  "spacesuit",
]

export function RankPanel({ items }: { items: Investigation[] }) {
  const [environment, setEnvironment] = useState<Environment>("lunar_base")
  const [oxygen, setOxygen] = useState("30")
  const [pressure, setPressure] = useState(10.2)
  const [priorities, setPriorities] = useState<Pillar[]>([
    "prevention",
    "suppression",
  ])
  const [loading, setLoading] = useState(false)
  const [ranked, setRanked] = useState<RankedItem[] | null>(null)
  const [failed, setFailed] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const titles = new Map(items.map((item) => [item.id, item.title]))

  function togglePriority(pillar: Pillar) {
    setPriorities((current) =>
      current.includes(pillar)
        ? current.filter((item) => item !== pillar)
        : [...current, pillar]
    )
  }

  async function submit() {
    const oxygenValue = Number(oxygen)
    if (!Number.isFinite(oxygenValue) || oxygenValue < 0 || oxygenValue > 100) {
      setError("Enter an oxygen concentration between 0 and 100 percent.")
      return
    }

    const ai = loadAiConfig()
    if (!ai) {
      setError(
        "Add your OpenAI-compatible endpoint and API key before ranking. They are saved only in this browser."
      )
      requestAiSettings()
      return
    }

    setLoading(true)
    setError(null)
    setFailed(false)
    setRanked(null)

    try {
      const result = await rankInvestigations({
        data: {
          scenario: {
            environment,
            oxygenPct: oxygenValue,
            pressurePsi: pressure,
            fuelPhase: "any",
            priorities,
          },
          ai,
        },
      })
      setRanked(result.ranked)
      setFailed(result.failed || result.ranked.length === 0)
    } catch {
      setError(
        "The ranking request failed. Check your endpoint and key, then try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="hairline overflow-hidden">
      <CardHeader className="border-b bg-muted/30">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="size-3.5 text-primary" />
            Rank for a scenario
          </CardTitle>
          <Badge
            variant="outline"
            className="gap-1 border-primary/30 bg-primary/5 text-[9px] tracking-wider text-primary"
          >
            <Sparkles className="size-2.5" />
            AI-GENERATED
          </Badge>
        </div>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Describe the habitat you are protecting. The model ranks the whole
          catalog and cites fuel, O2, hardware or findings for each choice.
        </p>
      </CardHeader>

      <CardContent className="grid gap-5 pt-4 lg:grid-cols-[1.05fr_1.6fr]">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 grid gap-1.5">
              <Label
                htmlFor="rank-environment"
                className="text-[10px] tracking-[0.14em] text-muted-foreground"
              >
                ENVIRONMENT
              </Label>
              <Select
                value={environment}
                onValueChange={(value) => setEnvironment(value ?? "spacecraft")}
              >
                <SelectTrigger id="rank-environment" className="w-full">
                  <SelectValue>{environmentLabel[environment]}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {rankingEnvironments.map((item) => (
                    <SelectItem key={item} value={item}>
                      {environmentLabel[item]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-1.5">
              <Label
                htmlFor="rank-oxygen"
                className="text-[10px] tracking-[0.14em] text-muted-foreground"
              >
                O2 CONCENTRATION
              </Label>
              <div className="relative">
                <Input
                  id="rank-oxygen"
                  type="number"
                  min={0}
                  max={100}
                  value={oxygen}
                  onChange={(event) => setOxygen(event.target.value)}
                  className="pr-6 font-mono"
                />
                <span className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-[10px] text-muted-foreground">
                  %
                </span>
              </div>
            </div>

            <div className="grid gap-1.5">
              <span className="flex items-center justify-between text-[10px] tracking-[0.14em] text-muted-foreground">
                PRESSURE
                <span className="font-mono text-foreground">
                  {pressure.toFixed(1)} psi
                </span>
              </span>
              <div className="flex h-8 items-center px-1">
                <Slider
                  value={pressure}
                  min={4.3}
                  max={14.7}
                  step={0.1}
                  onValueChange={(value) =>
                    setPressure(typeof value === "number" ? value : value[0])
                  }
                />
              </div>
            </div>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.14em] text-muted-foreground">
              PRIORITIES
            </p>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {PILLARS.map((pillar) => {
                const id = `priority-${pillar}`
                return (
                  <div key={pillar} className="flex items-center gap-2">
                    <Checkbox
                      id={id}
                      checked={priorities.includes(pillar)}
                      onCheckedChange={() => togglePriority(pillar)}
                    />
                    <Label htmlFor={id} className="gap-2 text-[11px]">
                      <span className={cn("size-1.5", pillarDot[pillar])} />
                      {pillarLabel[pillar]}
                    </Label>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={submit} disabled={loading}>
              <Sparkles data-icon="inline-start" />
              {loading ? "Ranking..." : "Rank investigations"}
            </Button>
            <button
              type="button"
              onClick={requestAiSettings}
              className="text-[10px] text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
            >
              Your AI endpoint
            </button>
          </div>
        </div>

        <div className="min-w-0 border-t pt-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-5">
          {error ? (
            <Alert variant="destructive" className="mb-3">
              <TriangleAlert />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}

          {failed && !loading ? (
            <Alert className="mb-3">
              <TriangleAlert />
              <AlertDescription>
                The model could not produce a ranking. Try again.
              </AlertDescription>
            </Alert>
          ) : null}

          {loading ? (
            <div className="flex flex-col gap-2">
              {[0, 1, 2].map((row) => (
                <div key={row} className="flex items-center gap-3">
                  <Skeleton className="h-4 w-6" />
                  <Skeleton className="h-4 flex-1" />
                  <Skeleton className="h-4 w-12" />
                </div>
              ))}
              <p className="mt-2 text-[10px] text-muted-foreground">
                Reading the catalog and scoring relevance...
              </p>
            </div>
          ) : null}

          {!loading && ranked && ranked.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-8">#</TableHead>
                  <TableHead>Investigation</TableHead>
                  <TableHead className="w-24">Score</TableHead>
                  <TableHead className="min-w-[220px]">Justification</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ranked.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      <Link
                        to="/investigations/$id"
                        params={{ id: item.id }}
                        className="font-medium hover:text-primary"
                      >
                        {titles.get(item.id) ?? item.id}
                      </Link>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {item.pillars.map((pillar) => (
                          <Badge
                            key={pillar}
                            variant="outline"
                            className={cn(
                              "h-4 px-1.5 text-[9px]",
                              pillarTone[pillar]
                            )}
                          >
                            {pillarLabel[pillar]}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="w-6 font-mono tabular-nums">
                          {item.score}
                        </span>
                        <div className="h-1 w-12 bg-muted">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${item.score}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[340px] text-[11px] leading-relaxed whitespace-normal text-muted-foreground">
                      {item.justification}
                      {item.assumptions.length > 0 ? (
                        <span className="mt-1 block text-[10px] text-muted-foreground/80">
                          Assumes: {item.assumptions.join("; ")}
                        </span>
                      ) : null}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : null}

          {!loading && !ranked && !failed && !error ? (
            <div className="flex h-full min-h-40 flex-col items-center justify-center gap-2 border border-dashed p-6 text-center">
              <Sparkles className="size-5 text-muted-foreground/60" />
              <p className="text-[11px] text-muted-foreground">
                Submit a scenario to get a ranked shortlist.
              </p>
              <p className="max-w-xs text-[10px] text-muted-foreground/80">
                Try a lunar base at 30% O2 with solid-fuel prevention and
                suppression priorities.
              </p>
            </div>
          ) : null}

          {!loading && ranked && ranked.length > 0 ? (
            <p className="mt-3 text-[9px] leading-relaxed text-muted-foreground">
              Scores and justifications are AI-generated. Numeric conditions
              come from the curated record; verify against the source before
              engineering use.
            </p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}

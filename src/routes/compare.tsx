import { useEffect, useMemo, useState } from "react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { Layers, TriangleAlert, X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PillarBadges } from "@/components/pillar-badges"
import { getHardwareGroup, type Investigation } from "@/data/investigations"
import {
  environmentLabel,
  fuelPhaseLabel,
  groupLabel,
  initials,
} from "@/lib/display"
import { compareInvestigations, listInvestigations } from "@/server/functions"

export const Route = createFileRoute("/compare")({
  validateSearch: (search: Record<string, unknown>): { ids?: string } => ({
    ids: typeof search.ids === "string" ? search.ids : undefined,
  }),
  loader: () => listInvestigations({ data: {} }),
  component: ComparePage,
})

const quickSets = [
  { label: "Solid-fuel protection", ids: ["bass-ii", "saffire-i", "flex"] },
  { label: "Detection stack", ids: ["same", "same-r", "daft"] },
  { label: "Gas-phase fundamentals", ids: ["acme", "spice", "slice"] },
]

function parseIds(ids: string | undefined, items: Investigation[]) {
  return (ids ?? "")
    .split(",")
    .filter((id) => items.some((item) => item.id === id))
    .slice(0, 3)
}

function pickRecords(ids: string[], items: Investigation[]) {
  return ids
    .map((id) => items.find((item) => item.id === id))
    .filter((item): item is Investigation => Boolean(item))
}

function ComparePage() {
  const items = Route.useLoaderData()
  const { ids } = Route.useSearch()
  const initialSelection = parseIds(ids, items)
  const [selected, setSelected] = useState<string[]>(initialSelection)
  const [compared, setCompared] = useState<Investigation[]>(() =>
    pickRecords(initialSelection, items)
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setSelected(parseIds(ids, items))
  }, [ids, items])

  useEffect(() => {
    let cancelled = false
    if (selected.length === 0) {
      setCompared([])
      return
    }

    setCompared(pickRecords(selected, items))
    setLoading(true)
    setError(null)

    compareInvestigations({ data: selected })
      .then((result) => {
        if (!cancelled) setCompared(result)
      })
      .catch(() => {
        if (!cancelled) {
          setError("Comparison failed. Please try again.")
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [selected, items])

  const selectedSet = useMemo(() => new Set(selected), [selected])

  function toggle(id: string) {
    setSelected((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id)
      if (current.length >= 3) return current
      return [...current, id]
    })
  }

  const rows: {
    label: string
    render: (item: Investigation) => React.ReactNode
  }[] = [
    {
      label: "Hardware group",
      render: (item) => groupLabel(getHardwareGroup(item.id)),
    },
    {
      label: "Pillars",
      render: (item) => <PillarBadges pillars={item.pillars} />,
    },
    {
      label: "Fuel phase",
      render: (item) => fuelPhaseLabel[item.fuel.phase],
    },
    {
      label: "Material",
      render: (item) => item.fuel.material ?? "Not specified",
    },
    { label: "Shape", render: (item) => item.fuel.shape ?? "Not specified" },
    { label: "Size", render: (item) => item.fuel.sizeMm ?? "Not specified" },
    {
      label: "O2 concentration",
      render: (item) =>
        item.conditions.oxygenPct === undefined
          ? "Varied / not specified"
          : `${item.conditions.oxygenPct}%`,
    },
    {
      label: "Pressure",
      render: (item) =>
        item.conditions.pressurePsi === undefined
          ? "Varied / not specified"
          : `${item.conditions.pressurePsi} psi`,
    },
    {
      label: "Airflow",
      render: (item) =>
        item.conditions.airflowCmS === undefined
          ? "Varied / not specified"
          : `${item.conditions.airflowCmS} cm/s`,
    },
    {
      label: "Facility",
      render: (item) => item.hardware.facility ?? "Not specified",
    },
    {
      label: "Module / vehicle",
      render: (item) => item.hardware.module ?? "Not specified",
    },
    {
      label: "Sensors",
      render: (item) => (
        <ul className="flex flex-col gap-1">
          {item.sensors.map((sensor) => (
            <li key={sensor}>{sensor}</li>
          ))}
        </ul>
      ),
    },
    {
      label: "Variables tested",
      render: (item) => (
        <ul className="flex flex-col gap-1">
          {item.variablesTested.map((variable) => (
            <li key={variable}>{variable}</li>
          ))}
        </ul>
      ),
    },
    {
      label: "Objectives",
      render: (item) => item.objectives,
    },
    {
      label: "Key findings",
      render: (item) => (
        <ul className="flex flex-col gap-1.5">
          {item.keyFindings.map((finding) => (
            <li key={finding} className="flex gap-1.5">
              <span className="mt-1.5 size-1 shrink-0 bg-primary" />
              {finding}
            </li>
          ))}
        </ul>
      ),
    },
    {
      label: "Relevant environments",
      render: (item) => (
        <div className="flex flex-wrap gap-1">
          {item.fireSafetyRelevance.environments.map((environment) => (
            <Badge
              key={environment}
              variant="outline"
              className="text-[9px] font-normal"
            >
              {environmentLabel[environment]}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      label: "Source",
      render: (item) => (
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 hover:text-primary"
        >
          NASA PSI
        </a>
      ),
    },
  ]

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <p className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-primary">
        <span className="h-px w-8 bg-primary" />
        SIDE-BY-SIDE
      </p>
      <h1 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
        Compare investigations
      </h1>
      <p className="mt-2 max-w-2xl text-[12px] leading-relaxed text-muted-foreground">
        Put up to three records side by side: fuel, conditions, hardware,
        sensors, variables and findings. Unknown fields are shown honestly, not
        filled in.
      </p>

      <div className="mt-6 grid gap-5 lg:grid-cols-[290px_1fr]">
        <Card className="hairline h-fit lg:sticky lg:top-20">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Layers className="size-3.5 text-primary" />
                Select records
              </CardTitle>
              <Badge variant="secondary" className="font-mono text-[10px]">
                {selected.length}/3
              </Badge>
            </div>
            <p className="text-[10px] text-muted-foreground">
              Choose up to three. Selection order becomes column order.
            </p>
          </CardHeader>
          <CardContent className="pt-3">
            <div className="flex flex-wrap gap-1">
              {quickSets.map((set) => (
                <Button
                  key={set.label}
                  variant="outline"
                  size="xs"
                  onClick={() => setSelected(set.ids)}
                  className="text-[9px] font-normal"
                >
                  {set.label}
                </Button>
              ))}
            </div>

            <div className="mt-4 flex max-h-[24rem] flex-col gap-2 overflow-y-auto pr-1">
              {items.map((item) => {
                const id = `compare-${item.id}`
                const disabled =
                  selected.length >= 3 && !selectedSet.has(item.id)
                return (
                  <div
                    key={item.id}
                    className="flex items-start gap-2 border-b border-border/40 pb-2 last:border-b-0"
                  >
                    <Checkbox
                      id={id}
                      checked={selectedSet.has(item.id)}
                      disabled={disabled}
                      onCheckedChange={() => toggle(item.id)}
                      className="mt-0.5"
                    />
                    <Label
                      htmlFor={id}
                      className="flex-1 flex-col items-start gap-0.5 text-[10px] leading-snug"
                    >
                      <span className="font-mono text-[9px] text-muted-foreground">
                        {initials(item.title)}
                      </span>
                      <span className={disabled ? "opacity-50" : ""}>
                        {item.title}
                      </span>
                    </Label>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <div className="min-w-0">
          {error ? (
            <Alert variant="destructive" className="mb-3">
              <TriangleAlert />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}

          {selected.length === 0 ? (
            <div className="flex min-h-72 flex-col items-center justify-center gap-2 border border-dashed p-8 text-center">
              <Layers className="size-5 text-muted-foreground/60" />
              <p className="text-sm font-medium">No records selected.</p>
              <p className="max-w-sm text-[11px] text-muted-foreground">
                Pick a quick set or choose records from the list. The table
                updates as soon as the selection changes.
              </p>
            </div>
          ) : loading && compared.length === 0 ? (
            <div className="flex flex-col gap-2 border p-4">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : (
            <div className="border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-40 min-w-40 bg-muted/30">
                      Attribute
                    </TableHead>
                    {compared.map((item) => (
                      <TableHead
                        key={item.id}
                        className="min-w-[240px] align-top whitespace-normal"
                      >
                        <div className="flex items-start justify-between gap-2 py-1">
                          <div>
                            <span className="font-mono text-[9px] text-muted-foreground">
                              {initials(item.title)}
                            </span>
                            <Link
                              to="/investigations/$id"
                              params={{ id: item.id }}
                              className="mt-1 block text-[11px] leading-snug font-medium hover:text-primary"
                            >
                              {item.title}
                            </Link>
                          </div>
                          <button
                            type="button"
                            onClick={() => toggle(item.id)}
                            aria-label={`Remove ${item.title}`}
                            className="mt-0.5 text-muted-foreground hover:text-foreground"
                          >
                            <X className="size-3.5" />
                          </button>
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.label}>
                      <TableCell className="bg-muted/20 align-top text-[10px] tracking-wide text-muted-foreground">
                        {row.label}
                      </TableCell>
                      {compared.map((item) => (
                        <TableCell
                          key={item.id}
                          className="align-top text-[11px] leading-relaxed whitespace-normal text-muted-foreground"
                        >
                          {row.render(item)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

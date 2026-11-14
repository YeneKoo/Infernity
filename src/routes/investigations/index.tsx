import { useMemo, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { ListFilter, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { FilterControls, FilterPanel } from "@/components/filter-controls"
import { InvestigationCard } from "@/components/investigation-card"
import { RankPanel } from "@/components/rank-panel"
import {
  defaultFilters,
  filterCatalog,
  type CatalogFilters,
} from "@/lib/filters"
import { countByPillar, fuelPhaseLabel, pillarLabel } from "@/lib/display"
import { listInvestigations } from "@/server/functions"

export const Route = createFileRoute("/investigations/")({
  loader: () => listInvestigations({ data: {} }),
  component: InvestigationsPage,
})

function InvestigationsPage() {
  const items = Route.useLoaderData()
  const [filters, setFilters] = useState<CatalogFilters>(defaultFilters)
  const [mobileOpen, setMobileOpen] = useState(false)

  const filtered = useMemo(
    () => filterCatalog(items, filters),
    [items, filters]
  )
  const oxygenActive = filters.oxygen[0] > 0 || filters.oxygen[1] < 100

  function patch(update: Partial<CatalogFilters>) {
    setFilters((current) => ({ ...current, ...update }))
  }

  const chips: { key: string; label: string; clear: () => void }[] = [
    ...filters.pillars.map((pillar) => ({
      key: `pillar-${pillar}`,
      label: pillarLabel[pillar],
      clear: () =>
        patch({
          pillars: filters.pillars.filter((item) => item !== pillar),
        }),
    })),
  ]

  if (filters.fuelPhase !== "all") {
    chips.push({
      key: "fuel",
      label: fuelPhaseLabel[filters.fuelPhase as keyof typeof fuelPhaseLabel],
      clear: () => patch({ fuelPhase: "all" }),
    })
  }
  if (filters.group !== "all") {
    chips.push({
      key: "group",
      label: `${filters.group} group`,
      clear: () => patch({ group: "all" }),
    })
  }
  if (filters.hardware !== "all") {
    chips.push({
      key: "hardware",
      label: filters.hardware,
      clear: () => patch({ hardware: "all" }),
    })
  }
  if (oxygenActive) {
    chips.push({
      key: "oxygen",
      label: `O2 ${filters.oxygen[0]}-${filters.oxygen[1]}%`,
      clear: () => patch({ oxygen: [0, 100] }),
    })
  }
  if (filters.query.trim()) {
    chips.push({
      key: "query",
      label: `"${filters.query.trim()}"`,
      clear: () => patch({ query: "" }),
    })
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-primary">
            <span className="h-px w-8 bg-primary" />
            EXPERIMENT CATALOG
          </p>
          <h1 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
            Investigations, indexed for fire safety
          </h1>
          <p className="mt-2 max-w-2xl text-[12px] leading-relaxed text-muted-foreground">
            Filter by pillar, fuel phase, hardware group, facility and oxygen
            range. Filters are instant and client-side. Ranking uses the full
            catalog and your saved AI endpoint.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] text-muted-foreground">
          <span>
            <span className="text-foreground">{items.length}</span> records
          </span>
          <span>
            <span className="text-foreground">
              {countByPillar(items, "prevention")}
            </span>{" "}
            prevention
          </span>
          <span>
            <span className="text-foreground">
              {countByPillar(items, "detection")}
            </span>{" "}
            detection
          </span>
          <span>
            <span className="text-foreground">
              {countByPillar(items, "suppression")}
            </span>{" "}
            suppression
          </span>
        </div>
      </div>

      <div id="rank" className="mt-6 scroll-mt-20">
        <RankPanel items={items} />
      </div>

      <div className="mt-8 flex items-center justify-between gap-3 lg:hidden">
        <p className="text-[11px] text-muted-foreground">
          {filtered.length} matching investigations
        </p>
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger render={<Button variant="outline" size="sm" />}>
            <ListFilter data-icon="inline-start" />
            Filters
          </SheetTrigger>
          <SheetContent side="right" className="w-[88vw] max-w-sm">
            <SheetHeader>
              <SheetTitle>Filter catalog</SheetTitle>
              <SheetDescription>
                Narrow the catalog by pillar, fuel, hardware and O2.
              </SheetDescription>
            </SheetHeader>
            <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-6">
              <FilterControls
                filters={filters}
                onChange={setFilters}
                resultCount={filtered.length}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="mt-4 grid gap-5 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-20 max-h-[calc(100svh-6rem)] overflow-y-auto pr-1">
            <FilterPanel
              filters={filters}
              onChange={setFilters}
              resultCount={filtered.length}
            />
          </div>
        </aside>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] tracking-[0.14em] text-muted-foreground">
                ACTIVE FILTERS
              </span>
              {chips.length === 0 ? (
                <span className="text-[10px] text-muted-foreground/70">
                  none
                </span>
              ) : (
                chips.map((chip) => (
                  <Badge
                    key={chip.key}
                    variant="outline"
                    className="gap-1 pr-1 text-[10px] font-normal"
                  >
                    {chip.label}
                    <button
                      type="button"
                      onClick={chip.clear}
                      aria-label={`Remove ${chip.label} filter`}
                      className="flex size-4 items-center justify-center text-muted-foreground hover:text-foreground"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                ))
              )}
            </div>
            <p className="font-mono text-[10px] text-muted-foreground">
              {filtered.length} / {items.length} shown
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="mt-4 flex min-h-64 flex-col items-center justify-center gap-2 border border-dashed p-8 text-center">
              <p className="text-sm font-medium">No investigations match.</p>
              <p className="max-w-sm text-[11px] text-muted-foreground">
                Try widening the O2 range or clearing a pillar filter. Records
                without a documented O2 value are hidden when the range is
                narrowed.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => setFilters({ ...defaultFilters })}
              >
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((item) => (
                <InvestigationCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

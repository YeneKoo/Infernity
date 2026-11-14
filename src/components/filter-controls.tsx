import { Search, SlidersHorizontal, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { FUEL_PHASES, PILLARS, fuelPhaseLabel, pillarLabel, pillarDot } from "@/lib/display"
import { defaultFilters, type CatalogFilters } from "@/lib/filters"

interface FilterControlsProps {
  filters: CatalogFilters
  onChange: (filters: CatalogFilters) => void
  resultCount: number
}

export function FilterControls({
  filters,
  onChange,
  resultCount,
}: FilterControlsProps) {
  function patch(update: Partial<CatalogFilters>) {
    onChange({ ...filters, ...update })
  }

  function togglePillar(pillar: (typeof PILLARS)[number]) {
    patch({
      pillars: filters.pillars.includes(pillar)
        ? filters.pillars.filter((item) => item !== pillar)
        : [...filters.pillars, pillar],
    })
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={filters.query}
          onChange={(event) => patch({ query: event.target.value })}
          placeholder="Search fuels, sensors, findings..."
          className="h-8 pl-8"
          aria-label="Search investigations"
        />
      </div>

      <div>
        <p className="text-[10px] tracking-[0.16em] text-muted-foreground">
          FIRE-SAFETY PILLAR
        </p>
        <div
          role="group"
          aria-label="Fire-safety pillars"
          className="mt-2 flex flex-col gap-2"
        >
          {PILLARS.map((pillar) => {
            const id = `pillar-${pillar}`
            return (
              <div key={pillar} className="flex items-center gap-2">
                <Checkbox
                  id={id}
                  checked={filters.pillars.includes(pillar)}
                  onCheckedChange={() => togglePillar(pillar)}
                />
                <Label htmlFor={id} className="flex-1 gap-2 text-[11px]">
                  <span className={`size-1.5 ${pillarDot[pillar]}`} />
                  {pillarLabel[pillar]}
                </Label>
              </div>
            )
          })}
        </div>
      </div>

      <Separator />

      <div className="grid gap-2">
        <p className="text-[10px] tracking-[0.16em] text-muted-foreground">
          FUEL PHASE
        </p>
        <Select
          value={filters.fuelPhase}
          onValueChange={(value) => patch({ fuelPhase: value ?? "all" })}
        >
          <SelectTrigger className="w-full">
            <SelectValue>
              {filters.fuelPhase === "all"
                ? "All phases"
                : fuelPhaseLabel[
                    filters.fuelPhase as (typeof FUEL_PHASES)[number]
                  ]}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All phases</SelectItem>
            {FUEL_PHASES.map((phase) => (
              <SelectItem key={phase} value={phase}>
                {fuelPhaseLabel[phase]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <p className="text-[10px] tracking-[0.16em] text-muted-foreground">
          HARDWARE GROUP
        </p>
        <Select
          value={filters.group}
          onValueChange={(value) => patch({ group: value ?? "all" })}
        >
          <SelectTrigger className="w-full">
            <SelectValue>
              {filters.group === "all" ? "All groups" : filters.group}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All groups</SelectItem>
            <SelectItem value="ACME">ACME group</SelectItem>
            <SelectItem value="MDCA">MDCA group</SelectItem>
            <SelectItem value="SPICE">SPICE duct group</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <p className="text-[10px] tracking-[0.16em] text-muted-foreground">
          FACILITY
        </p>
        <Select
          value={filters.hardware}
          onValueChange={(value) => patch({ hardware: value ?? "all" })}
        >
          <SelectTrigger className="w-full">
            <SelectValue>
              {filters.hardware === "all"
                ? "All facilities"
                : filters.hardware === "Handheld"
                  ? "Hand-held"
                  : filters.hardware}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All facilities</SelectItem>
            <SelectItem value="CIR">Combustion Integrated Rack</SelectItem>
            <SelectItem value="MSG">Microgravity Science Glovebox</SelectItem>
            <SelectItem value="Cygnus">Cygnus free-flyer</SelectItem>
            <SelectItem value="Handheld">Hand-held</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div>
        <div className="flex items-center justify-between">
          <p className="text-[10px] tracking-[0.16em] text-muted-foreground">
            O2 RANGE
          </p>
          <button
            type="button"
            onClick={() => patch({ oxygen: [0, 100] })}
            className="text-[10px] text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
          >
            Reset
          </button>
        </div>
        <div className="mt-3 px-1">
          <Slider
            value={filters.oxygen}
            min={0}
            max={100}
            step={5}
            minStepsBetweenValues={1}
            onValueChange={(value) =>
              patch({ oxygen: value as [number, number] })
            }
          />
        </div>
        <div className="mt-2 flex items-center justify-between font-mono text-[10px] tabular-nums text-muted-foreground">
          <span>{filters.oxygen[0]}%</span>
          <span>{filters.oxygen[1]}%</span>
        </div>
        <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
          Narrowing this range hides records without a documented O2 value.
        </p>
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <Badge variant="secondary" className="font-mono text-[10px]">
          {resultCount} results
        </Badge>
        <Button
          variant="ghost"
          size="xs"
          onClick={() => onChange({ ...defaultFilters })}
        >
          <X data-icon="inline-start" />
          Clear all
        </Button>
      </div>
    </div>
  )
}

export function FilterPanel({
  filters,
  onChange,
  resultCount,
}: FilterControlsProps) {
  return (
    <div className="border bg-card p-4">
      <div className="mb-4 flex items-center gap-2 border-b pb-3">
        <SlidersHorizontal className="size-3.5 text-primary" />
        <p className="text-[11px] font-medium tracking-[0.14em]">
          FILTER CATALOG
        </p>
      </div>
      <FilterControls
        filters={filters}
        onChange={onChange}
        resultCount={resultCount}
      />
    </div>
  )
}

import { Link } from "@tanstack/react-router"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Investigation } from "@/data/investigations"

const references = [
  { value: 21, label: "Earth air", tone: "bg-muted-foreground/40" },
  { value: 30, label: "Lunar base floor", tone: "bg-sky-500/70" },
  { value: 85, label: "CFI-G max", tone: "bg-primary" },
]

const grid = [0, 20, 40, 60, 80, 100]

export function O2Chart({
  items,
  compact = false,
}: {
  items: Investigation[]
  compact?: boolean
}) {
  const plotted = items
    .filter((item) => item.conditions.oxygenPct !== undefined)
    .sort(
      (a, b) => (b.conditions.oxygenPct ?? 0) - (a.conditions.oxygenPct ?? 0)
    )
  const unplotted = items.filter(
    (item) => item.conditions.oxygenPct === undefined
  )
  const max = Math.max(...plotted.map((item) => item.conditions.oxygenPct ?? 0))

  return (
    <Card className="hairline">
      <CardHeader className="border-b">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle>Oxygen concentration across the catalog</CardTitle>
            <p className="mt-1 max-w-2xl text-[11px] leading-relaxed text-muted-foreground">
              {compact
                ? "Highest documented test O2 concentration for each investigation."
                : "Each marker is the highest documented test O2 concentration for that investigation. Reference lines mark Earth air, the likely lunar-base floor, and the CFI-G maximum."}
            </p>
          </div>
          <Badge variant="outline" className="font-mono text-[10px]">
            21% to {max}% documented
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="mb-4 flex flex-wrap gap-x-4 gap-y-2">
          {references.map((reference) => (
            <span
              key={reference.value}
              className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground"
            >
              <span className={`h-px w-4 ${reference.tone}`} />
              {reference.value}% {reference.label}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-[6.5rem_1fr_2.75rem] gap-x-3 text-[9px] text-muted-foreground sm:grid-cols-[9rem_1fr_2.75rem]">
          <span />
          <div className="relative mb-1 h-4 border-b">
            {grid.map((value) => (
              <span
                key={value}
                className="absolute -translate-x-1/2 font-mono"
                style={{ left: `${value}%` }}
              >
                {value}
              </span>
            ))}
            {references.map((reference) => (
              <span
                key={reference.value}
                className="absolute -top-4 hidden -translate-x-1/2 font-mono text-foreground sm:inline-block"
                style={{ left: `${reference.value}%` }}
              >
                {reference.value}%
              </span>
            ))}
          </div>
          <span className="text-right">O2</span>
        </div>

        <div className="flex flex-col">
          {plotted.map((item) => {
            const value = item.conditions.oxygenPct ?? 0
            return (
              <div
                key={item.id}
                className="grid grid-cols-[6.5rem_1fr_2.75rem] items-center gap-x-3 border-b border-border/40 py-1.5 last:border-b-0 sm:grid-cols-[9rem_1fr_2.75rem]"
              >
                <Link
                  to="/investigations/$id"
                  params={{ id: item.id }}
                  title={item.title}
                  className="truncate text-[10px] text-muted-foreground hover:text-foreground"
                >
                  {item.title}
                </Link>
                <div className="relative h-4">
                  <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
                  {grid.map((tick) => (
                    <span
                      key={tick}
                      className="absolute top-1/2 h-1.5 w-px -translate-y-1/2 bg-border"
                      style={{ left: `${tick}%` }}
                    />
                  ))}
                  {references.map((reference) => (
                    <span
                      key={reference.value}
                      className={`absolute top-1/2 h-2.5 w-px -translate-y-1/2 ${reference.tone}`}
                      style={{ left: `${reference.value}%` }}
                    />
                  ))}
                  <div
                    className="absolute top-1/2 h-[3px] -translate-y-1/2 bg-gradient-to-r from-primary/15 to-primary/70"
                    style={{ width: `${value}%` }}
                  />
                  <span
                    className="absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary ring-2 ring-card"
                    style={{ left: `${value}%` }}
                  />
                </div>
                <span className="text-right font-mono text-[10px] text-foreground tabular-nums">
                  {value}%
                </span>
              </div>
            )
          })}
        </div>

        {!compact && unplotted.length > 0 ? (
          <div className="mt-4 border-t pt-3">
            <p className="text-[10px] text-muted-foreground">
              Varied oxygen or not specified in the curated record:
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
              {unplotted.map((item) => (
                <Badge
                  key={item.id}
                  variant="outline"
                  className="text-[9px] font-normal text-muted-foreground"
                  render={
                    <Link to="/investigations/$id" params={{ id: item.id }} />
                  }
                >
                  {item.title.replace(/\s*\(.*\)$/, "")}
                </Badge>
              ))}
            </div>
          </div>
        ) : null}

        {compact ? null : (
          <p className="mt-4 text-[9px] leading-relaxed text-muted-foreground">
            The single value is a documented test condition, not a measured
            flammability limit. Many investigations varied O2 across a range;
            see each record's variables tested.
          </p>
        )}
      </CardContent>
    </Card>
  )
}

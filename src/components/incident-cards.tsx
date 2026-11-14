import { ArrowUpRight } from "lucide-react"
import { incidents } from "@/data/incidents"

export function IncidentCards() {
  return (
    <>
      {incidents.map((incident) => (
        <a
          key={incident.id}
          href={incident.href}
          target="_blank"
          rel="noreferrer"
          className="group flex flex-col border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-card/80"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-widest text-primary">
              {incident.id}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">
              {incident.year}
            </span>
          </div>
          <h3 className="mt-3 text-sm leading-snug font-medium">
            {incident.title}
          </h3>
          <p className="mt-2 flex-1 text-[11px] leading-relaxed text-muted-foreground">
            {incident.body}
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-[10px] text-muted-foreground group-hover:text-primary">
            NASA source
            <ArrowUpRight className="size-3" />
          </span>
        </a>
      ))}
    </>
  )
}

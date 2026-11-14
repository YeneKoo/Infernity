import { Link } from "@tanstack/react-router"
import { ArrowUpRight, Flame, Mail } from "lucide-react"
import { SUPPORT_EMAIL } from "@/data/pitch"

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t bg-muted/30">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em]">
            <Flame className="size-4 text-primary" />
            INFERNITY
          </div>
          <p className="mt-3 max-w-sm text-[11px] leading-relaxed text-muted-foreground">
            A fire-safety dashboard for NASA's microgravity combustion record.
            Built for the 2026 NASA Space Apps Challenge, Space Exploration
            track. Curated data, in-memory only, no database.
          </p>
          <p className="mt-3 max-w-sm text-[10px] leading-relaxed text-muted-foreground">
            NASA does not endorse any non-U.S. Government entity. Follow the
            data-use terms of each linked source.
          </p>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.18em] text-muted-foreground">
            EXPLORE
          </p>
          <div className="mt-3 flex flex-col gap-2 text-[11px]">
            <Link to="/investigations" className="hover:text-primary">
              Investigation catalog
            </Link>
            <Link to="/compare" className="hover:text-primary">
              Compare up to three
            </Link>
            <Link to="/insights" className="hover:text-primary">
              O2 and hardware insights
            </Link>
            <Link to="/pitch" className="hover:text-primary">
              Pitch deck
            </Link>
          </div>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.18em] text-muted-foreground">
            PRIMARY SOURCES
          </p>
          <div className="mt-3 flex flex-col gap-2 text-[11px]">
            <a
              href="https://psi.nasa.gov/physci/repo/search?q=combustion"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-primary"
            >
              NASA PSI data repository
              <ArrowUpRight className="size-3" />
            </a>
            <a
              href="https://www.nasa.gov/glenn/glenn-expertise-space-exploration/physical-sciences-program/combustion-science/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-primary"
            >
              NASA Combustion Science
              <ArrowUpRight className="size-3" />
            </a>
            <a
              href="https://www.nasa.gov/missions/station/a-researchers-guide-to-combustion-science/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-primary"
            >
              Researcher's guide to ISS combustion
              <ArrowUpRight className="size-3" />
            </a>
          </div>

          <p className="mt-4 text-[10px] tracking-[0.18em] text-muted-foreground">
            CONTACT
          </p>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="mt-2 inline-flex items-center gap-1 text-[11px] hover:text-primary"
          >
            <Mail className="size-3" />
            {SUPPORT_EMAIL}
          </a>
        </div>
      </div>
      <div className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-4 text-[10px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>
            Rocket and propellant fire safety is out of scope: at rocket
            velocities, combustion is effectively gravity-independent.
          </span>
          <span>AI output is labeled. Verify against the source record.</span>
        </div>
      </div>
    </footer>
  )
}

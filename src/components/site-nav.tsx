import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { Flame, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { AiSettingsButton } from "@/components/ai-settings"

const links = [
  { to: "/", label: "Overview" },
  { to: "/investigations", label: "Investigations" },
  { to: "/compare", label: "Compare" },
  { to: "/insights", label: "Insights" },
  { to: "/play", label: "Play" },
] as const

export function SiteNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="flex size-7 items-center justify-center border border-primary/40 bg-primary/10 text-primary">
            <Flame className="size-4" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-xs font-semibold tracking-[0.22em]">
              INFERNITY
            </span>
            <span className="mt-1 text-[9px] tracking-[0.16em] text-muted-foreground">
              FLAME IN FREEFALL
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              activeProps={{
                className: "bg-muted text-foreground",
              }}
              className="px-2.5 py-1.5 text-[11px] tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <span className="mr-2 hidden items-center gap-1.5 text-[9px] tracking-[0.14em] text-muted-foreground lg:flex">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
            CATALOG ONLINE
          </span>
          <AiSettingsButton />
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="md:hidden"
                  aria-label="Open navigation"
                />
              }
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>Navigate</SheetTitle>
                <SheetDescription>
                  NASA microgravity combustion, fire-safety lens.
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    activeOptions={{ exact: link.to === "/" }}
                    activeProps={{
                      className:
                        "border-primary/40 bg-primary/10 text-foreground",
                    }}
                    className="border border-transparent px-3 py-2.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto border-t p-4 text-[10px] leading-relaxed text-muted-foreground">
                Curated from public NASA and PSI combustion sources. No
                partial-gravity data exists in PSI yet.
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

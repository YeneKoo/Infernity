import { cn } from "@/lib/utils"

export function FlameOrb({ className }: { className?: string }) {
  return (
    <div
      className={cn("relative aspect-square w-full max-w-[520px]", className)}
      aria-hidden
    >
      <div className="animate-soft-pulse absolute inset-[8%] rounded-full bg-[radial-gradient(circle,oklch(0.62_0.19_250/30%),transparent_66%)] blur-3xl" />

      <div className="animate-slow-spin absolute inset-[3%] rounded-full border border-dashed border-primary/25" />
      <div className="absolute inset-[11%] rounded-full border border-foreground/10" />
      <div className="absolute inset-[17%] rounded-full border border-foreground/[0.06]" />

      <div className="absolute inset-[19%] rounded-full bg-[radial-gradient(circle_at_46%_44%,oklch(0.93_0.08_215)_0%,oklch(0.78_0.16_230)_16%,oklch(0.62_0.2_248)_38%,oklch(0.38_0.13_262)_62%,oklch(0.2_0.05_265)_78%,transparent_79%)] shadow-[inset_0_0_80px_oklch(0.7_0.18_240/35%),0_0_100px_-15px_oklch(0.65_0.2_245/45%)]" />

      <div className="animate-drift absolute inset-[38%] rounded-full bg-[radial-gradient(circle,oklch(0.98_0.12_85)_0%,oklch(0.85_0.19_65)_34%,oklch(0.68_0.2_40/70%)_62%,transparent_72%)] blur-[6px]" />
      <div className="absolute inset-[37%] rounded-full border border-amber-200/30" />

      <div className="absolute top-1/2 left-[6%] h-px w-[88%] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
      <div className="absolute top-[6%] left-1/2 h-[88%] w-px bg-gradient-to-b from-transparent via-foreground/10 to-transparent" />

      <div className="absolute top-[15%] right-[2%] flex items-center gap-2 text-[9px] tracking-[0.16em] text-muted-foreground">
        <span className="h-px w-8 bg-border" />
        0 g ENVIRONMENT
      </div>
      <div className="absolute bottom-[16%] left-[1%] flex items-center gap-2 text-[9px] tracking-[0.16em] text-muted-foreground">
        DIFFUSION-FED
        <span className="h-px w-8 bg-border" />
      </div>
      <div className="absolute top-[50%] -right-[2%] -translate-y-1/2 rotate-90 text-[9px] tracking-[0.18em] text-muted-foreground">
        BLUE SPHERE REGIME
      </div>

      <span className="absolute top-[8%] left-[22%] size-1 rounded-full bg-primary" />
      <span className="absolute right-[18%] bottom-[22%] size-1 rounded-full bg-sky-400" />
      <span className="absolute bottom-[10%] left-[38%] size-1 rounded-full bg-foreground/30" />

      <div className="absolute inset-x-[12%] bottom-0 flex items-end justify-between font-mono text-[9px] tracking-widest text-muted-foreground">
        <span>NO BUOYANT PLUME</span>
        <span className="text-primary/80">FLAME IN FREEFALL</span>
      </div>
    </div>
  )
}

import {
  hardwareGroups,
  type Environment,
  type FuelPhase,
  type HardwareGroupId,
  type Investigation,
  type Pillar,
} from "@/data/investigations"

export const PILLARS: Pillar[] = ["prevention", "detection", "suppression"]

export const ENVIRONMENTS: Environment[] = [
  "spacecraft",
  "space_station",
  "lunar_base",
  "mars_base",
  "pressurized_rover",
  "spacesuit",
  "earth_spinoff",
]

export const FUEL_PHASES: FuelPhase[] = ["solid", "liquid", "gaseous", "none"]

export const pillarLabel: Record<Pillar, string> = {
  prevention: "Prevention",
  detection: "Detection",
  suppression: "Suppression",
}

export const fuelPhaseLabel: Record<FuelPhase, string> = {
  solid: "Solid",
  liquid: "Liquid",
  gaseous: "Gaseous",
  none: "No fuel",
}

export const environmentLabel: Record<Environment, string> = {
  spacecraft: "Spacecraft cabin",
  space_station: "Space station",
  lunar_base: "Lunar base",
  mars_base: "Mars base",
  pressurized_rover: "Pressurized rover",
  spacesuit: "Spacesuit",
  earth_spinoff: "Earth spinoff",
}

export const pillarTone: Record<Pillar, string> = {
  prevention:
    "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  detection:
    "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  suppression:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
}

export const environmentTone =
  "border-border bg-muted/60 text-muted-foreground"

export const pillarDot: Record<Pillar, string> = {
  prevention: "bg-amber-500",
  detection: "bg-sky-500",
  suppression: "bg-emerald-500",
}

export function countByPillar(
  items: Investigation[],
  pillar: Pillar,
): number {
  return items.filter((item) => item.pillars.includes(pillar)).length
}

export function countByPhase(items: Investigation[], phase: FuelPhase): number {
  return items.filter((item) => item.fuel.phase === phase).length
}

export function groupLabel(id: HardwareGroupId | undefined): string {
  if (!id) return "Ungrouped"
  return hardwareGroups.find((group) => group.id === id)?.label ?? id
}

export function formatCondition(
  value: number | undefined,
  suffix: string,
): string {
  return value === undefined ? "Not specified" : `${value}${suffix}`
}

export function initials(title: string): string {
  const match = title.match(/\(([^)]+)\)\s*$/)
  if (match) return match[1].replace(/[^A-Za-z0-9-]/g, "")
  return title
    .split(/\s+/)
    .filter((word) => /^[A-Z]/.test(word))
    .slice(0, 3)
    .join("")
}

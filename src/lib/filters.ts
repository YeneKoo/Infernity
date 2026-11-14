import {
  getHardwareGroup,
  type HardwareGroupId,
  type Investigation,
  type Pillar,
} from "@/data/investigations"

export interface CatalogFilters {
  pillars: Pillar[]
  fuelPhase: string
  group: string
  hardware: string
  oxygen: [number, number]
  query: string
}

export const defaultFilters: CatalogFilters = {
  pillars: [],
  fuelPhase: "all",
  group: "all",
  hardware: "all",
  oxygen: [0, 100],
  query: "",
}

const facilityMatchers: Record<string, string> = {
  CIR: "Combustion Integrated Rack",
  MSG: "Microgravity Science Glovebox",
  Cygnus: "Cygnus",
  Handheld: "hand-held",
}

export function filterCatalog(
  items: Investigation[],
  filters: CatalogFilters,
): Investigation[] {
  const query = filters.query.trim().toLowerCase()
  const oxygenActive = filters.oxygen[0] > 0 || filters.oxygen[1] < 100

  return items.filter((item) => {
    if (
      filters.pillars.length > 0 &&
      !filters.pillars.every((pillar) => item.pillars.includes(pillar))
    ) {
      return false
    }
    if (filters.fuelPhase !== "all" && item.fuel.phase !== filters.fuelPhase) {
      return false
    }
    if (
      filters.group !== "all" &&
      getHardwareGroup(item.id) !== (filters.group as HardwareGroupId)
    ) {
      return false
    }
    if (filters.hardware !== "all") {
      const matcher = facilityMatchers[filters.hardware]
      if (!matcher || !item.hardware.facility?.includes(matcher)) return false
    }
    if (oxygenActive) {
      const oxygen = item.conditions.oxygenPct
      if (oxygen === undefined) return false
      if (oxygen < filters.oxygen[0] || oxygen > filters.oxygen[1]) return false
    }
    if (query) {
      const haystack = [
        item.title,
        item.id,
        item.objectives,
        item.fuel.material ?? "",
        item.hardware.facility ?? "",
        item.keyFindings.join(" "),
        item.sensors.join(" "),
      ]
        .join(" ")
        .toLowerCase()
      if (!haystack.includes(query)) return false
    }
    return true
  })
}

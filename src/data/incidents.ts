export interface Incident {
  year: string
  id: string
  title: string
  body: string
  href: string
}

export const incidents: Incident[] = [
  {
    year: "1967",
    id: "APOLLO 1",
    title: "A cabin designed for oxygen",
    body: "A pre-launch fire in a pure-oxygen cabin killed the three-person crew and reshaped spacecraft materials, wiring and hatch design.",
    href: "https://sma.nasa.gov/sma-disciplines/accllp/apollo-1",
  },
  {
    year: "1970",
    id: "APOLLO 13",
    title: "An explosion on the way out",
    body: "An oxygen tank explosion crippled the service module en route to the Moon. The crew survived in the lunar module, but the vehicle was lost.",
    href: "https://sma.nasa.gov/sma-disciplines/accllp/apollo-13",
  },
  {
    year: "1997",
    id: "MIR",
    title: "Fire in a sealed station",
    body: "A failed oxygen generator ignited aboard Mir. The crew fought the fire through dense smoke with no quick route home.",
    href: "https://www.nasa.gov/history/25-years-ago-fire-aboard-space-station-mir/",
  },
]

export const earthSpinoff = {
  id: "EARTH SPINOFF",
  year: "1970s",
  title: "The detector that learned to ignore dust",
  body: "Shuttle smoke-detector technology that discriminated smoke from dust, cutting nuisance alarms for industrial and mining use.",
  href: "https://spinoff.nasa.gov/node/9407",
}

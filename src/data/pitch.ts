export type PitchVisual =
  | "title"
  | "incidents"
  | "microgravity"
  | "risk"
  | "problem"
  | "solution"
  | "demo-rank"
  | "demo-explore"
  | "insights"
  | "stack"
  | "roadmap"
  | "closing"

export interface PitchSlide {
  title: string
  subtitle: string
  bullets: string[]
  visual: PitchVisual
}

export const pitchSlides: PitchSlide[] = [
  {
    title: "Infernity",
    subtitle:
      "Flame in Freefall — turning decades of space fire data into safety answers.",
    bullets: [
      "2026 NASA Space Apps Challenge",
      "Space Exploration track",
      "Team Mr. Space G",
      "Robera Tena & Naol Tena",
    ],
    visual: "title",
  },
  {
    title: "Fire in space is a different problem",
    subtitle:
      "No buoyancy, no easy escape, and a cabin that can be oxygen-rich.",
    bullets: [
      "Apollo 1, Apollo 13 and Mir show how quickly oxygen and fire turn fatal.",
      "No buoyancy: flames become blue spheres and Earth intuition fails.",
      "Moon bases may run at 30% O2 or more and 10.2 psi or less.",
      "That is more than 40% more oxygen than Earth air, so materials burn more easily.",
    ],
    visual: "incidents",
  },
  {
    title: "The data is public. The answer is not.",
    subtitle:
      "NASA's combustion record is deep, fragmented, and hard to use under time pressure.",
    bullets: [
      "Decades of results live in NASA's PSI repository.",
      "Findings are spread across experiments, facilities and fuel types.",
      "Records are hard to find, compare, and interpret.",
      "The fire-safety answer is buried in the details.",
    ],
    visual: "problem",
  },
  {
    title: "One dashboard, three jobs",
    subtitle: "Infernity turns the catalog into a fire-safety instrument.",
    bullets: [
      "Summarize: plain-language AI summaries for researchers and students.",
      "Rank: score investigations against a habitat scenario.",
      "Interpret: compare fuels, oxygen, hardware and fire-safety pillars.",
      "For students, researchers and aerospace engineers.",
    ],
    visual: "solution",
  },
  {
    title: "Demo: from scenario to evidence",
    subtitle:
      "A lunar base at 30% O2 with solid fuel, then straight into the record.",
    bullets: [
      "BASS and Saffire rank high for solid-fuel spread and suppression.",
      "Every result carries a justification and stated assumptions.",
      "FLEX streams an AI summary on CO2 and helium suppression.",
      "Compare up to three investigations side by side.",
    ],
    visual: "demo-rank",
  },
  {
    title: "Built for insight and trust",
    subtitle: "A small stack, curated data, and guardrails around the AI.",
    bullets: [
      "O2 chart: 21% Earth, 30% lunar floor, 85% CFI-G maximum.",
      "Hardware groups: ACME, MDCA, and the SPICE duct.",
      "TanStack Start + shadcn/ui + your OpenAI-compatible model.",
      "Invented IDs rejected. AI text labeled. Numbers from source records.",
    ],
    visual: "insights",
  },
  {
    title: "Making the next giant leap a safer one.",
    subtitle: "Honest gaps, clear next steps, and a team ready to build.",
    bullets: [
      "No partial-gravity combustion data exists in PSI yet; LUCI and FM2 are coming.",
      "Rocket and propellant fire safety is out of scope.",
      "Next: live PSI ingest, LUCI/FM2, and Earth spinoffs.",
      "Team Mr. Space G — support@fuastyle.com",
    ],
    visual: "roadmap",
  },
]

export const pitchTeam = {
  name: "Mr. Space G",
  members: [
    { name: "Robera Tena", role: "Student" },
    { name: "Naol Tena", role: "Developer" },
  ],
}

export const SUPPORT_EMAIL = "support@fuastyle.com"

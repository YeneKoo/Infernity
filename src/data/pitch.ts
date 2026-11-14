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
    title: "When fire happens in space",
    subtitle: "Fire is one of the few failures a crew cannot walk away from.",
    bullets: [
      "Apollo 1 (1967): a pure-oxygen cabin fire killed three astronauts.",
      "Apollo 13 (1970): an oxygen tank explosion crippled the service module.",
      "Mir (1997): a failed oxygen generator ignited; the crew fought smoke.",
      "Artemis II: a smoke alarm went off about 80,000 miles from home.",
    ],
    visual: "incidents",
  },
  {
    title: "Why microgravity changes fire",
    subtitle:
      "No buoyancy means no rising plume, no familiar flame shape, and no Earth instinct.",
    bullets: [
      "No buoyancy: hot gas does not rise to pull fresh oxygen into the flame.",
      "A candle becomes a ghostly blue sphere fed by diffusion.",
      "Flame spread, stability and extinction depend on ventilation and oxygen.",
      "Fire-safety intuition from Earth does not transfer directly.",
    ],
    visual: "microgravity",
  },
  {
    title: "The Moon makes the risk larger",
    subtitle:
      "Future habitats may run oxygen-rich and low-pressure at the same time.",
    bullets: [
      "Earth air: 21% O2 at 14.7 psi.",
      "Moon base and rovers: likely 30% O2 or more at 10.2 psi or less.",
      "That is more than 40% more oxygen than Earth air.",
      "Higher oxygen makes materials much more flammable.",
    ],
    visual: "risk",
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
    title: "Demo: rank for a scenario",
    subtitle:
      "A lunar base at 30% O2, with solid fuel and prevention/suppression priorities.",
    bullets: [
      "BASS and Saffire rank high for solid-fuel spread and suppression.",
      "Each result carries a one-sentence justification.",
      "Assumptions are surfaced, not hidden.",
      "Only curated catalog records can be returned.",
    ],
    visual: "demo-rank",
  },
  {
    title: "Demo: explore the evidence",
    subtitle:
      "From a ranked shortlist to the experiment record and a streamed explanation.",
    bullets: [
      "FLEX tested CO2 and helium as suppressants.",
      "Stream a summary at researcher or student depth.",
      "Compare up to three investigations side by side.",
      "Unknown fields stay unknown.",
    ],
    visual: "demo-explore",
  },
  {
    title: "See the shape of the data",
    subtitle: "Reference lines turn scattered conditions into a risk picture.",
    bullets: [
      "O2 chart: 21% Earth, 30% lunar floor, 85% CFI-G maximum.",
      "Hardware groups: ACME, MDCA, and the SPICE duct.",
      "Free-flying Saffire and detection hardware stay visible.",
      "Coverage counts show where the catalog is strong and thin.",
    ],
    visual: "insights",
  },
  {
    title: "Built for speed and trust",
    subtitle: "A small stack, curated data, and guardrails around the AI.",
    bullets: [
      "TanStack Start, React and TypeScript.",
      "shadcn/ui and Tailwind, one theme across the app.",
      "Bring your own OpenAI-compatible endpoint, including Cerebras.",
      "Invented IDs rejected. AI text labeled. Numbers from source records.",
    ],
    visual: "stack",
  },
  {
    title: "Honest gaps, clear next steps",
    subtitle: "The dashboard shows what NASA has not measured yet.",
    bullets: [
      "No partial-gravity combustion data exists in PSI yet.",
      "LUCI and FM2 are the expected future additions.",
      "Rocket and propellant fire safety is out of scope.",
      "Next: live PSI ingest, LUCI/FM2, and Earth spinoffs.",
    ],
    visual: "roadmap",
  },
  {
    title: "Making the next giant leap a safer one.",
    subtitle: "Thank you. Let's turn the record into answers.",
    bullets: [
      "Team Mr. Space G",
      "Robera Tena — Student",
      "Naol Tena — Developer",
      "support@fuastyle.com",
    ],
    visual: "closing",
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

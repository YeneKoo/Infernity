import { investigations } from "@/data/investigations"

export type Mission = "pillar" | "match" | "o2"

export interface Question {
  id: string
  mission: Mission
  prompt: string
  options: { id: string; label: string }[]
  correctId: string
  explanation: string
  investigationIds?: string[]
}

export interface MissionInfo {
  id: Mission
  label: string
  difficulty: "Easy" | "Medium"
  description: string
}

export const missions: MissionInfo[] = [
  {
    id: "pillar",
    label: "Pick the Pillar",
    difficulty: "Easy",
    description:
      "Read the situation and decide whether it calls for prevention, detection, or suppression.",
  },
  {
    id: "match",
    label: "Match the Mission",
    difficulty: "Medium",
    description:
      "Use fuel, oxygen, hardware, and fire-safety goals to pick the most relevant investigation.",
  },
  {
    id: "o2",
    label: "O2 Danger Zone",
    difficulty: "Medium",
    description:
      "Compare known atmospheres and identify which one is more flammable for materials.",
  },
]

const pillarOptions = [
  { id: "prevention", label: "Prevention" },
  { id: "detection", label: "Detection" },
  { id: "suppression", label: "Suppression" },
]

const pillarQuestions: Question[] = [
  {
    id: "pillar-smoke-lab",
    mission: "pillar",
    prompt:
      "Smoke is detected in the lab module before any flame appears. Which line of defense is at work?",
    options: pillarOptions,
    correctId: "detection",
    explanation:
      "Early-warning detection targets smoke and pyrolysis products before a flame establishes. SAME and SAME-R measured smoke particles in microgravity.",
    investigationIds: ["same", "same-r"],
  },
  {
    id: "pillar-cabin-fabric",
    mission: "pillar",
    prompt:
      "A crew needs to choose a cabin fabric that resists flame spread. Which line of defense is this?",
    options: pillarOptions,
    correctId: "prevention",
    explanation:
      "Prevention starts with material selection and flammability limits. BASS and BASS-II tested solid materials and flame spread.",
    investigationIds: ["bass", "bass-ii"],
  },
  {
    id: "pillar-inert-gas",
    mission: "pillar",
    prompt:
      "A fire is burning and the crew must dilute the cabin atmosphere with inert gas. Which line of defense is this?",
    options: pillarOptions,
    correctId: "suppression",
    explanation:
      "Suppression uses inert gas to reach the no-flame limit. FLEX tested carbon dioxide and helium as suppressants.",
    investigationIds: ["flex"],
  },
  {
    id: "pillar-ventilation-spread",
    mission: "pillar",
    prompt:
      "Engineers want to know how ventilation changes flame spread over a solid surface. Which line of defense is this?",
    options: pillarOptions,
    correctId: "prevention",
    explanation:
      "Prevention research maps how airflow and material geometry affect spread. BASS-II varied ventilation from 5 to 50 cm/s.",
    investigationIds: ["bass-ii"],
  },
  {
    id: "pillar-dust-alarm",
    mission: "pillar",
    prompt:
      "A detector keeps triggering on ordinary dust instead of smoke. Which line of defense needs attention?",
    options: pillarOptions,
    correctId: "detection",
    explanation:
      "Detection must reject ordinary dust. DAFT and DAFT-2 characterized the ISS particulate baseline.",
    investigationIds: ["daft", "daft-2"],
  },
  {
    id: "pillar-limiting-oxygen",
    mission: "pillar",
    prompt:
      "The team is mapping the lowest oxygen level where steady burning can no longer continue. Which line of defense is this?",
    options: pillarOptions,
    correctId: "suppression",
    explanation:
      "That is the limiting oxygen index, a suppression concept. FLEX tested inert-gas suppression and extinction.",
    investigationIds: ["flex"],
  },
  {
    id: "pillar-material-screening",
    mission: "pillar",
    prompt:
      "A new material must pass a flammability screening test before it flies. Which line of defense is this?",
    options: pillarOptions,
    correctId: "prevention",
    explanation:
      "Prevention depends on material screening. BASS-II compared ground screening with low-gravity flame spread.",
    investigationIds: ["bass-ii"],
  },
  {
    id: "pillar-light-scattering",
    mission: "pillar",
    prompt:
      "A light-scattering detector is evaluated against smoke particles of different sizes. Which line of defense is this?",
    options: pillarOptions,
    correctId: "detection",
    explanation:
      "SAME measured smoke particle size distributions and detector response in microgravity.",
    investigationIds: ["same"],
  },
  {
    id: "pillar-suppressant-bottle",
    mission: "pillar",
    prompt:
      "A suppressant bottle is tested from zero concentration up to the no-flame limit. Which line of defense is this?",
    options: pillarOptions,
    correctId: "suppression",
    explanation:
      "FLEX ramped carbon dioxide and helium from zero concentration to the no-flame limit.",
    investigationIds: ["flex"],
  },
  {
    id: "pillar-acrylic-window",
    mission: "pillar",
    prompt:
      "Engineers replace an acrylic window material because it burns. Which line of defense is this?",
    options: pillarOptions,
    correctId: "prevention",
    explanation:
      "Saffire-II tested Nomex and the acrylic glass used for spacecraft windows at large scale.",
    investigationIds: ["saffire-ii"],
  },
  {
    id: "pillar-smoke-aging",
    mission: "pillar",
    prompt:
      "Smoke ages in the cabin before reaching a detector. Which line of defense studies this effect?",
    options: pillarOptions,
    correctId: "detection",
    explanation:
      "SAME studied smoke aging and how detector response changes with particle size.",
    investigationIds: ["same"],
  },
  {
    id: "pillar-solid-flame-shape",
    mission: "pillar",
    prompt:
      "A solid-fuel sample is ignited so researchers can record flame shape and time to extinction. Which line of defense is this?",
    options: pillarOptions,
    correctId: "prevention",
    explanation:
      "BASS recorded flame shape, spread rate, pulsation and time to extinction for solid fuels.",
    investigationIds: ["bass"],
  },
  {
    id: "pillar-handheld-counter",
    mission: "pillar",
    prompt:
      "A hand-held particle counter is checked for use in the ISS cabin. Which line of defense is this?",
    options: pillarOptions,
    correctId: "detection",
    explanation:
      "DAFT verified that a hand-held particle counter could characterize airborne particulate in microgravity.",
    investigationIds: ["daft"],
  },
  {
    id: "pillar-nitrogen-ramp",
    mission: "pillar",
    prompt:
      "Nitrogen flow is ramped until a solid-fuel flame goes out. Which line of defense is this?",
    options: pillarOptions,
    correctId: "suppression",
    explanation:
      "BASS ramped nitrogen from 0 to 500 cc/min until extinction, linking the test to spacecraft extinguisher practice.",
    investigationIds: ["bass"],
  },
]

const matchQuestions: Question[] = [
  {
    id: "match-lunar-solid",
    mission: "match",
    prompt:
      "Lunar base, 30% O2, solid fuel. You need flammability and suppression evidence. Which investigation fits best?",
    options: [
      { id: "bass", label: "BASS" },
      { id: "flex", label: "FLEX" },
      { id: "same", label: "SAME" },
      { id: "cfi-g", label: "CFI-G" },
    ],
    correctId: "bass",
    explanation:
      "BASS tested solid fuels, flame spread and nitrogen suppression in a pressurized cabin, making it the closest solid-fuel fit.",
    investigationIds: ["bass"],
  },
  {
    id: "match-liquid-suppression",
    mission: "match",
    prompt:
      "Liquid-fuel droplets, comparing carbon dioxide and helium as suppressants. Which investigation fits?",
    options: [
      { id: "flex", label: "FLEX" },
      { id: "same", label: "SAME" },
      { id: "spice", label: "SPICE" },
      { id: "saffire-i", label: "Saffire-I" },
    ],
    correctId: "flex",
    explanation:
      "FLEX tested methanol and heptane droplets with carbon dioxide and helium suppression up to the no-flame limit.",
    investigationIds: ["flex"],
  },
  {
    id: "match-smoke-particles",
    mission: "match",
    prompt:
      "Measure smoke particle sizes and detector response in microgravity. Which investigation fits?",
    options: [
      { id: "same", label: "SAME" },
      { id: "bass", label: "BASS" },
      { id: "flex-2", label: "FLEX-2" },
      { id: "slice", label: "SLICE" },
    ],
    correctId: "same",
    explanation:
      "SAME measured smoke particle size distributions and evaluated ionization and photoelectric detectors.",
    investigationIds: ["same"],
  },
  {
    id: "match-dust-baseline",
    mission: "match",
    prompt:
      "Build an ordinary-dust baseline so smoke detectors avoid nuisance alarms. Which investigation fits?",
    options: [
      { id: "daft", label: "DAFT" },
      { id: "same", label: "SAME" },
      { id: "bass-ii", label: "BASS-II" },
      { id: "cfi", label: "CFI" },
    ],
    correctId: "daft",
    explanation:
      "DAFT characterized ISS airborne particulate and qualified the counter later used by SAME.",
    investigationIds: ["daft"],
  },
  {
    id: "match-large-solid",
    mission: "match",
    prompt:
      "Large-scale solid-fuel flame growth on a free-flying cargo vehicle. Which investigation fits?",
    options: [
      { id: "saffire-i", label: "Saffire-I" },
      { id: "bass", label: "BASS" },
      { id: "flex", label: "FLEX" },
      { id: "cfi-g", label: "CFI-G" },
    ],
    correctId: "saffire-i",
    explanation:
      "Saffire-I burned a meter-class SIBAL fabric sample inside a flow duct on a free-flying Cygnus.",
    investigationIds: ["saffire-i"],
  },
  {
    id: "match-acrylic-window",
    mission: "match",
    prompt:
      "Test acrylic spacecraft-window material at large scale. Which investigation fits?",
    options: [
      { id: "saffire-ii", label: "Saffire-II" },
      { id: "same-r", label: "SAME-R" },
      { id: "acme", label: "ACME" },
      { id: "spice", label: "SPICE" },
    ],
    correctId: "saffire-ii",
    explanation:
      "Saffire-II tested Nomex and the acrylic glass used for spacecraft windows among nine samples.",
    investigationIds: ["saffire-ii"],
  },
  {
    id: "match-smoke-point",
    mission: "match",
    prompt:
      "Find a gaseous flame's smoke point and study soot radiation. Which investigation fits?",
    options: [
      { id: "spice", label: "SPICE" },
      { id: "flex", label: "FLEX" },
      { id: "bass-ii", label: "BASS-II" },
      { id: "cfi", label: "CFI" },
    ],
    correctId: "spice",
    explanation:
      "SPICE identified smoke points and studied how soot controls radiative heat emission.",
    investigationIds: ["spice"],
  },
  {
    id: "match-cool-flames",
    mission: "match",
    prompt:
      "Study cool flames in heptane droplets that can burn with little visible light. Which investigation fits?",
    options: [
      { id: "cfi", label: "CFI" },
      { id: "flex", label: "FLEX" },
      { id: "cfi-g", label: "CFI-G" },
      { id: "same", label: "SAME" },
    ],
    correctId: "cfi",
    explanation:
      "CFI examined heptane droplet cool flames, which can burn at low temperature with little or no visible light.",
    investigationIds: ["cfi"],
  },
  {
    id: "match-high-oxygen",
    mission: "match",
    prompt:
      "Reach the highest documented oxygen concentration in microgravity combustion tests. Which investigation fits?",
    options: [
      { id: "cfi-g", label: "CFI-G" },
      { id: "acme", label: "ACME" },
      { id: "bass", label: "BASS" },
      { id: "flex", label: "FLEX" },
    ],
    correctId: "cfi-g",
    explanation:
      "CFI-G reached oxygen concentrations up to 85%, the highest-O2 microgravity combustion tests in the catalog.",
    investigationIds: ["cfi-g"],
  },
  {
    id: "match-liftoff",
    mission: "match",
    prompt:
      "Identify liftoff limits and flame attachment in a co-flow. Which investigation fits?",
    options: [
      { id: "slice", label: "SLICE" },
      { id: "spice", label: "SPICE" },
      { id: "acme", label: "ACME" },
      { id: "bass", label: "BASS" },
    ],
    correctId: "slice",
    explanation:
      "SLICE characterized flame structure from attached to lifted conditions and identified liftoff velocity limits.",
    investigationIds: ["slice"],
  },
  {
    id: "match-six-experiments",
    mission: "match",
    prompt:
      "Investigate six gaseous sub-experiments, including electric fields and BRE. Which investigation fits?",
    options: [
      { id: "acme", label: "ACME" },
      { id: "cfi-g", label: "CFI-G" },
      { id: "spice", label: "SPICE" },
      { id: "flex-2", label: "FLEX-2" },
    ],
    correctId: "acme",
    explanation:
      "ACME includes BRE, CLD Flame, E-FIELD Flames, Flame Design, s-Flame and CFI-G.",
    investigationIds: ["acme"],
  },
  {
    id: "match-paired-droplets",
    mission: "match",
    prompt:
      "Study paired droplets, binary arrays and surrogate fuels in a flowing environment. Which investigation fits?",
    options: [
      { id: "flex-2", label: "FLEX-2" },
      { id: "flex", label: "FLEX" },
      { id: "cfi", label: "CFI" },
      { id: "same", label: "SAME" },
    ],
    correctId: "flex-2",
    explanation:
      "FLEX-2 studied single droplets, binary droplet arrays and tethered droplets under sub-buoyant flow.",
    investigationIds: ["flex-2"],
  },
  {
    id: "match-smoke-reflight",
    mission: "match",
    prompt:
      "Repeat smoke measurements with improved diagnostics and compare Shuttle and ISS detectors. Which investigation fits?",
    options: [
      { id: "same-r", label: "SAME-R" },
      { id: "same", label: "SAME" },
      { id: "daft-2", label: "DAFT-2" },
      { id: "cfi", label: "CFI" },
    ],
    correctId: "same-r",
    explanation:
      "SAME-R repeated SAME with improved diagnostics and evaluated ISS and Shuttle smoke detectors.",
    investigationIds: ["same-r"],
  },
  {
    id: "match-ventilation-large",
    mission: "match",
    prompt:
      "Isolate the effect of higher ventilation on large-scale fabric flame spread. Which investigation fits?",
    options: [
      { id: "saffire-iii", label: "Saffire-III" },
      { id: "saffire-i", label: "Saffire-I" },
      { id: "bass", label: "BASS" },
      { id: "spice", label: "SPICE" },
    ],
    correctId: "saffire-iii",
    explanation:
      "Saffire-III burned the same SIBAL fabric as Saffire-I at a higher flow velocity to isolate ventilation.",
    investigationIds: ["saffire-iii"],
  },
]

const o2Questions: Question[] = [
  {
    id: "o2-earth-lunar",
    mission: "o2",
    prompt:
      "Which is more flammable for materials: Earth air or a lunar base atmosphere?",
    options: [
      { id: "earth", label: "Earth air — 21% O2 at 14.7 psi" },
      { id: "lunar", label: "Lunar base — 30%+ O2 at 10.2 psi or less" },
    ],
    correctId: "lunar",
    explanation:
      "The lunar base is expected to run at 30% O2 or more, which is more than 40% more oxygen than Earth air.",
    investigationIds: ["cfi-g", "bass"],
  },
  {
    id: "o2-earth-suit",
    mission: "o2",
    prompt:
      "Which is more flammable for materials: Earth air or a spacesuit atmosphere?",
    options: [
      { id: "earth", label: "Earth air — 21% O2 at 14.7 psi" },
      { id: "suit", label: "Spacesuit — 100% O2 at 4.3 psi" },
    ],
    correctId: "suit",
    explanation:
      "A spacesuit uses 100% oxygen, far above Earth air's 21% oxygen concentration.",
    investigationIds: ["cfi-g"],
  },
  {
    id: "o2-lunar-suit",
    mission: "o2",
    prompt:
      "Which is more flammable for materials: a lunar base or a spacesuit?",
    options: [
      { id: "lunar", label: "Lunar base — 30%+ O2" },
      { id: "suit", label: "Spacesuit — 100% O2" },
    ],
    correctId: "suit",
    explanation:
      "The spacesuit atmosphere is 100% oxygen, while the lunar base is expected to be 30% O2 or more.",
    investigationIds: ["cfi-g"],
  },
  {
    id: "o2-cfig-lunar",
    mission: "o2",
    prompt:
      "CFI-G tested up to 85% O2. How does that compare with a lunar base at 30%+ O2?",
    options: [
      { id: "cfi-g", label: "CFI-G — up to 85% O2" },
      { id: "lunar", label: "Lunar base — 30%+ O2" },
    ],
    correctId: "cfi-g",
    explanation:
      "CFI-G reached up to 85% O2, well above the 30%+ expected for a lunar base.",
    investigationIds: ["cfi-g"],
  },
  {
    id: "o2-flex-earth",
    mission: "o2",
    prompt:
      "FLEX documented a 50% O2 test condition at 14.7 psi. Earth air is 21% O2 at 14.7 psi. Which is more flammable?",
    options: [
      { id: "flex", label: "FLEX test condition — 50% O2" },
      { id: "earth", label: "Earth air — 21% O2" },
    ],
    correctId: "flex",
    explanation:
      "FLEX documented 50% O2 at the same 14.7 psi pressure, more than twice Earth air's oxygen concentration.",
    investigationIds: ["flex", "bass"],
  },
  {
    id: "o2-least-three",
    mission: "o2",
    prompt:
      "Which atmosphere is least flammable for materials: Earth air, lunar base, or spacesuit?",
    options: [
      { id: "earth", label: "Earth air — 21% O2" },
      { id: "lunar", label: "Lunar base — 30%+ O2" },
      { id: "suit", label: "Spacesuit — 100% O2" },
    ],
    correctId: "earth",
    explanation:
      "Earth air has the lowest oxygen concentration of the three at 21% O2.",
    investigationIds: ["bass", "cfi-g"],
  },
  {
    id: "o2-most-three",
    mission: "o2",
    prompt:
      "Which atmosphere is most flammable for materials: Earth air, lunar base, or spacesuit?",
    options: [
      { id: "earth", label: "Earth air — 21% O2" },
      { id: "lunar", label: "Lunar base — 30%+ O2" },
      { id: "suit", label: "Spacesuit — 100% O2" },
    ],
    correctId: "suit",
    explanation:
      "The spacesuit atmosphere is 100% oxygen, the highest concentration of the three.",
    investigationIds: ["cfi-g"],
  },
  {
    id: "o2-step-up",
    mission: "o2",
    prompt:
      "A material is screened at Earth air. Which environment is the larger step up in oxygen: a lunar base or CFI-G's test condition?",
    options: [
      { id: "lunar", label: "Lunar base — 30%+ O2" },
      { id: "cfi-g", label: "CFI-G — up to 85% O2" },
    ],
    correctId: "cfi-g",
    explanation:
      "CFI-G reached 85% O2, while the lunar base is expected to be 30% O2 or more.",
    investigationIds: ["cfi-g"],
  },
  {
    id: "o2-closest-pair",
    mission: "o2",
    prompt:
      "Which pair has the closest oxygen concentrations: Earth air and BASS, or Earth air and a lunar base?",
    options: [
      { id: "earth-bass", label: "Earth 21% and BASS 21%" },
      { id: "earth-lunar", label: "Earth 21% and lunar base 30%+" },
    ],
    correctId: "earth-bass",
    explanation:
      "BASS documented a 21% O2 test condition, matching Earth air. The lunar base is expected to be 30% or more.",
    investigationIds: ["bass", "cfi-g"],
  },
  {
    id: "o2-sort-three",
    mission: "o2",
    prompt:
      "Order these from least to most flammable: Earth air, lunar base, spacesuit.",
    options: [
      {
        id: "earth-lunar-suit",
        label: "Earth 21% → lunar 30%+ → spacesuit 100%",
      },
      {
        id: "lunar-earth-suit",
        label: "Lunar 30%+ → Earth 21% → spacesuit 100%",
      },
      {
        id: "suit-lunar-earth",
        label: "Spacesuit 100% → lunar 30%+ → Earth 21%",
      },
    ],
    correctId: "earth-lunar-suit",
    explanation:
      "Oxygen concentration increases from Earth air at 21% to the lunar base at 30%+ to the spacesuit at 100%.",
    investigationIds: ["bass", "cfi-g"],
  },
  {
    id: "o2-flex-lunar",
    mission: "o2",
    prompt:
      "Which is more flammable: FLEX's 50% O2 test condition or a lunar base at 30%+ O2?",
    options: [
      { id: "flex", label: "FLEX test condition — 50% O2" },
      { id: "lunar", label: "Lunar base — 30%+ O2" },
    ],
    correctId: "flex",
    explanation:
      "FLEX documented 50% O2, higher than the 30% O2 or more expected for a lunar base.",
    investigationIds: ["flex", "cfi-g"],
  },
  {
    id: "o2-highest-known",
    mission: "o2",
    prompt:
      "Which known condition has the highest oxygen concentration: Earth air, FLEX, CFI-G, or a spacesuit?",
    options: [
      { id: "earth", label: "Earth air — 21%" },
      { id: "flex", label: "FLEX — 50%" },
      { id: "cfi-g", label: "CFI-G — up to 85%" },
      { id: "suit", label: "Spacesuit — 100%" },
    ],
    correctId: "suit",
    explanation:
      "The spacesuit atmosphere is 100% O2. CFI-G is the highest microgravity test in the catalog at up to 85% O2.",
    investigationIds: ["cfi-g", "flex"],
  },
  {
    id: "o2-bass-flex",
    mission: "o2",
    prompt:
      "Compare BASS at 21% O2 with FLEX at 50% O2. Both are documented at 14.7 psi. Which is more flammable?",
    options: [
      { id: "flex", label: "FLEX — 50% O2" },
      { id: "bass", label: "BASS — 21% O2" },
    ],
    correctId: "flex",
    explanation:
      "FLEX documented 50% O2 at 14.7 psi, while BASS documented 21% O2 at 14.7 psi.",
    investigationIds: ["flex", "bass"],
  },
  {
    id: "o2-earth-cfig",
    mission: "o2",
    prompt:
      "Which is more flammable: Earth air at 21% O2 or CFI-G's test condition at up to 85% O2?",
    options: [
      { id: "earth", label: "Earth air — 21% O2" },
      { id: "cfi-g", label: "CFI-G — up to 85% O2" },
    ],
    correctId: "cfi-g",
    explanation:
      "CFI-G reached up to 85% O2, far above Earth air's 21% oxygen concentration.",
    investigationIds: ["cfi-g"],
  },
]

export const questions: Question[] = [
  ...pillarQuestions,
  ...matchQuestions,
  ...o2Questions,
]

if (import.meta.env.DEV) {
  const knownIds = new Set(investigations.map((item) => item.id))
  for (const question of questions) {
    if (!question.options.some((option) => option.id === question.correctId)) {
      throw new Error(
        `Game question "${question.id}" has a correctId that is not in its options`
      )
    }
    for (const id of question.investigationIds ?? []) {
      if (!knownIds.has(id)) {
        throw new Error(
          `Game question "${question.id}" references unknown investigation "${id}"`
        )
      }
    }
  }
}

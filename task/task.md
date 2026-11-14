# INFERNITY — "Flame in Freefall" Fire-Safety Dashboard

**Infernity = Inferno + Infinity**
**Event:** 2026 NASA Space Apps Challenge (Advanced / Intermediate, Space Exploration)
**Stack:** TanStack Start + shadcn/ui + Cerebras API (`qwen-3.8-27b`)
**Hard constraints:** NO database. NO vector store. NO RAG. NO deployment config. Keep it SIMPLE. Data lives in TypeScript files. Everything in-memory.

---

## PART A: CHALLENGE CONTEXT (why we are building this)

### A1. The challenge

For decades NASA has studied how flames behave in microgravity. The volume of results (public in NASA's Physical Sciences Informatics, PSI, database) makes them hard to find, compare, and interpret. Build an interactive, SI-powered web dashboard that **summarizes, ranks, and interprets** combustion findings to deliver fire-safety insights for human space exploration (spacecraft, space stations, lunar and Martian bases, pressurized rovers).

### A2. Background

- Fire is extremely dangerous in space. Artemis II's commander described a smoke alarm going off ~80,000 miles from home. Historical incidents: **Apollo 1** (1967, pre-launch fire in an oxygen-filled cabin killed the crew), **Apollo 13** (oxygen tank explosion en route to the Moon), **Mir** (1997 fire from an oxygen generator failure).
- In microgravity there is no buoyancy, so flames differ dramatically: a candle becomes a ghostly blue sphere that depends on diffusion for oxygen.
- NASA fire-safety work has three pillars:
  - **Prevention**: control ignition sources and material selection; depends on flammability limits. Flammability depends strongly on O2 concentration and airflow. Studied in BASS, BASS-II, Saffire-I/II/III.
  - **Detection**: SAME and SAME-R (smoke and aerosol measurement).
  - **Suppression**: FLEX (dilution of the chamber atmosphere with CO2 and helium).

### A3. Objectives (features the dashboard may enable)

1. Identify investigations most relevant to fire-safety needs of habitable crew environments (spacecraft, stations, lunar/Mars bases, pressurized rovers).
2. Extract data supporting predictive modeling of flammability and fire scenarios.
3. Highlight research informing next-generation fire-safety controls and equipment.
4. (Optional) Show applications of PSI data to fire safety on Earth (fine-water-mist extinguishers, smoke detection, firefighter gear).

**Out of scope per NASA:** rocket/propellant fire safety (high velocities make combustion effectively gravity-independent).

### A4. Target audience

Professors, graduate and undergraduate students, aerospace researchers, aerospace engineers.

### A5. Attributes to summarize and display (per investigation)

- Experimental objectives
- Fuels, including shape and size of samples or burners
- Test conditions: oxygen concentration, airflow speed
- Variables: how tests within the same investigation differed and what stayed the same
- Sensors / types of measurements
- Similarities and differences between investigations

### A6. Other investigations worth noting

- DAFT and DAFT-2: an instrument used for smoke detection in SAME/SAME-R was reused to detect dust.
- ACME's **BRE** (Burning Rate Emulator): burned gaseous fuels but studied materials flammability in still atmospheres as a function of material properties.
- Other PSI combustion investigations are still relevant, just less directly.

### A7. Hardware (first-class concept: surface it in the UI)

| Group                | Investigations                                                             | Facility                                                                                  |
| -------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **ACME group**       | The six ACME experiments (gaseous fuels), incl. BRE, E-FIELD Flames, CFI-G | Modular ACME hardware in the Combustion Integrated Rack (CIR)                             |
| **MDCA group**       | FLEX, FLEX-2, CFI (burning liquid fuel droplets)                           | Multi-user Droplet Combustion Apparatus (MDCA) in the CIR                                 |
| **SPICE duct group** | BASS, BASS-II, SPICE, SLICE (solid and gaseous fuels)                      | Microgravity Science Glovebox (MSG) with the modular fan-driven flow duct built for SPICE |

### A8. Spacesuits and oxygen concentration (drives the O2 chart)

- Spacesuits: 100% O2 at only 4.3 psi (Earth sea level 14.7 psi). Astronauts pre-breathe 100% O2 to avoid the bends.
- To shorten pre-breathe, the Moon Base and pressurized rovers will likely sit between suit and Earth conditions: **likely 30% O2 or greater at 10.2 psi or less**. That is a >40% increase over Earth's O2 concentration, making materials much more flammable.
- Highest-O2 microgravity tests: ACME **CFI-G**, with an O2-N2 mixture up to **85% O2** flowing from a spherical burner into a chamber of nitrogen plus a flammable gas (e.g., propane), creating an inside-out flame.

### A9. Partial-gravity data gap (display honestly)

No partial-gravity combustion data exists in PSI yet. Expected future additions: **LUCI** (Lunar-g Combustion Investigation) and **FM2** (Flammability of Materials on the Moon). ACME's E-FIELD Flames mimicked partial gravity using electric-field effects on flame ions. Microgravity and normal-gravity results could bound intermediate-gravity behavior.

### A10. Resources

_NASA does not endorse any non-U.S. Government entity; comply with the data-use terms of each non-U.S. Government site._

**NASA data and background**

- PSI Data Repository, Combustion Science (primary data source): https://psi.nasa.gov/physci/repo/search?q=combustion
- NASA Combustion Science (basics on most investigations): https://www.nasa.gov/glenn/glenn-expertise-space-exploration/physical-sciences-program/combustion-science/
- NASA ScienceCasts, The Power of Studying Combustion on the ISS (3.6-min video, 2018): https://www.youtube.com/watch?v=W1oXykoz9zg
- A Researcher's Guide to ISS Combustion Science (2015, 50+ pages): https://www.nasa.gov/missions/station/a-researchers-guide-to-combustion-science/

**Historical incidents (landing page cards)**

- Apollo 1: https://sma.nasa.gov/sma-disciplines/accllp/apollo-1
- Apollo 13: https://sma.nasa.gov/sma-disciplines/accllp/apollo-13
- Mir (25 Years Ago: Fire Aboard Space Station Mir): https://www.nasa.gov/history/25-years-ago-fire-aboard-space-station-mir/

**Earth spinoffs (one static card only)**

- Fireman's Air Tanks (1970s, spacesuit tech adapted for breathing gear): https://spinoff.nasa.gov/node/9582
- Fire Detector (1970s shuttle smoke detector that discriminates smoke from dust; fewer nuisance alarms; industrial/mining use): https://spinoff.nasa.gov/node/9407
- New Technology for the Fire Attire (1980s firefighter clothing from spacesuit tech): https://spinoff.nasa.gov/node/9918

---

## PART B: BUILD SPEC (what the agent must do)

### B0. Mission

Build a web dashboard that lets users explore NASA's microgravity combustion investigations and get fire-safety answers for space habitats. Use an LLM (Cerebras) to summarize investigations and rank them by relevance to a user-described scenario. Ship a clean, working app, not a platform.

### B1. Stack

- TanStack Start (file-based routing via TanStack Router, `createServerFn`)
- shadcn/ui: Card, Badge, Table, Select, Slider, Tabs, Sheet, Skeleton, Alert, ScrollArea, Button, Input, Label, Dialog (plus Checkbox)
- Tailwind CSS (already set up with shadcn)
- Cerebras API via direct fetch, model `qwen-3.8-27b`
- No database, embeddings, or vector search. All data in `src/data/investigations.ts`.

### B2. Data layer: one hand-curated file

Create `src/data/investigations.ts` exporting a typed array, populated from public NASA/PSI pages (see A10). **Do not invent numbers; leave fields optional if unknown.**

```ts
export type Pillar = "prevention" | "detection" | "suppression"
export type FuelPhase = "solid" | "liquid" | "gaseous" | "none"
export type Environment =
  | "spacecraft"
  | "space_station"
  | "lunar_base"
  | "mars_base"
  | "pressurized_rover"
  | "spacesuit"
  | "earth_spinoff"

export interface Investigation {
  id: string
  title: string
  pillars: Pillar[]
  fuel: { phase: FuelPhase; material?: string; shape?: string; sizeMm?: string }
  conditions: { oxygenPct?: number; pressurePsi?: number; airflowCmS?: number }
  hardware: { facility?: string; module?: string }
  sensors: string[]
  variablesTested: string[]
  objectives: string
  keyFindings: string[]
  fireSafetyRelevance: { environments: Environment[]; why: string }
  sourceUrl: string
}
```

Seed with:

- **BASS**: solid fuels, MSG + SPICE flow duct, prevention + suppression
- **BASS-II**: solid fuels, MSG + SPICE flow duct, prevention + suppression
- **Saffire-I, -II, -III**: large-scale solid-fuel fire-safety demonstration
- **SAME, SAME-R**: smoke and aerosol detection, ISS
- **DAFT, DAFT-2**: dust and aerosol detection feasibility
- **FLEX, FLEX-2**: liquid droplet extinguishment (CO2, He), MDCA in CIR
- **CFI**: cool flames, liquid droplets, MDCA in CIR
- **CFI-G**: highest O2 tests (up to 85%), gaseous fuel, ACME in CIR
- **ACME** (incl. BRE, E-FIELD Flames): gaseous fuels, modular ACME in CIR
- **SPICE**: soot/smoke point, MSG + SPICE flow duct
- **SLICE**: flame structure and liftoff, MSG + SPICE flow duct

Hardware grouping (A7) must appear in the UI: "ACME group", "MDCA group", "SPICE duct group".

Known gap to display honestly: no partial-gravity data in PSI (A9). Rocket/propellant fire safety is out of scope.

### B3. Cerebras client (server-only): `src/lib/cerebras.ts`

Imported ONLY inside `createServerFn` handlers. Never import into a route file or component.

```ts
// src/lib/cerebras.ts
const URL = "https://api.cerebras.ai/v1/chat/completions"

export async function cerebrasJSON(system: string, user: string) {
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CEREBRAS_API_KEY!}`,
    },
    body: JSON.stringify({
      model: "qwen-3.8-27b",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      max_completion_tokens: 2048,
      top_p: 0.95,
      response_format: { type: "json_object" },
      stream: false,
    }),
  })
  if (!res.ok) throw new Error(`Cerebras ${res.status}: ${await res.text()}`)
  const json = await res.json()
  return JSON.parse(json.choices[0].message.content)
}

export async function cerebrasStream(system: string, user: string) {
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CEREBRAS_API_KEY!}`,
    },
    body: JSON.stringify({
      model: "qwen-3.8-27b",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      max_completion_tokens: 800,
      top_p: 0.95,
      stream: true,
    }),
  })
  if (!res.ok) throw new Error(`Cerebras ${res.status}: ${await res.text()}`)
  return res
}
```

Notes:

- `reasoning_effort` is intentionally omitted (documented for GLM, not Qwen 3.8 27B). If a request returns 400, do not add it.
- JSON mode guarantees valid JSON, not a schema. Always wrap `JSON.parse` in try/catch and validate shape with a small hand-written guard.
- API key lives in `.env` as `CEREBRAS_API_KEY`; never expose to the browser.

### B4. Server functions: `src/server/functions.ts` (the entire backend)

All LLM calls and data access go through `createServerFn`. Routes call these and never touch the API key.

```ts
import { createServerFn } from "@tanstack/react-start"
import { investigations } from "~/data/investigations"
import { cerebrasJSON, cerebrasStream } from "~/lib/cerebras"

// 4.1 Filter (pure, no LLM)
export const listInvestigations = createServerFn({ method: "GET" })
  .validator(
    (f: {
      pillars?: string[]
      fuelPhase?: string
      minOxygen?: number
      maxOxygen?: number
      hardware?: string
      group?: "ACME" | "MDCA" | "SPICE"
    }) => f
  )
  .handler(async ({ data }) => {
    // simple filter over the in-memory array
    return investigations.filter(/* apply filters */)
  })

// 4.2 Detail (no LLM, just returns the record)
export const getInvestigation = createServerFn({ method: "GET" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const inv = investigations.find((i) => i.id === id)
    if (!inv) throw new Error("Not found")
    return inv
  })

// 4.3 Rank by scenario (LLM; send the whole catalog, it's tiny)
export const rankInvestigations = createServerFn({ method: "POST" })
  .validator(
    (s: {
      environment: string
      oxygenPct: number
      pressurePsi: number
      fuelPhase: string
      priorities: string[]
    }) => s
  )
  .handler(async ({ data: scenario }) => {
    const system = `You are a spacecraft fire-safety analyst. Rank the
candidate investigations by relevance to the use case. Return ONLY a JSON
object with this exact shape:
{"ranked":[{"id":"string","score":0,"justification":"one sentence citing
fuel, O2 %, hardware, or findings","pillars":["prevention"],"assumptions":["string"]}]}
Rules: score 0-100. Justify with concrete attributes. If a ranking rests on an
assumption, list it. If no candidates are relevant, return {"ranked":[]}.`
    const user = JSON.stringify({
      useCase: scenario,
      candidates: investigations.map((i) => ({
        id: i.id,
        title: i.title,
        pillars: i.pillars,
        fuel: i.fuel,
        conditions: i.conditions,
        hardware: i.hardware,
        findings: i.keyFindings,
        relevance: i.fireSafetyRelevance,
      })),
    })
    const raw = await cerebrasJSON(system, user)
    // hand-validate shape before returning
    if (!raw || !Array.isArray(raw.ranked)) throw new Error("Bad LLM output")
    return { ranked: raw.ranked }
  })

// 4.4 Streaming summary (LLM)
export const summarizeInvestigation = createServerFn({ method: "POST" })
  .validator((p: { id: string; audience: "researcher" | "student" }) => p)
  .handler(async ({ data }) => {
    const inv = investigations.find((i) => i.id === data.id)
    if (!inv) throw new Error("Not found")
    const system = `Summarize this NASA microgravity combustion investigation
for a ${data.audience}. Cover: (1) what was tested, (2) the key finding,
(3) why it matters for fire safety in space. Max 120 words. Cite the
investigation ID. Do not invent numbers.`
    const user = JSON.stringify(inv)
    return cerebrasStream(system, user) // return the ReadableStream to client
  })

// 4.5 Compare (pure, no LLM; normalize fields)
export const compareInvestigations = createServerFn({ method: "POST" })
  .validator((ids: string[]) => ids)
  .handler(async ({ data: ids }) => {
    return ids
      .map((id) => investigations.find((i) => i.id === id))
      .filter(Boolean)
  })
```

Returning a `Response`/`ReadableStream` from a server function and piping it to the client is fine: call `summarizeInvestigation` from the component, then read the stream in the browser with `response.body.getReader()`.

### B5. Routes (TanStack Start file-based)

```
src/routes/
  __root.tsx                 # shadcn nav shell, theme toggle
  index.tsx                  # landing: mission hook, Apollo 1 / 13 / Mir cards (+ one static spinoff card)
  investigations/index.tsx   # filter panel + results list + scenario ranking
  investigations/$id.tsx     # detail + streaming AI summary
  compare.tsx                # side-by-side table (up to 3)
  insights.tsx               # O2 chart + hardware groups + data-gap alert
```

Loaders call `listInvestigations` / `getInvestigation` (isomorphic, safe in loaders). Never import `cerebras.ts` from a route file.

### B6. UI behavior (shadcn mapping)

| Need                    | Component                                                                                                         |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Investigation cards     | Card + Badge (pillars) + Button (View)                                                                            |
| Results list            | flex/grid of Cards, or Table on wide screens                                                                      |
| Filters                 | Sheet on mobile / sidebar on desktop: Select (fuel phase, hardware, group), Slider (O2 range), Checkbox (pillars) |
| Scenario form (ranking) | Card + Select (environment), Input (O2 %), Slider (pressure), Checkbox group (priorities), Button (Rank)          |
| Ranked results          | Table: Rank, ID, Score, Justification, Pillars                                                                    |
| AI summary              | Card + ScrollArea, stream chunks with a blinking cursor                                                           |
| Loading                 | Skeleton                                                                                                          |
| Data gap                | Alert (info) on insights page and detail page footer                                                              |
| Compare                 | Table, one column per investigation                                                                               |
| Filter chips            | Badge with X                                                                                                      |

Interaction rules:

- Filters are instant: load the array once in the route loader and filter client-side (no network round-trip).
- Ranking calls `rankInvestigations` on submit; show one Skeleton row per expected result while loading.
- Detail page calls `summarizeInvestigation` on mount and renders streamed tokens.
- No caching library. If rate-limited, show an Alert: "Please wait a few seconds and try again."
- Audience toggle (researcher / student) for summaries, matching the challenge's audience (A4).

### B7. Insights page (pure client, no LLM)

1. **O2 flammability chart**: plot `oxygenPct` across investigations, with horizontal reference lines at 21% (Earth), 30% (lunar base), 85% (CFI-G max).
2. **Hardware groups**: three Cards (ACME / MDCA / SPICE duct), each listing its investigations as clickable Badges.
3. **Alert**: "No partial-gravity combustion data exists in PSI yet. Future: LUCI, FM2. Microgravity + normal-gravity results bound intermediate behavior. Rocket propellant fire safety is out of scope."

### B8. Prompts and guardrails

Ranking prompt (B4 / 4.3) and summary prompt (B4 / 4.4) stay verbatim unless testing reveals a concrete failure.

- Parse LLM JSON in try/catch; on failure return an empty `ranked` array and show "The model could not produce a ranking. Try again."
- Reject any `id` returned by the model that is not in the investigations array.
- Never display an LLM-generated number (O2 %, pressure) absent from the source record. Label all AI text with a small "AI-generated" badge.

### B9. Env

```
CEREBRAS_API_KEY=...
```

Server-side only. Do NOT prefix with `VITE_`.

### B10. Build order

1. `src/data/investigations.ts` with all investigations filled in.
2. `src/lib/cerebras.ts`.
3. `src/server/functions.ts` with the five server functions.
4. Routes: index → investigations → investigations/$id → compare → insights.
5. Build each page with shadcn components per B6.
6. Manual tests: rank for "lunar_base, 30% O2, solid fuel" (BASS / Saffire should rank high); stream a summary for FLEX (should mention CO2/He dilution).

### B11. Out of scope (do not build)

- Database, ORM, migrations, seed scripts
- Vector store, embeddings, RAG
- Caching layer, queue, retry framework (a try/catch and a user-facing Alert is enough)
- Auth, accounts, persistence
- Deployment config, Dockerfiles, CI, infra files
- Tests beyond manual smoke-testing the five server functions
- Partial-gravity features, incident timeline data beyond the three static landing cards, spinoffs page beyond one static card

### B12. Done when

- All five server functions return correct data.
- Ranking works for at least one realistic scenario and shows justifications.
- Streaming summary renders incrementally on the detail page.
- Compare page shows up to 3 investigations side by side.
- Insights page shows the O2 chart, hardware groups, and data-gap alert.
- Landing page links the three historical incidents (Apollo 1, Apollo 13, Mir).
- App runs locally with `bun run dev` and `CEREBRAS_API_KEY` set.

---

## PART C: OPEN NOTES FOR THE AGENT (discrepancies spotted while merging)

- The spec says "~12 investigations" but the seed list names about 15 records; treat the list as authoritative.
- The challenge says ACME comprises six experiments but names only BRE, E-FIELD Flames, and CFI-G. Look up the other three on the NASA Combustion Science page (A10) rather than guessing. Until confirmed, keep the ACME group to verified members.
- The challenge text mentions both "Advanced" and "Intermediate" difficulty; aim for a polished but simple build.
- Saffire-I/II/III are not in any hardware group; show them ungrouped.
- Challenge optional goals not in the build spec (Earth applications, predictive-modeling data export) are covered only by the single static spinoff card; do not expand without being asked.

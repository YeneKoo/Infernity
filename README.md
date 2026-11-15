# Infernity — Flame in Freefall

Infernity is a fire-safety dashboard for NASA's microgravity combustion research. It turns the public PSI record into a catalog you can filter, compare, and rank against a habitat scenario — spacecraft, space station, lunar base, Mars base, pressurized rover, or spacesuit.

Built for the **2026 NASA Space Apps Challenge**, Space Exploration track.

## What it does

- **Explore 16 curated investigations** covering solid, liquid, and gaseous fuels — BASS, BASS-II, Saffire I–III, SAME, SAME-R, DAFT, DAFT-2, FLEX, FLEX-2, CFI, CFI-G, ACME, SPICE, and SLICE.
- **Filter instantly** by fire-safety pillar, fuel phase, hardware group, facility, free-text search, and oxygen range. Filtering happens in the browser after one catalog load.
- **Rank the catalog for your scenario.** Describe the environment, oxygen concentration, pressure, and priorities. The app sends the full catalog to your AI endpoint and returns a scored shortlist with justifications and stated assumptions.
- **Read the record.** Each investigation page shows fuel, test conditions, hardware, sensors, variables, objectives, findings, fire-safety relevance, and a source link.
- **Generate a streaming AI summary** for either a researcher or a student audience. Summaries are clearly labeled as AI-generated and cite the investigation ID.
- **Compare up to three investigations** side by side, with unknowns shown honestly rather than filled in.
- **See the bigger picture.** The insights page charts documented oxygen concentrations, maps the three hardware families (ACME, MDCA, SPICE duct), summarizes catalog coverage, and calls out the partial-gravity data gap.
- **Tell the story.** A 7-slide pitch deck at `/pitch` covers the risk, the data problem, the live demo, the stack, and the road ahead. Use arrow keys, the progress dots, or `F` for fullscreen.

- **Train as a Fire Marshal.** A no-LLM learning game with three missions — Pick the Pillar, Match the Mission, and O2 Danger Zone. Eight questions per run, three lives, streaks, optional timer, and links back to the investigations behind every answer.

## Contact

Questions, feedback, or demo requests: [support@fuastyle.com](mailto:support@fuastyle.com).

## Bring your own AI

Infernity does not ship an API key.

Click the **key icon** in the navigation bar and provide:

- the full OpenAI-compatible endpoint, for example `https://api.cerebras.ai/v1/chat/completions`
- the model ID your endpoint expects
- your API key

Settings are saved **only in this browser's localStorage**. The server does not persist them. Each AI request forwards the credentials to the endpoint you entered. If no endpoint is configured, ranking and summaries prompt you to add one; the rest of the app works without AI.

## Data

All curated records live in `src/data/investigations.ts`. Values come from public NASA and PSI pages. Unknown conditions are left blank rather than invented.

Primary sources:

- [NASA PSI data repository — Combustion Science](https://psi.nasa.gov/physci/repo/search?q=combustion)
- [NASA Combustion Science](https://www.nasa.gov/glenn/glenn-expertise-space-exploration/physical-sciences-program/combustion-science/)
- [A Researcher's Guide to ISS Combustion Science](https://www.nasa.gov/missions/station/a-researchers-guide-to-combustion-science/)

## Stack

- **TanStack Start** with file-based routing and `createServerFn`
- **React 19** + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** components
- **Any OpenAI-compatible chat-completions endpoint** for ranking and summaries
- **No database, no vector store, no RAG** — everything is in memory

## Run locally

```bash
bun install
bun run dev
```

Open the URL printed by Vite, usually `http://localhost:3000`.

No environment file is required. Configure AI from the key icon in the app.

Useful commands:

```bash
bun run generate-routes   # regenerate TanStack route tree
bun run typecheck         # TypeScript
bun run lint              # ESLint
bun run build             # production build
bun run preview           # preview a production build
```

## Project map

```text
src/
  data/investigations.ts    Curated catalog, hardware groups, types
  lib/cerebras.ts           OpenAI-compatible JSON + streaming client
  lib/ai-settings.ts        Browser-only endpoint/key persistence
  server/functions.ts       Five server functions (list, detail, rank, summarize, compare)
  routes/                   Landing, catalog, detail, compare, insights
  components/               Dashboard UI and shadcn components
```

## Scope and caveats

- No partial-gravity combustion data exists in PSI yet. LUCI and FM2 are expected future additions. Microgravity and normal-gravity results bound intermediate-gravity behavior.
- Rocket and propellant fire safety is out of scope: at rocket velocities, combustion is effectively gravity-independent.
- AI output is labeled and may be wrong. Verify numbers and conclusions against the source record before engineering use.
- No accounts, database, analytics, or server-side persistence.
- NASA does not endorse any non-U.S. Government entity. Follow the data-use terms of each linked source.

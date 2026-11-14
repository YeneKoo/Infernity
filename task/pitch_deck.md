## Pitch deck outline (12 slides)

1. **Title:** Infernity, "Flame in Freefall". One-line tagline: _Turning decades of space fire data into safety answers._ Add the team name and "2026 NASA Space Apps Challenge".
2. **The hook:** Apollo 1 (1967), Apollo 13, the Mir fire (1997), and the Artemis II smoke alarm quote. Message: fire in space can kill a crew.
3. **Why microgravity is different:** no buoyancy, so a flame becomes a blue sphere. Earth fire-safety intuition doesn't transfer.
4. **The new risk:** Moon bases will likely run at 30% O2 or more and about 10.2 psi or less, compared with Earth's 21% at 14.7 psi. That's a >40% O2 increase, so materials are much more flammable.
5. **The problem:** NASA's combustion data is public in PSI, but it is hard to find, compare, and interpret.
6. **Our solution:** Infernity, an AI-powered dashboard that summarizes, ranks, and interprets the investigations. Include a one-line description for each of the three jobs (summarize, rank, interpret) and who it's for (students, researchers, engineers).
7. **Live demo, part 1, Rank:** scenario "lunar base, 30% O2, solid fuel", with BASS and Saffire ranking high and a one-sentence justification for each.
8. **Live demo, part 2, Explore:** the detail page with the streaming AI summary (use FLEX, which shows CO2/helium suppression), plus the compare view.
9. **Insights:** the O2 chart with reference lines at 21%, 30%, and 85%, and the hardware groups (ACME, MDCA, SPICE duct) that organize the experiments.
10. **How it's built:** TanStack Start, shadcn/ui, Cerebras (fast inference), and curated NASA data. Add trust features: the AI only ranks the catalog, invented IDs are rejected, AI text is labeled, and numbers come from source records.
11. **Honesty and roadmap:** the partial-gravity gap (no data yet; LUCI and FM2 are coming), and rocket fire is out of scope. Next steps: ingest live PSI data, add LUCI/FM2 data, and add Earth spinoffs like the fire detector and firefighter gear.
12. **Close:** "Making the next giant leap a safer one." Add the team, a demo link, and a thank-you.

**Tips:** keep slides 7 and 8 as the live demo and record a backup video in case Wi-Fi fails. Use big visuals and few words. Only show facts that appear in the NASA material.

## TASK

```
Add a pitch deck to the existing Infernity app as a new route: src/routes/pitch.tsx.
Use only shadcn/ui + Tailwind, the same theme as the rest of the app. No new dependencies, no database, no LLM calls on this page.

Behavior:
- Full-screen slides, one at a time, 12 slides total, content below.
- Next/Prev with Button, ArrowLeft/ArrowRight keys, and click on progress dots.
- Progress bar at the top, slide counter "3 / 12" at the bottom.
- Press "F" for fullscreen. Simple fade/slide transition via Tailwind classes.
- Keep slide content in a typed array at src/data/pitch.ts (title, subtitle, bullets,
  optional "visual" key). Render slides from it.
- Slide 7 and 8 are demo slides: show a Card with a "Open live demo" Button linking to
  /investigations and /investigations/FLEX (use existing routes).
- Slide 9: reuse the O2 chart component from the insights page, and the three hardware
  group Cards.
- Slide 2: three Cards for Apollo 1, Apollo 13, Mir (reuse the landing page cards).
- Use Badge, Card, Alert where fitting. Large type (text-5xl titles, text-2xl body),
  max 4 short bullets per slide.
- Add a "Pitch" link in the nav in __root.tsx.

Slides (title: key points):
1. Infernity, "Flame in Freefall": Turning decades of space fire data into safety
   answers. 2026 NASA Space Apps Challenge. [team name placeholder]
2. When fire happens in space: Apollo 1 (1967), Apollo 13, Mir (1997), Artemis II
   smoke alarm.
3. Fire behaves differently in microgravity: no buoyancy, blue spherical flame,
   Earth intuition doesn't transfer.
4. The Moon makes it riskier: 30%+ O2 at 10.2 psi or less vs Earth 21% at 14.7 psi;
   >40% more oxygen, much more flammable materials.
5. The problem: data is public in NASA PSI but hard to find, compare, interpret.
6. Our solution: AI dashboard that summarizes, ranks, interprets. For students,
   researchers, engineers.
7. Demo: Rank by scenario ("lunar base, 30% O2, solid fuel") with live demo button.
8. Demo: Explore, streaming AI summary (FLEX) and compare view, with live demo button.
9. Insights: O2 chart (21% Earth, 30% Lunar, 85% CFI-G max) and hardware groups
   ACME / MDCA / SPICE duct.
10. How it's built: TanStack Start, shadcn/ui, Cerebras, curated NASA data.
    Trust: invented IDs rejected, AI text labeled, numbers from source records.
11. Honest gaps and roadmap: no partial-gravity data yet (LUCI, FM2 coming);
    rocket fire out of scope. Next: live PSI ingest, LUCI/FM2, Earth spinoffs.
12. Closing: "Making the next giant leap a safer one." Team, demo link, thank you.

Do not invent statistics beyond those listed. Keep it simple and working.
```

Team Name: Mr. Space G
Team Members:
. Robera Tena - Student
. Naol Tena - Developer

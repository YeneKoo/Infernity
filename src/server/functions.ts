import { createServerFn } from "@tanstack/react-start"
import {
  groupMemberIds,
  investigations,
  type HardwareGroupId,
  type Investigation,
  type Pillar,
} from "@/data/investigations"
import { cerebrasJSON, cerebrasStream } from "@/lib/cerebras"
import { isAiConfig, type AiConfig } from "@/lib/ai-settings"

export interface InvestigationFilters {
  pillars?: Pillar[]
  fuelPhase?: string
  minOxygen?: number
  maxOxygen?: number
  hardware?: string
  group?: HardwareGroupId
}

export interface Scenario {
  environment: string
  oxygenPct: number
  pressurePsi: number
  fuelPhase: string
  priorities: string[]
}

export interface RankedItem {
  id: string
  score: number
  justification: string
  pillars: Pillar[]
  assumptions: string[]
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function stringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.filter((item): item is string => typeof item === "string")
}

function validateRanking(raw: unknown, catalog: Investigation[]): RankedItem[] {
  if (!isRecord(raw) || !Array.isArray(raw.ranked)) {
    throw new Error("Bad LLM output")
  }

  const knownIds = new Set(catalog.map((item) => item.id))
  const seen = new Set<string>()
  const validPillars = new Set<Pillar>([
    "prevention",
    "detection",
    "suppression",
  ])

  return raw.ranked
    .flatMap((entry): RankedItem[] => {
      if (!isRecord(entry)) return []
      const id = typeof entry.id === "string" ? entry.id : ""
      if (!knownIds.has(id) || seen.has(id)) return []
      seen.add(id)

      const numericScore = Number(entry.score)
      if (!Number.isFinite(numericScore)) return []

      const pillars = stringArray(entry.pillars).filter(
        (pillar): pillar is Pillar => validPillars.has(pillar as Pillar)
      )

      const source = catalog.find((item) => item.id === id)

      return [
        {
          id,
          score: Math.max(0, Math.min(100, Math.round(numericScore))),
          justification:
            typeof entry.justification === "string"
              ? entry.justification
              : "No justification provided.",
          pillars: pillars.length > 0 ? pillars : (source?.pillars ?? []),
          assumptions: stringArray(entry.assumptions),
        },
      ]
    })
    .sort((a, b) => b.score - a.score)
}

export const listInvestigations = createServerFn({ method: "GET" })
  .validator((f: InvestigationFilters = {}) => f)
  .handler(async ({ data }) => {
    const oxygenActive =
      (data.minOxygen ?? 0) > 0 || (data.maxOxygen ?? 100) < 100

    return investigations.filter((item) => {
      if (
        data.pillars &&
        data.pillars.length > 0 &&
        !data.pillars.every((pillar) => item.pillars.includes(pillar))
      ) {
        return false
      }
      if (data.fuelPhase && data.fuelPhase !== "all") {
        if (item.fuel.phase !== data.fuelPhase) return false
      }
      if (data.group) {
        if (!groupMemberIds[data.group].includes(item.id)) return false
      }
      if (data.hardware && data.hardware !== "all") {
        if (!item.hardware.facility?.includes(data.hardware)) return false
      }
      if (oxygenActive) {
        const oxygen = item.conditions.oxygenPct
        if (oxygen === undefined) return false
        if (data.minOxygen !== undefined && oxygen < data.minOxygen)
          return false
        if (data.maxOxygen !== undefined && oxygen > data.maxOxygen)
          return false
      }
      return true
    })
  })

export const getInvestigation = createServerFn({ method: "GET" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const inv = investigations.find((item) => item.id === id)
    if (!inv) throw new Error("Not found")
    return inv
  })

export const rankInvestigations = createServerFn({ method: "POST" })
  .validator((request: { scenario: Scenario; ai: AiConfig }) => request)
  .handler(async ({ data }) => {
    const { scenario, ai } = data
    if (!isAiConfig(ai)) {
      return {
        ranked: [] as RankedItem[],
        failed: true,
        reason: "config" as const,
      }
    }

    const system = `You are a spacecraft fire-safety analyst. Rank the
candidate investigations by relevance to the use case. Return ONLY a JSON
object with this exact shape:
{"ranked":[{"id":"string","score":0,"justification":"one sentence citing
fuel, O2 %, hardware, or findings","pillars":["prevention"],"assumptions":["string"]}]}
Rules: score 0-100. Justify with concrete attributes. If a ranking rests on an
assumption, list it. If no candidates are relevant, return {"ranked":[]}.`

    const user = JSON.stringify({
      useCase: scenario,
      candidates: investigations.map((item) => ({
        id: item.id,
        title: item.title,
        pillars: item.pillars,
        fuel: item.fuel,
        conditions: item.conditions,
        hardware: item.hardware,
        findings: item.keyFindings,
        relevance: item.fireSafetyRelevance,
      })),
    })

    let raw: unknown
    try {
      raw = await cerebrasJSON(ai, system, user)
    } catch {
      return {
        ranked: [] as RankedItem[],
        failed: true,
        reason: "endpoint" as const,
      }
    }

    try {
      return { ranked: validateRanking(raw, investigations), failed: false }
    } catch {
      return {
        ranked: [] as RankedItem[],
        failed: true,
        reason: "parse" as const,
      }
    }
  })

export const summarizeInvestigation = createServerFn({ method: "POST" })
  .validator(
    (p: { id: string; audience: "researcher" | "student"; ai: AiConfig }) => p
  )
  .handler(async ({ data }) => {
    const inv = investigations.find((item) => item.id === data.id)
    if (!inv) throw new Error("Not found")
    if (!isAiConfig(data.ai)) throw new Error("AI endpoint not configured")

    const system = `Summarize this NASA microgravity combustion investigation
for a ${data.audience}. Cover: (1) what was tested, (2) the key finding,
(3) why it matters for fire safety in space. Max 120 words. Cite the
investigation ID. Do not invent numbers.`

    return cerebrasStream(data.ai, system, JSON.stringify(inv))
  })

export const compareInvestigations = createServerFn({ method: "POST" })
  .validator((ids: string[]) => ids)
  .handler(async ({ data: ids }) => {
    const unique = Array.from(new Set(ids)).slice(0, 3)
    return unique
      .map((id) => investigations.find((item) => item.id === id))
      .filter((item): item is Investigation => Boolean(item))
  })

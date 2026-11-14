import type { AiConfig } from "@/lib/ai-settings"

function headers(config: AiConfig): HeadersInit {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${config.apiKey}`,
  }
}

function reasoningEffort(config: AiConfig) {
  try {
    return new URL(config.endpoint).hostname === "api.cerebras.ai"
      ? { reasoning_effort: "low" }
      : {}
  } catch {
    return {}
  }
}

function parseContent(raw: unknown): unknown {
  if (typeof raw !== "string" || !raw.trim()) {
    throw new Error("AI endpoint returned an empty response")
  }
  const cleaned = raw
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
  return JSON.parse(cleaned)
}

export async function cerebrasJSON(
  config: AiConfig,
  system: string,
  user: string
) {
  const res = await fetch(config.endpoint, {
    method: "POST",
    headers: headers(config),
    body: JSON.stringify({
      model: config.model,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      max_tokens: 8192,
      top_p: 0.95,
      ...reasoningEffort(config),
      response_format: { type: "json_object" },
      stream: false,
    }),
  })
  if (!res.ok) throw new Error(`AI endpoint ${res.status}: ${await res.text()}`)
  const json = await res.json()
  return parseContent(json.choices?.[0]?.message?.content)
}

export async function cerebrasStream(
  config: AiConfig,
  system: string,
  user: string
) {
  const res = await fetch(config.endpoint, {
    method: "POST",
    headers: headers(config),
    body: JSON.stringify({
      model: config.model,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      max_tokens: 2048,
      top_p: 0.95,
      ...reasoningEffort(config),
      stream: true,
    }),
  })
  if (!res.ok) throw new Error(`AI endpoint ${res.status}: ${await res.text()}`)
  return res
}

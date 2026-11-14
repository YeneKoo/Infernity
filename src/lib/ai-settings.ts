export const AI_CONFIG_KEY = "infernity-ai-config"
export const AI_SETTINGS_EVENT = "infernity:open-ai-settings"
export const AI_SETTINGS_CHANGED_EVENT = "infernity:ai-settings-changed"
export const DEFAULT_MODEL = "qwen-3.8-27b"

export interface AiConfig {
  endpoint: string
  apiKey: string
  model: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

export function isAiConfig(value: unknown): value is AiConfig {
  if (!isRecord(value)) return false
  const { endpoint, apiKey, model } = value
  if (
    typeof endpoint !== "string" ||
    typeof apiKey !== "string" ||
    typeof model !== "string"
  ) {
    return false
  }
  if (!endpoint.trim() || !apiKey.trim() || !model.trim()) return false
  try {
    const url = new URL(endpoint)
    return url.protocol === "https:" || url.protocol === "http:"
  } catch {
    return false
  }
}

export function loadAiConfig(): AiConfig | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(AI_CONFIG_KEY)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    return isAiConfig(parsed)
      ? {
          endpoint: parsed.endpoint.trim(),
          apiKey: parsed.apiKey.trim(),
          model: parsed.model.trim(),
        }
      : null
  } catch {
    return null
  }
}

export function saveAiConfig(config: AiConfig) {
  if (typeof window === "undefined") return
  const normalized: AiConfig = {
    endpoint: config.endpoint.trim(),
    apiKey: config.apiKey.trim(),
    model: config.model.trim(),
  }
  window.localStorage.setItem(AI_CONFIG_KEY, JSON.stringify(normalized))
  window.dispatchEvent(new Event(AI_SETTINGS_CHANGED_EVENT))
}

export function clearAiConfig() {
  if (typeof window === "undefined") return
  window.localStorage.removeItem(AI_CONFIG_KEY)
  window.dispatchEvent(new Event(AI_SETTINGS_CHANGED_EVENT))
}

export function requestAiSettings() {
  if (typeof window === "undefined") return
  window.dispatchEvent(new Event(AI_SETTINGS_EVENT))
}

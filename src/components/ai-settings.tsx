import { useEffect, useState, type FormEvent } from "react"
import { Check, Eye, EyeOff, KeyRound, ShieldCheck, Trash2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AI_SETTINGS_CHANGED_EVENT,
  AI_SETTINGS_EVENT,
  DEFAULT_MODEL,
  clearAiConfig,
  isAiConfig,
  loadAiConfig,
  saveAiConfig,
} from "@/lib/ai-settings"

export function AiSettingsButton() {
  const [open, setOpen] = useState(false)
  const [configured, setConfigured] = useState(false)
  const [endpoint, setEndpoint] = useState("")
  const [apiKey, setApiKey] = useState("")
  const [model, setModel] = useState(DEFAULT_MODEL)
  const [showKey, setShowKey] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const sync = () => setConfigured(Boolean(loadAiConfig()))
    sync()
    window.addEventListener(AI_SETTINGS_CHANGED_EVENT, sync)
    return () => window.removeEventListener(AI_SETTINGS_CHANGED_EVENT, sync)
  }, [])

  useEffect(() => {
    const openSettings = () => setOpen(true)
    window.addEventListener(AI_SETTINGS_EVENT, openSettings)
    return () => window.removeEventListener(AI_SETTINGS_EVENT, openSettings)
  }, [])

  useEffect(() => {
    if (!open) return
    const config = loadAiConfig()
    setEndpoint(config?.endpoint ?? "")
    setApiKey(config?.apiKey ?? "")
    setModel(config?.model ?? DEFAULT_MODEL)
    setShowKey(false)
    setError(null)
  }, [open])

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const candidate = { endpoint, apiKey, model }
    if (!isAiConfig(candidate)) {
      setError(
        "Enter the full chat-completions URL (https://.../chat/completions), a model ID, and an API key."
      )
      return
    }
    try {
      saveAiConfig(candidate)
      setOpen(false)
    } catch {
      setError(
        "This browser blocked localStorage. Allow site storage and try again."
      )
    }
  }

  function clear() {
    try {
      clearAiConfig()
      setEndpoint("")
      setApiKey("")
      setModel(DEFAULT_MODEL)
      setError(null)
    } catch {
      setError(
        "This browser blocked localStorage. Allow site storage and try again."
      )
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Configure AI endpoint"
            className="relative"
            title={
              configured
                ? "AI endpoint configured"
                : "Add your OpenAI-compatible endpoint"
            }
          />
        }
      >
        <KeyRound />
        {configured ? (
          <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-emerald-500" />
        ) : null}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <KeyRound className="size-3.5 text-primary" />
            Your AI endpoint
          </DialogTitle>
          <DialogDescription>
            Infernity does not ship an API key. Add any OpenAI-compatible
            chat-completions endpoint and use your own credentials.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="ai-endpoint">Full endpoint URL</Label>
            <Input
              id="ai-endpoint"
              value={endpoint}
              onChange={(event) => setEndpoint(event.target.value)}
              placeholder="https://api.cerebras.ai/v1/chat/completions"
              autoComplete="url"
              spellCheck={false}
            />
            <p className="text-[10px] text-muted-foreground">
              Include the complete path, usually ending in
              <span className="font-mono"> /chat/completions</span>.
            </p>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="ai-model">Model ID</Label>
            <Input
              id="ai-model"
              value={model}
              onChange={(event) => setModel(event.target.value)}
              placeholder={DEFAULT_MODEL}
              autoComplete="off"
              spellCheck={false}
            />
            <p className="text-[10px] text-muted-foreground">
              Use the exact model name your endpoint expects.
            </p>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="ai-key">API key</Label>
            <div className="relative">
              <Input
                id="ai-key"
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(event) => setApiKey(event.target.value)}
                placeholder="sk-..."
                autoComplete="off"
                spellCheck={false}
                className="pr-9 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowKey((current) => !current)}
                aria-label={showKey ? "Hide API key" : "Show API key"}
                className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showKey ? (
                  <EyeOff className="size-3.5" />
                ) : (
                  <Eye className="size-3.5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex gap-2 border border-emerald-500/25 bg-emerald-500/5 p-2.5">
            <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-emerald-500" />
            <p className="text-[10px] leading-relaxed text-muted-foreground">
              Saved only in this browser&apos;s localStorage. Nothing is saved
              to Infernity&apos;s server. Each AI request forwards these
              credentials to the endpoint you enter.
            </p>
          </div>

          {error ? (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}

          <DialogFooter className="sm:items-center sm:justify-between">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clear}
              disabled={!configured && !endpoint && !apiKey}
            >
              <Trash2 data-icon="inline-start" />
              Clear
            </Button>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm">
                <Check data-icon="inline-start" />
                Save locally
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

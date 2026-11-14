import { useEffect, useRef, useState } from "react"
import { KeyRound, RefreshCw, Sparkles, TriangleAlert } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarkdownView } from "@/components/markdown-view"
import { summarizeInvestigation } from "@/server/functions"
import {
  AI_SETTINGS_CHANGED_EVENT,
  loadAiConfig,
  requestAiSettings,
} from "@/lib/ai-settings"

type Audience = "researcher" | "student"

export function AiSummary({ id }: { id: string }) {
  const [audience, setAudience] = useState<Audience>("researcher")
  const [text, setText] = useState("")
  const [streaming, setStreaming] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [needsConfig, setNeedsConfig] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    let reader: ReadableStreamDefaultReader<Uint8Array> | undefined

    const ai = loadAiConfig()
    setText("")
    setError(null)

    if (!ai) {
      setStreaming(false)
      setNeedsConfig(true)
      return
    }

    setNeedsConfig(false)
    setStreaming(true)
    const config = ai

    async function run() {
      try {
        const response = await summarizeInvestigation({
          data: { id, audience, ai: config },
        })
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        if (!response.body) throw new Error("No stream body")

        reader = response.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ""

        for (;;) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split("\n")
          buffer = lines.pop() ?? ""

          for (const line of lines) {
            const trimmed = line.trim()
            if (!trimmed.startsWith("data:")) continue
            const payload = trimmed.slice(5).trim()
            if (!payload || payload === "[DONE]") continue

            try {
              const json = JSON.parse(payload)
              const chunk = json?.choices?.[0]?.delta?.content
              if (typeof chunk === "string" && chunk.length > 0) {
                if (!cancelled) setText((current) => current + chunk)
              }
            } catch {
              continue
            }
          }
        }

        if (!cancelled) setStreaming(false)
      } catch {
        if (!cancelled) {
          setError(
            "The summary could not be generated. Check your endpoint and key, then try again."
          )
          setStreaming(false)
        }
      }
    }

    run()

    return () => {
      cancelled = true
      reader?.cancel().catch(() => undefined)
    }
  }, [id, audience, attempt])

  useEffect(() => {
    const retry = () => setAttempt((current) => current + 1)
    window.addEventListener(AI_SETTINGS_CHANGED_EVENT, retry)
    return () => window.removeEventListener(AI_SETTINGS_CHANGED_EVENT, retry)
  }, [])

  useEffect(() => {
    const viewport = scrollRef.current?.querySelector<HTMLElement>(
      "[data-slot=scroll-area-viewport]"
    )
    if (viewport) viewport.scrollTop = viewport.scrollHeight
  }, [text])

  return (
    <Card className="hairline">
      <CardHeader className="border-b">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="size-3.5 text-primary" />
            AI summary
          </CardTitle>
          <Badge
            variant="outline"
            className="gap-1 border-primary/30 bg-primary/5 text-[9px] tracking-wider text-primary"
          >
            <Sparkles className="size-2.5" />
            AI-GENERATED
          </Badge>
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <Tabs
            value={audience}
            onValueChange={(value) => setAudience(value as Audience)}
          >
            <TabsList>
              <TabsTrigger value="researcher">Researcher</TabsTrigger>
              <TabsTrigger value="student">Student</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => setAttempt((current) => current + 1)}
            disabled={streaming}
          >
            <RefreshCw data-icon="inline-start" />
            Regenerate
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-3">
        {needsConfig ? (
          <Alert>
            <KeyRound />
            <AlertDescription>
              <p>
                AI summaries run on your own OpenAI-compatible endpoint. Add a
                full endpoint URL and API key to generate this summary.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={requestAiSettings}
              >
                <KeyRound data-icon="inline-start" />
                Add endpoint and key
              </Button>
            </AlertDescription>
          </Alert>
        ) : error ? (
          <Alert variant="destructive">
            <TriangleAlert />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <div ref={scrollRef}>
            <ScrollArea className="h-56 pr-3">
              {!text && streaming ? (
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-[92%]" />
                  <Skeleton className="h-3 w-[86%]" />
                  <Skeleton className="h-3 w-[70%]" />
                  <p className="mt-2 text-[10px] text-muted-foreground">
                    Streaming from your endpoint...
                  </p>
                </div>
              ) : (
                <div>
                  <MarkdownView>{text}</MarkdownView>
                  {streaming ? (
                    <span className="caret-blink mt-1 inline-block h-3 w-1.5 bg-primary" />
                  ) : null}
                </div>
              )}
              {!streaming && !text && !error ? (
                <p className="text-[11px] text-muted-foreground">
                  The model returned an empty summary. Try regenerating.
                </p>
              ) : null}
            </ScrollArea>
          </div>
        )}

        <p className="mt-3 border-t pt-3 text-[9px] leading-relaxed text-muted-foreground">
          Generated from the curated record only. The model is instructed not to
          invent numbers; verify all values against the source before
          engineering use.
        </p>
      </CardContent>
    </Card>
  )
}

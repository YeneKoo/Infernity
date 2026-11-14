import ReactMarkdown, { type Components } from "react-markdown"
import remarkGfm from "remark-gfm"
import { cn } from "@/lib/utils"

type WithNode = { node?: unknown }

function attrs<T extends WithNode>(props: T): Omit<T, "node"> {
  const { node, ...rest } = props
  void node
  return rest
}

const components: Components = {
  h1: (props) => (
    <h1
      className="mt-3 mb-1.5 text-sm font-semibold tracking-tight text-foreground first:mt-0"
      {...attrs(props)}
    />
  ),
  h2: (props) => (
    <h2
      className="mt-3 mb-1.5 text-sm font-semibold tracking-tight text-foreground first:mt-0"
      {...attrs(props)}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-2.5 mb-1 text-[12px] font-semibold tracking-tight text-foreground first:mt-0"
      {...attrs(props)}
    />
  ),
  h4: (props) => (
    <h4
      className="mt-2 mb-1 text-[12px] font-semibold text-foreground first:mt-0"
      {...attrs(props)}
    />
  ),
  p: (props) => (
    <p
      className="mb-2.5 text-[12px] leading-relaxed text-foreground/90 last:mb-0"
      {...attrs(props)}
    />
  ),
  strong: (props) => (
    <strong className="font-semibold text-foreground" {...attrs(props)} />
  ),
  em: (props) => <em className="italic" {...attrs(props)} />,
  a: (props) => (
    <a
      className="text-primary underline underline-offset-2 hover:text-primary/80"
      target="_blank"
      rel="noreferrer"
      {...attrs(props)}
    />
  ),
  ul: (props) => (
    <ul
      className="mb-2.5 flex list-disc flex-col gap-1 pl-4 marker:text-primary last:mb-0"
      {...attrs(props)}
    />
  ),
  ol: (props) => (
    <ol
      className="mb-2.5 flex list-decimal flex-col gap-1 pl-4 marker:text-primary last:mb-0"
      {...attrs(props)}
    />
  ),
  li: (props) => (
    <li
      className="pl-0.5 text-[12px] leading-relaxed text-foreground/90"
      {...attrs(props)}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-2.5 border-l-2 border-primary/50 pl-3 text-[12px] leading-relaxed text-muted-foreground italic"
      {...attrs(props)}
    />
  ),
  code: (props) => (
    <code
      className="bg-muted px-1 py-0.5 font-mono text-[11px] text-foreground"
      {...attrs(props)}
    />
  ),
  pre: (props) => (
    <pre
      className="my-2.5 overflow-x-auto border bg-muted/50 p-2.5 font-mono text-[11px] leading-relaxed last:mb-0"
      {...attrs(props)}
    />
  ),
  hr: (props) => <hr className="my-3 border-border" {...attrs(props)} />,
  table: (props) => (
    <div className="my-3 overflow-x-auto">
      <table
        className="w-full border-collapse text-left text-[11px]"
        {...attrs(props)}
      />
    </div>
  ),
  thead: (props) => <thead className="bg-muted/40" {...attrs(props)} />,
  th: (props) => (
    <th
      className="border border-border px-2 py-1 font-medium text-foreground"
      {...attrs(props)}
    />
  ),
  td: (props) => (
    <td className="border border-border px-2 py-1" {...attrs(props)} />
  ),
  del: (props) => <del className="line-through" {...attrs(props)} />,
  img: (props) => (
    <img className="my-2 max-w-full border border-border" {...attrs(props)} />
  ),
}

export function MarkdownView({
  children,
  className,
}: {
  children: string
  className?: string
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  )
}

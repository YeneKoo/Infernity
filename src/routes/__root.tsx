import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router"
import { SiteFooter } from "@/components/site-footer"
import { SiteNav } from "@/components/site-nav"

import appCss from "../styles.css?url"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Infernity - Flame in Freefall",
      },
      {
        name: "description",
        content:
          "A fire-safety dashboard for NASA's microgravity combustion investigations. Explore, compare, and rank findings for spacecraft, lunar bases, and pressurized rovers.",
      },
      {
        name: "theme-color",
        content: "#121216",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/favicon.svg",
      },
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
        sizes: "16x16 24x24 32x32 48x48 64x64",
      },
      {
        rel: "apple-touch-icon",
        href: "/icon-192.png",
      },
      {
        rel: "manifest",
        href: "/manifest.json",
      },
    ],
  }),
  notFoundComponent: () => (
    <main className="mx-auto flex min-h-[60svh] w-full max-w-2xl flex-col items-start justify-center gap-3 px-4">
      <p className="font-mono text-[10px] tracking-[0.2em] text-primary">
        404 / LOST SIGNAL
      </p>
      <h1 className="text-2xl font-medium tracking-tight">
        This experiment is not in the catalog.
      </h1>
      <p className="text-xs text-muted-foreground">
        Return to the investigation index or rank the full catalog for a
        scenario.
      </p>
      <a
        href="/investigations"
        className="mt-2 border border-primary/40 bg-primary/10 px-3 py-1.5 text-[11px] text-primary hover:bg-primary/20"
      >
        Browse investigations
      </a>
    </main>
  ),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("infernity-theme");if(t==="light"){document.documentElement.classList.remove("dark")}}catch(e){}})()`,
          }}
        />
        <HeadContent />
      </head>
      <body>
        <div className="flex min-h-svh flex-col">
          <SiteNav />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <Scripts />
      </body>
    </html>
  )
}

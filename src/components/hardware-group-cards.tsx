import { Link } from "@tanstack/react-router"
import { Droplets, Orbit, Wind } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  groupMemberIds,
  hardwareGroups,
  type HardwareGroupId,
  type Investigation,
} from "@/data/investigations"

const groupIcons: Record<HardwareGroupId, typeof Orbit> = {
  ACME: Orbit,
  MDCA: Droplets,
  SPICE: Wind,
}

export function HardwareGroupCards({
  items,
  compact = false,
}: {
  items: Investigation[]
  compact?: boolean
}) {
  return (
    <>
      {hardwareGroups.map((group) => {
        const Icon = groupIcons[group.id]
        if (compact) {
          return (
            <Card key={group.id} className="hairline">
              <CardContent className="flex items-start gap-3 pt-4">
                <span className="flex size-8 shrink-0 items-center justify-center border border-primary/30 bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium">{group.label}</p>
                  <p className="mt-0.5 text-[9px] text-muted-foreground">
                    {groupMemberIds[group.id].length} catalog records
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {group.members.map((id) => {
                      const item = items.find((entry) => entry.id === id)
                      if (!item) return null
                      return (
                        <Badge
                          key={id}
                          variant="outline"
                          className="text-[9px] font-normal hover:border-primary/40 hover:text-primary"
                          render={
                            <Link to="/investigations/$id" params={{ id }} />
                          }
                        >
                          {item.title.replace(/\s*\(.*\)$/, "")}
                        </Badge>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        }
        return (
          <Card key={group.id} className="hairline">
            <CardHeader className="border-b">
              <div className="flex items-start justify-between gap-2">
                <span className="flex size-8 items-center justify-center border border-primary/30 bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </span>
                <Badge variant="outline" className="font-mono text-[9px]">
                  {group.facility}
                </Badge>
              </div>
              <CardTitle className="mt-3">{group.label}</CardTitle>
              <p className="text-[11px] leading-relaxed text-muted-foreground">
                {group.description}
              </p>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="flex flex-wrap gap-1">
                {group.members.map((id) => {
                  const item = items.find((entry) => entry.id === id)
                  if (!item) return null
                  return (
                    <Badge
                      key={id}
                      variant="outline"
                      className="text-[9px] font-normal hover:border-primary/40 hover:text-primary"
                      render={<Link to="/investigations/$id" params={{ id }} />}
                    >
                      {item.title.replace(/\s*\(.*\)$/, "")}
                    </Badge>
                  )
                })}
              </div>
              {group.subExperiments.length > 0 ? (
                <p className="mt-3 border-t pt-2 text-[9px] leading-relaxed text-muted-foreground">
                  Six ACME sub-experiments: {group.subExperiments.join(" / ")}.
                  BRE emulates condensed-fuel burning with a flat porous gas
                  burner.
                </p>
              ) : null}
              <p className="mt-3 text-[9px] text-muted-foreground">
                {groupMemberIds[group.id].length} catalog records
              </p>
            </CardContent>
          </Card>
        )
      })}
    </>
  )
}

import { Info } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function DataGapAlert({ compact = false }: { compact?: boolean }) {
  return (
    <Alert className="border-sky-500/25 bg-sky-500/[0.04]">
      <Info className="text-sky-500" />
      <AlertTitle>Partial-gravity data gap</AlertTitle>
      <AlertDescription>
        {compact
          ? "No partial-gravity combustion data exists in PSI yet. LUCI and FM2 are expected to fill this gap."
          : "No partial-gravity combustion data exists in PSI yet. Future experiments LUCI (Lunar-g Combustion Investigation) and FM2 (Flammability of Materials on the Moon) will address it. Microgravity and normal-gravity results bound intermediate-gravity behavior. Rocket and propellant fire safety is out of scope."}
      </AlertDescription>
    </Alert>
  )
}

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Settings } from "lucide-react"

const CURRENCIES = [
  { value: "usd", label: "US Dollar ($)" },
  { value: "gbp", label: "British Pound (£)" },
  { value: "inr", label: "Indian Rupee (₹)" },
  { value: "kwd", label: "Kuwaiti Dinar (KWD)" },
  { value: "aed", label: "UAE Dirham (AED)" },
] as const;

export function ProfileCurrencySelect() {
  return (
    <Select defaultValue="US Dollar ($)">
      <SelectTrigger className="w-full max-w-56 cursor-pointer">
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4 text-muted-foreground shrink-0" />
          <SelectValue placeholder="Select currency" />
        </div>
      </SelectTrigger>
      
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Account Currency</SelectLabel>
          {CURRENCIES.map((currency) => (
            <SelectItem className={'cursor-pointer'} key={currency.label} value={currency.label}>
              {currency.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
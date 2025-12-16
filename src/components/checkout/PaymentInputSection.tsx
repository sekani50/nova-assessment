import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CurrencySelector } from "./CurrencySelector"
import { Currency } from "@/types/checkout"
import { Card, CardContent } from "@/components/ui/card"

interface PaymentInputSectionProps {
  label: string
  amount: string
  onAmountChange: (amount: string) => void
  currency: string
  onCurrencyChange: (currency: string) => void
  currencies: Currency[]
  className?: string
}

export function PaymentInputSection({
  label,
  amount,
  onAmountChange,
  currency,
  onCurrencyChange,
  currencies,
  className,
}: PaymentInputSectionProps) {
  return (
    <div className={className}>
    
      <div className="rounded-3xl flex flex-col items-start justify-start border border-gray-200 bg-white p-4">
      <Label className="text-sm font-medium text-gray-500 mb-3 block">
        {label}
      </Label>
        <div className="flex  w-full justify-between gap-3 items-center">
          <Input
            type="number"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            placeholder="0.00"
            className="flex-1 text-2xl font-semibold border-0 p-0 h-auto focus-visible:ring-0 shadow-none"
            min="0"
            step="0.01"
          />
          <CurrencySelector
            currencies={currencies}
            value={currency}
            onValueChange={onCurrencyChange}
            className="w-[130px] shrink-0"
            modalClassName="w-[220px]"
          />
        </div>
      </div>
    </div>
  )
}


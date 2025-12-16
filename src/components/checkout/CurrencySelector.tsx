import { Select, SelectOption } from "@/components/ui/select"
import { Currency } from "@/types/checkout"

interface CurrencySelectorProps {
  currencies: Currency[]
  value?: string
  onValueChange: (value: string) => void
  className?: string
  modalClassName?:string;
}

export function CurrencySelector({
  currencies,
  value,
  onValueChange,
  className,
  modalClassName
}: CurrencySelectorProps) {
  const options: SelectOption[] = currencies.map((currency) => ({
    value: currency.code,
    label: currency.code,
    icon: currency.icon ? (
      <img 
        src={currency.icon} 
        alt={currency.name} 
        className="h-5 w-5 rounded-full object-contain"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.style.display = 'none'
        }}
      />
    ) : (
      <span className="text-xs font-semibold">{currency.symbol || currency.code}</span>
    ),
  }))

  return (
    <Select
      options={options}
      value={value}
      onValueChange={onValueChange}
      placeholder="Select currency"
      className={className}
      searchable
      modalClassName={modalClassName}
    />
  )
}


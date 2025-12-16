import { PaymentInputSection } from "./PaymentInputSection"
import { Select, SelectOption } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"
import { cryptocurrencies, fiatCurrencies, wallets, paymentMethods } from "@/data/mockData"
import { PaymentDetails } from "@/types/checkout"
import { paymentDetailsSchema } from "@/schema/global.schema"
import { useState } from "react"

interface PaymentDetailsFormProps {
  paymentDetails: PaymentDetails
  onPaymentDetailsChange: (details: PaymentDetails) => void
  onNext: () => void
}

export function PaymentDetailsForm({
  paymentDetails,
  onPaymentDetailsChange,
  onNext,
}: PaymentDetailsFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handlePayAmountChange = (amount: string) => {
    const updated = {
      ...paymentDetails,
      payAmount: amount,
      //? Mock conversion rate
      receiveAmount: (parseFloat(amount) * 1500).toFixed(2),
    }
    onPaymentDetailsChange(updated)
    //? Clear error when user starts typing
    if (errors.payAmount) {
      setErrors((prev) => ({ ...prev, payAmount: "" }))
    }
  }

  const handleReceiveAmountChange = (amount: string) => {
    const updated = {
      ...paymentDetails,
      receiveAmount: amount,
      //? Mock conversion rate
      payAmount: (parseFloat(amount) / 1500).toFixed(2),
    }
    onPaymentDetailsChange(updated)
    //? Clear error when user starts typing
    if (errors.receiveAmount) {
      setErrors((prev) => ({ ...prev, receiveAmount: "" }))
    }
  }

  const handleCurrencyChange = (field: "payCurrency" | "receiveCurrency", value: string) => {
    onPaymentDetailsChange({ ...paymentDetails, [field]: value })
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSelectChange = (field: "payFrom" | "payTo", value: string) => {
    onPaymentDetailsChange({ ...paymentDetails, [field]: value })
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const walletOptions: SelectOption[] = wallets.map((wallet) => ({
    value: wallet.id,
    label: wallet.name,
    icon: wallet.icon === "wallet-icon" ? (
      <Wallet className="h-5 w-5 text-gray-600" />
    ) : wallet.icon ? (
      <img 
        src={wallet.icon} 
        alt={wallet.name} 
        className="h-5 w-5 rounded object-contain"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.style.display = 'none'
        }}
      />
    ) : undefined,
  }))

  const paymentMethodOptions: SelectOption[] = paymentMethods.map((method) => ({
    value: method.value,
    label: method.label,
  }))

  const handleSubmit = () => {
    const result = paymentDetailsSchema.safeParse(paymentDetails)
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.errors.forEach((error: { path: (string | number)[]; message: string }) => {
        if (error.path[0]) {
          fieldErrors[error.path[0].toString()] = error.message
        }
      })
      setErrors(fieldErrors)
      return
    }
    setErrors({})
    onNext()
  }

  const isValid = paymentDetailsSchema.safeParse(paymentDetails).success

  return (
    <div className="space-y-6 min-h-[500px]">
      <div className="space-y-6">
        <PaymentInputSection
          label="You pay"
          amount={paymentDetails.payAmount}
          onAmountChange={handlePayAmountChange}
          currency={paymentDetails.payCurrency}
          onCurrencyChange={(currency) => handleCurrencyChange("payCurrency", currency)}
          currencies={cryptocurrencies}
        />
        {errors.payAmount && (
          <p className="text-sm text-red-600 -mt-4">{errors.payAmount}</p>
        )}
        {errors.payCurrency && (
          <p className="text-sm text-red-600 -mt-4">{errors.payCurrency}</p>
        )}

        <PaymentInputSection
          label="You receive"
          amount={paymentDetails.receiveAmount}
          onAmountChange={handleReceiveAmountChange}
          currency={paymentDetails.receiveCurrency}
          onCurrencyChange={(currency) => handleCurrencyChange("receiveCurrency", currency)}
          currencies={fiatCurrencies}
        />
        {errors.receiveAmount && (
          <p className="text-sm text-red-600 -mt-4">{errors.receiveAmount}</p>
        )}
        {errors.receiveCurrency && (
          <p className="text-sm text-red-600 -mt-4">{errors.receiveCurrency}</p>
        )}
      </div>

      <div className="space-y-5 pt-2">
        <div>
          <Label className="text-sm font-medium text-gray-500 mb-2 block">Pay from</Label>
          <Select
            options={walletOptions}
            value={paymentDetails.payFrom}
            onValueChange={(value) => handleSelectChange("payFrom", value)}
            placeholder="Select an option"
          />
          {errors.payFrom && (
            <p className="text-sm text-red-600 mt-1">{errors.payFrom}</p>
          )}
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-500 mb-2 block">Pay to</Label>
          <Select
            options={paymentMethodOptions}
            value={paymentDetails.payTo}
            onValueChange={(value) => handleSelectChange("payTo", value)}
            placeholder="Select an option"
          />
          {errors.payTo && (
            <p className="text-sm text-red-600 mt-1">{errors.payTo}</p>
          )}
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!isValid}
        className="w-full h-12 text-base font-medium rounded-3xl bg-[#013941] hover:bg-[#0D5D56] text-white disabled:opacity-50 disabled:cursor-not-allowed mt-8"
      >
        Convert now
      </Button>
    </div>
  )
}


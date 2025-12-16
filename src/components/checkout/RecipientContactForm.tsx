import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectOption } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { RecipientContactDetails } from "@/types/checkout"
import { recipientContactSchema } from "@/schema/global.schema"
import { useState } from "react"

interface RecipientContactFormProps {
  details: RecipientContactDetails
  onDetailsChange: (details: RecipientContactDetails) => void
  onBack: () => void
  onNext: () => void
}

const countryCodes: SelectOption[] = [
  { 
    value: "+234", 
    label: "+234",
    icon: <span className="text-base">🇳🇬</span>
  },
  { value: "+1", label: "+1" },
  { value: "+44", label: "+44" },
]

export function RecipientContactForm({
  details,
  onDetailsChange,
  onBack,
  onNext,
}: RecipientContactFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleEmailChange = (email: string) => {
    onDetailsChange({ ...details, email })
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }))
    }
  }

  const handlePhoneChange = (phoneNumber: string) => {
    onDetailsChange({ ...details, phoneNumber })
    if (errors.phoneNumber) {
      setErrors((prev) => ({ ...prev, phoneNumber: "" }))
    }
  }

  const handleCountryCodeChange = (countryCode: string) => {
    onDetailsChange({ ...details, countryCode })
    if (errors.countryCode) {
      setErrors((prev) => ({ ...prev, countryCode: "" }))
    }
  }

  const handleSubmit = () => {
    const result = recipientContactSchema.safeParse(details)
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

  const isValid = recipientContactSchema.safeParse(details).success

  return (
    <div className="flex flex-col items-start justify-start w-full  gap-y-6 min-h-[500px]">
      <div className="w-full flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 -ml-1"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <h2 className="text-sm font-medium text-[#013941]">Recipient details</h2>
        <p className="w-1 h-1"></p>
      </div>

      <div className="space-y-5 w-full pt-2">
        <div>
          <Label className="text-sm font-medium text-[#013941] mb-2 block">Recipient email</Label>
          <Input
            type="email"
            value={details.email}
            onChange={(e) => handleEmailChange(e.target.value)}
            placeholder="Enter recipient email"
            className="rounded-3xl h-12"
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <Label className="text-sm font-medium text-[#013941] mb-2 block">Recipient phone number</Label>
          <div className="flex gap-2">
            <Select
              options={countryCodes}
              value={details.countryCode}
              onValueChange={handleCountryCodeChange}
              className="w-[120px] shrink-0"
            />
            <Input
              type="tel"
              value={details.phoneNumber}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="000 - 000 - 00000"
              className="flex-1 rounded-3xl h-12"
            />
          </div>
          {errors.phoneNumber && (
            <p className="text-sm text-red-600 mt-1">{errors.phoneNumber}</p>
          )}
          {errors.countryCode && (
            <p className="text-sm text-red-600 mt-1">{errors.countryCode}</p>
          )}
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!isValid}
        className="w-full h-12 text-base font-medium rounded-3xl bg-[#013941] hover:bg-[#0D5D56] text-white disabled:opacity-50 disabled:cursor-not-allowed mt-20"
      >
        Next
      </Button>
    </div>
  )
}


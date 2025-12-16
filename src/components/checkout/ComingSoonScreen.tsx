import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { comingSoonEmailSchema } from "@/schema/global.schema"

interface ComingSoonScreenProps {
  title?: string
  description: string
}

export function ComingSoonScreen({  description }: ComingSoonScreenProps) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = comingSoonEmailSchema.safeParse({ email })
    if (!result.success) {
      setError(result.error.errors[0]?.message || "Invalid email")
      return
    }
    setError("")
    //? Mock submission
    alert("We'll notify you when this feature is available!")
    setEmail("")
  }

  const handleEmailChange = (value: string) => {
    setEmail(value)
    if (error) {
      setError("")
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-6 py-12">
        <h2 className="text-3xl font-semibold text-[#013941] font-display">Coming Soon!</h2>
        <p className="text-gray-600 text-lg font-sans">{description}</p>
        
        <form onSubmit={handleSubmit} className=" mx-auto space-y-5 mt-8">
          <div>
            <Label htmlFor="email" className="text-left block mb-2 text-sm font-medium text-[#013941]">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder="Enter your email"
              className="rounded-3xl h-12"
            />
            {error && (
              <p className="text-sm text-red-600 mt-1">{error}</p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full h-12 text-base font-medium rounded-3xl bg-[#013941] hover:bg-[#0D5D56] text-white"
          >
            Update me
          </Button>
        </form>
      </div>
    </div>
  )
}


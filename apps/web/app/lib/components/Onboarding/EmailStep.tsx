import { useState, useEffect } from "react"
import { Label } from "@repo/ui/components/ui/label"
import { Button } from "@repo/ui/components/ui/button"
import { Input } from "@repo/ui/components/ui/input"
import { Mail } from "lucide-react"
import type { OnboardingData } from "@/app/signup/onboarding"

interface EmailStepProps {
  onNext: (data: Partial<OnboardingData>) => void
  formData: Partial<OnboardingData>
  setFormData: React.Dispatch<React.SetStateAction<Partial<OnboardingData>>>
}

export function EmailStep({ onNext, formData, setFormData }: EmailStepProps) {
  const [email, setEmail] = useState(formData.email || "")
  const [error, setError] = useState("")

  // useEffect(() => {
  //   setFormData((prev) => ({ ...prev, email }))
  // }, [email, setFormData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.endsWith(".edu")) {
      setError("Please enter a valid .edu email address")
      return
    }
    onNext({ email })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email (.edu required)
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError("")
            }}
            placeholder="youremail@university.edu"
            className="pl-10"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
      <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
        Next
      </Button>
    </form>
  )
}
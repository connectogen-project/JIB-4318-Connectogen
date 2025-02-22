import { useState, useEffect } from "react"
import { Label } from "@repo/ui/components/ui/label"
import { Button } from "@repo/ui/components/ui/button"
import { Checkbox } from "@repo/ui/components/ui/checkbox"
import { GraduationCap, ArrowLeft, ArrowRight } from "lucide-react"
import type { OnboardingData } from "@/app/signup/onboarding"

interface DegreesStepProps {
  onNext: (data: Partial<OnboardingData>) => void
  onBack: () => void
  formData: Partial<OnboardingData>
  setFormData: React.Dispatch<React.SetStateAction<Partial<OnboardingData>>>
}

const DEGREES = [
  { id: "bs", label: "BS - Bachelor of Science" },
  { id: "ms", label: "MS - Master of Science" },
  { id: "phd", label: "PhD - Doctor of Philosophy" },
  { id: "md", label: "MD - Doctor of Medicine" },
  { id: "np", label: "NP - Nurse Practitioner" },
]

export function DegreesStep({ onNext, onBack, formData, setFormData }: DegreesStepProps) {
  const [selectedDegrees, setSelectedDegrees] = useState<string[]>(formData.degrees || [])

  useEffect(() => {
    setFormData((prev) => ({ ...prev, degrees: selectedDegrees }))
  }, [selectedDegrees, setFormData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({ degrees: selectedDegrees })
  }

  const toggleDegree = (degree: string) => {
    setSelectedDegrees((prev) => (prev.includes(degree) ? prev.filter((d) => d !== degree) : [...prev, degree]))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Degrees (Optional)</Label>
        <div className="relative">
          <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <div className="space-y-2 border rounded-md p-3 pl-10">
            {DEGREES.map((degree) => (
              <div key={degree.id} className="flex items-center space-x-2">
                <Checkbox
                  id={degree.id}
                  checked={selectedDegrees.includes(degree.label)}
                  onCheckedChange={() => toggleDegree(degree.label)}
                />
                <Label htmlFor={degree.id}>{degree.label}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between space-x-4">
        <Button type="button" variant="outline" onClick={onBack}>
          <ArrowLeft />
        </Button>
        <Button type="submit" className="bg-black text-white hover:bg-gray-800">
          Next
          <ArrowRight />
        </Button>
      </div>
    </form>
  )
}


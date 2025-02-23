import { useState, useEffect } from "react"
import { Label } from "@repo/ui/components/ui/label"
import { Button } from "@repo/ui/components/ui/button"
import { GraduationCap, ArrowLeft, ArrowRight } from "lucide-react"
import type { OnboardingData } from "../../signup/onboarding"
import MultipleSelector, { Option } from "./MultipleSelector"

interface DegreesStepProps {
  onNext: (data: Partial<OnboardingData>) => void
  onBack: () => void
  formData: Partial<OnboardingData>
  setFormData: React.Dispatch<React.SetStateAction<Partial<OnboardingData>>>
}

const DEGREES: Option[] = [
  { value: "BS - Bachelor of Science", label: "BS - Bachelor of Science" },
  { value: "MS - Master of Science", label: "MS - Master of Science" },
  { value: "PhD - Doctor of Philosophy", label: "PhD - Doctor of Philosophy" },
  { value: "MD - Doctor of Medicine", label: "MD - Doctor of Medicine" },
  { value: "NP - Nurse Practitioner", label: "NP - Nurse Practitioner" },
]

export function DegreesStep({ onNext, onBack, formData, setFormData }: DegreesStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({ degrees: formData.degrees || [] })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Degrees (Optional)</Label>
        <div className="relative">
          <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-gray-500 z-10" />
          <MultipleSelector
            value={formData.degrees?.map(d => ({ value: d, label: d }))}
            onChange={(selected) => setFormData(prev => ({ ...prev, degrees: selected.map(s => s.value) }))}
            defaultOptions={DEGREES}
            placeholder="Select degrees..."
            className="pl-10"
          />
        </div>
      </div>
      <div className="flex justify-between space-x-4">
        <Button type="button" variant="outline" onClick={onBack}>
          <ArrowLeft/>
        </Button>
        <Button type="submit" className="bg-black text-white hover:bg-gray-800">
          Next
          <ArrowRight/>
        </Button>
      </div>
    </form>
  )
}


import { useState, useEffect } from "react"
import { Label } from "@repo/ui/components/ui/label"
import { Button } from "@repo/ui/components/ui/button"
import { Checkbox } from "@repo/ui/components/ui/checkbox"
import { GraduationCap, ArrowLeft, ArrowRight } from "lucide-react"
import type { OnboardingData } from "app/(unauthenticated)/signup/onboarding";
import useSWR from "swr";
import MultipleSelector, { Option } from "@/app/lib/components/Onboarding/MultipleSelector";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Degree {
    _id: string;
    name: string;
}
interface DegreesStepProps {
  onNext: (data: Partial<OnboardingData>) => void
  onBack: () => void
  formData: Partial<OnboardingData>
  setFormData: React.Dispatch<React.SetStateAction<Partial<OnboardingData>>>
}

// const DEGREES = [
//   { id: "bs", label: "BS - Bachelor of Science" },
//   { id: "ms", label: "MS - Master of Science" },
//   { id: "phd", label: "PhD - Doctor of Philosophy" },
//   { id: "md", label: "MD - Doctor of Medicine" },
//   { id: "np", label: "NP - Nurse Practitioner" },
// ]

export function DegreesStep({ onNext, onBack, formData, setFormData }: DegreesStepProps) {
    const { data: degrees, error } = useSWR<Degree[]>(`http://localhost:2999/api/degrees`, fetcher);
    const [selectedDegrees, setSelectedDegrees] = useState<string[]>(formData.degrees || [])

  useEffect(() => {
    setFormData((prev) => ({ ...prev, degrees: selectedDegrees }))
  }, [selectedDegrees, setFormData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({ degrees: selectedDegrees })
  }

    // const toggleDegree = (degreeId: string) => {
    //     setSelectedDegrees((prev) =>
    //         prev.includes(degreeId) ? prev.filter((id) => id !== degreeId) : [...prev, degreeId]
    //     );
    // };

    if (error) return <div>Error loading degrees...</div>
    if (!degrees) return <div>Loading degrees...</div>

    const options: Option[] = degrees.map((degree) => ({
        value: degree._id,
        label: degree.name,
    }));

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Degrees (Optional)</Label>
        <div className="relative">
          <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <MultipleSelector
                // Map selected IDs to option objects for display.
                value={selectedDegrees.map((id) => {
                    const found = options.find((opt) => opt.value === id);
                    return found ? found : { value: id, label: id };
                })}
                onChange={(selected) => setSelectedDegrees(selected.map((s) => s.value))}
                defaultOptions={options}
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


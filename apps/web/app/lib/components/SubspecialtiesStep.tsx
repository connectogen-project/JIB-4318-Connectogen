import { Label } from "@repo/ui/components/ui/label";
import { Button } from "@repo/ui/components/ui/button";
import { Stethoscope, ArrowLeft, ArrowRight } from "lucide-react";
import type { OnboardingData } from "../../signup/onboarding";
import MultipleSelector, { Option } from "./MultipleSelector";

interface SubspecialtiesStepProps {
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  formData: Partial<OnboardingData>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<OnboardingData>>>;
}

const SUBSPECIALTIES: Option[] = [
  { value: "Autonomic Disorders", label: "Autonomic Disorders" },
  { value: "Cardiology", label: "Cardiology" },
  { value: "Dermatology", label: "Dermatology" },
  { value: "Oncology", label: "Oncology" },
  { value: "Pediatrics", label: "Pediatrics" },
];

export function SubspecialtiesStep({
  onNext,
  onBack,
  formData,
  setFormData,
}: SubspecialtiesStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ subspecialties: formData.subspecialties || [] });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Subspecialties (Optional)</Label>
        <div className="relative">
          <Stethoscope className="absolute left-3 top-3 h-4 w-4 text-gray-500 z-10" />
          <MultipleSelector
            value={formData.subspecialties?.map(s => ({ value: s, label: s }))}
            onChange={(selected) => setFormData(prev => ({ ...prev, subspecialties: selected.map(s => s.value) }))}
            defaultOptions={SUBSPECIALTIES}
            placeholder="Select subspecialties..."
            className="pl-10"
          />
        </div>
      </div>
      <div className="flex justify-between space-x-4">
        <Button type="button" variant="outline" onClick={onBack}>
          <ArrowLeft />
        </Button>
        <Button type="submit" className="bg-black text-white hover:bg-gray-800">
          Next
          <ArrowRight/>
        </Button>
      </div>
    </form>
  );
}

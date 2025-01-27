import { useState, useEffect } from "react";
import { Label } from "@repo/ui/components/ui/label";
import { Button } from "@repo/ui/components/ui/button";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import { Stethoscope, ArrowLeft, ArrowRight } from "lucide-react";
import type { OnboardingData } from "../../signup/onboarding";

interface SubspecialtiesStepProps {
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  formData: Partial<OnboardingData>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<OnboardingData>>>;
}

const SUBSPECIALTIES = [
  "Autonomic Disorders",
  "Cardiology",
  "Dermatology",
  "Oncology",
  "Pediatrics",
];

export function SubspecialtiesStep({
  onNext,
  onBack,
  formData,
  setFormData,
}: SubspecialtiesStepProps) {
  const [selectedSubspecialties, setSelectedSubspecialties] = useState<
    string[]
  >(formData.subspecialties || []);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      subspecialties: selectedSubspecialties,
    }));
  }, [selectedSubspecialties, setFormData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ subspecialties: selectedSubspecialties });
  };

  const toggleSubspecialty = (subspecialty: string) => {
    setSelectedSubspecialties((prev) =>
      prev.includes(subspecialty)
        ? prev.filter((s) => s !== subspecialty)
        : [...prev, subspecialty]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Subspecialties (Optional)</Label>
        <div className="relative">
          <Stethoscope className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <div className="space-y-2 border rounded-md p-3 pl-10">
            {SUBSPECIALTIES.map((subspecialty) => (
              <div key={subspecialty} className="flex items-center space-x-2">
                <Checkbox
                  id={subspecialty}
                  checked={selectedSubspecialties.includes(subspecialty)}
                  onCheckedChange={() => toggleSubspecialty(subspecialty)}
                />
                <Label htmlFor={subspecialty}>{subspecialty}</Label>
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
          <ArrowRight/>
        </Button>
      </div>
    </form>
  );
}

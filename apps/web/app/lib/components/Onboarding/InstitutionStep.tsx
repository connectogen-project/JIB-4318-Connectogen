import { useState, useEffect } from "react";
import { Label } from "@repo/ui/components/ui/label";
import { Button } from "@repo/ui/components/ui/button";
import { Building, ArrowLeft, ArrowRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import type { OnboardingData } from "@/app/(unauthenticated)/signup/onboarding";

interface InstitutionStepProps {
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  formData: Partial<OnboardingData>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<OnboardingData>>>;
}

export function InstitutionStep({
  onNext,
  onBack,
  formData,
  setFormData,
}: InstitutionStepProps) {
  const [institution, setInstitution] = useState(formData.institution || "");

  useEffect(() => {
    setFormData((prev) => ({ ...prev, institution }));
  }, [institution, setFormData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ institution });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="institution" className="text-sm font-medium">
          Institution/Organization
        </Label>
        <div className="relative">
          <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Select value={institution} onValueChange={setInstitution}>
            <SelectTrigger className="pl-10">
              <SelectValue placeholder="Select an institution" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Emory University">Emory University</SelectItem>
              <SelectItem value="Georgia Institute of Technology">
                Georgia Institute of Technology
              </SelectItem>
              <SelectItem value="Morehouse College">
                Morehouse College
              </SelectItem>
              <SelectItem value="Morehouse School of Medicine">
                Morehouse School of Medicine
              </SelectItem>
            </SelectContent>
          </Select>
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
  );
}

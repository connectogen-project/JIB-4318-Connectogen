import { useState, useEffect } from "react";
import { Label } from "@repo/ui/components/ui/label";
import { Button } from "@repo/ui/components/ui/button";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { FileText, ArrowLeft, ArrowRight } from "lucide-react";
import type { OnboardingData } from "../../signup/onboarding";

interface BioStepProps {
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  formData: Partial<OnboardingData>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<OnboardingData>>>;
}

export function BioStep({
  onNext,
  onBack,
  formData,
  setFormData,
}: BioStepProps) {
  const [bio, setBio] = useState(formData.bio || "");

  useEffect(() => {
    setFormData((prev) => ({ ...prev, bio }));
  }, [bio, setFormData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ bio });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="bio" className="text-sm font-medium">
          Bio (Optional)
        </Label>
        <div className="relative">
          <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself..."
            className="min-h-[100px] pl-10"
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

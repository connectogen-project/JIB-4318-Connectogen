import { useState, useEffect } from "react";
import { Label } from "@repo/ui/components/ui/label";
import { Button } from "@repo/ui/components/ui/button";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import { Stethoscope, ArrowLeft, ArrowRight } from "lucide-react";
import type { OnboardingData } from "app/(unauthenticated)/signup/onboarding";
import useSWR from "swr";
import MultipleSelector, { Option } from "@/app/lib/components/Onboarding/MultipleSelector";



const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Subspecialty {
  _id: string;
  name: string;
}
interface SubspecialtiesStepProps {
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  formData: Partial<OnboardingData>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<OnboardingData>>>;
}
//
// const SUBSPECIALTIES = [
//   "Autonomic Disorders",
//   "Cardiology",
//   "Dermatology",
//   "Oncology",
//   "Pediatrics",
// ];

export function SubspecialtiesStep({
  onNext,
  onBack,
  formData,
  setFormData,
}: SubspecialtiesStepProps) {
  const { data: subspecialties, error } = useSWR<Subspecialty[]>(`http://localhost:2999/api/subspecialties`, fetcher);
  const [selectedSubspecialties, setSelectedSubspecialties] = useState<
    string[]
  >(formData.subspecialties || []);
  const options: Option[] = subspecialties
      ? subspecialties.map((sub) => ({ value: sub._id, label: sub.name }))
      : [];

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

  // const toggleSubspecialty = (subspecialtyId: string) => {
  //   setSelectedSubspecialties((prev) =>
  //     prev.includes(subspecialtyId)
  //       ? prev.filter((id) => id !== subspecialtyId)
  //       : [...prev, subspecialtyId]
  //   );
  // };

  if (error) return <div>Error loading subspecialties.</div>;
  if (!subspecialties) return <div>Loading subspecialties...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Subspecialties (Optional)</Label>
        <div className="relative">
          <Stethoscope className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <MultipleSelector
              // Map selected IDs to option objects for display.
              value={selectedSubspecialties.map((id) => {
                const found = options.find((opt) => opt.value === id);
                return found ? found : { value: id, label: id };
              })}
              onChange={(selected) =>
                  setSelectedSubspecialties(selected.map((s) => s.value))
              }
              // Pass in the full list as default options for dynamic search.
              defaultOptions={options}
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

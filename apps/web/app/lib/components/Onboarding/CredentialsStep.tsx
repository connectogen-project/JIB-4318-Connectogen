import { useState, useEffect } from "react";
import { Label } from "@repo/ui/components/ui/label";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Lock, UserPenIcon, ArrowLeft, ArrowRight } from "lucide-react";
import type { OnboardingData } from "@/app/signup/onboarding";

interface CredentialsStepProps {
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  formData: Partial<OnboardingData>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<OnboardingData>>>;
}

export function CredentialsStep({
  onNext,
  onBack,
  formData,
  setFormData,
}: CredentialsStepProps) {
  const [username, setUsername] = useState(formData.username || "");
  const [password, setPassword] = useState(formData.password || "");
  const [confirmPassword, setConfirmPassword] = useState(
    formData.password || ""
  );
  const [error, setError] = useState("");

  useEffect(() => {
    setFormData((prev) => ({ ...prev, username, password }));
  }, [username, password, setFormData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    onNext({ username, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username" className="text-sm font-medium">
          Username
        </Label>
        <div className="relative">
          <UserPenIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium">
          Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirm Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
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

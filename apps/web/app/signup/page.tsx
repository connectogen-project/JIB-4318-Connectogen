"use client";

import { useState } from "react";
import { ProgressBar } from "@/app/lib/components/ProgressBar";
import { EmailStep } from "@/app/lib/components/EmailStep";
import { CredentialsStep } from "@/app/lib/components/CredentialsStep";
import { PersonalInfoStep } from "@/app/lib/components/PersonalInfoStep";
import { InstitutionStep } from "@/app/lib/components/InstitutionStep";
import { DegreesStep } from "@/app/lib/components/DegreesStep";
import { SubspecialtiesStep } from "@/app/lib/components/SubspecialtiesStep";
import { BioStep } from "@/app/lib/components/BioStep";
import type { OnboardingData, OnboardingStep } from "./onboarding";
import Link from "next/link";

const steps: OnboardingStep[] = [
  "email",
  "credentials",
  "personalInfo",
  "institution",
  "degrees",
  "subspecialties",
  "bio",
];

export default function Signup() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<OnboardingData>>({});

  const handleNext = (data: Partial<OnboardingData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      console.log("Onboarding complete:", { ...formData, ...data });
      // Connect to backend here
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStep = () => {
    switch (steps[currentStep]) {
      case "email":
        return (
          <EmailStep
            onNext={handleNext}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case "credentials":
        return (
          <CredentialsStep
            onNext={handleNext}
            onBack={handleBack}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case "personalInfo":
        return (
          <PersonalInfoStep
            onNext={handleNext}
            onBack={handleBack}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case "institution":
        return (
          <InstitutionStep
            onNext={handleNext}
            onBack={handleBack}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case "degrees":
        return (
          <DegreesStep
            onNext={handleNext}
            onBack={handleBack}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case "subspecialties":
        return (
          <SubspecialtiesStep
            onNext={handleNext}
            onBack={handleBack}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case "bio":
        return (
          <BioStep
            onNext={handleNext}
            onBack={handleBack}
            formData={formData}
            setFormData={setFormData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="max-w-md w-full px-4">
        <ProgressBar currentStep={currentStep + 1} totalSteps={steps.length} />
        <h1 className="text-4xl font-normal tracking-tight mb-2">Let's get started</h1>
        <p className="text-gray-500 mb-4">Complete the steps below</p>
        {renderStep()}
        <p className="text-sm text-gray-500 text-center mt-8">
          Already have an account?{" "}
          <Link href="/login" className="text-black hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { ProgressBar } from "@/app/lib/components/Onboarding/ProgressBar";
import { EmailStep } from "@/app/lib/components/Onboarding/EmailStep";
import { CredentialsStep } from "@/app/lib/components/Onboarding/CredentialsStep";
import { PersonalInfoStep } from "@/app/lib/components/Onboarding/PersonalInfoStep";
import { InstitutionStep } from "@/app/lib/components/Onboarding/InstitutionStep";
import { DegreesStep } from "@/app/lib/components/Onboarding/DegreesStep";
import { SubspecialtiesStep } from "@/app/lib/components/Onboarding/SubspecialtiesStep";
import { BioStep } from "@/app/lib/components/Onboarding/BioStep";
import type { OnboardingData, OnboardingStep } from "./onboarding";
import Link from "next/link";
import { registerUser } from "@/app/lib/api";
import { useRouter } from "next/navigation";
import { ResumeUploadStep } from "@/app/lib/components/Onboarding/ResumeUploadStep";

const steps: OnboardingStep[] = [
  "email",
  "credentials",
  "personalInfo",
  "institution",
  "degrees",
  "subspecialties",
  "bio",
  "resume",
];

export default function Signup() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<OnboardingData>>({});
  const router = useRouter();
  const handleNext = async (data: Partial<OnboardingData>) => {
    const newFormData = { ...formData, ...data };
    setFormData(newFormData);

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      console.log("Onboarding complete:", newFormData);
      try {
        const response = await registerUser({
          firstName: newFormData.firstName!,
          lastName: newFormData.lastName!,
          email: newFormData.email!,
          password: newFormData.password!,
          gender: newFormData.gender!,
          institution: newFormData.institution!,
          degrees: newFormData.degrees || [],
          bio: newFormData.bio,
          resume: newFormData.resumeFileUrl,
        });
        console.log("Registration successful:", response);
        router.push("/login");
      } catch (error) {
        console.error("Registration failed:", error);
      }
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
      case "resume":
        return (
          <ResumeUploadStep
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

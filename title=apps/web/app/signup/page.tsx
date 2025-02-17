import { registerUser } from "@/app/lib/api";
import { ResumeUploadStep } from "@/app/lib/components/ResumeUploadStep";

const steps: OnboardingStep[] = [
  "email",
  "credentials",
  "personalInfo",
  "institution",
  "degrees",
  "subspecialties",
  "bio",
  "resumeUpload",
];

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
    case "resumeUpload":
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

const handleNext = async (newFormData: any) => {
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
    // Handle the response from the registration call
  } catch (error) {
    // Handle any errors that occur during the registration process
  }
}; 
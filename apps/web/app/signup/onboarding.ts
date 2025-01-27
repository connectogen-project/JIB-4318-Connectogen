export interface OnboardingData {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: "Male" | "Female" | "Other";
  institution: string;
  degrees: string[];
  subspecialties: string[];
  bio: string;
}

export type OnboardingStep =
  | "email"
  | "credentials"
  | "personalInfo"
  | "institution"
  | "degrees"
  | "subspecialties"
  | "bio";

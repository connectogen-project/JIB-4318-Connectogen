"use client";

import { useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { OnboardingData } from "../../../(unauthenticated)/signup/onboarding";
// import { uploadResume } from "@/app/lib/api";

interface ResumeUploadStepProps {
    onNext: (data: Partial<OnboardingData>) => void;
    onBack: () => void;
    formData: Partial<OnboardingData>;
    setFormData: React.Dispatch<React.SetStateAction<Partial<OnboardingData>>>;
}

export function ResumeUploadStep({
    onNext,
    onBack,
    formData,
    setFormData,
}: ResumeUploadStepProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:2999';


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.type !== "application/pdf") {
                setError("Please upload a PDF file.");
                return;
            }
            setError("");
            setSelectedFile(file);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError("Please select a file to upload.");
            return;
        }

        const formDataUpload = new FormData();
        formDataUpload.append("resume", selectedFile);

        setUploading(true);
        try {
            //const data = await uploadResume(formDataUpload);
            const res = await fetch(`${API_BASE_URL}/api/users/upload-resume`, {
                method: "POST",
                body: formDataUpload,
            });
            if (!res.ok) {
                throw new Error("Failed to upload resume");
            }
            const data = await res.json()
            // Expecting the backend to return an object like: { fileUrl: "path/to/resume.pdf" }
            setFormData((prev) => ({ ...prev, resumeFileUrl: data.fileUrl }));
            onNext({ resumeFileUrl: data.fileUrl });
        } catch (err: any) {
            console.error("Error uploading file:", err);
            setError("Upload failed, please try again.");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleUpload();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="resume" className="block text-sm font-medium text-gray-700">
                    Upload Resume (PDF)
                </Label>
                <Input
                    type="file"
                    id="resume"
                    accept="application/pdf"
                    onChange={handleFileChange}
                />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex justify-between space-x-4">
                <Button type="button" variant="outline" onClick={onBack}>
                    <ArrowLeft />
                    Back
                </Button>
                <Button
                    type="submit"
                    disabled={uploading}
                    className="bg-black text-white hover:bg-gray-800"
                >
                    {uploading ? "Uploading..." : "Submit"} <ArrowRight />
                </Button>
            </div>
        </form>
    );
}
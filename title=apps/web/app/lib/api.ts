"use client";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:2999';

// ... other API functions ...

export async function uploadResume(formDataUpload: FormData): Promise<{ fileUrl: string }> {
  const res = await fetch(`${API_BASE_URL}/api/users/upload-resume`, {
    method: "POST",
    body: formDataUpload,
  });
  if (!res.ok) {
    throw new Error("File upload failed.");
  }
  return res.json();
} 
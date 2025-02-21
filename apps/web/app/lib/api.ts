"use client"
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:2999';

export async function loginUser(userData: {
    email: string;
    password: string;
}) {
    const res = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    if (!res.ok) {
        // You might want to include a more detailed error message.
        throw new Error('Failed to login');
    }
    return res.json();
}
export async function registerUser(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: string;
    institution: string;
    degrees: string[];
    bio?: string;
    isMentor?: boolean;
    isMentee?: boolean;
    mentorProfile?: {
        institution?: string;
        affiliation?: string;
        field?: string;
        subspecialties?: string[];
        position?: string;
    };
}) {
    const res = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    if (!res.ok) {
        // You might want to include a more detailed error message.
        throw new Error('Failed to register');
    }
    return res.json();
}
export async function uploadResume(formDataUpload: FormData): Promise<{ fileUrl: string }> {
    const res = await fetch(`${API_BASE_URL}/api/users/upload-resume`, {
        method: "POST",
        body: formDataUpload,
    });
    if (!res.ok) {
        throw new Error("Failed to upload resume");
    }
    return res.json();
}
export async function getNotifications() {
    const res = await fetch(`${API_BASE_URL}/api/notifications/getNotif/?userEmail=test@gatech.edu`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!res.ok) {
        throw new Error("Failed to get notifications");
    }
    return res.json();
}
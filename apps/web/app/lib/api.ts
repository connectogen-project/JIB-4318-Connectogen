export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:2999';

export async function logoutUser() {
    
    const res = await fetch(`${API_BASE_URL}/api/users/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!res.ok) {
        throw new Error('Failed to logout');
    }
    return res.json();
}
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

export async function getNotifications() {
    const res = await fetch(`${API_BASE_URL}/api/notifications/getNotif`, {
        method: "GET",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!res.ok) {
        throw new Error("Failed to get new notifications");
    }
    return res.json();
}
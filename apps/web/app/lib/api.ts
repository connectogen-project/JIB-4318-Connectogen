export const PORT = process.env.PORT || '2999';

export async function loginUser(userData: {
    email: string;
    password: string;
}) {
    const res = await fetch(`http://localhost:${PORT}/auth/login`, {
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
    const res = await fetch(`http://localhost:${PORT}/auth/register`, {
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
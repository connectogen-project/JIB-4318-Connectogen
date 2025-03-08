'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export default function LogoutButton() {

    const router = useRouter();
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:2999';

    const handleLogout = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/users/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (res) {
                localStorage.removeItem('firstName');
                localStorage.removeItem('lastName');
                console.log("Logged out.");
                router.push("/");
            } else {
                console.error("Failed to log out");
                throw new Error('Failed to logout');
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };


    return (
        <Button
            onClick={handleLogout}
            className="bg-foreground text-background px-4 py-2 rounded hover:bg-muted-foreground"
        >
            Logout
        </Button>
    )

}

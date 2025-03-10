"use server"
import { cookies } from "next/headers";

export async function Delete({ selectedId }: { selectedId: string | undefined }) {

    const cookieStore = await cookies()
    const jwt = cookieStore.get('jwt')?.value

    try {
        const res = await fetch(`http://localhost:2999/mentorship/logs/${selectedId}`, {
            cache: "no-store",
            method: 'DELETE',
            credentials: 'include',
            headers: {
                Cookie: `jwt=${jwt}`
            }
        })
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData?.message || "Failed to delete log.");
        }

        return { success: true };
    } catch (error) {
        return { success: false };
    }
}

import { cookies } from "next/headers";
import { z } from "zod";


const Interaction = z.object({
    _id: z.string(),
    title: z.string(),
    date: z.string(),
    mentorName: z.string(),
    description: z.string(),
});

const InteractionsResponse = z.array(Interaction)

export async function fetchSelectedInteraction(selectedId: string) {


    const cookieStore = await cookies()
    const jwt = cookieStore.get('jwt')?.value

    return await fetch("http://localhost:2999/mentorship/logs", {
        cache: "no-store",
        credentials: 'include',
        headers: {
            Cookie: `jwt=${jwt}`
        }
    }).then(res => {
        if (!res.ok) {
            const errorDetails = res.json().catch(() => null);
            console.error("Failed to get logs", res.status, errorDetails);
        }
        return res.json()
    }).then(res => {
        const allLogs = InteractionsResponse.parse(res.data);

        return allLogs.find(
            (interaction: z.infer<typeof Interaction>) => interaction._id === selectedId
        );

    }).catch(error => {
        console.error("Error during getLogs fetch: ", error);
        return undefined
    })
}
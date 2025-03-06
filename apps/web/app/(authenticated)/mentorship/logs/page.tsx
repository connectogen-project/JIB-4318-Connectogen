import LogsSidebar from "@/app/lib/components/InteractionLogs/logs-sidebar";
import NewInteractionForm from "@/app/lib/components/InteractionLogs/new-interaction-form";
import InteractionDetails from "@/app/lib/components/InteractionLogs/interaction-details";
import LogsContent from "@/app/lib/components/InteractionLogs/logs-content";
import { z } from "zod";
import { cookies } from "next/headers";

const Interaction = z.object({
    _id: z.string(),
    title: z.string(),
    date: z.string(),
    mentorName: z.string(),
    description: z.string(),
});

const InteractionsResponse = z.array(Interaction)


export default async function Logs({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {

    if (!searchParams) return null;
    const showForm = (await searchParams)['new'] === 'true';
    const selectedId = (await searchParams)['id'];
    const cookieStore = await cookies()
    const jwt = cookieStore.get('jwt')?.value

    const selectedInteraction = await fetch("http://localhost:2999/mentorship/logs", {
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

    })

    return (
        <div className="flex h-[calc(100vh-68px)] overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 border-r h-full">
                <LogsSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 h-full flex flex-col min-h-0">
                {/* Content Area */}
                <div className="flex-1 overflow-y-auto min-h-0">
                    {showForm ? (
                        <NewInteractionForm />
                    ) : selectedInteraction ? (
                        // Ensure InteractionDetails fills the available space
                        <div className="h-full">
                            <InteractionDetails {...selectedInteraction} />
                        </div>
                    ) : (
                        <LogsContent />
                    )}
                </div>
            </div>
        </div>
    );
}
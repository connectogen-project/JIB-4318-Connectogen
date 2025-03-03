import LogsSidebar from "@/app/lib/components/InteractionLogs/logs-sidebar";
import NewInteractionForm from "@/app/lib/components/InteractionLogs/new-interaction-form";
import InteractionDetails from "@/app/lib/components/InteractionLogs/interaction-details";
import LogsContent from "@/app/lib/components/InteractionLogs/logs-content";
import EditLog from "@/app/lib/components/InteractionLogs/edit-log";
import EditButton from "@/app/lib/components/InteractionLogs/edit-button";
import { DeleteLog } from "@/app/lib/components/InteractionLogs/delete-log";

interface Interaction {
    _id: string;
    title: string;
    date: string;
    mentorName: string;
    description: string;
}


export default async function Logs({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {

    if (!searchParams) return null;
    const showForm = (await searchParams)['new'] === 'true';
    const selectedId = (await searchParams)['id'];
    const editForm = (await searchParams)['edit'];

    const allLogsResponse = await fetch("http://localhost:2999/mentorship/logs", {
        cache: "no-store",
    });

    const allLogs: { data: Interaction[] } = await allLogsResponse.json();

    const selectedInteraction = allLogs.data.find(
        (interaction: Interaction) => interaction._id === selectedId
    );

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
                        <div className="h-full">
                            {editForm ? (
                                <EditLog {...selectedInteraction} />

                            ) : (
                                <div className="flex flex-row">
                                    <div className="grow">
                                        <InteractionDetails {...selectedInteraction} />
                                    </div>
                                    <div className="flex gap-3 p-6 justify-end">
                                        <EditButton selectedId={selectedId} />
                                        <DeleteLog />
                                    </div>
                                </div>
                            )
                            }</div>)
                        : (
                            <LogsContent />
                        )}
                </div>
            </div>
        </div >
    );
}
import InteractionDetails from "@/app/lib/components/InteractionLogs/interaction-details";
import EditButton from "@/app/lib/components/InteractionLogs/edit-button";
import { DeleteLog } from "@/app/lib/components/InteractionLogs/delete-log";
import { fetchSelectedInteraction } from "./util";
import { notFound } from "next/navigation";

export default async function Logs({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

    if (!searchParams) return null;
    const selectedId = (await searchParams)['id'];

    if (!selectedId) {
        return <div></div>
    }

    const log = await fetchSelectedInteraction(selectedId)

    if (!log) {
        notFound()
    }

    return (
        <div className="flex flex-row">
            <div className="grow">
                <InteractionDetails {...log} />
            </div>
            <div className="flex gap-3 p-6 justify-end">
                <EditButton selectedId={selectedId} />
                <DeleteLog selectedId={selectedId} />
            </div>
        </div>
    )
}
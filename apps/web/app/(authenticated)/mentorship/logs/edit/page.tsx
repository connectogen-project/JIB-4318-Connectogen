import EditLog from "@/app/lib/components/InteractionLogs/edit-log";
import { notFound } from "next/navigation";
import { fetchSelectedInteraction } from "../util";


export default async function Edit({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

    if (!searchParams) return null;
    const selectedId = (await searchParams)['id'];

    if (!selectedId) {
        notFound()
    }

    const log = await fetchSelectedInteraction(selectedId)

    if (!log) {
        notFound()
    }

    return (
        <EditLog {...log} selectedId={selectedId} />
    )
}
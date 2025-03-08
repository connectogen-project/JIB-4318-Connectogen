'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@repo/ui/hooks/use-toast";
import { ToastAction } from "@repo/ui/components/ui/toast";
import { Trash2 } from "lucide-react"
import { Delete } from "@/app/(authenticated)/mentorship/logs/actions";
import { redirect } from "next/navigation";

export function DeleteLog({ selectedId }: { selectedId: string | undefined }) {

    const { toast } = useToast()

    const handleDelete = async () => {
        if (!selectedId) {
            console.error("No selectedId.")
            return;
        }
        const res = await Delete({ selectedId })

        if (!res.success) {
            console.error("Server error:");
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                action: <ToastAction altText="Try again">Failed to delete log.</ToastAction>,
            });
            return;
        } else {
            toast({
                title: "Log deleted",
                description: "The log was successfully deleted.",
            });
            redirect('/mentorship/logs')

        }
    }


    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Trash2 />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        interaction log.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
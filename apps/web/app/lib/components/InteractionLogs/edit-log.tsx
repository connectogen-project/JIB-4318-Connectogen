
'use client'
import { useToast } from "@repo/ui/hooks/use-toast";
import { ToastAction } from "@repo/ui/components/ui/toast";
import { useActionState, useEffect } from "react";
import { editLog } from "@/app/(authenticated)/mentorship/logs/edit/action";

interface InteractionDetailsProps {
    title: string;
    date: string;
    mentorName: string;
    description: string;
    selectedId: string;
}

export default function EditLog({ title, date, mentorName, description, selectedId }: InteractionDetailsProps) {

    const { toast } = useToast();
    const initialState = {
        success: false,
        submitted: false,
    }
    const [state, formAction, pending] = useActionState(editLog, initialState)

    useEffect(() => {
        console.log(state)
        if (!state.success && state.submitted) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "We failed to ...",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        } else if (state.submitted) {
            toast({
                title: "Success!",
                description: "Your log was updated.",
            })
        }
    }, [state])

    return (
        <form className="max-w-2xl p-6 space-y-4" action={async (d) => {
            d.append('selectedId', selectedId)
            formAction(d)
        }}>
            <h2 className="text-2xl font-bold mb-6">Edit Interaction</h2>

            <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    className="w-full p-2 border rounded-md"
                    required
                    defaultValue={title}
                />
            </div>

            <div>
                <label htmlFor="date" className="block text-sm font-medium mb-1">Date</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    className="w-full p-2 border rounded-md"
                    required
                    defaultValue={date}
                />
            </div>

            <div>
                <label htmlFor="mentorName" className="block text-sm font-medium mb-1">Mentor</label>
                <input
                    type="text"
                    id="mentorName"
                    name="mentorName"
                    className="w-full p-2 border rounded-md"
                    required
                    defaultValue={mentorName}
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
                <textarea
                    id="description"
                    name="description"
                    className="w-full p-2 border rounded-md h-32"
                    required
                    defaultValue={description}
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                disabled={pending}
            >
                {pending ? 'Saving...' : 'Save Interaction'}
            </button>
        </form>

    );
};
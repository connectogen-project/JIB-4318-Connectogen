
'use client'
// import { useToast } from "@repo/ui/hooks/use-toast";
// import { ToastAction } from "@repo/ui/components/ui/toast";
// import { mutate } from "swr";
import { useState } from "react";


interface InteractionDetailsProps {
    title: string;
    date: string;
    mentorName: string;
    description: string;
}

export default function EditLog({ title, date, mentorName, description }: InteractionDetailsProps) {

    const [formData, setFormData] = useState({
        newTitle: '',
        newMentorName: '',
        newDescription: '',
        newDate: new Date().toISOString().split('T')[0],
    });
    // const [isSubmitting, setIsSubmitting] = useState(false);
    // const { toast } = useToast();
    // const router = useRouter();



    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     setIsSubmitting(true);

    //     try {
    //         const response = await fetch('http://localhost:2999/mentorship/logs', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(formData),
    //         });

    //         if (!response.ok) {
    //             const errorData = await response.json();
    //             console.error('Server error:', errorData);
    //             toast({
    //                 variant: "destructive",
    //                 title: "Uh oh! Something went wrong.",
    //                 description: "We failed to ...",
    //                 action: <ToastAction altText="Try again">Try again</ToastAction>,
    //             })
    //         } else {
    //             const result = await response.json();
    //             console.log('Interaction saved:', result);

    //             setFormData({
    //                 newTitle: '',
    //                 newMentorName: '',
    //                 newDescription: '',
    //                 newDate: new Date().toISOString().split('T')[0],
    //             });

    //             toast({
    //                 title: "Success!",
    //                 description: "Your log was updated.",
    //             })

    //             mutate('http://localhost:2999/mentorship/logs');

    //             setTimeout(() => {
    //                 router.push('/mentorship/logs');
    //             }, 6000);
    //         }
    //     } catch (error) {
    //         console.error('Uh oh! Something went wrong, we had an error saving your interaction:', error);
    //         toast({
    //             variant: "destructive",
    //             title: "Uh oh! Something went wrong.",
    //             description: "We failed to ...",
    //             action: <ToastAction altText="Try again">Try again</ToastAction>,
    //         })
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // };

    return (
        <>
            <form className="max-w-2xl p-6 space-y-4">
                <h2 className="text-2xl font-bold mb-6">Edit Interaction</h2>

                <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
                    <input
                        type="text"
                        id="title"
                        onChange={(e) => setFormData({ ...formData, newTitle: e.target.value })}
                        className="w-full p-2 border rounded-md"
                        required
                        // disabled={isSubmitting}
                        defaultValue={title}
                    />
                </div>

                <div>
                    <label htmlFor="date" className="block text-sm font-medium mb-1">Date</label>
                    <input
                        type="date"
                        id="date"
                        onChange={(e) => setFormData({ ...formData, newDate: e.target.value })}
                        className="w-full p-2 border rounded-md"
                        required
                        // disabled={isSubmitting}
                        defaultValue={date}
                    />
                </div>

                <div>
                    <label htmlFor="mentorName" className="block text-sm font-medium mb-1">Mentor</label>
                    <input
                        type="text"
                        id="mentorName"
                        onChange={(e) => setFormData({ ...formData, newMentorName: e.target.value })}
                        className="w-full p-2 border rounded-md"
                        required
                        // disabled={isSubmitting}
                        defaultValue={mentorName}
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        id="description"
                        onChange={(e) => setFormData({ ...formData, newDescription: e.target.value })}
                        className="w-full p-2 border rounded-md h-32"
                        required
                        // disabled={isSubmitting}
                        defaultValue={description}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                // disabled={isSubmitting}
                >
                    {/* {isSubmitting ? 'Saving...' : 'Save Interaction'} */}
                </button>
            </form>
        </>

    );
}
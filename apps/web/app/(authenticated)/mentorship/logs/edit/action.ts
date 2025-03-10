'use server'

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";


const Interaction = z.object({
    title: z.string(),
    date: z.string(),
    mentorName: z.string(),
    description: z.string(),
    selectedId: z.string(),
});


export async function editLog(prevState: any, formData: FormData) {
    const cookieStore = await cookies()
    const jwt = cookieStore.get('jwt')?.value

    const validatedFields = Interaction.safeParse({
        title: formData.get('title'),
        date: formData.get('date'),
        mentorName: formData.get('mentorName'),
        description: formData.get('description'),
        selectedId: formData.get('selectedId'),
    })
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    try {
        const response = await fetch(`http://localhost:2999/mentorship/logs/${validatedFields.data.selectedId}`, {
            method: 'PUT',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `jwt=${jwt}`,
            },
            body: JSON.stringify(validatedFields.data),
        });

        if (!response.ok) {
            console.log(response)
            const errorData = await response.json();
            console.error('Server error:', errorData);
            return { success: false, submitted: true }
        } else {
            const result = await response.json();
            console.log('Interaction saved:', result);
            revalidatePath('/mentorship/logs/edit')
            return { success: true, submitted: true };
        }
    } catch (error) {
        console.error('Uh oh! Something went wrong, we had an error saving your interaction:', error);
        return { success: false, submitted: true };
    }

}
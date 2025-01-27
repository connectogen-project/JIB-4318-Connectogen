'use server'

import { z } from 'zod'

const schema = z.object({
    email: z.string().email().endsWith(".edu")
})

export type verifyEmailState = { email: string, message: string } | undefined;

export async function verifyEmail(previousState: verifyEmailState, formData: FormData) {
    console.log(formData.get('email'))
    const validatedFields = schema.safeParse({
        email: formData.get('email'),
    })

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        return {
            email: formData.get('email')?.toString() || '',
            message: 'Please enter a valid institutional email.'
        }
    }
}
'use client'

import ResetPassword from "@/app/lib/components/reset-password"
import ForgotPassword from "@/app/lib/components/forgot-password"

export default function ResetPasswordPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {

    const { resetToken } = searchParams

    if (resetToken) {
        return (
            <ResetPassword />
        )
    } else {
        return (
            <ForgotPassword />
        )

    }
}
import ResetPassword from "@/app/lib/components/Login/reset-password"
import ForgotPassword from "@/app/lib/components/Login/forgot-password"

export default async function ResetPasswordPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined }
}) {

    const { resetToken } = (await searchParams)

    if (resetToken) {
        return (
            <ResetPassword resetToken={resetToken} />
        )
    } else {
        return (
            <ForgotPassword />
        )

    }
}
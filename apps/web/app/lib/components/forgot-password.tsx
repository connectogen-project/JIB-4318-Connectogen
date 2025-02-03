'use client'

import { Mail } from "lucide-react";
import { useToast } from "@repo/ui/hooks/use-toast";
import { ToastAction } from "@repo/ui/components/ui/toast";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function ForgotPassword() {

    const [formData, setFormData] = useState({
        email: '',
    })

    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:2999/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formData.email }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Server error:', errorData);
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "We failed to verify your email address.",
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                })
            } else {
                const result = await response.json();
                console.log('Email Sent', result);
                router.push(`http://localhost:3000/login/reset-password/?resetToken=${result.resetToken}`)

                setFormData({
                    email: '',
                });

                toast({
                    title: "Success!",
                    description: "Your email was sent.",
                })
            }
        } catch (error) {
            console.error('Uh oh! Something went wrong, we had an error verifying your email:', error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "We failed to verify your email address.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-[400px] space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-4xl font-normal tracking-tight">Reset Your Password</h1>
                    <p className="text-gray-500">Confirm your email address.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                        <Input
                            type="email"
                            placeholder="Email"
                            className="pl-10"
                            id="email"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <Button type="submit" className="w-full bg-black text-white hover:bg-black/90">Submit</Button>

                </form>
                <div className="space-y-4 text-center text-sm">
                    <Link href="/login" className="text-gray-500 hover:text-gray-800">
                        Back To Login
                    </Link>
                </div>

            </div>
        </div>

    )

}
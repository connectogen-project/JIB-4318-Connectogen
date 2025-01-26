'use client'

import { Mail } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { mutate } from "swr";
import { Input } from "./Input";
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";
import { useState } from "react";


export default function ForgotPassword() {

    const [formData, setFormData] = useState({
        email: '',
    })

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:2999/login/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Server error:', errorData);
                toast.error('Uh oh! We failed to verify your email address. If this error persists, please try again later.');
            } else {
                const result = await response.json();
                console.log('Email Sent', result);

                setFormData({
                    email: '',
                });

                toast.success('Your email was sent!');

                mutate('http://localhost:2999/login/reset-password');

                setTimeout(() => {
                }, 6000);
            }
        } catch (error) {
            console.error('Uh oh! Something went wrong, we had an error verifying your email:', error);
            toast.error('An error occurred while verifying your email');
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
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>

    )

}
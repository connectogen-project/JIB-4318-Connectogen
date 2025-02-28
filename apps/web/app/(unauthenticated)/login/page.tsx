'use client'

import Link from "next/link"
import { Input } from "@repo/ui/components/ui/input"
import { Button } from "@repo/ui/components/ui/button"
import { Mail, Lock } from "lucide-react"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:2999';


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
      setError("Email and password are required.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (!res.ok) {
        throw new Error('Failed to login');
      }
      console.log("Login successful:", res);
      router.push("/mentorship/find-mentorship");
    } catch (err: any) {
      console.error("Login failed:", err);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-[400px] space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-normal tracking-tight">Welcome back</h1>
          <p className="text-gray-500">Log in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input name="email" type="email" placeholder="Email" className="pl-10" />
          </div>

          <div className="space-y-1">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input name="password" type="password" placeholder="Password" className="pl-10" />
            </div>
            <div>
              <Link href="/login/reset-password" className="text-sm text-gray-500 hover:text-gray-800">
                Forgot password?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-black text-white hover:bg-black/90"
          >
            Login
          </Button>
        </form>

        <div className="text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-black hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

'use client'

import Link from "next/link"

import { Input } from "../lib/components/Input"
import { Button } from "../lib/components/Button"
import { Mail, Lock } from "lucide-react"
import { useFormState } from "react-dom"
import { verifyEmail, verifyEmailState } from "./VerifyEmail"
import { useState } from "react"

const initialState = {
  email: '',
  message: '',
}

export default function LoginPage() {
  const [state, formAction] = useFormState(verifyEmail, initialState)
  const [currState, setCurrState] = useState(initialState.email)

  console.log(state, currState)
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-[400px] space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-normal tracking-tight">Welcome back</h1>
          <p className="text-gray-500">Log in to your account</p>
        </div>

        <form className="space-y-4" action={formAction}>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input type="email" placeholder="Email" className="pl-10" onChange={(e) => setCurrState(e.currentTarget.value)} />
          </div>
          <span aria-live="polite" className="text-xs text-destructive">{currState === state?.email && state?.message}</span>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input type="password" placeholder="Password" className="pl-10" />
          </div>

          <Button type="submit" className="w-full bg-black text-white hover:bg-black/90">Login</Button>
        </form>

        <div className="space-y-4 text-center text-sm">
          <Link href="/forgot-password" className="text-gray-500 hover:text-gray-800">
            Forgot password
          </Link>

          <div className="text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-black hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

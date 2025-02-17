"use client";
import Link from "next/link";
import Logo from "@repo/ui/components/logo";
import { Button } from "@repo/ui/components/ui/button";
import { InboxIcon, UserCircle } from "lucide-react";

export default function WelcomeBar() {
    return (
        <div className="flex w-full items-center border-b border-border h-[68px] sticky top-0 z-50 bg-white">
            <div className="flex flex-grow items-center">
                <div className="mx-9"><Logo /></div>
            </div>

            <div className="flex mx-6 gap-x-6 items-center">
                <Button className="bg-foreground text-background hover:text-foreground">
                    <Link href="/login">
                        Login
                    </Link>
                </Button>
                <Button className="bg-foreground text-background px-4 py-2 rounded hover:bg-muted-foreground">
                    <Link href="/signup">Register</Link>
                </Button>
                <InboxIcon />
                <UserCircle />
            </div>
        </div>
    );
}

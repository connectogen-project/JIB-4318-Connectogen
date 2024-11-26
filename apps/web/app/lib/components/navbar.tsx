"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "@repo/ui/components/logo";
import { InboxIcon, UserCircle } from "lucide-react";

export default function NavBar() {
    const pathname = usePathname();

    return (
        <div className="flex items-center border-b border-border h-[68px] sticky top-0 z-10">
            <nav className="flex w-full px-9">
                <div className="mr-9"><Logo /></div>
                <ul className="flex gap-x-4 grow">
                    <li>
                        <Link
                            className={pathname === "/home" ? "text-foreground" : "text-muted-foreground"}
                            href="/home"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={pathname === "/about" ? "text-foreground" : "text-muted-foreground"}
                            href="/about"
                        >
                            About
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={pathname.startsWith("/projects") ? "text-foreground" : "text-muted-foreground"}
                            href="/projects"
                        >
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={pathname === "/mentorship" ? "text-foreground" : "text-muted-foreground"}
                            href="/mentorship"
                        >
                            Mentorship
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={pathname === "/mentorship/logs" ? "text-foreground" : "text-muted-foreground"}
                            href="/mentorship/logs"
                        >
                            Log
                        </Link>
                    </li>
                </ul>
                <div className="flex gap-x-6 items-center">
                    <Link href="/login">
                        <button className="text-muted-foreground hover:text-foreground">Login</button>
                    </Link>
                    <Link href="/signup">
                        <button className="bg-foreground text-background px-4 py-2 rounded hover:bg-muted-foreground">
                            Register
                        </button>
                    </Link>
                    <InboxIcon />
                    <UserCircle />
                </div>
            </nav>
        </div>
    );
}

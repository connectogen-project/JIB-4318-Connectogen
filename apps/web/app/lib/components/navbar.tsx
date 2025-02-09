"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "@repo/ui/components/logo";
import { Button } from "@repo/ui/components/ui/button";
import { InboxIcon, UserCircle } from "lucide-react";

export default function NavBar() {
    const pathname = usePathname();

    const handleLogout = async () => {
        try {
            const response = await fetch('api/users/logout', { method: 'POST' });
            if (response.ok) {
            } else {
                console.error('Failed to log out');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className="flex w-full items-center border-b border-border h-[68px] sticky top-0 z-50 bg-white">
            <div className="flex flex-grow">
                <div className="mx-9"><Logo /></div>
                <ul className="flex gap-x-4 grow">
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

            </div>
            <div className="flex mx-6 gap-x-6 items-center">
                <Button className="bg-foreground text-background hover:text-foreground">
                    <Link href="/login">
                        Login
                    </Link>
                </Button>
                <Button className="bg-foreground text-background px-4 py-2 rounded hover:bg-muted-foreground">
                    <Link href="/signup">
                        Register
                    </Link>
                </Button>
                {/* need to add backend functionality to logout user */}
                <Button
                    onClick={handleLogout}
                    className="bg-foreground text-background px-4 py-2 rounded hover:bg-muted-foreground"
                >
                    <Link href="/login">
                        Logout
                    </Link>
                </Button>
                <InboxIcon />
                <UserCircle />
            </div>
        </div>
    );
}

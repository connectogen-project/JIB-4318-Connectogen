"use client";
// import { usePathname } from "next/navigation";
import Link from "next/link";
import { logoutUser } from "@/app/lib/api"
import { useRouter } from "next/navigation";
import Logo from "@repo/ui/components/logo";
import { Button } from "@repo/ui/components/ui/button";
import { InboxIcon, UserCircle } from "lucide-react";

import {
    NavigationMenu,
    NavigationMenuContent,
    // NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    // NavigationMenuViewport,
} from "@repo/ui/components/ui/navigation-menu"


export default function NavBar() {
    // const pathname = usePathname();
    // const PORT = process.env.PORT || "2999";
    const router = useRouter();
    const handleLogout = async () => {

        try {
            // const response = await fetch('auth/logout/', { method: 'POST' });
            const response = await logoutUser();
            if (response) {
                console.log("Logged out.")
                router.push("/login")
            } else {
                console.error('Failed to log out');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className="flex w-full items-center border-b border-border h-[68px] sticky top-0 z-50 bg-white">
            <div className="flex flex-grow items-center">
                <div className="mx-9"><Logo /></div>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
                            <NavigationMenuContent className="flex flex-col p-4 w-[300px] md:w-[400px] lg:w-[500px]">
                                <NavigationMenuLink
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    href="/projects"
                                >
                                    All Projects
                                </NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Mentorship</NavigationMenuTrigger>
                            <NavigationMenuContent className="flex flex-col p-4 w-[300px] md:w-[400px] lg:w-[500px]">
                                <NavigationMenuLink
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    href="/mentorship/find-mentorship">
                                    Find a Mentor or Mentee
                                </NavigationMenuLink>
                                <NavigationMenuLink
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    href="/mentorship/logs"
                                >
                                    Interaction Log
                                </NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
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

                <Button
                    onClick={handleLogout}
                    className="bg-foreground text-background px-4 py-2 rounded hover:bg-muted-foreground"
                >
                        Logout
                </Button>
                <InboxIcon />
                <UserCircle />
            </div>
        </div >
    );
}

"use client";

import { Suspense, useState } from "react";
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
} from "@repo/ui/components/ui/navigation-menu";
import { NotificationsList } from "./notifications-list";

// Mock data for connection requests
const mockNotifications = [
  {
    id: "1",
    name: "Anuradha Trivedi",
    message: "Sent you a connection request.",
  },
  {
    id: "2",
    name: "Jacquelyn O'Banion",
    message: "Sent you a connection request.",
  },
  {
    id: "3",
    name: "Zofia Lasiecka",
    message: "Sent you a connection request.",
  },
];

export default function NavBar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  // const [notifications, setNotifications] = useState(NotificationItem[]);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:2999';



  const handleLogout = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res) {
        console.log("Logged out.");
        router.push("/");
      } else {
        console.error("Failed to log out");
        throw new Error('Failed to logout');
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };



  return (
    <div className="flex w-full items-center border-b border-border h-[68px] sticky top-0 z-50 bg-white">
      <div className="flex flex-grow items-center">
        <div className="mx-9">
          <Logo />
        </div>
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
                  href="/mentorship/find-mentorship"
                >
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
        <Button
          onClick={handleLogout}
          className="bg-foreground text-background px-4 py-2 rounded hover:bg-muted-foreground"
        >
          Logout
        </Button>
        <Suspense fallback={<InboxIcon />}>
          <NotificationsList />
        </Suspense>
        <UserCircle />
      </div>
    </div>
  );
}


import { Suspense } from "react";
import Logo from "@repo/ui/components/logo";
import Link from "next/link";
import { InboxIcon, UserCircle } from "lucide-react";
import LogoutButton from "./log-out";

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

export default function NavBar() {
  return (
    <div className="flex w-full items-center border-b border-border h-[68px] sticky top-0 z-50 bg-white">
      <div className="flex flex-grow items-center">
        <div className="mx-9">
          <Link href="/">
            <Logo />
          </Link>
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
        <LogoutButton />
        <Suspense fallback={<InboxIcon />}>
          <NotificationsList />
        </Suspense>
        <UserCircle />
      </div>
    </div>
  );
}

"use client";

import { usePathname } from "next/navigation";
import NavBar from "./NavBar/navbar";
import WelcomeBar from "./welcomebar";
import { useAuth } from "@/context/AuthContext";

export default function NavbarWrapper() {
    const pathname = usePathname();
    const { isLoggedIn } = useAuth();

    console.log("NavbarWrapper Rendered - Path:", pathname);
    console.log("User Logged In:", isLoggedIn);

    // Paths that should always show WelcomeBar
    const showWelcomeBar = ["/", "/login", "/signup"].includes(pathname);

    // Paths that should ALWAYS display NavBar, even if user isn't logged in
    const alwaysShowNavBar = ["/mentorship/find-mentorship", "/mentorship/logs", "/projects"].includes(pathname);

    if (showWelcomeBar) {
        return <WelcomeBar />;
    }

    if (isLoggedIn || alwaysShowNavBar) {
        return <NavBar />;
    }

    return null;
}

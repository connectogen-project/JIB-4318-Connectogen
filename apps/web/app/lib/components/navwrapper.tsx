"use client";

import { usePathname } from "next/navigation";
import NavBar from "./navbar";
import WelcomeBar from "./welcomebar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return isHomePage ? <WelcomeBar /> : <NavBar />;
}

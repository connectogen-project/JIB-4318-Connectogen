import NavBar from "../lib/components/NavBar/nav-bar";

export default function AuthenticatedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <NavBar />
            {children}
        </>
    );
}
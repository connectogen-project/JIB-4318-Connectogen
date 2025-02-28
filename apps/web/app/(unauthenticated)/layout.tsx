import WelcomeBar from "../lib/components/NavBar/welcome-bar";

export default function UnauthenticatedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <WelcomeBar />
            {children}
        </>
    );
}
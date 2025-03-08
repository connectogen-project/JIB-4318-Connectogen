import LogsSidebar from "@/app/lib/components/InteractionLogs/logs-sidebar";

export default function LogsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="flex h-[calc(100vh-68px)] overflow-hidden">
                {/* Sidebar */}
                <div className="w-64 border-r h-full">
                    <LogsSidebar />
                </div>

                {/* Main Content */}
                <div className="flex-1 h-full flex flex-col min-h-0">
                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto min-h-0">
                        {children}
                    </div>
                </div>
            </div >
        </>
    );
}
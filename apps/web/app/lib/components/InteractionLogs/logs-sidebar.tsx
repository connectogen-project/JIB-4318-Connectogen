import Link from "next/link";
import LogsList from "./logs-list";
import { Button } from "@repo/ui/components/ui/button";

export default function LogsSidebar() {
    return (
        <div className="flex flex-col py-4 w-64 border-r h-full">
            <div className="flex justify-center py-2 sticky top-0 bg-white z-10">
                <Link href="/mentorship/logs/create">
                    <Button>Add Interaction</Button>
                </Link>
            </div>
            <div className="my-2 flex-1 overflow-y-auto min-h-0">
                <h3 className="text-sm text-muted-foreground py-1 px-6 sticky top-[2px] bg-white z-10">Interactions</h3>
                <LogsList />
            </div>
        </div>
    );
}
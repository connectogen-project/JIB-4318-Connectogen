import Link from "next/link";
import LogsList from "./logs-list";
import { Button } from "@repo/ui/components/ui/button";

export default function LogsSidebar() {
    return (
        <div className="flex flex-col py-4 w-64 border-r h-[calc(100vh-68px)]">
            <div className="flex justify-center py-2">
                <Link href="/submit-interaction">
                    <Button>Add Interaction</Button>
                </Link>
            </div>

            <div className="my-2">
                <h3 className="text-sm text-muted-foreground py-1 px-6">Interactions</h3>
                <LogsList />
            </div>

        </div>
    );
}
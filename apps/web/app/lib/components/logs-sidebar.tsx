import Link from "next/link";
import LogsList from "./logs-list";
import { Button } from "@repo/ui/components/ui/button";

export default function LogsSidebar() {
    return (
        <div className="flex flex-col p-4 w-64 border-r h-[calc(100vh-68px)]">
            <Link href="/submit-interaction">
                <Button>Add Interaction</Button>
            </Link>
            <div>
                <h3 className="text-sm text-muted-foreground my-2">Interactions</h3>
                <LogsList />
            </div>

        </div>
    );
}
import Link from "next/link";
import Log from "./log";

export default async function LogsList() {
    const allLogs = await fetch("http://localhost:2999/mentorship/logs").then((res) => res.json()) as any

    return (
        <div className="space-y-1">
            {allLogs.data.map((interaction: any) => (
                <Link href={`/mentorship/logs?id=${interaction._id}`}>
                    <Log
                        key={interaction._id}
                        {...interaction}
                    />
                </Link>
            ))}
        </div>
    );
};

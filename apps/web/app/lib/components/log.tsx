'use client'

import { useSearchParams } from "next/navigation";

interface LogProps {
    _id: string;
    title: string;
    date: string;
    mentorName: string;
}

export default function Log({ _id, title, date, mentorName }: LogProps) {
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit'
    });

    const searchParams = useSearchParams();
    const selectedID = searchParams.get('id');

    return (
        <div
            className={`py-2 px-6 rounded-sm cursor-pointer ${_id === selectedID ? 'bg-muted' : 'hover:bg-muted/50'
                }`}
        >
            <div className="font-medium text-sm truncate">{title}</div>
            <div className="text-sm">
                <span>{formattedDate}</span>
                <span className="text-muted-foreground ml-2">{mentorName}</span>
            </div>
        </div>
    );
}
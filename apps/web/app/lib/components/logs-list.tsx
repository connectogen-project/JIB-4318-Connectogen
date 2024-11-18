import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface LogDetails {
    _id: string;
    title: string;
    date: string;
    mentorName: string;
}

interface LogProps {
    id: string;
    title: string;
    date: string;
    mentorName: string;
    isSelected: boolean;
    onClick: () => void;
}

function Log({ title, date, mentorName, isSelected, onClick }: LogProps) {
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit'
    });

    return (
        <div
            onClick={onClick}
            className={`py-2 px-6 rounded-sm cursor-pointer ${
                isSelected ? 'bg-muted' : 'hover:bg-muted/50'
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

const LogsList: React.FC = () => {
    const [logs, setLogs] = useState<LogDetails[]>([]);
    const router = useRouter();
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        // Get query param from URL manually when component loads
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        setSelectedId(id);

        // Fetch logs from the backend
        const fetchLogs = async () => {
            try {
                const response = await axios.get('http://localhost:2999/mentorship/logs');
                setLogs(response.data.data); // Assuming the logs are in the 'data' field of the response
            } catch (error) {
                console.error('Error fetching logs:', error);
            }
        };

        fetchLogs();
    }, []);

    const handleLogClick = (id: string) => {
        setSelectedId(id);
        router.push(`/mentorship/logs?id=${id}`);
    };

    return (
        <div className="space-y-1">
            {logs.length > 0 ? (
                logs.map((log) => (
                    <Log
                        key={log._id}
                        id={log._id}
                        title={log.title}
                        date={log.date}
                        mentorName={log.mentorName}
                        isSelected={selectedId === log._id}
                        onClick={() => handleLogClick(log._id)}
                    />
                ))
            ) : (
                <p>No logs available</p>
            )}
        </div>
    );
};

export default LogsList;

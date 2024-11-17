"use client"; // Using this because components in Next.js are server-side

import React, { useEffect, useState } from 'react'; // <-- These are the components
import axios from 'axios';

interface Log {
    _id: string;
    title: string;
}

function Log(
    { title }: { title: string }
) {
    return (
        <div className="hover:bg-muted py-2 px-6 rounded-sm truncate text-sm">
            <span>{title}</span>
        </div>
    )
}

const LogsList: React.FC = () => {
    const [logs, setLogs] = useState<Log[]>([]);

    useEffect(() => {
        // This will retrieve the logs from the backend
        const fetchLogs = async () => {
            try {
                // The localhost value here is the one set for me (AJ)
                const response = await axios.get('http://localhost:3000/logs');
                setLogs(response.data.data); // This assumes Logs are present in the data field
            } catch (error) {
                console.error('Error fetching logs:', error);
            }
        };

        fetchLogs();
    }, []);

    return (
        <div>
            <h1>Logs List</h1>
            <div>
                {logs.length > 0 ? (
                    logs.map((log) => (
                        <Log key={log._id} title={log.title} />
                    ))
                ) : (
                    <p>No logs available</p>
                )}
            </div>
        </div>
    );
};

// export default function LogsList() {
//     return (
//         <div>
//             <Log title="Super great interaction"></Log>
//             <Log title="Mega awesome interaction"></Log>
//             <Log title="Best interaction ever"></Log>
//             <Log title="Best interaction ever with overflow"></Log>
//         </div>
//     );
// }
export default LogsList;
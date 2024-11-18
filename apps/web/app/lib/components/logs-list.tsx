'use client';

import { useSearchParams, useRouter } from 'next/navigation';

interface LogProps {
    id: string;
    title: string;
    date: string;
    mentorName: string;
    isSelected: boolean;
    onClick: () => void;
}

function Log({ id, title, date, mentorName, isSelected, onClick }: LogProps) {
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

// Temporary data
const SAMPLE_INTERACTIONS = [
    {
        id: '1',
        title: 'Super great interaction',
        date: '2024-03-20',
        mentorName: 'John Doe',
        description: 'This was a really productive session where we discussed...'
    },
    {
        id: '2',
        title: 'Mega awesome interaction with a very long title that should truncate',
        date: '2024-03-19',
        mentorName: 'Jane Smith',
        description: 'During this meeting, we covered...'
    },
    {
        id: '3',
        title: 'Career planning session',
        date: '2024-03-18',
        mentorName: 'Sarah Wilson',
        description: 'Had an in-depth discussion about long-term career goals and created a 5-year development plan.'
    },
    {
        id: '4',
        title: 'Technical skills review',
        date: '2024-03-15', 
        mentorName: 'Mike Johnson',
        description: 'Reviewed recent technical projects and identified areas for improvement in system design and architecture.'
    },
    {
        id: '5',
        title: 'Leadership development',
        date: '2024-03-12',
        mentorName: 'Emily Chen',
        description: 'Focused on developing leadership capabilities and discussed strategies for leading cross-functional teams effectively.'
    }
];

export default function LogsList() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedId = searchParams.get('id');

    const handleLogClick = (id: string) => {
        router.push(`/mentorship/logs?id=${id}`);
    };

    return (
        <div className="space-y-1">
            {SAMPLE_INTERACTIONS.map((interaction) => (
                <Log 
                    key={interaction.id}
                    {...interaction}
                    isSelected={selectedId === interaction.id}
                    onClick={() => handleLogClick(interaction.id)}
                />
            ))}
        </div>
    );
}
'use client';

import { useSearchParams } from 'next/navigation';
import LogsSidebar from "../../lib/components/logs-sidebar";
import NewInteractionForm from "../../lib/components/new-interaction-form";
import InteractionDetails from "../../lib/components/interaction-details";
import LogsContent from "../../lib/components/logs-content";
import { Suspense } from 'react';

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

export default function Logs() {
    return (
        <Suspense fallback={<div>Loading logs...</div>}>
            <LogsContentWrapper />
        </Suspense>
    );
}

function LogsContentWrapper() {
    const searchParams = useSearchParams();
    const showForm = searchParams.get('new') === 'true';
    const selectedId = searchParams.get('id');

    const selectedInteraction = SAMPLE_INTERACTIONS.find(
        interaction => interaction.id === selectedId
    );

    return (
        <div className="flex h-screen">
            <div className="w-64 border-r">
                <LogsSidebar />
            </div>
            <div className="flex-1 overflow-y-auto">
                {showForm ? (
                    <NewInteractionForm />
                ) : selectedInteraction ? (
                    <InteractionDetails {...selectedInteraction} />
                ) : (
                    <LogsContent />
                )}
            </div>
        </div>
    );
}

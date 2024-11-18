interface InteractionDetailsProps {
    title: string;
    date: string;
    mentorName: string;
    description: string;
}

export default function InteractionDetails({ title, date, mentorName, description }: InteractionDetailsProps) {
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit'
    });

    return (
        <div className="p-6 max-w-3xl">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <div className="text-sm mb-6">
                <span>{formattedDate}</span>
                <span className="text-muted-foreground ml-2">{mentorName}</span>
            </div>
            <div className="whitespace-pre-wrap">{description}</div>
        </div>
    );
}
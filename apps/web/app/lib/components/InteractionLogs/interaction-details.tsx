'use client'

import { motion, AnimatePresence } from "framer-motion";

interface InteractionDetailsProps {
    title: string;
    date: string;
    mentorName: string;
    description: string;
}

// New helper method for date to fix bug
function formatCustomDate(dateInput: string): string {
    // Assume dateInput is in the format "YYYY-MM-DD"
    const parts = dateInput.split("-");
    if (parts.length !== 3) return dateInput; // fallback in case of unexpected format

    const [year, month, day] = parts;
    // Create a local date (month is zero-indexed)
    const localDate = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));

    const weekday = localDate.toLocaleDateString("en-US", { weekday: "short" });
    const monthStr = localDate.toLocaleDateString("en-US", { month: "short" });

    return `${weekday} - ${monthStr} ${day}, ${year}`;
}

export default function InteractionDetails({ title, date, mentorName, description }: InteractionDetailsProps) {
    // const formattedDate = new Date(date).toLocaleDateString('en-US', {
    //     month: '2-digit',
    //     day: '2-digit',
    //     year: '2-digit'
    // });
    const formattedDate = formatCustomDate(date);

    const uniqueKey = `${title}-${formattedDate}-${mentorName}-${description}`;

    return (
        <AnimatePresence mode='wait'>
            <motion.div
                className="flex flex-col h-full min-h-0"
                key={uniqueKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.14 }}
            >
                {/* Header Section */}
                <div className="flex flex-col p-6">
                    <h2 className="text-2xl font-bold mb-2">{title}</h2>
                    <div className="text-sm mb-6">
                        <span>{formattedDate}</span>
                        <span className="text-muted-foreground ml-2">{mentorName}</span>
                    </div>
                </div>
                {/* Scrollable Description Section */}
                <div className="flex-1 overflow-y-auto p-6 max-w-3xl min-h-0">
                    <div className="whitespace-pre-wrap">{description}</div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
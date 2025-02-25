'use client';

import { motion, AnimatePresence } from "framer-motion";

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
                <div className="p-6 max-w-3xl">
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
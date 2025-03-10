'use client';

import React, { useMemo, useState, useEffect, useRef } from 'react';
import useSWR from 'swr';
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import Image from 'next/image';


interface Interaction {
    _id: string;
    title: string;
    date?: string;
    mentorName: string;
    description: string;
    createdAt: string;
    updatedAt?: string;
}

interface ApiResponse {
    success: boolean;
    data?: Interaction[];
}

type SortOption =
    | 'dateAddedAsc'
    | 'dateAddedDesc'
    | 'interactionDateAsc'
    | 'interactionDateDesc'
    | 'mentorNameAsc'
    | 'mentorNameDesc';


const fetcher = async (url: string): Promise<ApiResponse> => {
    const res = await fetch(url, {
        cache: "no-store",
        credentials: 'include',
    });
    if (!res.ok) {
        throw new Error("An error occurred while fetching");
    }
    return res.json();
}

// Same helper method from interaction-details
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

export default function LogsList() {
    const [sortOption, setSortOption] = useState<SortOption>('dateAddedDesc');
    const [searchQuery, setSearchQuery] = useState('');
    const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement | null>(null);

    const { data: response, error } = useSWR<ApiResponse>(
        'http://localhost:2999/mentorship/logs',
        fetcher
    );

    const logs: Interaction[] = response?.data ?? [];

    const filteredLogs = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        return logs.filter((log) => {
            // Normalize strings
            const title = log.title?.toLowerCase() || '';
            const mentorName = log.mentorName?.toLowerCase() || '';
            const interactionDate = log.date?.toLowerCase() || '';
            const createdAt = new Date(log.createdAt)
                .toLocaleDateString()
                .toLowerCase();

            // Split mentor's name into words
            const mentorNameParts = mentorName.split(/\s+/);

            // Check if any part of the mentor's name matches the query
            const mentorNameMatch = mentorNameParts.some((namePart) =>
                namePart.includes(query)
            );

            // Check if any field matches the query
            return (
                title.includes(query) ||
                mentorNameMatch ||
                interactionDate.includes(query) ||
                createdAt.includes(query)
            );
        });
    }, [logs, searchQuery]);

    const parseInteractionDate = (dateStr: string | undefined): number => {
        if (!dateStr) {
            // Handle the case where dateStr is undefined
            return 0; // Or choose an appropriate default value
        }

        const dateParts = dateStr.split('/');
        if (dateParts.length !== 3) {
            // Handle the case where dateStr doesn't have the expected format
            return 0; // Or choose an appropriate default value
        }

        const [month, day, year] = dateParts;

        // Ensure month, day, and year are defined
        if (!month || !day || !year) {
            return 0; // Or choose an appropriate default value
        }

        return new Date(
            parseInt(year, 10),
            parseInt(month, 10) - 1,
            parseInt(day, 10)
        ).getTime();
    };

    const sortedLogs = useMemo(() => {
        return filteredLogs.slice().sort((a, b) => {
            switch (sortOption) {
                case 'dateAddedAsc':
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                case 'dateAddedDesc':
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                case 'interactionDateAsc':
                    return parseInteractionDate(a.date) - parseInteractionDate(b.date);
                case 'interactionDateDesc':
                    return parseInteractionDate(b.date) - parseInteractionDate(a.date);
                case 'mentorNameAsc':
                    return a.mentorName.localeCompare(b.mentorName);
                case 'mentorNameDesc':
                    return b.mentorName.localeCompare(a.mentorName);
                default:
                    return 0;
            }
        });
    }, [filteredLogs, sortOption]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                filterRef.current &&
                !filterRef.current.contains(event.target as Node)
            ) {
                setIsFilterPopupOpen(false);
            }
        };
        if (isFilterPopupOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isFilterPopupOpen]);


    if (error) return <div>Failed to load logs.</div>;
    if (!response) return <div>Loading...</div>;

    return (
        <div className="flex flex-col h-screen">
            {/* Search Bar and Filter Icon */}
            <div className="flex items-center justify-between p-4 bg-white sticky top-0 z-10">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 mr-2 flex-shrink-0 w-4/5"
                />
                <div className="relative" ref={filterRef}>
                    <button
                        onClick={() => setIsFilterPopupOpen(!isFilterPopupOpen)}
                        className="border border-gray-300 rounded px-2 py-1 flex-shrink-0"
                        aria-label="Filter"
                    >
                        <Image
                            src="/filter-icon.png"
                            alt="Filter"
                            width={30}
                            height={30}
                        />
                    </button>
                    {isFilterPopupOpen && (
                        <motion.div
                            className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-300 rounded shadow-lg z-100 origin-top-right"
                            initial={{ opacity: 0, scaleY: 0 }}
                            animate={{ opacity: 1, scaleY: 1 }}
                            exit={{ opacity: 0, scaleY: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Sorting options */}
                            <div className="p-2">
                                <p className="font-semibold mb-2">Sort Options</p>
                                {[
                                    { value: 'dateAddedDesc', label: 'Date Added (Newest First)' },
                                    { value: 'dateAddedAsc', label: 'Date Added (Oldest First)' },
                                    { value: 'interactionDateDesc', label: 'Interaction Date (Newest First)' },
                                    { value: 'interactionDateAsc', label: 'Interaction Date (Oldest First)' },
                                    { value: 'mentorNameAsc', label: 'Mentor Name (A-Z)' },
                                    { value: 'mentorNameDesc', label: 'Mentor Name (Z-A)' },
                                ].map((option) => (
                                    <label className="block mb-1" key={option.value}>
                                        <input
                                            type="radio"
                                            name="sortOption"
                                            value={option.value}
                                            checked={sortOption === option.value}
                                            onChange={(e) => {
                                                setSortOption(e.target.value as SortOption);
                                                setIsFilterPopupOpen(false);
                                            }}
                                        />
                                        <span className="ml-2">{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Logs List */}
            <div className="flex-1 overflow-y-auto px-4">
                {sortedLogs.length > 0 ? (
                    <AnimatePresence>
                        {sortedLogs.map((log) => (
                            <motion.div
                                key={log._id}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Link href={`/mentorship/logs?id=${log._id}`}>
                                    <div className="py-2 cursor-pointer hover:bg-gray-100">
                                        <p className="text-sm font-medium">{log.title}</p>
                                        <p className="text-xs text-gray-500">{formatCustomDate(log.date || log.createdAt)}</p>
                                        <p className="text-xs text-gray-500">{log.mentorName}</p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                ) : (
                    <div className="text-center text-gray-500 mt-4">
                        No interactions found, maybe try refining your search.
                    </div>
                )}
            </div>
        </div>
    );
}
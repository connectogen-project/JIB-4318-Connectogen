
'use client'
import { motion } from "framer-motion";
import { ArrowDownUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type SortOption =
    | 'dateAddedAsc'
    | 'dateAddedDesc'
    | 'nameAsc'
    | 'nameDesc';

type SortMentorsProps = {
    sortOption: SortOption;
}

export default function SortMentors({ sortOption }: SortMentorsProps) {
    const sortRef = useRef<HTMLDivElement | null>(null);
    const [isSortPopupOpen, setIsSortPopupOpen] = useState(false);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                sortRef.current &&
                !sortRef.current.contains(event.target as Node)
            ) {
                setIsSortPopupOpen(false);
            }
        };
        if (isSortPopupOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        console.log(isSortPopupOpen)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSortPopupOpen]);

    return (
        <div className="relative">
            <div className="flex items-center ml-auto space-x-2" onClick={() => setIsSortPopupOpen(!isSortPopupOpen)}>
                <p>Sort</p>
                <ArrowDownUp />
            </div>
            {isSortPopupOpen && (
                <motion.div
                    className="absolute right-0 top-full p-2 w-64 bg-white border border-gray-300 rounded shadow-lg z-50 origin-top-right"
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    exit={{ opacity: 0, scaleY: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Sorting options */}
                    <div className="p-2">
                        <div className="flex flex-row items-start justify-between">
                            <p className="flex font-semibold mb-2">Sort Options</p>
                            <X className="flex ml-auto space-x-2" onClick={() => setIsSortPopupOpen(false)} />
                        </div>

                        {[
                            { value: 'dateAddedDesc', label: 'Date Added (Asc)' },
                            { value: 'dateAddedAsc', label: 'Date Added (Dsc)' },
                            { value: 'nameAsc', label: 'Name (A-Z)' },
                            { value: 'nameDesc', label: 'Name (Z-A)' },
                        ].map((option) => (
                            <label className="block mb-1" key={option.value}>
                                <input
                                    type="radio"
                                    name="sortOption"
                                    value={option.value}
                                    checked={sortOption === option.value}
                                    onChange={(e) => {
                                        const params = new URLSearchParams(searchParams);
                                        params.set("sortOption", e.currentTarget.value);
                                        replace(`${pathname}?${params.toString()}`);
                                    }}
                                />
                                <span className="ml-2">{option.label}</span>
                            </label>
                        ))}
                    </div>
                </motion.div>)}
        </div>
    )
}
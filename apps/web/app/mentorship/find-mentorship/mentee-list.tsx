'use client'

import { useEffect, useState } from "react";
import { DataTable } from "./data-table"
import { SortOption } from "@/app/lib/components/sort-mentors";
import { User } from "@/app/lib/types";
import { Mentee, menteeColumns } from "./mentee-columns";

type MenteeListProps = {
    sortOption: SortOption;
    filters: {
        institutions: string[];
        fields: string[];
        position: string[];
        subspecialties: string[];
    };
};

async function getMenteeData(sortOption: SortOption): Promise<Mentee[]> {
    // Fetch data from your API here.
    const allMenteeResponse = await fetch("http://localhost:2999/api/mentees/getMentees", {
        cache: "no-store",
    });

    if (!allMenteeResponse.ok) {
        throw new Error(`Failed to fetch mentor data: ${allMenteeResponse.statusText}`);
    }

    const allMenteeData: {
        data: User[],
    } = await allMenteeResponse.json();
    console.log(allMenteeData)

    let displayedData: Mentee[] = allMenteeData.data.map(user => ({
        name: user.firstName + " " + user.lastName,
        institution: user.institution,
        fields: user.fields,
        position: user.position,
        subspecialties: user.subspecialties,
        createdAt: user.createdAt,
    }))


    displayedData = displayedData.sort((a, b) => {

        switch (sortOption) {
            case "nameAsc":
                return a.name.localeCompare(b.name);
            case "nameDesc":
                return b.name.localeCompare(a.name);
            case "dateAddedAsc":
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            case "dateAddedDesc":
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            default:
                return 0;
        }
    })
    return displayedData
}

export default function MenteeList({ sortOption, filters }: MenteeListProps) {
    const [mentees, setMentees] = useState<Mentee[]>([]);

    useEffect(() => {
        async function fetchData() {
            const sortedMentees = await getMenteeData(sortOption);
            setMentees(sortedMentees);
        }
        fetchData();
    }, [sortOption]); // Only refetch when sorting changes

    const filteredMentees = mentees.filter((mentee) => {
        return (
            (filters.institutions.length === 0 || filters.institutions.includes(mentee.institution)) &&
            (filters.fields.length === 0 || filters.fields.includes(mentee.fields)) &&
            (filters.position.length === 0 || filters.position.includes(mentee.position)) &&
            (filters.subspecialties.length === 0 || filters.subspecialties.includes(mentee.subspecialties))
        );
    });

    return <DataTable columns={menteeColumns} data={filteredMentees} />;
}

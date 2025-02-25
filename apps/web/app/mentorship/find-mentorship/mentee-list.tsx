import { DataTable } from "./data-table"
import { SortOption } from "@/app/lib/components/MentorshipTable/sort-mentors";
import { User } from "@/app/lib/types";
import { Mentee, menteeColumns } from "./mentee-columns";

async function getMenteeData(sortOption: SortOption) {
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

interface MenteeListProps {
    sortOption: SortOption,
    filters: {
        institutions?: string[],
        fields?: string[],
        position?: string[],
        subspecialties?: string[],

    }
}

export default async function MenteeList({ sortOption, filters }: MenteeListProps) {
    const mentees = await getMenteeData(sortOption);

    const filteredMentees = mentees.filter((mentee) => {
        return (
            (!filters.institutions || filters.institutions?.includes(mentee.institution?.replaceAll(' ', ''))) &&
            (!filters.fields || filters.fields?.includes(mentee.fields?.replaceAll(' ', ''))) &&
            (!filters.position || filters.position?.includes(mentee.position?.replaceAll(' ', ''))) &&
            (!filters.subspecialties || filters.subspecialties?.includes(mentee.subspecialties?.replaceAll(' ', '')))
        );
    });

    return <DataTable columns={menteeColumns} data={filteredMentees} />;
}

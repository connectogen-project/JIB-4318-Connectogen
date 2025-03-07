import { DataTable } from "./data-table"
import { SortOption } from "@/app/lib/components/MentorshipTable/sort-mentors";
import { Mentor, mentorColumns } from "./mentor-columns";
import { User } from "@/app/lib/types";

async function getMentorData(sortOption: SortOption) {
    // Fetch data from your API here.

    const allMentorResponse = await fetch("http://localhost:2999/api/mentors/getMentors", {
        cache: "no-store",
    });

    if (!allMentorResponse.ok) {
        throw new Error(`Failed to fetch mentor data: ${allMentorResponse.statusText}`);
    }

    const allMentorData: {
        data: User[],
    } = await allMentorResponse.json();

    let displayedData: Mentor[] = allMentorData.data.map(user => ({
        _id: user._id,
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


type MentorListProps = {
    sortOption: SortOption;
    filters: {
        institutions?: string[];
        fields?: string[];
        position?: string[];
        subspecialties?: string[];
    };
};

export default async function MentorList({ sortOption, filters }: MentorListProps) {
    const mentors = await getMentorData(sortOption);

    const filteredMentors = mentors.filter((mentor) => {
        return (
            (!filters.institutions || filters.institutions?.includes(mentor.institution?.replaceAll(' ', ''))) &&
            (!filters.fields || filters.fields?.includes(mentor.fields?.replaceAll(' ', ''))) &&
            (!filters.position || filters.position?.includes(mentor.position?.replaceAll(' ', ''))) &&
            (!filters.subspecialties || filters.subspecialties?.includes(mentor.subspecialties?.replaceAll(' ', '')))
        );
    });

    return <DataTable columns={mentorColumns} data={filteredMentors} />;
}

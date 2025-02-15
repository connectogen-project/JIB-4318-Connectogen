import { Mentor, mentorColumns } from "./mentor-columns"
import { Mentee, menteeColumns } from "./mentee-columns"
import { MentorDataTable } from "./mentor-data-table"
import { MenteeDataTable } from "./mentee-data-table"
import { User } from "@/app/lib/types"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs"
import FilterMentorsSidebar from "@/app/lib/components/filter-mentors-sidebar"
import SortMentors from "@/app/lib/components/sort-mentors"


async function getMentorData(): Promise<Mentor[]> {
    // Fetch data from your API here.

    const allMentorResponse = await fetch("http://localhost:2999/auth/mentors", {
        cache: "no-store",
    });

    if (!allMentorResponse.ok) {
        throw new Error(`Failed to fetch mentor data: ${allMentorResponse.statusText}`);
    }

    const allMentorData: {
        data: User[],
    } = await allMentorResponse.json();
    console.log(allMentorData)

    const displayedData: Mentor[] = allMentorData.data.map(user => ({
        name: user.firstName + " " + user.lastName,
        institution: user.institution,
        // fields: user.fields
        // position: user.position,
        subspecialties: user.subspecialties,
    }))

    return displayedData
}

async function getMenteeData(): Promise<Mentee[]> {
    // Fetch data from your API here.
    const allMenteeResponse = await fetch("http://localhost:2999/auth/mentees", {
        cache: "no-store",
    });

    if (!allMenteeResponse.ok) {
        throw new Error(`Failed to fetch mentor data: ${allMenteeResponse.statusText}`);
    }

    const allMenteeData: {
        data: User[],
    } = await allMenteeResponse.json();
    console.log(allMenteeData)

    const displayedData: Mentee[] = allMenteeData.data.map(user => ({
        name: user.firstName + " " + user.lastName,
        institution: user.institution,
        // fields: mentor.fields
        // position: mentor.position,
        subspecialties: user.subspecialties,
    }))

    return displayedData
}

export default async function FindMentorshipPage() {
    const mentorData = await getMentorData()
    const menteeData = await getMenteeData()

    return (
        <div className="flex">
            <div className="flex w-1/5 border-r h-screen">
                <FilterMentorsSidebar />
            </div>
            <div className="flex-grow flex flex-col container mx-auto py-10">
                <Tabs defaultValue={"mentors"}>
                    <div className="flex flex-row items-center justify-between">
                        <TabsList className="flex">
                            <TabsTrigger value="mentors">Mentors</TabsTrigger>
                            <TabsTrigger value="mentees">Mentees</TabsTrigger>
                        </TabsList>
                        <SortMentors />
                    </div>
                    <TabsContent value="mentors">
                        <MentorDataTable columns={mentorColumns} data={mentorData} />
                    </TabsContent>
                    <TabsContent value="mentees">
                        <MenteeDataTable columns={menteeColumns} data={menteeData} />
                    </TabsContent>
                </Tabs>

            </div>
        </div>
    )
}

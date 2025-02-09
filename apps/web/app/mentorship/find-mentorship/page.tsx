import { Mentor, mentorColumns } from "./mentor-columns"
import { Mentee, menteeColumns } from "./mentee-columns"
import { MentorDataTable } from "./mentor-data-table"
import { MenteeDataTable } from "./mentee-data-table"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs"
import FindMentorsSidebar from "@/app/lib/components/find-mentors-sidebar"


async function getMentorData(): Promise<Mentor[]> {
    // Fetch data from your API here.
    return [
        {
            name: "John Doe",
            institution: "Georgia Institute of Technology",
            fields: "Computer Science",
            position: "Researcher",
        },
        // ...
    ]
}

async function getMenteeData(): Promise<Mentee[]> {
    // Fetch data from your API here.
    return [
        {
            name: "Ella Lloyd",
            institution: "Georgia Institute of Technology",
            fields: "Computer Science",
            position: "Student",
        },
        // ...
    ]
}

export default async function FindMentorshipPage() {
    const mentorData = await getMentorData()
    const menteeData = await getMenteeData()

    return (
        <div className="flex">
            <div className="w-1/5 border-r h-screen">
                <FindMentorsSidebar />
            </div>
            <div className="flex-grow container mx-auto py-10">
                <Tabs defaultValue={"mentors"}>
                    <TabsList>
                        <TabsTrigger value="mentors">Mentors</TabsTrigger>
                        <TabsTrigger value="mentees">Mentees</TabsTrigger>
                    </TabsList>
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

'use client'

import { SortOption } from "@/app/lib/components/sort-mentors"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs"
import FilterMentorsSidebar from "@/app/lib/components/filter-mentors-sidebar"
import SortMentors from "@/app/lib/components/sort-mentors"
import MentorList from "./mentor-list"
import MenteeList from "./mentee-list"
import { useState } from "react"

export default function FindMentorshipPage() {
    const [sortOption, setSortOption] = useState<SortOption>('dateAddedDesc');

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
                        <SortMentors sortOption={sortOption} setSortOption={setSortOption} />
                    </div>
                    <TabsContent value="mentors">
                        <MentorList sortOption={sortOption} />
                    </TabsContent>
                    <TabsContent value="mentees">
                        <MenteeList sortOption={sortOption} />
                    </TabsContent>
                </Tabs>

            </div>
        </div>
    )
}

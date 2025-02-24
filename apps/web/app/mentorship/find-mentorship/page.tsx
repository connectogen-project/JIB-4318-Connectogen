
import { SortOption } from "@/app/lib/components/sort-mentors"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs"
import FilterMentorsSidebar from "@/app/lib/components/filter-mentors-sidebar"
import SortMentors from "@/app/lib/components/sort-mentors"
import MentorList from "./mentor-list"
import MenteeList from "./mentee-list"
import { Suspense } from "react"
import { Skeleton } from "@repo/ui/components/ui/skeleton"

interface SearchParams {
    sortOption?: SortOption,
    institutions?: string[],
    fields?: string[],
    position?: string[],
    subspecialties?: string[],
}

export default async function FindMentorshipPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
    const { sortOption, institutions, fields, position, subspecialties } = await searchParams;
    const filters = {
        institutions, fields, position, subspecialties
    }
    const sort = sortOption || 'dateAddedAsc';

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
                        <SortMentors sortOption={sort} />
                    </div>
                    <TabsContent value="mentors">
                        <Suspense key={`${institutions}-${fields}-${position}-${subspecialties}-mentorlist`} fallback={<Skeleton className="w-full h-48" />}>
                            <MentorList sortOption={sort} filters={filters} />
                        </Suspense>
                    </TabsContent>
                    <TabsContent value="mentees">
                        <Suspense key={`${institutions}-${fields}-${position}-${subspecialties}-menteelist`} fallback={<Skeleton className="w-full h-48" />}>
                            <MenteeList sortOption={sort} filters={filters} />
                        </Suspense>
                    </TabsContent>
                </Tabs>

            </div>
        </div >
    )
}

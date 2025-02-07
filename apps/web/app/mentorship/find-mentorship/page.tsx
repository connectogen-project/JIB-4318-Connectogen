import { Mentor, columns } from "./mentor-columns"
import { DataTable } from "./mentor-data-table"

async function getData(): Promise<Mentor[]> {
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
    const data = await getData()

    return (
        <div className="flex">
            <div className="w-1/5">
                <h1>Customization Here</h1>
            </div>
            <div className="flex-grow container mx-auto py-10">
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    )
}

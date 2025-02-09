import { Plus } from 'lucide-react';
import { SlidersHorizontal } from 'lucide-react';
import { Search } from 'lucide-react';


export default function FindMentorsSidebar() {
    {/* Search Bar and Filter Icon */ }

    return (
        <div className="flex flex-col bg-white sticky top-0 z-10 pl-10 pt-10 pr-6" >
            <div className="flex flex-row">
                <input
                    type="text"
                    placeholder="Search"
                    className="border border-gray-300 rounded flex-shrink-0 p-2"
                />
                {/* <div className="absolute end-4 place-content-center">
                    <Search />
                </div> */}
            </div>


            <div className="py-4">
                <h1>Filter</h1>
                <div className="flex flex-row py-2">
                    <h2 className="flex flex-grow text-muted-foreground py-2">Institution</h2>
                    <div className="place-content-center">
                        <Plus size={16} />
                    </div>
                </div>
                <div className="flex flex-row py-2">
                    <h2 className=" flex flex-grow text-muted-foreground py-2">Field</h2>
                    <div className="place-content-center">
                        <Plus size={16} />
                    </div>
                </div>
                <div className="flex flex-row py-2">
                    <h2 className=" flex flex-grow text-muted-foreground py-2">Positions</h2>
                    <div className="place-content-center">
                        <Plus size={16} />
                    </div>
                </div>
                <div className="flex flex-row py-2">
                    <h2 className=" flex flex-grow text-muted-foreground py-2">Subspecialty</h2>
                    <div className="place-content-center">
                        <Plus size={16} />
                    </div>
                </div>
            </div>

        </div >

    )
};
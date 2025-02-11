import MultipleSelector from '@repo/ui/components/ui/multiple-selector';
import type { Option } from '@repo/ui/components/ui/multiple-selector';


export default function FilterMentorsSidebar() {

    // Fetch data from your API here.
    const INSTITUTION_OPTIONS: Option[] = [
        { label: 'GT', value: 'Georgia Institute of Technology' },
        { label: 'Emory', value: 'Emory University' },
    ];

    const FIELD_OPTIONS: Option[] = [
        { label: 'nextjs', value: 'Nextjs' },
        { label: 'React', value: 'react' },
    ];

    const POSITIONS_OPTIONS: Option[] = [
        { label: 'nextjs', value: 'Nextjs' },
        { label: 'React', value: 'react' },
    ];

    const SUBSPECIALTY_OPTIONS: Option[] = [
        { label: 'nextjs', value: 'Nextjs' },
        { label: 'React', value: 'react' },
    ];

    return (
        <div className="flex flex-col bg-white sticky top-0 z-10 pl-10 pt-10 pr-6" >
            <h1 className="pb-4">Filter</h1>

            {[
                { value: 'Institution', options: INSTITUTION_OPTIONS },
                { value: 'Field', options: FIELD_OPTIONS },
                { value: 'Positions', options: POSITIONS_OPTIONS },
                { value: 'Subspecialty', options: SUBSPECIALTY_OPTIONS },
            ].map(({ value, options }) => (
                <div className="flex flex-col py-2" key={value}>
                    <h2 className="flex flex-grow text-muted-foreground py-2">{value}</h2>
                    <MultipleSelector
                        defaultOptions={options}
                        hidePlaceholderWhenSelected
                        placeholder={value}
                        emptyIndicator={
                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                No results found.
                            </p>
                        }
                    />
                </div>

            ))}
        </div >

    )
};
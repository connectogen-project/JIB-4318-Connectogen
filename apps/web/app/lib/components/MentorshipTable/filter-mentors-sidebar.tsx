import MultipleSelector from '@repo/ui/components/ui/multiple-selector';
import type { Option } from '@repo/ui/components/ui/multiple-selector';

type FilterMentorsSidebarProps = {
    onFilterChange: (filters: {
        institutions: string[];
        fields: string[];
        position: string[];
        subspecialties: string[];
    }) => void;
};

export default function FilterMentorsSidebar({ onFilterChange }: FilterMentorsSidebarProps) {
    const INSTITUTION_OPTIONS: Option[] = [
        { label: 'Georgia Tech', value: 'Georgia Institute of Technology' },
        { label: 'Emory', value: 'Emory University' },
        { label: 'Morehouse', value: 'Morehouse College' },
        { label: 'Morehouse Medicine', value: 'Morehouse School of Medicine' },
    ];

    const FIELD_OPTIONS: Option[] = [
        { label: 'Anesthesiology', value: 'Anesthesiology' },
        { label: 'Biochemistry', value: 'Biochemistry' },
        { label: 'Biomedical Engineering', value: 'Biomedical Engineering' },
        { label: 'Biomedical Informatics', value: 'Biomedical Informatics' },
        { label: 'Chemistry', value: 'Chemistry' },
    ];

    const POSITIONS_OPTIONS: Option[] = [
        { label: 'Undergraduate Student', value: 'Undergraduate Student' },
        { label: 'Graduate Student', value: 'Graduate Student' },
        { label: 'Medical Student', value: 'Medical Student' },
        { label: 'Resident', value: 'Fellow' },
        { label: 'Faculty', value: 'Faculty' },
        { label: 'Researcher', value: 'Researcher' },
        { label: 'Staff', value: 'Staff' },
    ];

    const SUBSPECIALTY_OPTIONS: Option[] = [
        { label: 'Abdominal Imaging', value: 'Abdominal Imaging' },
        { label: 'Adolescent Medicine', value: 'Adolescent Medicine' },
        { label: 'Brain Injury', value: 'Brain Injury' },
        { label: 'Cardiology', value: 'Cardiology' },
        { label: 'Autonomic Disorders', value: 'Autonomic Disorders' },
        { label: 'Epilepsy', value: 'Epilepsy' },
        { label: 'Oncology', value: 'Oncology' },
    ];

    const handleFilterChange = (value: string, selectedOptions: Option[]) => {
        console.log("values: " + value)
        const selectedValues = selectedOptions.map((option) => option.value);
        console.log("selectedValues: " + selectedValues)
        onFilterChange({
            institutions: value === 'Institution' ? selectedValues : [],
            fields: value === 'Field' ? selectedValues : [],
            position: value === 'Positions' ? selectedValues : [],
            subspecialties: value === 'Subspecialty' ? selectedValues : [],
        });
    };

    return (
        <div className="flex flex-col bg-white sticky top-0 z-10 pl-10 pt-10 pr-6">
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
                        onChange={(selectedOptions) => handleFilterChange(value, selectedOptions)}
                    />
                </div>
            ))}
        </div>
    );
}
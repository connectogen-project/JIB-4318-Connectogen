'use client'

import MultipleSelector from '@repo/ui/components/ui/multiple-selector';
import type { Option } from '@repo/ui/components/ui/multiple-selector';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function FilterMentorsSidebar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();


    const INSTITUTION_OPTIONS: Option[] = [
        { label: 'Georgia Tech', value: 'GeorgiaInstituteofTechnology' },
        { label: 'Emory', value: 'EmoryUniversity' },
        { label: 'Morehouse', value: 'MorehouseCollege' },
        { label: 'Morehouse Medicine', value: 'MorehouseSchoolofMedicine' },
    ];

    const FIELD_OPTIONS: Option[] = [
        { label: 'Anesthesiology', value: 'Anesthesiology' },
        { label: 'Biochemistry', value: 'Biochemistry' },
        { label: 'Biomedical Engineering', value: 'BiomedicalEngineering' },
        { label: 'Biomedical Informatics', value: 'BiomedicalInformatics' },
        { label: 'Chemistry', value: 'Chemistry' },
    ];

    const POSITIONS_OPTIONS: Option[] = [
        { label: 'Undergraduate Student', value: 'UndergraduateStudent' },
        { label: 'Graduate Student', value: 'GraduateStudent' },
        { label: 'Medical Student', value: 'MedicalStudent' },
        { label: 'Resident', value: 'Fellow' },
        { label: 'Faculty', value: 'Faculty' },
        { label: 'Researcher', value: 'Researcher' },
        { label: 'Staff', value: 'Staff' },
    ];

    const SUBSPECIALTY_OPTIONS: Option[] = [
        { label: 'Abdominal Imaging', value: 'AbdominalImaging' },
        { label: 'Adolescent Medicine', value: 'AdolescentMedicine' },
        { label: 'Brain Injury', value: 'BrainInjury' },
        { label: 'Cardiology', value: 'Cardiology' },
        { label: 'Autonomic Disorders', value: 'AutonomicDisorders' },
        { label: 'Epilepsy', value: 'Epilepsy' },
        { label: 'Oncology', value: 'Oncology' },
    ];

    const handleFilterChange = (value: string, selectedOptions: Option[]) => {
        const params = new URLSearchParams(searchParams);
        if (selectedOptions.length === 0) {
            params.delete(value.toLowerCase())
        } else {

            params.set(value.toLowerCase(), selectedOptions.map(option => option.value).join(","));
        }
        replace(`${pathname}?${params.toString()}`);

    };

    return (
        <div className="flex flex-col bg-white sticky top-0 z-10 pl-10 pt-10 pr-6">
            <h1 className="pb-4">Filter</h1>
            {[
                { value: 'Institutions', options: INSTITUTION_OPTIONS },
                { value: 'Fields', options: FIELD_OPTIONS },
                { value: 'Position', options: POSITIONS_OPTIONS },
                { value: 'Subspecialties', options: SUBSPECIALTY_OPTIONS },
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
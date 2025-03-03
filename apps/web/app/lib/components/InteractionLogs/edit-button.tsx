"use client";

import { Pencil } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function EditButton({ selectedId }: { selectedId?: string | string[] | undefined }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleEdit = () => {
        const params = new URLSearchParams(searchParams.toString());
        if (Array.isArray(selectedId)) {
            selectedId = selectedId[0]
        }
        if (selectedId) {
            params.set('edit', selectedId);
        }
        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <Pencil onClick={handleEdit} />
    );
}

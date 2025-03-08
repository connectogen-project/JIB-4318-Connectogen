import { Pencil } from 'lucide-react';
import Link from 'next/link';

export default function EditButton({ selectedId }: { selectedId?: string | undefined }) {
    return (
        <Link href={`/mentorship/logs/edit?id=${selectedId}`}>
            <Pencil />
        </Link>
    );
}

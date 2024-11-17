

function Log(
    { title }: { title: string }
) {
    return (
        <div className="hover:bg-muted py-2 px-6 rounded-sm truncate text-sm">
            <span>{title}</span>
        </div>
    )
}

export default function LogsList() {
    return (
        <div>
            <Log title="Super great interaction"></Log>
            <Log title="Mega awesome interaction"></Log>
            <Log title="Best interaction ever"></Log>
            <Log title="Best interaction ever with overflow"></Log>
        </div>
    );
}
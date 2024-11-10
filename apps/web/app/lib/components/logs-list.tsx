function Log(
    { title }: { title: string }
) {
    return (
        <div className="hover:bg-muted">
            <span>{title}</span>
        </div>
    )
}

export default function LogsList() {
    return (

        <div>
            <Log title="super great interaction"></Log>
            <Log title="mega awesome interaction"></Log>
            <Log title="best interaction ever"></Log>
        </div>
    );
}
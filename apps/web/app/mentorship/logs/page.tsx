import LogsSidebar from "../../lib/components/logs-sidebar";
import NewInteractionForm from "../../lib/components/new-interaction-form";
import InteractionDetails from "../../lib/components/interaction-details";
import LogsContent from "../../lib/components/logs-content";

export default async function Logs({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {

  if (!searchParams) return null;
  const showForm = searchParams['new'] === 'true';
  const selectedId = searchParams['id'];
    const allLogs = await fetch("http://localhost:2999/mentorship/logs", {
        cache: 'no-store',
    }).then((res) => res.json()) as any;

  const selectedInteraction = allLogs.data.find(
    (interaction: any) => {
      console.log(interaction._id)
      return interaction._id === selectedId
    }
  );
  console.log(selectedInteraction)

  return (
    <div className="flex h-screen">
      <div className="w-64 border-r">
        <LogsSidebar />
      </div>
      <div className="flex-1 overflow-y-auto">
        {showForm ? (
          <NewInteractionForm />
        ) : selectedInteraction ? (
          <InteractionDetails {...selectedInteraction} />
        ) : (
          <LogsContent />
        )}
      </div>
    </div>
  );
}
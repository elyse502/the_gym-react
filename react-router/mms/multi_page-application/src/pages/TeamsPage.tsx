import { useTeam } from "../context/TeamContext";

function TeamsPage() {
  const { members } = useTeam();

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Team</h1>

      {members.map((m) => (
        <p key={m.id}>
          {m.name} - {m.role}
        </p>
      ))}
    </div>
  );
}

export default TeamsPage;

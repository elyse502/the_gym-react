import { useTeam } from "../context/TeamContext";
import { useSearchParams, useNavigate } from "react-router-dom";

function TeamsPage() {
  const { members } = useTeam();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const search = searchParams.get("search") || "";

  // Filter members by name
  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSearch = (value: string) => {
    setSearchParams((prev) => {
      if (value) {
        prev.set("search", value);
      } else {
        prev.delete("search");
      }
      return prev;
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Team Members</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        className="px-3 py-2 border rounded-md w-full max-w-sm
                   bg-white text-black 
                   dark:bg-gray-800 dark:text-white dark:border-gray-600"
      />

      {/* List */}
      {filteredMembers.length === 0 ? (
        <p className="text-gray-500">No members found</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              onClick={() => navigate(`/teams/${member.id}`)}
              className="p-4 border rounded-lg cursor-pointer 
                         hover:shadow transition
                         bg-white dark:bg-gray-900"
            >
              <p className="font-medium">{member.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TeamsPage;

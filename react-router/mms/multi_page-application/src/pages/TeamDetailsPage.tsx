import { useParams, useNavigate } from "react-router-dom";
import { useTeam } from "../context/TeamContext";

function TeamDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { members } = useTeam();

  const member = members.find((m) => m.id === id);

  if (!member) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">Member not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 rounded-md border text-sm
                   bg-white text-black 
                   dark:bg-gray-800 dark:text-white dark:border-gray-600
                   hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      >
        Back
      </button>

      {/* Details Card */}
      <div
        className="max-w-md mx-auto p-6 border rounded-xl 
                      bg-white dark:bg-gray-900 text-center space-y-4"
      >
        {/* Avatar (generated) */}
        <div
          className="w-20 h-20 mx-auto rounded-full bg-gray-200 
                        flex items-center justify-center text-xl font-semibold"
        >
          {member.name.charAt(0)}
        </div>

        <h1 className="text-xl font-semibold">{member.name}</h1>

        <p className="text-gray-500 dark:text-gray-400">{member.role}</p>

        {/* Extra Info */}
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <p>ID: {member.id}</p>
          <p>Department: {member.role}</p>
        </div>
      </div>
    </div>
  );
}

export default TeamDetailsPage;

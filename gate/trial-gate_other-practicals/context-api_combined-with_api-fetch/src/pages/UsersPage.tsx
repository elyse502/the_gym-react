import { useData } from "../context/DataContext";

const UsersPage = () => {
  const { users, loading } = useData();

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Users</h1>

      <div className="grid gap-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-3 border rounded-md 
                       bg-white text-black 
                       dark:bg-gray-900 dark:text-white"
          >
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;

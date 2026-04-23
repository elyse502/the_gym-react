import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchUsers } from "./userSlice";

const Users = () => {
  const { data, loading, error } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="p-4 border rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-bold mb-2">Users</h2>

      {loading && <p className="text-blue-500">Loading...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <ul className="list-disc pl-5">
          {data.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Users;

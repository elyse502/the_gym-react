import { useEffect, useState } from "react";
import type { User } from "../types/user.types";
import type { Post } from "../types/post.types";

const UsersPostsPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch both APIs
        const [usersRes, postsRes] = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/users"),
          fetch("https://jsonplaceholder.typicode.com/posts"),
        ]);

        if (!usersRes.ok || !postsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const usersData = await usersRes.json();
        const postsData = await postsRes.json();

        setUsers(usersData);
        setPosts(postsData);
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter posts by selected user
  const filteredPosts = posts.filter((post) => post.userId === selectedUserId);

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 grid md:grid-cols-2 gap-6">
      {/* Users List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Users</h2>

        <div className="space-y-2">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedUserId(user.id)}
              className={`p-3 border rounded-md cursor-pointer transition
                ${
                  selectedUserId === user.id
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-white text-black dark:bg-gray-900 dark:text-white"
                }`}
            >
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user.email}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Posts List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Posts</h2>

        {!selectedUserId ? (
          <p className="text-gray-500">Select a user</p>
        ) : filteredPosts.length === 0 ? (
          <p className="text-gray-500">No posts found</p>
        ) : (
          <div className="space-y-3">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="p-3 border rounded-md 
                           bg-white text-black 
                           dark:bg-gray-900 dark:text-white"
              >
                <p className="font-medium">{post.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {post.body}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPostsPage;

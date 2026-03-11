import { useState, useMemo } from "react";
import useUsersPosts from "./hooks/useUsersPosts";
import UserSelector from "./components/UserSelector";
import PostList from "./components/PostList";

function App() {
  const { users, posts, loading, error } = useUsersPosts();
  const [selectedUserId, setSelectedUserId] = useState(null);

  const filteredPosts = useMemo(() => {
    if (!selectedUserId) return [];
    return posts.filter((post) => post.userId === selectedUserId);
  }, [posts, selectedUserId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  return (
    <div>
      <h1>Users and Posts</h1>

      <UserSelector
        users={users}
        selectedUserId={selectedUserId}
        onSelect={setSelectedUserId}
      />

      <PostList posts={filteredPosts} />
    </div>
  );
}

export default App;

import useFetchApi from "../hooks/useFetchApi";
import { type Post } from "../types/post.types";

const PostsPage = () => {
  const { data, loading, error } = useFetchApi<Post[]>(
    "https://jsonplaceholder.typicode.com/posts",
  );

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Posts</h1>

      <div className="grid gap-4">
        {data?.map((post) => (
          <div
            key={post.id}
            className="p-4 border rounded-md 
                       bg-white text-black 
                       dark:bg-gray-900 dark:text-white"
          >
            <h2 className="font-medium">{post.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {post.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsPage;

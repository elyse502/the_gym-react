import PostItem from "./PostItem";

function PostList({ posts }) {
  if (posts.length === 0) {
    return <p>No posts for selected user</p>;
  }

  return (
    <ul>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  );
}

export default PostList;

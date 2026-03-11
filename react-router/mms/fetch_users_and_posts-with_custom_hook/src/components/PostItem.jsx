function PostItem({ post }) {
  return (
    <li>
      <p>{post.title}</p>
      <p>{post.body}</p>
    </li>
  );
}

export default PostItem;

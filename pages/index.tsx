import type { NextPage } from "next";

import BlogPostListItem from "../src/components/modules/BlogPostListItem";
import { usePosts } from "../src/providers/PostProvider";
import { getAllPosts } from "../src/services/post";
import { GetPostsResponse } from "../src/services/post/types";

const Home: NextPage = () => {
  const { isError, isLoading, posts, fetchPosts } = usePosts();
  return (
    <>
      {isLoading && <p>لطفا صبر کنید...</p>}
      {isError && (
        <p>
          خطایی رخ داد
          <button className="btn btn-link" onClick={fetchPosts}>
            تلاش مجدد
          </button>
        </p>
      )}
      {posts.map((post: GetPostsResponse) => (
        <BlogPostListItem key={post.id} {...post} />
      ))}
    </>
  );
};

export async function getServerSideProps() {
  let posts: GetPostsResponse[] = [];
  try {
    posts = await getAllPosts();
  } catch {}

  return {
    props: {
      posts,
    },
  };
}

export default Home;

import type { NextPage } from "next";
import { useEffect, useState } from "react";
import BlogPostListItem from "../src/components/modules/BlogPostListItem";
import { getAllPosts } from "../src/services/post";
import { GetPostsResponse } from "../src/services/post/types";

const Home: NextPage = ({ posts }: any) => {
  const [isLoading, setIsLoading] = useState(posts.length === 0);
  const [isError, setIsError] = useState(false);
  const [internalPosts, setInternalPosts] = useState(posts);

  const fetchPosts = () => {
    setIsLoading(true);
    setIsError(false);
    getAllPosts()
      .then(setInternalPosts)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (posts.length === 0) {
      fetchPosts();
    }
  }, []);
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
      {internalPosts.map((post: GetPostsResponse) => (
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

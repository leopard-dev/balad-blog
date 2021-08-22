import type { NextPage } from "next";
import { useEffect, useState } from "react";

import BlogPostListItem from "../src/components/modules/BlogPostListItem";
import { getAllPosts } from "../src/services/post";
import { GetPostsResponse } from "../src/services/post/types";
import { SSRErrorResponse } from "../src/types";

type Props = {
  posts: GetPostsResponse[];
  error: SSRErrorResponse | null;
};

const Home: NextPage<Props> = ({ posts, error }) => {
  const [isLoading, setIsLoading] = useState(posts.length === 0);
  const [isError, setIsError] = useState(Boolean(error));
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
    if (error?.type) {
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
  let error: SSRErrorResponse | null = null;

  try {
    posts = await getAllPosts();
  } catch (e) {
    error = {
      type: "failed_to_fetch",
    };
  }

  return {
    props: {
      posts,
      error,
    },
  };
}

export default Home;

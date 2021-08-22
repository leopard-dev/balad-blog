import type { NextPage } from "next";
import { useEffect, useState } from "react";
import AddPost from "../src/components/modules/AddPost";
import BlogPostListItem from "../src/components/modules/BlogPostListItem";
import useLocalStorage from "../src/hooks/use-local-storage";
import { getAllPosts } from "../src/services/post";
import { GetPostsResponse } from "../src/services/post/types";

const Home: NextPage = ({ posts, error }: any) => {
  const [isLoading, setIsLoading] = useState(posts.length === 0);
  const [isError, setIsError] = useState(!!error);
  const [internalPosts, setInternalPosts] = useState<GetPostsResponse[]>(posts);
  const [token] = useLocalStorage<undefined | string>("session_key", undefined);

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
      {token && (
        <AddPost
          onPostCreated={(newPost) =>
            setInternalPosts((old) => [newPost, ...old])
          }
          tokenId={token}
        />
      )}
      {internalPosts.map((post: GetPostsResponse) => (
        <BlogPostListItem key={post.id} {...post} />
      ))}
    </>
  );
};

export async function getServerSideProps() {
  let posts: GetPostsResponse[] = [];
  let error: any = null;
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

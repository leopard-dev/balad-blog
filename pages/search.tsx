import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

import BlogPostListItem from "../src/components/modules/BlogPostListItem";
import useAsyncFn from "../src/hooks/use-request";
import { useSearchHistory } from "../src/providers/SearchHistoryProvider";
import { getAllPosts } from "../src/services/post";
import { GetPostsResponse } from "../src/services/post/types";

const Search: NextPage = () => {
  const { query } = useRouter();
  const { addHistory } = useSearchHistory();
  const [state, makeRequest] = useAsyncFn(getAllPosts, {});
  const fetchPosts = (query: unknown) => {
    if (typeof query !== "string") {
      return;
    }
    makeRequest(query);
  };

  useEffect(() => {
    if (typeof query.q !== "string") {
      return;
    }
    fetchPosts(query.q);
    addHistory(query.q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  return (
    <>
      {state.loading && <p>لطفا صبر کنید...</p>}
      {state.error && (
        <p>
          خطایی رخ داد
          <button className="btn btn-link" onClick={() => fetchPosts(query.q)}>
            تلاش مجدد
          </button>
        </p>
      )}
      {state.value?.map((post: GetPostsResponse) => (
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

export default Search;

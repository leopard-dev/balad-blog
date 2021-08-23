import type { NextPage } from "next";
import React from "react";
import AddPost from "../src/components/modules/AddPost";

import BlogPostListItem from "../src/components/modules/BlogPostListItem";
import useAuthentication from "../src/hooks/use-authentication";
import { usePosts } from "../src/providers/PostProvider";
import { getAllPosts } from "../src/services/post";
import { GetPostsResponse } from "../src/services/post/types";
import createHookLogicalWrapper from "../src/utils/create-hook-logical-wrappe";

const IsAuthenticated = createHookLogicalWrapper(
  useAuthentication,
  (ctx) => ctx.isAuthenticated
);

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
      <IsAuthenticated>
        <AddPost />
      </IsAuthenticated>

      {posts.map((post: GetPostsResponse) => (
        <BlogPostListItem key={post.id} {...post} />
      ))}
    </>
  );
};

export async function getServerSideProps() {
  let posts: GetPostsResponse[] | null = null;
  let error: any = null;
  try {
    posts = await getAllPosts();
  } catch (e) {
    error = {
      type: "failed_to_fetch_posts",
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

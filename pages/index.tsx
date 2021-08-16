import type { NextPage } from "next";
import BlogPostListItem from "../src/components/modules/BlogPostListItem";
import { getAllPosts } from "../src/services/post";
import { GetPostsResponse } from "../src/services/post/types";

const Home: NextPage = ({ posts }: any) => {
  return (
    <>
      {posts.map((post: GetPostsResponse) => (
        <>
          <BlogPostListItem key={post.id} {...post} />
          <hr />
        </>
      ))}
    </>
  );
};

export async function getStaticProps() {
  const posts = await getAllPosts();

  return {
    props: {
      posts,
    },
  };
}

export default Home;

import type { NextPage } from "next";
import BlogPostListItem from "../../src/components/modules/BlogPostListItem";
import { getAllPosts, getPostById } from "../../src/services/post";
const BlogPost: NextPage = ({ post }: any) => {
  return <BlogPostListItem {...post} />;
};

export async function getServerSideProps({ params }: any) {
  const post = await getPostById(params.id);
  return {
    props: {
      post,
    },
  };
}

export default BlogPost;

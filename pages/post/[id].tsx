import type { NextPage } from "next";
import BlogPostListItem from "../../src/components/modules/BlogPostListItem";
import CommentsSection from "../../src/components/modules/CommentsSection";
import { getAllPosts, getPostById } from "../../src/services/post";
const BlogPost: NextPage = ({ post }: any) => {
  return (
    <BlogPostListItem {...post}>
      <CommentsSection postId={post.id} />
    </BlogPostListItem>
  );
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

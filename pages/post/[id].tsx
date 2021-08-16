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

export async function getStaticProps({ params }: any) {
  const post = await getPostById(params.id);
  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const posts = await getAllPosts();
  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: String(post.id) },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export default BlogPost;

import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import BlogPostListItem from "../../src/components/modules/BlogPostListItem";
import CommentsSection from "../../src/components/modules/CommentsSection";
import { getPostById } from "../../src/services/post";
const BlogPost: NextPage = ({ post, postId }: any) => {
  const [isLoading, setIsLoading] = useState(!post);
  const [isError, setIsError] = useState(false);
  const [internalPost, setInternalPost] = useState(post);

  const fetchPost = () => {
    setIsLoading(true);
    setIsError(false);
    getPostById(postId)
      .then(setInternalPost)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (!post) {
      fetchPost();
    }
  }, []);

  return (
    <>
      {isLoading && <p>لطفا صبر کنید...</p>}
      {isError && (
        <p>
          خطایی رخ داد
          <button className="btn btn-link" onClick={fetchPost}>
            تلاش مجدد
          </button>
        </p>
      )}
      {internalPost && (
        <BlogPostListItem {...internalPost}>
          <CommentsSection postId={post.id} />
        </BlogPostListItem>
      )}
    </>
  );
};

export async function getServerSideProps({ params }: any) {
  let post = null;
  try {
    post = await getPostById(params.id);
  } catch {}
  return {
    props: {
      postId: params.id,
      post,
    },
  };
}

export default BlogPost;

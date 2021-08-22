import type { NextPage } from "next";
import React, { useEffect, useState } from "react";

import BlogPostListItem from "../../src/components/modules/BlogPostListItem";
import CommentsSection from "../../src/components/modules/CommentsSection";
import useAsyncFn from "../../src/hooks/use-request";
import { getPostById } from "../../src/services/post";

const BlogPost: NextPage = ({ post, postId, error }: any) => {
  const [internalPost, setInternalPost] = useState(post);

  const [state, makeRequest] = useAsyncFn(getPostById, {
    onSuccess: setInternalPost,
  });

  useEffect(() => {
    if (error?.type) {
      makeRequest(postId);
    }
  }, []);

  return (
    <>
      {state.loading && <p>لطفا صبر کنید...</p>}
      {state.error && (
        <p>
          خطایی رخ داد
          <button className="btn btn-link" onClick={() => makeRequest(postId)}>
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
  let error: any = null;

  try {
    post = await getPostById(params.id);
  } catch {
    error = {
      type: "failed_to_fetch",
    };
  }
  return {
    props: {
      postId: params.id,
      post,
      error,
    },
  };
}

export default BlogPost;

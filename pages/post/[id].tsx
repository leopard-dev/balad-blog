import type { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState } from 'react';

import BlogPostListItem from '../../src/components/modules/BlogPostListItem';
import CommentsSection from '../../src/components/modules/CommentsSection';
import { getPostById } from '../../src/services/post';
import { SSRErrorResponse } from '../../src/types';

const BlogPost: NextPage = ({ post, postId, error }: any) => {
  const [isLoading, setIsLoading] = useState(!post);
  const [isError, setIsError] = useState(Boolean(error));
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
    if (error?.type) {
      fetchPost();
    }
  }, []);

  return (
    <>
      {isLoading && <p>لطفا صبر کنید...</p>}
      {isError && (
        <p>
          خطایی رخ داد
          <button type="button" className="btn btn-link" onClick={fetchPost}>
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let post = null;
  let error: SSRErrorResponse | null = null;
  if (typeof params?.id !== 'string' && !params?.id) {
    return {
      notFound: true,
    };
  }

  try {
    post = await getPostById(Number(params.id));
  } catch {
    error = {
      type: 'failed_to_fetch',
    };
  }

  return {
    props: {
      postId: params.id,
      post,
      error,
    },
  };
};

export default BlogPost;

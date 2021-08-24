import type { NextPage } from 'next';

import AddPost from '../src/components/modules/AddPost';
import BlogPostListItem from '../src/components/modules/BlogPostListItem';
import useAuthentication from '../src/hooks/use-authentication';
import { usePosts } from '../src/providers/PostProvider';
import { getAllPosts } from '../src/services/post';
import { GetPostsResponse } from '../src/services/post/types';
import { SSRErrorResponse } from '../src/types';
import createHookLogicalWrapper from '../src/utils/create-hook-logical-wrappe';

const IsAuthenticated = createHookLogicalWrapper(
  useAuthentication,
  (ctx) => ctx.isAuthenticated,
);

type Props = {
  posts: GetPostsResponse[];
  error: SSRErrorResponse | null;
};

const Home: NextPage<Props> = () => {
  const { isError, isLoading, posts, fetchPosts } = usePosts();
  return (
    <>
      {isLoading && <p>لطفا صبر کنید...</p>}
      {isError && (
        <p>
          خطایی رخ داد
          <button type="button" className="btn btn-link" onClick={fetchPosts}>
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
  let posts: GetPostsResponse[] = [];
  let error: SSRErrorResponse | null = null;

  try {
    posts = await getAllPosts();
  } catch (e) {
    error = {
      type: 'failed_to_fetch_posts',
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

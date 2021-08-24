import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';

import BlogPostListItem from '../src/components/modules/BlogPostListItem';
import { useSearchHistory } from '../src/providers/SearchHistoryProvider';
import { getAllPosts } from '../src/services/post';
import { GetPostsResponse } from '../src/services/post/types';

const Search: NextPage = () => {
  const { query } = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [posts, setPosts] = useState<GetPostsResponse[]>([]);
  const { addHistory } = useSearchHistory();

  const fetchPosts = (searchQuery: unknown) => {
    if (typeof searchQuery !== 'string') {
      return;
    }
    setIsLoading(true);
    setIsError(false);
    getAllPosts(searchQuery)
      .then(setPosts)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (typeof query.q !== 'string') {
      return;
    }
    fetchPosts(query.q);
    addHistory(query.q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <>
      {isLoading && <p>لطفا صبر کنید...</p>}
      {isError && (
        <p>
          خطایی رخ داد
          <button
            type="button"
            className="btn btn-link"
            onClick={() => fetchPosts(query.q)}
          >
            تلاش مجدد
          </button>
        </p>
      )}
      {posts.map((post: GetPostsResponse) => (
        <BlogPostListItem key={post.id} {...post} />
      ))}
    </>
  );
};

export async function getServerSideProps() {
  let posts: GetPostsResponse[] = [];
  try {
    posts = await getAllPosts();
    // eslint-disable-next-line no-empty
  } catch {}

  return {
    props: {
      posts,
    },
  };
}

export default Search;

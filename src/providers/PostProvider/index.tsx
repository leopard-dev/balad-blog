import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { getAllPosts } from '../../services/post';
import { GetPostsResponse } from '../../services/post/types';

type PostsContextType = {
  posts: GetPostsResponse[];
  isLoading: boolean;
  isError: boolean;
  // eslint-disable-next-line no-unused-vars
  onPostCreated: (newPost: GetPostsResponse) => void;
  fetchPosts: () => void;
};

type Props = {
  initialPosts: GetPostsResponse[] | null;
  error?: {
    type: string;
  };
};

export const PostContext = createContext<PostsContextType>({
  posts: [],
  isLoading: false,
  isError: false,
  onPostCreated: () => {},
  fetchPosts: () => {},
});

const PostProvider: FC<Props> = ({ children, initialPosts, error }) => {
  const [posts, setPosts] = useState<GetPostsResponse[]>(initialPosts ?? []);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(Boolean(error));

  const fetchPosts = useCallback(() => {
    setIsLoading(true);
    setIsError(false);
    getAllPosts()
      .then(setPosts)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (error?.type === 'failed_to_fetch_posts') {
      fetchPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPostCreated = useCallback(
    (newPost: GetPostsResponse) => setPosts((old) => [newPost, ...old]),
    [],
  );

  const value = useMemo(
    () => ({
      posts,
      onPostCreated,
      isLoading,
      isError,
      fetchPosts,
    }),
    [posts, onPostCreated, isLoading, isError, fetchPosts],
  );

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export const usePosts = () => useContext(PostContext);

export default PostProvider;

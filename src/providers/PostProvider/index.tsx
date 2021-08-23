import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { getAllPosts } from "../../services/post";
import { GetPostsResponse } from "../../services/post/types";

type PostsContextType = {
  posts: GetPostsResponse[];
  isLoading: boolean;
  isError: boolean;
  onPostCreated: (newPost: GetPostsResponse) => void;
  fetchPosts: () => void;
};

type Props = {
  initialPosts: GetPostsResponse[];
};

export const PostContext = createContext<PostsContextType>({
  posts: [],
  isLoading: false,
  isError: false,
  onPostCreated: () => {},
  fetchPosts: () => {},
});

const PostProvider: FC<Props> = ({ children, initialPosts }) => {
  const [posts, setPosts] = useState<GetPostsResponse[]>(initialPosts);
  const [isLoading, setIsLoading] = useState(posts.length === 0);
  const [isError, setIsError] = useState(false);

  const fetchPosts = useCallback(() => {
    setIsLoading(true);
    setIsError(false);
    getAllPosts()
      .then(setPosts)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (posts.length === 0) {
      fetchPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPostCreated = useCallback(
    (newPost: GetPostsResponse) => setPosts((old) => [newPost, ...old]),
    []
  );
  return (
    <PostContext.Provider
      value={{ posts, onPostCreated, isLoading, isError, fetchPosts }}
    >
      {children}
    </PostContext.Provider>
  );
};

PostProvider.defaultProps = {
  initialPosts: [],
};

export const usePosts = () => useContext(PostContext);

export default PostProvider;

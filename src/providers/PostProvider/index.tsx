import * as React from "react";
import { getAllPosts } from "../../services/post";
import { GetPostsResponse } from "../../services/post/types";

type PostsContextType = {
  posts: GetPostsResponse[];
  isLoading: boolean;
  isError: boolean;
  setPosts: React.Dispatch<React.SetStateAction<GetPostsResponse[]>>;
  fetchPosts: () => void;
};

type Props = {
  initialPosts: GetPostsResponse[];
};

export const PostContext = React.createContext<PostsContextType>({
  posts: [],
  isLoading: false,
  isError: false,
  setPosts: () => {},
  fetchPosts: () => {},
});

const PostProvider: React.FC<Props> = ({ children, initialPosts }) => {
  const [posts, setPosts] = React.useState<GetPostsResponse[]>(initialPosts);
  const [isLoading, setIsLoading] = React.useState(posts.length === 0);
  const [isError, setIsError] = React.useState(false);

  const fetchPosts = React.useCallback(() => {
    setIsLoading(true);
    setIsError(false);
    getAllPosts()
      .then(setPosts)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  React.useEffect(() => {
    if (posts.length === 0) {
      fetchPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <PostContext.Provider
      value={{ posts, setPosts, isLoading, isError, fetchPosts }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => React.useContext(PostContext);

export default PostProvider;

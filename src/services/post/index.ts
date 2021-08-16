import { API_URL } from "../../constants";
import { GetPostComments, GetPostsResponse, PostNewComment } from "./types";

export const getAllPosts = async (): Promise<GetPostsResponse[]> => {
  return (await fetch(`${API_URL}/posts`)).json();
};

export const getPostById = async (
  postId: number
): Promise<GetPostsResponse> => {
  return (await fetch(`${API_URL}/posts/${postId}`)).json();
};

export const getPostCommentsById = async (
  postId: number
): Promise<GetPostComments[]> => {
  return (await fetch(`${API_URL}/posts/${postId}/comments`)).json();
};

export const postComment = async (postId: number, body: PostNewComment) => {
  const res = await fetch(`${API_URL}/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("failed to send comment");
  }
};

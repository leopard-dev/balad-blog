import { API_URL } from "../../constants";
import {
  GetPostComments,
  GetPostsResponse,
  PostNewComment,
  PostNewPost,
} from "./types";

export const getAllPosts = async (): Promise<GetPostsResponse[]> => {
  const res = await fetch(`${API_URL}/posts`);
  if (!res.ok) {
    throw new Error("something went wrong");
  }
  return res.json();
};

export const getPostById = async (
  postId: number
): Promise<GetPostsResponse> => {
  const res = await fetch(`${API_URL}/posts/${postId}`);
  if (!res.ok) {
    throw new Error("something went wrong");
  }
  return res.json();
};

export const getPostCommentsById = async (
  postId: number
): Promise<GetPostComments[]> => {
  const res = await fetch(`${API_URL}/posts/${postId}/comments`);
  if (!res.ok) {
    throw new Error("something went wrong");
  }
  return res.json();
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
    throw await res.json();
  }
};

export const createPost = async (body: PostNewPost, token: string) => {
  const res = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("failed to create post");
  }
};

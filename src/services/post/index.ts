import { API_URL } from "../../constants";
import {
  GetPostComments,
  GetPostsResponse,
  PostNewComment,
  PostNewPost,
} from "./types";

export const getAllPosts = async (
  query?: string
): Promise<GetPostsResponse[]> => {
  let url = `${API_URL}/posts`;
  if (query) {
    url +=
      "?" +
      new URLSearchParams({
        q: query,
      });
  }
  const res = await fetch(url);
  if (!res.ok) {
    throw await res.json();
  }
  return res.json();
};

export const getPostById = async (
  postId: number
): Promise<GetPostsResponse> => {
  const res = await fetch(`${API_URL}/posts/${postId}`);
  if (!res.ok) {
    throw await res.json();
  }
  return res.json();
};

export const getPostCommentsById = async (
  postId: number
): Promise<GetPostComments[]> => {
  const res = await fetch(`${API_URL}/posts/${postId}/comments`);
  if (!res.ok) {
    throw await res.json();
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
  if (!res.ok) {
    throw await res.json();
  }
  return res.json();
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
  if (!res.ok) {
    throw await res.json();
  }
  return res.json();
};

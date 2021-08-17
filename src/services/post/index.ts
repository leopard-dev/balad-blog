import { API_URL } from "../../constants";
import { GetPostsResponse } from "./types";

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

import { API_URL } from "../../constants";
import { GetPostsResponse } from "./types";

export const getAllPosts = async (): Promise<GetPostsResponse[]> => {
  return (await fetch(`${API_URL}/posts`)).json();
};

export const getPostById = async (
  postId: number
): Promise<GetPostsResponse> => {
  return (await fetch(`${API_URL}/posts/${postId}`)).json();
};

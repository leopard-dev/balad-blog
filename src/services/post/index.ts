import { API_URL } from "../../constants";
import { GetPostComments, GetPostsResponse } from "./types";

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

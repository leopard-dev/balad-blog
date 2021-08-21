import { API_URL } from "../../constants";
import {
  GetUserDetails,
  PostCreateUserPayload,
  PostSessionsPayload,
  PostSessionsResponse,
} from "./types";

export const getUserByUsername = async (
  username: string
): Promise<GetUserDetails> => {
  const res = await fetch(`${API_URL}/users/${username}`);
  if (!res.ok) {
    throw new Error("something went wrong");
  }
  return res.json();
};

export const createUser = async (payload: PostCreateUserPayload) => {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("failed to create user");
  }
};

export const loginUser = async (
  payload: PostSessionsPayload
): Promise<PostSessionsResponse> => {
  const res = await fetch(`${API_URL}/sessions`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (res.ok) {
    return res.json();
  } else {
    throw res.json();
  }
};

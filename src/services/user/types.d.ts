export interface PostCreateUserPayload {
  username: string;
  password: string;
  email: string;
  title: string;
}

export interface PostSessionsPayload {
  username: string;
  password: string;
}

export interface PostSessionsResponse {
  access_token: string;
}

export interface GetUserDetails {
  title: string;
  username: string;
  email: string;
}

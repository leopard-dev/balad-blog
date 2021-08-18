export interface PostCreateUserPayload {
  username: string;
  password: string;
  email: string;
  title: string;
}

export interface GetUserDetails {
  title: string;
  username: string;
  email: string;
}

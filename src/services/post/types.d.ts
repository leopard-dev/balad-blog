export interface GetPostsResponse {
  id: number;
  title: string;
  author_id: number;
  date: string;
  visits: number;
  body: string;
  author: string;
}

export interface GetPostComments {
  id: number;
  author: string;
  post_id: number;
  parent_id: number | null;
  date: string;
  body: string;
}

export interface PostNewComment {
  author: string;
  date: string;
  parent_id?: number;
  body: string;
}

export interface PostNewPost {
  title: string;
  body: string;
  date: string;
}

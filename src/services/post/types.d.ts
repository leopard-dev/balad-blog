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

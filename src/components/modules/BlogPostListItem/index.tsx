import { GetPostsResponse } from "../../../services/post/types";
import Link from "next/link";
import parse from "html-react-parser";

type Props = {} & GetPostsResponse;

function BlogPostListItem({
  author,
  author_id,
  body,
  date,
  id,
  title,
  visits,
}: Props) {
  return (
    <article className="blog-post">
      <h2 className="blog-post__title">
        <Link href={`/post/${id}`} passHref>
          <a className="blog-post__title-link">{title}</a>
        </Link>
      </h2>
      <p className="blog-post__sub-title">
        ارسال شده توسط {author} در تاریخ {date}
      </p>
      <div className="blog-post__content">{parse(body)}</div>
    </article>
  );
}

export default BlogPostListItem;

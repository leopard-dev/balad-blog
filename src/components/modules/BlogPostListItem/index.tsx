import { GetPostsResponse } from "../../../services/post/types";
import Link from "next/link";
import parse from "html-react-parser";
import styles from "./styles.module.scss";
import highlightText from "../../../utils/highlighter";

type Props = {
  children?: React.ReactNode;
  search?: string[];
} & GetPostsResponse;

function BlogPostListItem({
  author,
  author_id,
  body,
  date,
  id,
  title,
  visits,
  search = [],
  children,
}: Props) {
  return (
    <article className={styles["blog-post"]}>
      <h2>
        <Link href={`/post/${id}`}>
          <a className={styles["blog-post__title-link"]}>
            {parse(highlightText(title, search))}
          </a>
        </Link>
      </h2>
      <p className={styles["blog-post__sub-title"]}>
        ارسال شده توسط {author} در تاریخ {date}
      </p>
      <div className="blog-post__content">
        {parse(highlightText(body, search))}
      </div>
      {children}
    </article>
  );
}

export default BlogPostListItem;

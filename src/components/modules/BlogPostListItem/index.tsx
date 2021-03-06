import parse from "html-react-parser";
import Link from "next/link";

import { GetPostsResponse } from "../../../services/post/types";
import styles from "./styles.module.scss";

type Props = {
  children?: React.ReactNode;
} & GetPostsResponse;

function BlogPostListItem({
  author,
  author_id,
  body,
  date,
  id,
  title,
  visits,
  children,
}: Props) {
  return (
    <article className={styles["blog-post"]}>
      <h2>
        <Link href={`/post/${id}`}>
          <a className={styles["blog-post__title-link"]}>{title}</a>
        </Link>
      </h2>
      <p className={styles["blog-post__sub-title"]}>
        ارسال شده توسط {author} در تاریخ {date}
      </p>
      <div className={styles["blog-post__content"]}>{parse(body)}</div>
      {children}
    </article>
  );
}

export default BlogPostListItem;

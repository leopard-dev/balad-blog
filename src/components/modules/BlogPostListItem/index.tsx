import { GetPostsResponse } from "../../../services/post/types";
import Link from "next/link";
import parse from "html-react-parser";
import styles from "./styles.module.scss";

type Props = GetPostsResponse;

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
    </article>
  );
}

export default BlogPostListItem;

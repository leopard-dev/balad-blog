import clsx from "clsx";
import React from "react";
import { GetPostComments } from "../../../services/post/types";
import styles from "./styles.module.scss";

type Props = { children?: React.ReactNode } & GetPostComments;

function Comment({ author, body, date, id, children, parent_id }: Props) {
  return (
    <article
      className={clsx(
        styles["comment"],
        parent_id && styles["comment--is-child"]
      )}
      id={`#c${id}`}
    >
      <link href={`#c${id}`} />
      <footer className={styles["comment__footer"]}>
        <p className="comment__footer-element">
          ارسال شده توسط: <span>{author}</span>
        </p>
        <p className="comment__footer-element">{date}</p>
      </footer>
      <p className="comment__body">{body}</p>
      <button className="btn btn-secondary">پاسخ به این نظر</button>
      {children}
    </article>
  );
}

export default Comment;

import clsx from "clsx";
import React, { useState } from "react";

import { GetPostComments } from "../../../services/post/types";
import AddComment from "../../modules/AddComment";
import styles from "./styles.module.scss";

type Props = {
  children?: React.ReactNode;
  onAddNewComment: (comment: GetPostComments) => void;
} & GetPostComments;

function Comment({
  author,
  body,
  date,
  id,
  children,
  parent_id,
  onAddNewComment,
  post_id,
}: Props) {
  const [isReplying, setIsReplying] = useState(false);

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
      {isReplying ? (
        <AddComment
          onCommentSubmit={(comment) => {
            onAddNewComment(comment);
            setIsReplying(false);
          }}
          parentId={id}
          postId={post_id}
        />
      ) : (
        <button
          onClick={() => setIsReplying(true)}
          className="btn btn-secondary"
        >
          پاسخ به این نظر
        </button>
      )}
      {children}
    </article>
  );
}

export default Comment;

import clsx from "clsx";
import React from "react";
import { GetPostComments } from "../../../services/post/types";

type Props = { children?: React.ReactNode } & GetPostComments;

function Comment({ author, body, date, id, children, parent_id }: Props) {
  return (
    <article
      className={clsx("comment", { "comment--is-child": !!parent_id })}
      id={`#c${id}`}
    >
      <link href={`#c${id}`} />
      <footer className="comment__footer">
        <p className="comment__footer-element">
          ارسال شده توسط: <span>{author}</span>
        </p>
        <p className="comment__footer-element">{date}</p>
      </footer>
      <p className="comment__body">{body}</p>
      <button className="comment__reply ">پاسخ به این نظر</button>
      {children}
    </article>
  );
}

export default Comment;

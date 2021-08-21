import clsx from "clsx";
import { FormEvent, useRef, useState } from "react";
import { postComment } from "../../../services/post";
import { GetPostComments } from "../../../services/post/types";
import { getLocaleDay } from "../../../utils/date";
import styles from "./styles.module.scss";

type Props = {
  postId: number;
  parentId?: number;
  onCommentSubmit: (comment: GetPostComments) => void;
};

function AddComment({ postId, parentId, onCommentSubmit }: Props) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const commentRef = useRef<any>(null);

  const submitComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    postComment(postId, {
      author: name.trim(),
      body: comment.trim(),
      date: getLocaleDay(Date.now()),
      parent_id: parentId ?? null,
    })
      .then((res) => {
        onCommentSubmit(res);
        setName("");
        setComment("");
      })
      .catch((e) => {
        if (e.errors) {
          setErrors(e.errors);
          return;
        }
        setErrors(["خطا در اتصال به سرور"]);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <section className={styles["add-comment"]}>
      <h3 className="h4">اضافه کردن کامنت جدید</h3>
      <form onSubmit={submitComment}>
        <div className="form-group">
          <label htmlFor={`field-${parentId}`}> نام شما</label>
          <input
            disabled={isLoading}
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            type="text"
            className="form-control"
            id={`field-${parentId}`}
          />
        </div>
        <div className="form-group">
          <label htmlFor={`field-comment-${parentId}`}> متن نظر</label>
          <textarea
            ref={commentRef}
            disabled={isLoading}
            name="comment"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              commentRef.current!.style.height = "inherit";
              commentRef.current!.style.height =
                commentRef.current!.scrollHeight + "px";
            }}
            className="form-control"
            id={`field-${parentId}`}
          />
        </div>
        {errors.length > 0 && (
          <ul className={styles["add-comment__error"]}>
            {errors.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        <button
          disabled={isLoading || !name || !comment}
          type="submit"
          className={clsx(
            "btn",
            "btn-primary",
            styles["add-comment__submit-btn"]
          )}
        >
          {isLoading ? "لطفا صبر کنید" : "ثبت نظر"}
        </button>
      </form>
    </section>
  );
}

export default AddComment;

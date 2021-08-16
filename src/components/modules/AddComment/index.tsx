import { FormEvent, useState } from "react";
import { postComment } from "../../../services/post";
import { GetPostComments } from "../../../services/post/types";
import { getLocaleDay } from "../../../utils/date";
type Props = {
  postId: number;
  parentId?: number;
  onCommentSubmit: (comment: GetPostComments) => void;
};

function AddComment({ postId, parentId, onCommentSubmit }: Props) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const submitComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsError(false);
    setIsLoading(true);
    postComment(postId, {
      author: name,
      body: comment,
      date: getLocaleDay(Date.now()),
      parent_id: parentId,
    })
      .then((res) => {
        onCommentSubmit(res);
        setName("");
        setComment("");
      })
      .catch((e) => setIsError(true))
      .finally(() => setIsLoading(false));
  };
  return (
    <section className="add-comment">
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
          <input
            disabled={isLoading}
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="form-control"
            id={`field-${parentId}`}
          />
        </div>
        <button
          disabled={isLoading || !name || !comment}
          type="submit"
          className="btn btn-primary add-comment__submit"
        >
          {isLoading ? "لطفا صبر کنید" : "ثبت نظر"}
        </button>
      </form>
    </section>
  );
}

export default AddComment;

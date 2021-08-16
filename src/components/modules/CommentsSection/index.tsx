import { useEffect, useMemo, useState } from "react";
import { getPostCommentsById } from "../../../services/post";
import { GetPostComments } from "../../../services/post/types";
import Comment from "../../elements/Comment";
import AddComment from "../AddComment";

type Props = {
  postId: number;
};

function CommentsSection({ postId }: Props) {
  const [comments, setComments] = useState<GetPostComments[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const onAddNewComment = (newComment: GetPostComments) => {
    setComments((old) => [...old, newComment]);
  };
  useEffect(() => {
    setIsLoading(false);
    getPostCommentsById(postId)
      .then(setComments)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [postId]);

  const processedComments = useMemo(() => {
    const renderComment = (comment: GetPostComments) => {
      const children = comments.filter((item) => item.parent_id === comment.id);
      return (
        <Comment
          onAddNewComment={onAddNewComment}
          key={comment.id}
          {...comment}
        >
          {children.map(renderComment)}
        </Comment>
      );
    };
    return comments
      .filter((item) => item.parent_id === null)
      .map(renderComment);
  }, [comments]);

  return (
    <section className="comments-section">
      <h1 className="comments-section__title">لیست نظرات</h1>
      {isLoading && (
        <p className="comments-section__loading">لطفا صبر کنید ...</p>
      )}
      {isError && <p className="comments-section__error">خطایی رخ داد ...</p>}
      {processedComments}
      <AddComment postId={postId} onCommentSubmit={onAddNewComment} />
    </section>
  );
}

export default CommentsSection;

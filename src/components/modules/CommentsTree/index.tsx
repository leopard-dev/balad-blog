import { useCallback } from "react";
import { GetPostComments } from "../../../services/post/types";
import Comment from "../../elements/Comment";

type Props = {
  onAddNewComment: (comment: GetPostComments) => void;
  comments: GetPostComments[];
};

function CommentsTree({ onAddNewComment, comments }: Props) {
  const renderComment = useCallback(
    (comment: any) => {
      return (
        <Comment
          key={comment.id}
          {...comment}
          onAddNewComment={onAddNewComment}
        >
          {comment.childNodes.map(renderComment)}
        </Comment>
      );
    },
    [onAddNewComment]
  );
  return <>{comments.map(renderComment)}</>;
}

export default CommentsTree;

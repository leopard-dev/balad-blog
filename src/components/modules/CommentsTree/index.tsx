import { memo } from "react";

import { GetPostComments } from "../../../services/post/types";
import Comment from "../../elements/Comment";

type CommentProps = {
  childNodes: CommentProps[];
} & GetPostComments;

type Props = {
  onAddNewComment: (comment: GetPostComments) => void;
  comments: CommentProps[];
};

function CommentsTree({ onAddNewComment, comments }: Props) {
  return (
    <>
      {comments.map((comment: CommentProps) => (
        <Comment
          key={comment.id}
          onAddNewComment={onAddNewComment}
          {...comment}
        >
          <CommentsTree
            onAddNewComment={onAddNewComment}
            comments={comment.childNodes}
          />
        </Comment>
      ))}
    </>
  );
}

export default memo(CommentsTree);

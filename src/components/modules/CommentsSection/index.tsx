import { useCallback, useEffect, useMemo, useState } from "react";

import useAsyncFn from "../../../hooks/use-request";
import { getPostCommentsById } from "../../../services/post";
import { GetPostComments } from "../../../services/post/types";
import { createDataTree } from "../../../utils/create-data-tree";
import AddComment from "../AddComment";
import CommentsTree from "../CommentsTree";
import styles from "./styles.module.scss";

type Props = {
  postId: number;
};

function CommentsSection({ postId }: Props) {
  const [comments, setComments] = useState<GetPostComments[]>([]);

  const [state, makeRequest] = useAsyncFn(getPostCommentsById, {
    onSuccess: setComments,
  });
  const fetchComments = () => makeRequest(postId);

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAddNewComment = useCallback(
    (newComment: GetPostComments) => setComments((old) => [...old, newComment]),
    []
  );

  const processedComments = useMemo(() => createDataTree(comments), [comments]);

  return (
    <section className={styles["comments-section"]}>
      <h1 className={styles["comments-section__title"]}>لیست نظرات</h1>
      {state.loading && (
        <p className={styles["comments-section__loading"]}>لطفا صبر کنید ...</p>
      )}
      {state.error && (
        <p className={styles["comments-section__error"]}>
          خطایی رخ داد ...{" "}
          <button className="btn btn-link" onClick={fetchComments}>
            تلاش مجدد
          </button>
        </p>
      )}
      <CommentsTree
        comments={processedComments}
        onAddNewComment={onAddNewComment}
      />
      <AddComment postId={postId} onCommentSubmit={onAddNewComment} />
    </section>
  );
}

export default CommentsSection;

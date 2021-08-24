import { useCallback, useEffect, useMemo, useState } from 'react';

import { getPostCommentsById } from '../../../services/post';
import { GetPostComments } from '../../../services/post/types';
import { createDataTree } from '../../../utils/create-data-tree';
import AddComment from '../AddComment';
import CommentsTree from '../CommentsTree';
import styles from './styles.module.scss';

type Props = {
  postId: number;
};

function CommentsSection({ postId }: Props) {
  const [comments, setComments] = useState<GetPostComments[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchComments = useCallback((pId: number) => {
    setIsLoading(true);
    setIsError(false);
    getPostCommentsById(pId)
      .then(setComments)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    fetchComments(postId);
  }, [fetchComments, postId]);

  const onAddNewComment = useCallback(
    (newComment: GetPostComments) => setComments((old) => [...old, newComment]),
    [],
  );

  const processedComments = useMemo(() => createDataTree(comments), [comments]);

  return (
    <section className={styles['comments-section']}>
      <h1 className={styles['comments-section__title']}>لیست نظرات</h1>
      {isLoading && (
        <p className={styles['comments-section__loading']}>لطفا صبر کنید ...</p>
      )}
      {isError && (
        <p className={styles['comments-section__error']}>
          خطایی رخ داد ...
          {' '}
          <button
            type="button"
            className="btn btn-link"
            onClick={() => fetchComments(postId)}
          >
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

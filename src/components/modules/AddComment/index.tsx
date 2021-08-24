import clsx from "clsx";
import { useCallback, useState } from "react";

import { useForm } from "../../../hooks/use-form";
import useKeyDownSubmit from "../../../hooks/use-key-down-submit";
import { postComment } from "../../../services/post";
import { GetPostComments } from "../../../services/post/types";
import { getLocaleDay } from "../../../utils/date";
import InputField from "../../elements/InputField";
import styles from "./styles.module.scss";

type Props = {
  postId: number;
  parentId?: number;
  onCommentSubmit: (comment: GetPostComments) => void;
};

function AddComment({ postId, parentId, onCommentSubmit }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [requestErrors, setRequestErrors] = useState<string[]>([]);

  const submitComment = useCallback(
    async (data: any) => {
      setRequestErrors([]);
      setIsLoading(true);

      postComment(postId, {
        author: data.author,
        body: data.body,
        date: getLocaleDay(Date.now()),
        parent_id: parentId ?? null,
      })
        .then((res) => {
          onCommentSubmit(res);
          clearForm();
        })
        .catch((e) => {
          if (e.errors) {
            setRequestErrors(e.errors);
            return;
          }
          setRequestErrors(["خطا در اتصال به سرور"]);
        })
        .finally(() => setIsLoading(false));
    },
    [parentId, postId]
  );

  const { handleSubmit, handleChange, data, errors, clearForm, submit } =
    useForm({
      validations: {
        author: {
          required: { message: "وارد کردن نام الزامی است", value: true },
        },
        body: {
          required: { message: "وارد کردن نظر الزامی است", value: true },
        },
      },
      onSubmit: submitComment,
      initialValues: {
        author: "",
        body: "",
      },
    });

  const keyDownEventHandler = useKeyDownSubmit(submit);

  return (
    <section className={styles["add-comment"]}>
      <h3 className="h4">اضافه کردن کامنت جدید</h3>
      <form onSubmit={handleSubmit} onKeyDown={keyDownEventHandler}>
        <fieldset disabled={isLoading}>
          <InputField
            label="نام شما"
            value={data.author}
            onChange={handleChange("author")}
            error={errors.author}
          />
          <InputField
            label="نظر شما"
            value={data.body}
            onChange={handleChange("body")}
            inputType="textarea"
            error={errors.body}
          />
          {requestErrors.length > 0 && (
            <ul className={styles["add-comment__error"]}>
              {requestErrors.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          <button
            type="submit"
            className={clsx(
              "btn",
              "btn-primary",
              styles["add-comment__submit-btn"]
            )}
          >
            {isLoading ? "لطفا صبر کنید" : "ثبت نظر"}
          </button>
        </fieldset>
      </form>
    </section>
  );
}

export default AddComment;

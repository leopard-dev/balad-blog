import clsx from "clsx";
import { useCallback } from "react";

import { useForm } from "../../../hooks/use-form";
import useNetworkRequest from "../../../hooks/use-request";
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
  const [state, makeRequest] = useNetworkRequest(postComment, {
    onSuccess: (res) => {
      onCommentSubmit(res);
      clearForm();
    },
  });

  const submitComment = async (data: any) => {
    makeRequest(postId, {
      author: data.author,
      body: data.body,
      date: getLocaleDay(Date.now()),
      parent_id: parentId ?? null,
    });
  };

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

  const keyDownEventHandler = useCallback(
    (e: any) => {
      if ((e.metaKey || e.ctrlKey) && e.code === "Enter") {
        e.preventDefault();
        submit();
      }
    },
    [submit]
  );

  return (
    <section className={styles["add-comment"]}>
      <h3 className="h4">اضافه کردن کامنت جدید</h3>
      <form onSubmit={handleSubmit} onKeyDown={keyDownEventHandler}>
        <fieldset disabled={state.loading}>
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
          {(state.error?.length ?? 0) > 0 && (
            <ul className={styles["add-comment__error"]}>
              {state.error?.map((item) => (
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
            {state.loading ? "لطفا صبر کنید" : "ثبت نظر"}
          </button>
        </fieldset>
      </form>
    </section>
  );
}

export default AddComment;

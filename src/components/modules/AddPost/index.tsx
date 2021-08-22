import { useState } from "react";
import useAuthentication from "../../../hooks/use-authentication";

import { useForm } from "../../../hooks/use-form";
import { createPost } from "../../../services/post";
import { GetPostsResponse } from "../../../services/post/types";
import { getLocaleDay } from "../../../utils/date";
import InputField from "../../elements/InputField";
import styles from "./styles.module.scss";

type Props = {
  onPostCreated: (post: GetPostsResponse) => void;
};

function AddPost({ onPostCreated }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, serServerError] = useState<string | undefined>(undefined);
  const { token } = useAuthentication();
  const { handleSubmit, handleChange, data, errors, clearForm } = useForm({
    validations: {
      title: {
        required: {
          message: "وارد کردن تیتر پست الزامی است.",
          value: true,
        },
      },
      body: {
        required: {
          message: "وارد کردن متن پست الزامی است.",
          value: true,
        },
      },
    },
    initialValues: {
      title: "",
      body: "",
    },
    onSubmit: (values) => {
      serServerError(undefined);
      setIsLoading(true);
      createPost(
        { ...(values as any), date: getLocaleDay(Date.now()) },
        token as string
      )
        .then((res) => {
          clearForm();
          onPostCreated(res);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setIsLoading(false);
        });
    },
  });
  return (
    <section className={styles["add-post"]}>
      <h3 className="h4">اضافه کردن پست جدید</h3>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={isLoading}>
          <InputField
            label="تیتر"
            inputType="input"
            name="title"
            value={data.title as string}
            onChange={handleChange("title")}
            error={errors.title}
          />
          <InputField
            label="متن پست"
            inputType="textarea"
            name="body"
            value={data.body as string}
            onChange={handleChange("body")}
            error={errors.body}
          />
          {serverError && <p>{serverError}</p>}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            ثبت پست
          </button>
        </fieldset>
      </form>
    </section>
  );
}

export default AddPost;

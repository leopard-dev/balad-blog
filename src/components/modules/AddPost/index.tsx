import useAuthentication from "../../../hooks/use-authentication";
import { useForm } from "../../../hooks/use-form";
import useAsyncFn from "../../../hooks/use-request";
import { createPost } from "../../../services/post";
import { GetPostsResponse } from "../../../services/post/types";
import { getLocaleDay } from "../../../utils/date";
import InputField from "../../elements/InputField";
import styles from "./styles.module.scss";

type Props = {
  onPostCreated: (post: GetPostsResponse) => void;
};

function AddPost({ onPostCreated }: Props) {
  const { token } = useAuthentication();
  const [state, makeRequest] = useAsyncFn(createPost, {
    onSuccess: (res) => {
      clearForm();
      onPostCreated(res);
    },
  });
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
    onSubmit: (values) =>
      makeRequest(
        { ...(values as any), date: getLocaleDay(Date.now()) },
        token as string
      ),
  });
  return (
    <section className={styles["add-post"]}>
      <h3 className="h4">اضافه کردن پست جدید</h3>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={state.loading}>
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
          {state.error && <p>{state.error[0]}</p>}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={state.loading}
          >
            ثبت پست
          </button>
        </fieldset>
      </form>
    </section>
  );
}

export default AddPost;

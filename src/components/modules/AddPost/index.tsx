import { Form, Formik } from "formik";

import { createPost } from "../../../services/post";
import { GetPostsResponse } from "../../../services/post/types";
import { getLocaleDay } from "../../../utils/date";
import InputField from "../../elements/InputField";
import styles from "./styles.module.scss";

type Props = {
  tokenId: string;
  onPostCreated: (post: GetPostsResponse) => void;
};

function AddPost({ tokenId, onPostCreated }: Props) {
  return (
    <section className={styles["add-post"]}>
      <h3 className="h4">اضافه کردن پست جدید</h3>
      <Formik
        initialValues={{
          title: "",
          body: "",
        }}
        validate={(values) => {
          const errors: any = {};
          if (!values.title) {
            errors.title = "وارد کردن تیتر اجباری است.";
          }
          if (!values.body) {
            errors.body = "وارد کردن متن پست اجباری است.";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting, setValues }) => {
          createPost({ ...values, date: getLocaleDay(Date.now()) }, tokenId)
            .then((res) => {
              setValues({ body: "", title: "" }, false);
              onPostCreated(res);
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField label="تیتر" inputType="input" name="title" />
            <InputField label="متن پست" inputType="textarea" name="body" />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              ثبت پست
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
}

export default AddPost;

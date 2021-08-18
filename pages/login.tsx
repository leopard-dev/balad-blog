import { Form, Formik } from "formik";

import InputField from "../src/components/elements/InputField";
import { loginUser } from "../src/services/user";
import isNotEmpty from "../src/utils/is-not-empty";

import type { NextPage } from "next";
import useLocalStorage from "../src/hooks/use-local-storage";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";

const Login: NextPage = () => {
  const [token, setToken] = useLocalStorage<undefined | string>(
    "session_key",
    undefined
  );

  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.replace("/");
    }
  }, [token]);

  return (
    <>
      <h2>ورود به سیستم</h2>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          loginUser(values)
            .then((res) => setToken(res.access_token))
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              validate={isNotEmpty}
              label="نام کاربری"
              type="text"
              name="username"
            />
            <InputField
              validate={isNotEmpty}
              label="کلمه عبور"
              type="password"
              name="password"
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              ورود به سیستم
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Login;

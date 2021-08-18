import { Form, Formik } from "formik";
import type { NextPage } from "next";
import React, { useCallback } from "react";
import InputField from "../src/components/elements/InputField";
import { createUser, getUserByUsername } from "../src/services/user";

const Register: NextPage = () => {
  const validateUsername = useCallback(async (value: string) => {
    let error;
    if (!value) {
      error = "وارد کردن نام کاربری اجباری است.";
    }
    try {
      await getUserByUsername(value);
      error = "این نام کاربری از قبل وجود دارد";
    } catch {}
    return error;
  }, []);

  return (
    <>
      <h2>ثبت نام در سیستم</h2>
      <Formik
        initialValues={{
          email: "",
          password: "",
          username: "",
          passwordRepeat: "",
          title: "",
        }}
        validate={(values) => {
          const errors: any = {};
          if (!values.email) {
            errors.email = "وارد کردن ایمیل اجباری است.";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = "آدرس ایمیل وارد شده نامعتبر است.";
          }
          if (!values.title) {
            errors.title = "وارد کردن نام اجباری است.";
          }

          if (!values.password) {
            errors.password = "وارد کردن پسورد اجباری است.";
          }
          if (!values.passwordRepeat) {
            errors.passwordRepeat = "وارد کردن تکرار پسورد اجباری است.";
          }
          if (values.passwordRepeat !== values.password) {
            errors.passwordRepeat = "پسورد و تکرار ان با هم یکسان نیستند";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          const { passwordRepeat, ...payload } = values;
          createUser(payload)
            .then(console.log)
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField label="نام" type="text" name="title" />
            <InputField
              validate={validateUsername}
              label="نام کاربری"
              type="text"
              name="username"
            />
            <InputField label="ایمیل" type="email" name="email" />
            <InputField label="کلمه عبور" type="password" name="password" />
            <InputField
              label="تکرار کلمه عبور"
              type="password"
              name="passwordRepeat"
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              ثبت نام
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Register;

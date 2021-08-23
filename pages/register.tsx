import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useMemo } from "react";

import InputField from "../src/components/elements/InputField";
import useAuthentication from "../src/hooks/use-authentication";
import { useForm } from "../src/hooks/use-form";
import useRedirect from "../src/hooks/use-redirect";
import useAsyncFn from "../src/hooks/use-request";
import { createUser, getUserByUsername } from "../src/services/user";
import debounce from "../src/utils/debounce";

const Register: NextPage = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuthentication();
  useRedirect({ redirectTo: "/", rule: isAuthenticated });
  const [state, makeRequest] = useAsyncFn(createUser, {
    onSuccess: () => router.push("/login"),
  });

  // this memorization could be extracted into it's own hook
  const validateUsername = useMemo(
    () =>
      debounce(async (value) => {
        try {
          await getUserByUsername(value);
          return false;
        } catch {
          return true;
        }
      }),
    []
  );

  const { handleSubmit, handleChange, data, errors } = useForm({
    validations: {
      email: {
        required: {
          message: "وارد کردن ایمل الزامی است",
          value: true,
        },
        custom: {
          isValid: (value) => {
            return /^\S+@\S+\.\S+$/.test(value);
          },
          validateOnChange: true,
          message: "لطفا یک ایمیل معتبر وارد نمایید",
        },
      },
      password: {
        required: {
          message: "وارد کردن کلمه عبور الزامی است",
          value: true,
        },
      },
      username: {
        required: {
          message: "وارد کردن نام کاربری الزامی است",
          value: true,
        },
        custom: {
          isValid: validateUsername,
          validateOnChange: true,
          message: "نام کاربری توسط فرد دیگری گرفته شده است.",
        },
      },
      passwordRepeat: {
        required: {
          message: "وارد کردن تکرار پسورد الزامی است",
          value: true,
        },
        custom: {
          isValid: (value, data) => {
            return value === data.password;
          },
          validateOnChange: true,

          message: "کلمه عبور و تکرار آن با هم برابر نیستند.",
        },
      },
      title: {
        required: {
          message: "وارد کردن تیتر الزامی است",
          value: true,
        },
      },
    },
    initialValues: {
      email: "",
      password: "",
      username: "",
      passwordRepeat: "",
      title: "",
    },
    onSubmit: ({ passwordRepeat, ...values }) => makeRequest(values),
  });

  return (
    <>
      <h2>ثبت نام در سیستم</h2>

      <form onSubmit={handleSubmit}>
        <fieldset disabled={state.loading}>
          <InputField
            value={data.title}
            label="نام "
            type="text"
            name="title"
            onChange={handleChange("title")}
            error={errors.title}
          />
          <InputField
            label="نام کاربری "
            type="text"
            name="username"
            value={data.username}
            onChange={handleChange("username")}
            error={errors.username}
          />
          <InputField
            label="ایمیل"
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange("email")}
            error={errors.email}
          />
          <InputField
            label="کلمه عبور"
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange("password")}
            error={errors.password}
          />
          <InputField
            label="تکرار کلمه عبور"
            type="password"
            name="passwordRepeat"
            value={data.passwordRepeat}
            onChange={handleChange("passwordRepeat")}
            error={errors.passwordRepeat}
          />
          {state.error && <p>{state.error[0]}</p>}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={state.loading}
          >
            ثبت نام
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default Register;

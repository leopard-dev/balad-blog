import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";

import InputField from "../src/components/elements/InputField";
import { useForm } from "../src/hooks/use-form";
import useLocalStorage from "../src/hooks/use-local-storage";
import { createUser, getUserByUsername } from "../src/services/user";

const Register: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, serServerError] = useState<string | undefined>(undefined);
  const [token] = useLocalStorage<undefined | string>("session_key", undefined);

  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.replace("/");
    }
  }, [token]);

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
          isValid: async (value) => {
            try {
              await getUserByUsername(value);
              return false;
            } catch {
              return true;
            }
          },
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
    onSubmit: (values) => {
      serServerError(undefined);
      setIsLoading(true);
      createUser(values as any)
        .then((res) => router.push("/login"))
        .catch((error) => {
          if (error.message) {
            serServerError(error.message);
            return;
          }
          serServerError("خطای در اتصال به سرور !");
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  return (
    <>
      <h2>ثبت نام در سیستم</h2>

      <form onSubmit={handleSubmit}>
        <fieldset disabled={isLoading}>
          <InputField
            value={data.title as string}
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
            value={data.username as string}
            onChange={handleChange("username")}
            error={errors.username}
          />
          <InputField
            label="ایمیل"
            type="email"
            name="email"
            value={data.email as string}
            onChange={handleChange("email")}
            error={errors.email}
          />
          <InputField
            label="کلمه عبور"
            type="password"
            name="password"
            value={data.password as string}
            onChange={handleChange("password")}
            error={errors.password}
          />
          <InputField
            label="تکرار کلمه عبور"
            type="password"
            name="passwordRepeat"
            value={data.passwordRepeat as string}
            onChange={handleChange("passwordRepeat")}
            error={errors.passwordRepeat}
          />
          {serverError && <p>{serverError}</p>}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            ثبت نام
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default Register;

import InputField from "../src/components/elements/InputField";
import { loginUser } from "../src/services/user";
import isNotEmpty from "../src/utils/is-not-empty";

import type { NextPage } from "next";
import useLocalStorage from "../src/hooks/use-local-storage";
import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { useForm } from "../src/hooks/use-form";

const Login: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, serServerError] = useState<string | undefined>(undefined);
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

  const { handleSubmit, handleChange, data, errors } = useForm({
    validations: {
      username: {
        required: {
          message: "وارد کردن نام الزامی است",
          value: true,
        },
      },
      password: {
        required: {
          message: "وارد کردن کلمه عبور الزامی است",
          value: true,
        },
      },
    },
    onSubmit: (values) => {
      serServerError(undefined);
      setIsLoading(true);
      loginUser(values as any)
        .then((res) => setToken(res.access_token))
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
    initialValues: {
      username: "",
      password: "",
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={isLoading}>
        <InputField
          value={data.username as string}
          validate={isNotEmpty}
          label="نام کاربری"
          type="text"
          name="username"
          onChange={handleChange("username")}
          error={errors.username}
        />
        <InputField
          value={data.password as string}
          label="کلمه عبور"
          type="password"
          name="password"
          onChange={handleChange("password")}
          error={errors.password}
        />
        {serverError && <p className="text-red">{serverError}</p>}
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          ورود به سیستم
        </button>
      </fieldset>
    </form>
  );
};

export default Login;

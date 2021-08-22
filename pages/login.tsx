import InputField from "../src/components/elements/InputField";
import useAuthentication from "../src/hooks/use-authentication";
import { useForm } from "../src/hooks/use-form";
import useRedirect from "../src/hooks/use-redirect";
import useAsyncFn from "../src/hooks/use-request";
import { loginUser } from "../src/services/user";

import type { NextPage } from "next";

const Login: NextPage = () => {
  const [state, makeRequest] = useAsyncFn(loginUser, {
    onSuccess: (res) => login(res.access_token),
  });
  const { login, isAuthenticated } = useAuthentication();
  useRedirect({ redirectTo: "/", rule: isAuthenticated });

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
    onSubmit: makeRequest,
    initialValues: {
      username: "",
      password: "",
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={state.loading}>
        <InputField
          value={data.username as string}
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
        {state.error?.[0] && <p className="text-red">{state.error?.[0]}</p>}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={state.loading}
        >
          ورود به سیستم
        </button>
      </fieldset>
    </form>
  );
};

export default Login;

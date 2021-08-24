import { useState } from 'react';

import type { NextPage } from 'next';
import InputField from '../src/components/elements/InputField';
import useAuthentication from '../src/hooks/use-authentication';
import { useForm } from '../src/hooks/use-form';
import useRedirect from '../src/hooks/use-redirect';
import { loginUser } from '../src/services/user';

const Login: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, serServerError] = useState<string | undefined>(undefined);
  const { login, isAuthenticated } = useAuthentication();
  useRedirect({ redirectTo: '/', rule: isAuthenticated });

  const {
    handleSubmit, handleChange, data, errors,
  } = useForm({
    validations: {
      username: {
        required: {
          message: 'وارد کردن نام الزامی است',
          value: true,
        },
      },
      password: {
        required: {
          message: 'وارد کردن کلمه عبور الزامی است',
          value: true,
        },
      },
    },
    onSubmit: (values) => {
      serServerError(undefined);
      setIsLoading(true);
      loginUser(values as any)
        .then((res) => login(res.access_token))
        .catch((error) => {
          if (error.message) {
            serServerError(error.message);
            return;
          }
          serServerError('خطای در اتصال به سرور !');
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    initialValues: {
      username: '',
      password: '',
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={isLoading}>
        <InputField
          value={data.username}
          label="نام کاربری"
          type="text"
          name="username"
          onChange={handleChange('username')}
          error={errors.username}
        />
        <InputField
          value={data.password}
          label="کلمه عبور"
          type="password"
          name="password"
          onChange={handleChange('password')}
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

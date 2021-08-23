import { ChangeEvent, FormEvent, useState } from "react";

interface Validation {
  required?: {
    value: boolean;
    message: string;
  };
  custom?: {
    isValid: (value: string, data: any) => Promise<boolean> | boolean;
    validateOnChange?: boolean;
    message: string;
  };
}

type ErrorRecord<T> = Partial<Record<keyof T, string>>;

type Validations<T extends {}> = Partial<Record<keyof T, Validation>>;

export const useForm = <T extends Record<keyof T, any> = {}>(options?: {
  validations?: Validations<T>;
  initialValues?: Partial<T>;
  onSubmit?: (data: T) => void;
}) => {
  const [data, setData] = useState<T>((options?.initialValues || {}) as T);
  const [errors, setErrors] = useState<ErrorRecord<T>>({});

  const clearForm = () => setData((options?.initialValues || {}) as T);

  const validateOnChange = (key: keyof T, value: string) => {
    Promise.resolve(
      options?.validations?.[key]?.custom?.isValid(value, data)
    ).then((isValid) => {
      if (isValid) {
        setErrors((old) => ({
          ...old,
          [key]: undefined,
        }));
        return;
      }
      setErrors((old) => ({
        ...old,
        [key]: options?.validations?.[key]?.custom?.message,
      }));
    });
  };

  const handleChange =
    <S extends unknown>(key: keyof T, sanitizeFn?: (value: string) => S) =>
    (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
      const value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value;
      if (options?.validations?.[key]?.custom?.validateOnChange) {
        validateOnChange(key, value as string);
      }
      setData({
        ...data,
        [key]: value,
      });
    };

  const submit = async () => {
    const validations = options?.validations;
    if (validations) {
      let valid = true;
      const newErrors: ErrorRecord<T> = {};
      for (const key in validations) {
        const value = data[key];
        const validation = validations[key];
        if (validation?.required?.value && !value.trim()) {
          valid = false;
          newErrors[key] = validation?.required?.message;
        }

        const custom = validation?.custom;
        if (custom?.isValid && !(await custom.isValid(value, data))) {
          valid = false;
          newErrors[key] = custom.message;
        }
      }

      if (!valid) {
        setErrors(newErrors);
        return;
      }
    }

    setErrors({});

    if (options?.onSubmit) {
      options.onSubmit(data);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };

  return {
    data,
    handleChange,
    handleSubmit,
    errors,
    clearForm,
    submit,
  };
};

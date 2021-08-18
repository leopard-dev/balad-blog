import clsx from "clsx";
import { useField } from "formik";
import styles from "./styles.module.scss";

type Props = { label: string; [key: string]: any };

function InputField({ label, validate, ...props }: Props) {
  const [field, meta, helpers] = useField({ ...props, validate } as any);
  return (
    <div className={clsx("form-group", styles["input-field-container"])}>
      <label htmlFor="exampleInputEmail1">{label}</label>
      <input
        className={clsx("form-control", {
          "is-invalid": meta.touched && meta.error,
        })}
        {...field}
        {...props}
      />
      <div className="invalid-feedback">{meta.error}</div>
    </div>
  );
}

export default InputField;

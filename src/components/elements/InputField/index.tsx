import clsx from "clsx";
import { useField } from "formik";
import styles from "./styles.module.scss";

type Props = {
  label: string;
  inputType?: "textarea" | "input";
  [key: string]: any;
};

function InputField({
  label,
  inputType: type = "input",
  validate,
  ...props
}: Props) {
  const [field, meta, helpers] = useField({ ...props, validate } as any);
  return (
    <div className={clsx("form-group", styles["input-field-container"])}>
      <label htmlFor="exampleInputEmail1">{label}</label>
      {type === "input" && (
        <input
          className={clsx("form-control", {
            "is-invalid": meta.touched && meta.error,
          })}
          {...field}
          {...props}
        />
      )}
      {type === "textarea" && (
        <textarea
          className={clsx("form-control", {
            "is-invalid": meta.touched && meta.error,
          })}
          onKeyUp={(e: any) => {
            e.target.style.overflow = "hidden";
            e.target.style.height =
              Math.max(e.target.height, e.target.scrollHeight) + "px";
          }}
          {...field}
          {...props}
        />
      )}
      <div className="invalid-feedback">{meta.error}</div>
    </div>
  );
}

export default InputField;

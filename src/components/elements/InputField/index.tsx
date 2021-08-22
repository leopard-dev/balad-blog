import clsx from "clsx";
import styles from "./styles.module.scss";

type Props = {
  label: string;
  value: string;
  inputType?: "textarea" | "input";
  error?: string;
  isDisabled?: boolean;
  [key: string]: any;
};

function InputField({
  label,
  inputType: type = "input",
  error,
  ...props
}: Props) {
  const resizeTextAreaOnChange = (e: any) => {
    if (e.target.scrollHeight > 100) {
      e.target.style.height = e.target.scrollHeight + "px";
    }
    e.target.style.overflow = "hidden";
  };
  return (
    <div className={clsx("form-group", styles["input-field-container"])}>
      <label htmlFor="exampleInputEmail1">{label}</label>
      {type === "input" && (
        <input
          className={clsx("form-control", {
            "is-invalid": error,
          })}
          {...props}
        />
      )}
      {type === "textarea" && (
        <textarea
          className={clsx("form-control", {
            "is-invalid": error,
          })}
          style={{ height: 100 }}
          onKeyUp={resizeTextAreaOnChange}
          {...props}
        />
      )}
      <div className="invalid-feedback">{error}</div>
    </div>
  );
}

export default InputField;

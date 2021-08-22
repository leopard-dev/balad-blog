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

function InputField({ label, inputType = "input", error, ...props }: Props) {
  const resizeTextAreaOnChange = (e: any) => {
    if (e.target.scrollHeight > 100) {
      e.target.style.height = e.target.scrollHeight + "px";
    }
    e.target.style.overflow = "hidden";
  };
  return (
    <div className={clsx("form-group", styles["input-field-container"])}>
      <label className={styles["input-field-container__label"]}>
        {label}
        {inputType === "input" && (
          <input
            className={clsx("form-control", {
              "is-invalid": error,
            })}
            {...props}
          />
        )}
        {inputType === "textarea" && (
          <textarea
            className={clsx("form-control", styles["textarea"], {
              "is-invalid": error,
            })}
            onKeyUp={resizeTextAreaOnChange}
            onKeyDown={resizeTextAreaOnChange}
            {...props}
          />
        )}
        <div className="invalid-feedback">{error}</div>
      </label>
    </div>
  );
}

export default InputField;

import clsx from "clsx";
import AutoResizableTextArea from "../AutoResizableTextArea";
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
          <AutoResizableTextArea error={error} {...props} />
        )}
        <div className="invalid-feedback">{error}</div>
      </label>
    </div>
  );
}

export default InputField;

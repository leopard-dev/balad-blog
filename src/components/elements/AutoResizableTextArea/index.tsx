import clsx from "clsx";
import styles from "./styles.module.scss";

type Props = {
  error?: string;
  [key: string]: any;
};

function AutoResizableTextArea({ error, ...props }: Props) {
  const resizeTextAreaOnChange = (e: any) => {
    if (e.target.scrollHeight > 100) {
      e.target.style.height = e.target.scrollHeight + "px";
    }
    e.target.style.overflow = "hidden";
  };
  return (
    <textarea
      className={clsx("form-control", styles["textarea"], {
        "is-invalid": error,
      })}
      onKeyUp={resizeTextAreaOnChange}
      onKeyDown={resizeTextAreaOnChange}
      {...props}
    />
  );
}

export default AutoResizableTextArea;

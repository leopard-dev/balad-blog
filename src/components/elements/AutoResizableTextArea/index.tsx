import clsx from "clsx";

import styles from "./styles.module.scss";

type Props = {
  error?: string;
  [key: string]: any;
};

function AutoResizableTextArea({ error, ...props }: Props) {
  return (
    <span
      role="textbox"
      contentEditable
      className={clsx("form-control", styles["textarea"], {
        "is-invalid": error,
      })}
      {...props}
    />
  );
}

export default AutoResizableTextArea;

import clsx from "clsx";
import React, { TextareaHTMLAttributes, useRef } from "react";

import styles from "./styles.module.scss";

type Props = {
  error?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const AutoResizableTextArea = ({ error, ...props }: Props) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.target!.style.height = "auto";
    event.target!.style.height = `${event.target!.scrollHeight}px`;
    if (props.onChange) {
      props.onChange(event);
    }
  };

  return (
    <textarea
      {...props}
      className={clsx("form-control", styles["textarea"], props.className, {
        "is-invalid": error,
      })}
      style={{
        height: "auto",
        minHeight: "100px",
      }}
      onChange={onChangeHandler}
    />
  );
};

export default AutoResizableTextArea;

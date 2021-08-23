import clsx from "clsx";
import React, { TextareaHTMLAttributes, useRef } from "react";

import styles from "./styles.module.scss";

type Props = {
  error?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const AutoResizableTextArea = ({ error, ...props }: Props) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    textAreaRef.current!.style.height = "auto";
    textAreaRef.current!.style.height = `${
      textAreaRef.current!.scrollHeight
    }px`;
    if (props.onChange) {
      props.onChange(event);
    }
  };

  return (
    <textarea
      className={clsx("form-control", styles["textarea"], {
        "is-invalid": error,
      })}
      ref={textAreaRef}
      rows={1}
      style={{
        height: "auto",
      }}
      onChange={onChangeHandler}
      {...props}
    />
  );
};

export default AutoResizableTextArea;

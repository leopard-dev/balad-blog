import clsx from "clsx";
import React, {
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "./styles.module.scss";

type Props = {
  error?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const AutoResizableTextArea = ({ error, ...props }: Props) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState("");
  const [textAreaHeight, setTextAreaHeight] = useState("auto");

  useEffect(() => {
    setTextAreaHeight(`${textAreaRef.current!.scrollHeight}px`);
  }, [text]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaHeight("auto");
    setText(event.target.value);

    if (props.onChange) {
      props.onChange(event);
    }
  };

  return (
    <textarea
      className={clsx("form-control", styles["textarea"], {
        "is-invalid": error,
      })}
      {...props}
      ref={textAreaRef}
      rows={1}
      style={{
        height: textAreaHeight,
      }}
      onChange={onChangeHandler}
    />
  );
};

export default AutoResizableTextArea;

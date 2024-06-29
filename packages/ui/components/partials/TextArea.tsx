import React, { DetailedHTMLProps, FC, TextareaHTMLAttributes } from "react";

export interface TextAreaProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  label?: string;
}

export const Textarea: FC<TextAreaProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <textarea
      className={`${
        className || ""
      } h-16 w-full rounded-md border-gray-200 p-2 py-2`}
      {...props}
    >
      {/* @ts-ignore */}
      {children}
    </textarea>
  );
};

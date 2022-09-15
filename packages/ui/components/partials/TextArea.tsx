import React, { DetailedHTMLProps, FC, TextareaHTMLAttributes } from "react";

export interface TextAreaProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {}

export const Textarea: FC<TextAreaProps> = ({ className, ...props }) => {
  return (
    <textarea
      className={`${
        className || ""
      } h-16 w-full  border-gray-300 p-2 rounded py-2`}
      {...props}
    />
  );
};

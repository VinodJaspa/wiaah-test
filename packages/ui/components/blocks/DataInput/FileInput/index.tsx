import React from "react";
import { HtmlInputProps } from "types";
import { Input } from "@UI";

export interface FileInputProps {
  id?: string;
  accept?: "video" | "picture" | "both" | "all";
  innerProps?: HtmlInputProps;
  multiple?: boolean;
}

export const FileInput: React.FC<FileInputProps> = ({
  accept,
  children,
  id,
  innerProps,
  multiple,
}) => {
  let props = innerProps;
  if (innerProps) {
    const { id: _, ...rest } = innerProps;
    props = rest;
  }
  return (
    <label htmlFor={id}>
      {children}
      <Input
        id={id}
        type="file"
        className="hidden"
        multiple={multiple}
        accept={
          accept === "both"
            ? "image/* , video/*"
            : accept === "picture"
            ? "image/*"
            : accept === "video"
            ? "video/*"
            : undefined
        }
        {...props}
      />
    </label>
  );
};

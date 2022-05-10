import { Input, InputProps } from "@chakra-ui/react";
import React from "react";

export interface FileInputProps {
  id: string;
  accept?: "video" | "picture" | "both" | "all";
  innerProps?: InputProps;
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
    const { id, ...rest } = innerProps;
    props = rest;
  }
  return (
    <label htmlFor={id}>
      {children}
      <Input
        id={id}
        type="file"
        display={"none"}
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

import {
  Box,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import { t } from "i18next";
import React from "react";
import { FaCamera } from "react-icons/fa";
import { MdSend } from "react-icons/md";

export interface CommentInputProps {
  onCameraClick?: () => void;
  onCommentSubmit?: () => void;
}

export const CommentInput: React.FC<CommentInputProps> = ({
  onCameraClick,
  onCommentSubmit,
}) => {
  function handleCameraClick() {
    onCameraClick && onCameraClick();
  }
  function handleCommentSubmit() {
    onCommentSubmit && onCommentSubmit();
  }
  return (
    <InputGroup size={"lg"} alignItems={"center"}>
      <InputLeftElement onClick={handleCameraClick} cursor={"pointer"}>
        <Icon fontSize={"x-large"} as={FaCamera} />
      </InputLeftElement>
      <Input
        rounded={"full"}
        placeholder={t("enter_comment", "Enter comment")}
      />
      <InputRightElement onClick={handleCommentSubmit} cursor={"pointer"}>
        <Icon fontSize={"x-large"} as={MdSend} />
      </InputRightElement>
    </InputGroup>
  );
};

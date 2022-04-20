import {
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaCamera } from "react-icons/fa";
import { MdSend } from "react-icons/md";

export interface CommentInputProps {
  onCameraClick?: () => void;
  onCommentSubmit?: (comment: string) => void;
}

export const CommentInput: React.FC<CommentInputProps> = ({
  onCameraClick,
  onCommentSubmit,
}) => {
  const { t } = useTranslation();
  const [input, setInput] = React.useState<string>("");
  function handleCameraClick() {
    onCameraClick && onCameraClick();
  }
  function handleCommentSubmit() {
    onCommentSubmit && onCommentSubmit(input);
  }
  return (
    <InputGroup size={"lg"} alignItems={"center"}>
      <InputLeftElement
        data-testid="CommentCameraBtn"
        onClick={handleCameraClick}
        cursor={"pointer"}
      >
        <Icon fontSize={"x-large"} as={FaCamera} />
      </InputLeftElement>
      <Input
        data-testid="CommentInput"
        rounded={"full"}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t("enter_comment", "Enter comment")}
      />
      <InputRightElement
        data-testid="CommentSubmitBtn"
        onClick={handleCommentSubmit}
        cursor={"pointer"}
      >
        <Icon fontSize={"x-large"} as={MdSend} />
      </InputRightElement>
    </InputGroup>
  );
};

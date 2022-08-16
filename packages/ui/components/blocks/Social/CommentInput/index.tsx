import React from "react";
import { useTranslation } from "react-i18next";
import { FaCamera } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import { InputGroup, InputLeftElement, InputRightElement, Input } from "ui";
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
    <InputGroup className="rounded-full px-1">
      <InputLeftElement
        data-testid="CommentCameraBtn"
        onClick={handleCameraClick}
        className={"cursor-pointer"}
      >
        <FaCamera className="text-2xl" />
      </InputLeftElement>
      <Input
        className="rounded-full"
        data-testid="CommentInput"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t("Enter comment")}
      />
      <InputRightElement
        data-testid="CommentSubmitBtn"
        onClick={handleCommentSubmit}
        className={"cursor-pointer"}
      >
        <MdSend className="text-2xl" />
      </InputRightElement>
    </InputGroup>
  );
};

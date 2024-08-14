import React from "react";
import { useTranslation } from "react-i18next";
import { FaCamera } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import {
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  HStack,
} from "@UI";
import { LuCamera } from "react-icons/lu";
import { IoSend } from "react-icons/io5";
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
    <div className="relative h-[74px] border-t-2 border-[#EFEFEF]">
      <input
        className="w-full hover:ring-0 active:ring-offset-0 pt-1 active:right-0 h-full border-0 border-none px-16 py-0 text-xl placeholder-[#262626] "
        data-testid="CommentInput"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t("Add a comment...")}
      />
      <LuCamera
        className="w-7 h-7 absolute inset-0 my-auto left-4"
        onClick={handleCameraClick}
      />
      <IoSend
        className="w-7 h-7 absolute  text-[#20ECA7] inset-y-0 my-auto right-6 "
        onClick={handleCommentSubmit}
      />
    </div>
  );
};

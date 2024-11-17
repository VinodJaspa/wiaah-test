import React from "react";
import { useTranslation } from "react-i18next";
import { LuCamera } from "react-icons/lu";
import { IoSend } from "react-icons/io5";
import { cn } from "utils"; // Install using npm install clsx or yarn add clsx

export interface CommentInputProps {
  onCameraClick?: () => void;
  onCommentSubmit?: (comment: string) => void;
  className?: string;
  inputClassName?: string;
  cameraIconClassName?: string;
  sendIconClassName?: string;
}

export const CommentInput: React.FC<CommentInputProps> = ({
  onCameraClick,
  onCommentSubmit,
  className,
  inputClassName,
  cameraIconClassName,
  sendIconClassName,
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
    <div
      className={cn("relative h-[74px] border-t-2 border-[#EFEFEF]", className)}
    >
      <input
        className={cn(
          "w-full hover:ring-0 active:ring-offset-0 pt-1 active:right-0 h-full border-0 border-none px-16 py-0 text-xl placeholder-[#262626]",
          inputClassName,
        )}
        data-testid="CommentInput"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t("Add a comment...")}
      />
      <LuCamera
        className={cn(
          "w-7 h-7 absolute inset-0 my-auto left-4",
          cameraIconClassName,
        )}
        onClick={handleCameraClick}
      />
      <IoSend
        className={cn(
          "w-7 h-7 absolute text-[#20ECA7] inset-y-0 my-auto right-6",
          sendIconClassName,
        )}
        onClick={handleCommentSubmit}
      />
    </div>
  );
};

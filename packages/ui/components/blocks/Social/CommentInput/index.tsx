import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoSend } from "react-icons/io5";
import { LuCamera } from "react-icons/lu";
import { cn } from "utils";

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
  const [input, setInput] = useState<string>("");
  const [matchedUsers, setMatchedUsers] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchUsers = async (): Promise<string[]> => {
    return [
      "john_doe",
      "jane_smith",
      "jackson_lee",
      "jenny123",
      "james_bond",
      "sarmin",
      "sarmin_123",
      "shohan",
    ];
  };

  useEffect(() => {
    const lastWord = input.split(" ").pop() || "";
    if (lastWord.startsWith("@")) {
      const searchText = lastWord.slice(1);
      fetchUsers().then((users) => {
        const filteredUsers = searchText
          ? users.filter((user) =>
              user.toLowerCase().includes(searchText.toLowerCase()),
            )
          : users;

        setMatchedUsers(filteredUsers);
      });
    } else {
      setMatchedUsers([]);
    }
  }, [input]);

  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [input, matchedUsers]);

  const handleUserSelect = (username: string) => {
    const words = input.split(" ");
    words[words.length - 1] = `@${username}`;
    setInput(words.join(" ") + " ");
  };

  function handleCameraClick() {
    onCameraClick && onCameraClick();
  }

  function handleCommentSubmit() {
    onCommentSubmit && onCommentSubmit(input);
    setInput("");
  }

  return (
    <div
      className={cn("relative h-[74px] border-t-2 border-[#EFEFEF]", className)}
    >
      <Popover
        isOpen={matchedUsers.length > 0}
        onClose={() => setMatchedUsers([])}
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <input
            ref={inputRef}
            className={cn(
              "w-full hover:ring-0 active:ring-offset-0 pt-1 active:right-0 h-full border-0 border-none px-16 py-0 text-xl placeholder-[#262626]",
              inputClassName,
            )}
            data-testid="CommentInput"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("Add a comment...")}
            autoFocus
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody>
            <ul>
              {matchedUsers.map((user) => (
                <li
                  key={user}
                  className="cursor-pointer p-2 hover:bg-gray-100"
                  onClick={() => handleUserSelect(user)}
                >
                  {user}
                </li>
              ))}
            </ul>
          </PopoverBody>
        </PopoverContent>
      </Popover>
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

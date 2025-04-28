
import { Popover, PopoverContent, PopoverTrigger } from "@UI/components/shadcn-components";
import { useGetAllUsers } from "api";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaRegSmile } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { cn } from "utils";

export interface CommentInputProps {
  onCameraClick?: () => void;
  onCommentSubmit?: (comment: string) => void;
  className?: string;
  inputClassName?: string;
  cameraIconClassName?: string;
  sendIconClassName?: string;
  shouldCommentBoxFocused?: boolean;
  setShouldCommentBoxFocused?: (shouldCommentBoxFocused: boolean) => void;
  postOwnerUsername?: string;
}

interface User {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
}

export const CommentInput: React.FC<CommentInputProps> = ({
  onCameraClick,
  onCommentSubmit,
  className,
  inputClassName,
  cameraIconClassName,
  sendIconClassName,
  shouldCommentBoxFocused,
  setShouldCommentBoxFocused,
  postOwnerUsername,
}) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const [input, setInput] = useState<string>("");
  const [matchedUsers, setMatchedUsers] = useState<User[]>([]);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: users = [], isLoading, isError } = useGetAllUsers();

  useEffect(() => {
    if (inputRef.current && postOwnerUsername && input === "") {
      const handleFocus = () => {
        setInput(`@${postOwnerUsername} `);
      };

      const inputElement = inputRef.current;
      inputElement.addEventListener("focus", handleFocus);

      return () => {
        inputElement.removeEventListener("focus", handleFocus);
      };
    }
    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener("focus", () => {});
      }
    }
  }, [postOwnerUsername, input]);

  useEffect(() => {
    const lastWord = input.split(" ").pop() || "";
    if (lastWord.startsWith("@")) {
      const searchText = lastWord.slice(1);
      const filteredUsers = searchText
        ? users.filter((user) =>
          user.username.toLowerCase().includes(searchText.toLowerCase()),
        )
        : users;

      setMatchedUsers(filteredUsers);
    } else {
      setMatchedUsers([]);
    }
  }, [input, users]);

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

  function handleCommentSubmit() {
    onCommentSubmit && onCommentSubmit(input);
    setInput("");
  }

  useEffect(() => {
    if (shouldCommentBoxFocused) {
      if (inputRef.current) {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      }
    }

    setShouldCommentBoxFocused && setShouldCommentBoxFocused(false);
  }, [shouldCommentBoxFocused, setShouldCommentBoxFocused]);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setInput((prevInput) => prevInput + emojiData.emoji);
    setIsEmojiPickerOpen(false);
  };

  return (
    <div
      className={cn("relative h-[74px] border-t-2 border-[#EFEFEF]", className)}
    >

      <Popover>
        <PopoverTrigger className="h-full w-full"> {/* Optional but helps */}
          <input
            ref={inputRef}
            className={cn(
      "w-full h-full min-h-full max-h-full hover:ring-0 active:ring-offset-0 active:ring-0 pt-1 border-0 pl-5 pr-28 py-0 text-xl placeholder-[#262626] focus:outline-none",
          inputClassName
    )}
          data-testid="CommentInput"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("Add a comment...")}
          autoFocus
  />
        </PopoverTrigger>


        <PopoverContent className="w-full">
          {isLoading && <p>Loading...</p>}
          {isError && <p>Error loading users</p>}
          {!isLoading && !isError && (
            <ul>
              {matchedUsers.map((user) => (
                <li
                  key={user.id}
                  className="cursor-pointer p-2 hover:bg-gray-100 flex items-center"
                  onClick={() => handleUserSelect(user.username)}
                >
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  {user.username}
                </li>
              ))}
            </ul>
          )}
        </PopoverContent>
      </Popover>
      <button
        className="w-7 h-7 absolute inset-y-0 my-auto right-16 text-gray-500 hover:text-gray-700"
        onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
      >
        <FaRegSmile size={18} />
      </button>

      {isEmojiPickerOpen && (
        <div className="absolute bottom-16 right-16 z-10">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      <button
        disabled={!input}
        className={cn(
          "w-7 h-7 absolute text-[#20ECA7] disabled:text-gray-500 inset-y-0 my-auto right-6",
          sendIconClassName,
        )}
        onClick={handleCommentSubmit}
      >
        <IoSend size={24} />
      </button>
    </div>
  );
};

import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { useGetAllUsers } from "api";
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
  const { t } = useTranslation();
  const [input, setInput] = useState<string>("");
  const [matchedUsers, setMatchedUsers] = useState<User[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: users = [], isLoading, isError } = useGetAllUsers();

  // Automatically insert postOwnerUsername when input is focused and empty
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

  function handleCameraClick() {
    onCameraClick && onCameraClick();
  }

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

    setShouldCommentBoxFocused(false);
  }, [shouldCommentBoxFocused, setShouldCommentBoxFocused]);

  return (
    <div
      className={cn("relative h-[74px] border-t-2 border-[#EFEFEF]", className)}
    >
      <Popover
        matchWidth
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
        <PopoverContent width="100%">
          <PopoverBody>
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

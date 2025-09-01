"use client";

import React, { useEffect, useRef, useState, Dispatch, SetStateAction } from "react";
import { IoSend } from "react-icons/io5";
import { FaFileUpload, FaTimes, FaSmile } from "react-icons/fa";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { cn } from "utils";

export interface CommentInputProps {
  onCameraClick?: () => void;
  shouldCommentBoxFocused?:boolean;
  postOwnerUsername?: any;
  setShouldCommentBoxFocused?: Dispatch<SetStateAction<boolean>>
  onCommentSubmit?: (comment: string, files: File[]) => void;
  className?: string;
}

export const CommentInput: React.FC<CommentInputProps> = ({
  onCameraClick,
  onCommentSubmit,
  className,
}) => {
  const [input, setInput] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [showEmoji, setShowEmoji] = useState(false);
  const [matchedUsers, setMatchedUsers] = useState<string[]>([]);
  const [matchedTags, setMatchedTags] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiRef.current &&
        !emojiRef.current.contains(event.target as Node)
      ) {
        setShowEmoji(false);
      }
    };

    if (showEmoji) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmoji]);

  // Mock mentions + tags
  const fetchUsers = async (): Promise<string[]> => [
    "john_doe",
    "jane_smith",
    "jackson_lee",
    "jenny123",
    "james_bond",
  ];
  const fetchTags = async (): Promise<string[]> => [
    "coding",
    "design",
    "javascript",
    "funny",
    "paris",
    "Canada",
    "sport"
  ];

  // Mentions/Hashtags detection
  useEffect(() => {
    const lastWord = input.split(/\s/).pop() || "";

    if (lastWord.startsWith("@")) {
      const searchText = lastWord.slice(1);
      fetchUsers().then((users) => {
        const filtered = users.filter((u) =>
          u.toLowerCase().includes(searchText.toLowerCase()),
        );
        setMatchedUsers(filtered);
        setMatchedTags([]);
        setOpen(filtered.length > 0);
      });
    } else if (lastWord.startsWith("#")) {
      const searchText = lastWord.slice(1);
      fetchTags().then((tags) => {
        const filtered = tags.filter((t) =>
          t.toLowerCase().includes(searchText.toLowerCase()),
        );
        setMatchedTags(filtered);
        setMatchedUsers([]);
        setOpen(filtered.length > 0);
      });
    } else {
      setMatchedUsers([]);
      setMatchedTags([]);
      setOpen(false);
    }
  }, [input]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(
        inputRef.current.scrollHeight,
        120,
      )}px`; // max 5 lines
    }
  }, [input]);

  const handleCommentSubmit = () => {
    if (!input.trim() && files.length === 0) return;
    onCommentSubmit?.(input.trim(), files);
    setInput("");
    setFiles([]);
    setOpen(false);
    setShowEmoji(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const handleFileRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEmojiClick = (emoji: EmojiClickData) => {
    setInput((prev) => prev + emoji.emoji);
  };

  return (
    <div
      className={cn(
        "w-full rounded-md shadow-xl mb-4 pt-2 pb-2 border border-grey-300",
        className,
      )}
    >
      {/* file previews */}
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {files.map((file, idx) => (
            <div
              key={idx}
              className="relative w-20 h-20 rounded-lg overflow-hidden border"
            >
              {file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-100 text-xs text-gray-500">
                  {file.name.split(".").pop()}
                </div>
              )}
              <button
                onClick={() => handleFileRemove(idx)}
                className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1"
              >
                <FaTimes size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input bar */}
      <div className="flex items-center w-full px-4 py-2">
        {/* File Upload */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="ml-3 text-gray-500 hover:text-gray-700"
        >
          <FaFileUpload size={18} />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple
          onChange={handleFileSelect}
        />

        {/* Textarea */}
        <div className="relative flex-1 ml-3">
          <textarea
            ref={inputRef}
            rows={1}
            className="w-full resize-none border-none bg-transparent px-2 py-1 text-sm placeholder-gray-500 border-transparent focus:border-transparent focus:ring-0"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleCommentSubmit();
              }
            }}
          />

          {/* Mentions/Hashtags Dropdown */}
          {open && (matchedUsers.length > 0 || matchedTags.length > 0) && (
            <div className="absolute bottom-full mb-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
              <ul className="max-h-48 overflow-y-auto">
                {matchedUsers.map((user) => (
                  <li
                    key={user}
                    className="px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => {
                      const words = input.split(/\s/);
                      words[words.length - 1] = `@${user}`;
                      setInput(words.join(" ") + " ");
                      setOpen(false);
                    }}
                  >
                    <span className="font-medium text-blue-600">@{user}</span>
                  </li>
                ))}
                {matchedTags.map((tag) => (
                  <li
                    key={tag}
                    className="px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => {
                      const words = input.split(/\s/);
                      words[words.length - 1] = `#${tag}`;
                      setInput(words.join(" ") + " ");
                      setOpen(false);
                    }}
                  >
                    <span className="font-medium text-blue-600">#{tag}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Emoji */}
        <div className="relative ml-2" ref={emojiRef}>
          <FaSmile
            className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={() => setShowEmoji((prev) => !prev)}
          />
          {showEmoji && (
            <div className="absolute bottom-full right-0 mb-2 shadow-lg rounded-xl overflow-hidden z-50">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>

        {/* Send */}
        <IoSend
          className="w-6 h-6 text-[#20ECA7] cursor-pointer ml-3 hover:scale-110 transition"
          onClick={handleCommentSubmit}
        />
      </div>
    </div>
  );
};

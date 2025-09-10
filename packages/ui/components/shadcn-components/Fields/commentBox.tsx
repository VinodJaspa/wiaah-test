import { useState, useRef, useEffect } from "react";
import { FaRegSmile } from "react-icons/fa";
import { FiImage } from "react-icons/fi";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Button } from "ui"; // or your shadcn Button

interface CommentInputBoxProps {
  onSend: (msg: string) => void;
  placeholder?: string;
  replyUser?: { username: string } | null; // 👈 new prop
}

export default function CommentInputBox({
  onSend,
  placeholder = "Write a reply...",
  replyUser,
}: CommentInputBoxProps) {
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null); // 👈 for auto-focus

  // If replyUser changes → auto prepend + focus
  useEffect(() => {
    if (replyUser) {
      // replyUser={replyUser?.username} 
      setMessage(`@${replyUser?.username} `);
      inputRef.current?.focus(); // 👈 focus input
    }
  }, [replyUser]);

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prev) => prev + emojiData.emoji);
    setShowEmoji(false);
  };

  const handleImageClick = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected image:", file);
      // 👉 upload logic here
    }
  };

  return (
    <div className="relative mt-3 bg-gray-50 border rounded-lg shadow-sm outline-none px-2">
      <div className="flex items-center p-2">
        {/* Input */}
        <input
          ref={inputRef} // 👈 attach ref
          type="text"
          placeholder={placeholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 outline-none bg-transparent px-2 text-sm border-none focus:ring-0"
        />

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
        />

        {/* Icons */}
        <div className="flex items-center space-x-2 text-gray-500">
          <button
            type="button"
            onClick={handleImageClick}
            className="p-1 hover:text-gray-700"
          >
            <FiImage size={18} />
          </button>

          <button
            type="button"
            onClick={() => setShowEmoji(!showEmoji)}
            className="p-1 hover:text-gray-700"
          >
            <FaRegSmile size={18} />
          </button>
        </div>

        {/* Send Button */}
        <Button
          onClick={handleSend}
          className="ml-2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium hover:bg-blue-600 transition"
        >
          Send
        </Button>
      </div>

      {/* Emoji Picker */}
      {showEmoji && (
        <div className="absolute bottom-12 right-4 z-50">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
}

"use client";
import { useState, useRef } from "react";
import { FaRegSmile } from "react-icons/fa";
import { FiImage, FiMic } from "react-icons/fi";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

export default function ChatInputBox({ onSend }: { onSend: (msg: string) => void }) {
    const [message, setMessage] = useState("");
    const [showEmoji, setShowEmoji] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isRecording, setIsRecording] = useState(false);

    // Send message
    const handleSend = () => {
        if (!message.trim()) return;
        onSend(message); // send message to parent
        setMessage("");
    };

    // Upload image
    const handleImageClick = () => fileInputRef.current?.click();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) console.log("Selected image:", file);
    };

    // Emoji picker
    const handleEmojiClick = (emojiData: EmojiClickData) => {
        setMessage((prev) => prev + emojiData.emoji);
        setShowEmoji(false);
    };

    // Voice recording toggle
    const handleMicClick = () => {
        setIsRecording((prev) => {
            if (prev) console.log("Stopped recording");
            else console.log("Started recording...");
            return !prev;
        });
    };

    return (
        <div className="bg-white border-t pt-2 rounded-sm shadow-md pb-2">
            <div className="flex items-center border-b rounded-md p-2 w-full bg-white">
                {/* Input field */}
                <input
                    type="text"
                    placeholder="Write a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()} // Send on Enter
                    className="flex-1 outline-none px-2 text-sm border-transparent focus:border-transparent focus:ring-0"
                />

                {/* Icons */}
                <div className="flex items-center space-x-2 text-gray-500">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                    />
                    <button type="button" onClick={handleImageClick} className="p-1 hover:text-gray-700">
                        <FiImage size={18} />
                    </button>

                    <button type="button" onClick={() => setShowEmoji(!showEmoji)} className="p-1 hover:text-gray-700">
                        <FaRegSmile size={18} />
                    </button>

                    <button
                        type="button"
                        onClick={handleMicClick}
                        className={`p-1 ${isRecording ? "text-red-500" : "hover:text-gray-700"}`}
                    >
                        <FiMic size={18} />
                    </button>
                </div>

                {/* Send button */}
                <button
                    onClick={handleSend}
                    className="ml-2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium hover:bg-blue-600 transition"
                >
                    Send
                </button>
            </div>

            {/* Emoji Picker */}
            {showEmoji && (
                <div className="absolute bottom-14 right-10">
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
            )}
        </div>
    );
}

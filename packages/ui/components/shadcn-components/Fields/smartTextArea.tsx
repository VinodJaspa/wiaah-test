import React, { useState, useRef } from "react";

const mentionsMock = ["john_doe", "jane_smith", "vinod_jaspa"];
const hashtagsMock = ["ReactJS", "Tailwind", "OpenAI", "NextJS"];

const SmartTextarea: React.FC<{
  value: string;
  onChange: (val: string) => void;
}> = ({ value, onChange }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [trigger, setTrigger] = useState<"mention" | "hashtag" | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    onChange(text);

    // find cursor position
    const cursorPos = e.target.selectionStart;
    const textUntilCursor = text.slice(0, cursorPos);
    const match = /(^|\s)([@#])(\w*)$/.exec(textUntilCursor);

    if (match) {
      const triggerType = match[2] === "@" ? "mention" : "hashtag";
      setTrigger(triggerType);

      const query = match[3].toLowerCase();
      const list =
        triggerType === "mention"
          ? mentionsMock.filter((m) => m.toLowerCase().includes(query))
          : hashtagsMock.filter((h) => h.toLowerCase().includes(query));

      setSuggestions(list);
    } else {
      setSuggestions([]);
      setTrigger(null);
    }
  };

  const handleSelect = (item: string) => {
    if (!textareaRef.current) return;

    const cursorPos = textareaRef.current.selectionStart;
    const textBefore = value.slice(0, cursorPos);
    const textAfter = value.slice(cursorPos);

    const updated =
      textBefore.replace(/[@#]\w*$/, (match) => {
        return (match.startsWith("@") ? "@" : "#") + item + " ";
      }) + textAfter;

    onChange(updated);
    setSuggestions([]);
    setTrigger(null);

    setTimeout(() => {
      textareaRef.current!.focus();
    }, 0);
  };

  return (
    <div className="relative w-full">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        className="w-full border h-24 rounded-xl p-2 text-sm text-gray-800 border-transparent focus:border-transparent  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        placeholder="Share your thoughts within 4000 characters"
      />
      {suggestions.length > 0 && (
        <ul className="absolute left-0 top-full mt-1 bg-white border border-gray-200 shadow-lg rounded-lg w-56 max-h-48 overflow-auto z-50">
          {suggestions.map((s, idx) => (
            <li
              key={idx}
              className="px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors"
              onClick={() => handleSelect(s)}
            >
              {trigger === "mention" ? (
                <span className="font-medium text-blue-600">@{s}</span>
              ) : (
                <span className="font-medium text-blue-600">#{s}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SmartTextarea;

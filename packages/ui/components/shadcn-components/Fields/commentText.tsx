import Link from "next/link";
import React from "react";

interface CommentTextProps {
  content: string;
  onMentionClick?: (mention: string) => void;
  onHashtagClick?: (hashtag: string) => void;
}

const CommentText: React.FC<CommentTextProps> = ({
  content,
  onMentionClick,
  onHashtagClick,
}) => {
  const renderProcessedContent = () => {
    return content.split(" ").map((word, index, arr) => {
      if (word.startsWith("@")) {
        return (
          <span
            key={`mention-${index}`}
            className="text-blue-500 font-medium cursor-pointer hover:underline"
            onClick={() => onMentionClick?.(word.slice(1))}
          >
            {word}
            {index !== arr.length - 1 ? " " : ""}
          </span>
        );
      }
      if (word.startsWith("#")) {
        return (
          <span
            key={`hashtag-${index}`}
            className="text-primary font-medium cursor-pointer hover:underline"
            onClick={() => onHashtagClick?.(word.slice(1))}
          >
            {word}
            {index !== arr.length - 1 ? " " : ""}
          </span>
        );
      }
      return (
        <React.Fragment key={`text-${index}`}>
          {word}
          {index !== arr.length - 1 ? " " : ""}
        </React.Fragment>
      );
    });
  };

  return (
    <p className="text-sm text-gray-900 break-words">
      {renderProcessedContent()}
    </p>
  );
};

export default CommentText;

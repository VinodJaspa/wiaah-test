// components/Subtitle.tsx
import React from "react";

interface SubtitleProps {
  children: React.ReactNode;
  className?: string;
}

const Subtitle: React.FC<SubtitleProps> = ({ children, className = "" }) => {
  return (
    <h2 className={`text-sm font-semibold text-gray-900 mb-1 ${className}`}>
      {children}
    </h2>
  );
};

export default Subtitle;

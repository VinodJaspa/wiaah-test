// components/SectionTitle.tsx
import React from "react";

interface SectionTitleProps {
  title: string;
  className?: string; // optional for overrides
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, className = "" }) => {
  return (
    <h1 className={`text-md word-break font-bold text-gray-900 ${className}`}>
      {title}
    </h1>
  );
};

export default SectionTitle;

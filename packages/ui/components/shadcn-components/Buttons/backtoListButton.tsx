import React from "react";
import { HiArrowLeft } from "react-icons/hi"; // Heroicons style arrow

interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, label = "Back to List" }) => {
  return (
    <div className="flex justify-end w-full mb-2">
      <button
        onClick={onClick}
        className="flex items-center gap-1 text-sm text-blue-600 hover:underline transition"
      >
        <HiArrowLeft className="text-base" />
        {label}
      </button>
    </div>
  );
};

export default BackButton;

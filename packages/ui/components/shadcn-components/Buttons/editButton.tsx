import React from "react";
import { FiEdit2 } from "react-icons/fi";

interface EditButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
}

const EditButton: React.FC<EditButtonProps> = ({
  onClick,
  label = "Edit",
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-1 
        text-sm text-black
        bg-gray-100 hover:bg-gray-200 
        px-2 py-1 rounded 
        transition duration-200 
        ${className}
      `}
    >
      <FiEdit2 className="text-base" />
      {label}
    </button>
  );
};

export default EditButton;

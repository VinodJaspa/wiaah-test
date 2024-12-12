import React from "react";

interface HoverOverlayProps {
  children: React.ReactNode;
  onButtonClick?: () => void;
}

export const MarkdetServiceSearchHoverOverlay: React.FC<HoverOverlayProps> = ({
  children,
  onButtonClick,
}) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
        <button
          onClick={onButtonClick}
          className="px-4 py-2 text-white bg-primary rounded-md hover:bg-green-500 rounded-lg"
        >
          Details
        </button>
      </div>
    </div>
  );
};

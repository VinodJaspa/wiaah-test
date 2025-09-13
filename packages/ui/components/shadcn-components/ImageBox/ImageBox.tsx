import React from "react";

interface ImageBoxProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ImageBox({ src, alt, className = "" }: ImageBoxProps) {
  return (
    <div
      className={`w-12 h-12 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center shadow-sm ring-1 ring-gray-300 ${className}`}
    >
      <img src={src} alt={alt} className="w-8 h-8 object-contain" />
    </div>
  );
}

import React from "react";

export default function ImageTopbadge({ text }: { text: string }) {
  return (
    <div className="absolute top-0 left-0 min-w-[100px] px-3 bg-black/50 text-white text-center text-sm font-semibold py-2 rounded-lg">
      {text}
    </div>
  );
}

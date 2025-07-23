// components/IconBox.tsx
import React from "react";

interface IconBoxProps {
  icon: React.ReactNode;
}

export default function IconBox({ icon }: IconBoxProps) {
  return (
    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
      {icon}
    </div>
  );
}

import React from "react";

interface IconTextRowProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function IconTextRow({ icon, title, subtitle }: IconTextRowProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
        {icon}
      </div>
      <div className="text-sm">
        <p className="text-gray-900 font-medium">{title}</p>
        {subtitle && <p className="text-gray-600">{subtitle}</p>}
      </div>
    </div>
  );
}

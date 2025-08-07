import React from "react";
import SharedLabel from "../shadcn-components/Fields/SharedLabel";
import Subtitle from "../shadcn-components/Title/Subtitle";
import { User } from "lucide-react"; // 👈 import your desired icon

export default function AccountOverview() {
  return (
    <div className="flex items-center justify-between py-2 border-b">
      <div className="flex items-center space-x-2">
        <User className="w-5 h-5 text-muted-foreground" /> {/* 👈 icon added */}

        <div className="text-sm text-gray-500">Account Overview</div>
      </div>
    </div>
  );
}

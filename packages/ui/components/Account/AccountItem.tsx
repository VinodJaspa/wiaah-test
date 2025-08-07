// components/Account/AccountItem.tsx
import { ReactNode } from "react";
import Subtitle from "../shadcn-components/Title/Subtitle";
import { InfoText } from "../shadcn-components";

interface AccountItemProps {
  icon: ReactNode;
  label: string;
  value: string;
  onEdit?: () => void;
}

export default function AccountItem({ icon, label, value, onEdit }: AccountItemProps) {
  return (
    <div className="flex items-start justify-between py-2 border-b">
      <div className="flex items-center gap-3">
        <div className="text-gray-600">{icon}</div>
        <div>
          <InfoText text={label}>
   
          </InfoText>
          {/* <div className="text-sm font-medium"></div> */}
          <div className="text-sm text-gray-500">{value}</div>
        </div>
      </div>
      {onEdit && (
        <button
          onClick={onEdit}
          className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
        >
          Edit
        </button>
      )}
    </div>
  );
}

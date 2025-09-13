import Subtitle from "../shadcn-components/Title/Subtitle";

// components/Account/DataManagementItem.tsx
interface DataItemProps {
    label: string;
    description: string;
    actionLabel: string;
    onAction: () => void;
  }
  
  export default function DataManagementItem({ label, description, actionLabel, onAction }: DataItemProps) {
    return (
      <div className="flex items-center justify-between py-2 border-b">
        <div>
          <Subtitle>{label}</Subtitle>
          <div className="text-sm text-gray-500">{description}</div>
        </div>
        <button
          onClick={onAction}
          className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
        >
          {actionLabel}
        </button>
      </div>
    );
  }
  
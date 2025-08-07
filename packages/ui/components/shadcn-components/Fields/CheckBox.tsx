import React from "react";

interface ChecklistProps {
  options: string[];
  selected: string[];
  onChange: (feature: string, checked: boolean) => void;
}

const CheckBoxlist: React.FC<ChecklistProps> = ({ options, selected, onChange }) => {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-4 p-4 border border-blue-500 rounded-md">
      {options.map((feature) => (
        <React.Fragment key={feature}>
          <span className="text-base text-gray-800">{feature}</span>
          <input
            type="checkbox"
            className="form-checkbox w-5 h-5 text-blue-600"
            checked={selected.includes(feature)}
            onChange={(e) => onChange(feature, e.target.checked)}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default CheckBoxlist;

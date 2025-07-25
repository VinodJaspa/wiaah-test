// components/FilterDropdown.tsx
import { Menu } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

interface FilterDropdownProps {
  title: string;
  options: string[];
  onSelect: (value: string) => void;
}

export const FilterDropdown = ({ title, options, onSelect }: FilterDropdownProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex justify-center rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-slate-200">
        {title}
        <ChevronDown className="ml-2 h-4 w-4" />
      </Menu.Button>

      <Menu.Items className="absolute left-0 mt-2 w-44 origin-top-left rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
        {options.map((option) => (
          <Menu.Item key={option}>
            {({ active }) => (
              <button
                onClick={() => onSelect(option)}
                className={`${
                  active ? "bg-gray-100" : ""
                } block w-full px-4 py-2 text-sm text-gray-700 text-left`}
              >
                {option}
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};

import React from "react";

type SectionTabsProps = {
  tabList: string[];
  activeTab: number;
  setActiveTab: (index: number) => void;
};

export default function SectionTabs({
  tabList,
  activeTab,
  setActiveTab,
}: SectionTabsProps) {
  return (
    <div className="flex space-x-6 border-b border-gray-200 mb-6">
      {tabList?.map((tab, idx) => (
        <button
          key={idx}
          onClick={() => setActiveTab(idx)}
          className={`py-2 text-sm font-medium transition-all ${
            idx === activeTab
              ? "border-b-2 border-black text-black"
              : "text-gray-500 hover:text-black"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

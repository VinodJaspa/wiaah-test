import React, { useState } from "react";

type TabHighlighterProps = {
  tabsTitles: string[];
};

export const TabHighlighter: React.FC<TabHighlighterProps> = ({
  tabsTitles,
}) => {
  const [selectedTab, setSelectedTab] = useState<string | null>(null);

  const handleClick = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div className="tabs">
      {tabsTitles.map((tab, index) => (
        <div
          key={index}
          onClick={() => handleClick(tab)}
          className={`border-darkerGray border-b border-b-transparent hover:border-b-darkerGray px-6 py-2 ${selectedTab === tab ? "border-t border-l border-r font-bold" : ""
            }`}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

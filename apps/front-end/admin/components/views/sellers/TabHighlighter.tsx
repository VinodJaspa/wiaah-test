import React from "react";

export const TabHighlighter = ({ tabsTitles }) => {
  const [selectedTab, setSelectedTab] = React.useState<string | null>(null);

  const handleClick = (index: string) => {
    setSelectedTab(index);
  };

  return (
    <div className="tabs">
      {tabsTitles.map((v: string, i: number) => (
        <div
          key={i}
          onClick={() => handleClick(v)}
          className={`border-darkerGray border-b border-b-transparent hover:border-b-darkerGray px-6 py-2 ${
            selectedTab === v ? "border-t border-l border-r font-bold" : ""
          }`}
        >
          {v}
        </div>
      ))}
    </div>
  );
};

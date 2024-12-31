import { FlagIcon } from "ui";
import React from "react";

export const LanguageSelector = ({
  WiaahLanguageCountriesIsoCodes,
}: {
  WiaahLanguageCountriesIsoCodes: string[];
}) => {
  const [selectedLang, setSelectedLang] = React.useState<string | null>(null);

  const handleClick = (v: string) => {
    setSelectedLang(v);
  };

  return (
    <div className="language-selector flex">
      {WiaahLanguageCountriesIsoCodes.map((v: string, i: number) => (
        <div
          key={i}
          onClick={() => handleClick(v)}
          className={`px-8 py-2 ${selectedLang === v ? "border-2 border-gray-300 border-b-white" : ""
            }`}
        >
          <FlagIcon code={v} />
        </div>
      ))}
    </div>
  );
};

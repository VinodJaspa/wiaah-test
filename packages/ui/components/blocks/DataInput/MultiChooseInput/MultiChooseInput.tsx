import React from "react";
import { useTranslation } from "react-i18next";
import { CloseIcon, InputGroup, InputSuggestions, Input, HStack } from "@UI";
import { FilterAndAddToArray } from "utils";

export interface MultiChooseInputProps {
  onChange?: (selected: string[]) => any;
  value?: string[];
  suggestions?: string[];
  placeholder?: string;
}

export function MultiChooseInput({
  onChange,
  value = [],
  suggestions = [],
  placeholder,
}: MultiChooseInputProps) {
  const { t } = useTranslation();
  const [inputValue, setInputInputValue] = React.useState<string>("");

  function resetSearch() {
    setInputInputValue("");
  }

  function addItem(item: string) {
    if (item.length < 1) return;
    onChange && onChange(FilterAndAddToArray(value, item, "exclude"));
    resetSearch();
  }

  function removeItem(item: string) {
    onChange && onChange(value.filter((i) => i !== item));
  }
  return (
    <InputGroup className="border rounded p-1 border-gray-300">
      <label className="flex flex-wrap gap-2 w-full">
        {value.map((item, i) => (
          <span
            key={i + 1}
            className="bg-primary rounded py-1 h-8 text-white flex gap-2 px-2 items-center"
          >
            <p className="whitespace-nowrap">{t(item)}</p>
            <CloseIcon
              onClick={() => removeItem(item)}
              className="bg-green-800 rounded-full cursor-pointer"
            />
          </span>
        ))}

        <Input
          placeholder={placeholder}
          className="h-[2rem] border-none w-[fit-content]"
          onKeyDown={(e) => {
            e.code === "Enter" ? addItem(inputValue) : null;
          }}
          onChange={(e) => setInputInputValue(e.target.value)}
          value={inputValue}
        />
      </label>
      <InputSuggestions>
        <div className="flex flex-col">
          {Array.isArray(suggestions) ? (
            suggestions.map((item, i) => (
              <p
                onClick={() => addItem(item)}
                className="p-2 w-full cursor-pointer hover:bg-gray-200 bg-white"
                key={i}
              >
                {item}
              </p>
            ))
          ) : (
            <p className="font-bold p-2">{t("No suggestions found")}</p>
          )}
        </div>
      </InputSuggestions>
    </InputGroup>
  );
}

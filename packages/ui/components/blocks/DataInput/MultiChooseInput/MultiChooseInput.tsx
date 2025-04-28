import React from "react";
import { useTranslation } from "react-i18next";
import { CloseIcon, InputGroup, InputSuggestions, Input, HStack } from "@UI";
import { FilterAndAddToArray } from "utils";

export interface MultiChooseInputProps {
  onChange?: (selected: string[]) => any;
  value?: string[];
  suggestions?: string[] | { label: string; value: string | number }[];
  placeholder?: string;
}

export function MultiChooseInput({
  onChange,
  value = [],
  suggestions = [],
  placeholder,
}: MultiChooseInputProps) {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const [inputValue, setInputInputValue] = React.useState<string>("");

  function resetSearch() {
    setInputInputValue("");
  }

  function addItem(item: string | number) {
    item = typeof item === "number" ? JSON.stringify(item) : item;

    if (item.length < 1) return;

    onChange && onChange(FilterAndAddToArray(value, item, "exclude"));
    resetSearch();
  }

  function removeItem(item: string) {
    onChange && onChange(value.filter((i) => i !== item));
  }
  return (
    <InputGroup className="border rounded p-1 w-full border-gray-300">
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

        <div className="w-48">
          <Input
            placeholder={placeholder}
            className="h-[2rem] border-none"
            onKeyDown={(e) => {
              e.code === "Enter" ? addItem(inputValue) : null;
            }}
            onChange={(e) => setInputInputValue(e.target.value)}
            value={inputValue}
          />
        </div>
      </label>
      <InputSuggestions>
        <div className="flex flex-col">
          {Array.isArray(suggestions) ? (
            suggestions.map((item, i) => (
              <p
                onClick={() =>
                  addItem(typeof item === "string" ? item : item.value)
                }
                className="p-2 w-full cursor-pointer hover:bg-gray-200 bg-white"
                key={i}
              >
                {typeof item === "string" ? item : item.label}
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

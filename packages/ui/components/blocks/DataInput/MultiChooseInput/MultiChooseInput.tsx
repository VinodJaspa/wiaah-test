import React from "react";
import { useTranslation } from "react-i18next";
import { CloseIcon, InputGroup, InputSuggestions, Input, HStack } from "ui";
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
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (Array.isArray(value)) {
      setSelectedItems(value);
    }
  }, [value]);

  React.useEffect(() => {}, [selectedItems]);

  function resetSearch() {
    setInputInputValue("");
  }

  function addItem(item: string) {
    if (item.length < 1) return;
    onChange && onChange(FilterAndAddToArray(selectedItems, item, "exclude"));
    resetSearch();
  }

  function removeItem(item: string) {
    setSelectedItems((state) => state.filter((i) => i !== item));
  }
  return (
    <InputGroup>
      <div className="flex flex-wrap gap-2">
        {selectedItems.map((item, i) => (
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

        <HStack>
          <Input
            placeholder={placeholder}
            className="h-[2rem]"
            onKeyDown={(e) => {
              e.code === "Enter" ? addItem(inputValue) : null;
            }}
            onChange={(e) => setInputInputValue(e.target.value)}
            value={inputValue}
          />
        </HStack>
      </div>
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

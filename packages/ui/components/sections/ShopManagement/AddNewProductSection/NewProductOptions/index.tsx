import React from "react";
import { useTranslation } from "react-i18next";
import { IoMdCheckmark } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { FormOptWithCompType } from "types";
import {
  Select,
  DropdownPanel,
  TranslationText,
  Checkbox,
  SelectOption,
} from "@UI";

export interface ProductOptionsProps {}

export const ProductOptions: React.FC<ProductOptionsProps> = () => {
  const [selectedOptions, setSelectedOptions] = React.useState<
    FormOptWithCompType<string[]>[]
  >([]);
  const { t } = useTranslation();
  function addOption(opt: number) {
    if (typeof opt !== "number") return;
    const option = options[opt];
    if (!option) return;
    setSelectedOptions((state) => [...state, option]);
  }

  function removeOption(optIdx: number) {
    setSelectedOptions((state) => state.filter((_, i) => i !== optIdx));
  }

  return (
    <div className="py-4 flex flex-col gap-4">
      {selectedOptions.map((opt, i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className="bg-gray-200 w-full px-4 py-2 flex justify-between">
            <IoMdCheckmark />
            <TranslationText translationObject={opt.name} />
            <MdClose
              onClick={() => removeOption(i)}
              className="cursor-pointer"
            />
          </div>
          {opt.component({ onData: (data) => {} })}
        </div>
      ))}
      <Select
        className="w-full min-w-32"
        placeholder={"+" + t("add_option", "Add Option")}
        onOptionSelect={(v) => addOption(parseInt(v))}
      >
        {options.map((opt, i) => (
          <SelectOption value={i} key={opt.value + i}>
            <TranslationText translationObject={opt.name} />
          </SelectOption>
        ))}
      </Select>
    </div>
  );
};

const options: FormOptWithCompType<string[]>[] = [
  {
    name: {
      translationKey: "colors",
      fallbackText: "Colors",
    },
    value: "colors",
    component: () => {
      const { t } = useTranslation();
      const [checked, setChecked] = React.useState<boolean>(false);
      return (
        <DropdownPanel className="w-[100%]" name={t("colors", "Colors")}>
          {colors.map((color, i) => (
            <div key={color + i} className="flex gap-4">
              <Checkbox
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
              <span
                style={{ backgroundColor: color }}
                className={`w-8 h-8]`}
              ></span>
            </div>
          ))}
        </DropdownPanel>
      );
    },
  },
  {
    name: {
      translationKey: "sizes",
      fallbackText: "Sizes",
    },
    value: "sizes",
    component: () => {
      const [checked, setChecked] = React.useState<boolean>(false);
      const { t } = useTranslation();
      return (
        <DropdownPanel className="w-[100%]" name={t("sizes", "sizes")}>
          {sizes.map((size, i) => (
            <div key={size + i} className="flex gap-4">
              <Checkbox
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
              <span>{size}</span>
            </div>
          ))}
        </DropdownPanel>
      );
    },
  },
];

const sizes: string[] = ["small", "meduim", "large", "x-large", "xx-large"];

const colors: string[] = [
  "#2271B3",
  "#734222",
  "#9D9101",
  "#287233",
  "#B32821",
  "#5B3A29",
  "#6C3B2A",
  "#ED760E",
  "#C93C20",
  "#E7EBDA",
];

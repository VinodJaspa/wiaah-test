import React from "react";
import { useTranslation } from "react-i18next";
import { HtmlSelectProps } from "types";
import { Category } from "types";
import { categories as categoriesPH, Select } from "ui";

export interface SubCategorySelectProps extends HtmlSelectProps {}

export const SubCategorySelect: React.FC<SubCategorySelectProps> = ({}) => {
  const [categories, setCategories] = React.useState<Category[]>(categoriesPH);
  const [selectedCategories, setSelectedCategories] = React.useState<
    Category[]
  >([]);

  const { t } = useTranslation();

  function handleAddCategory(cate: Category, position: number) {
    setSelectedCategories((state) => {
      const newState = state.slice(0, position);
      if (!cate) return newState;
      newState[position] = cate;

      return newState;
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <SelectOptions
        onSelection={(cate) => handleAddCategory(cate, 0)}
        placeholder={t("select_category", "Select Category")}
        categories={categories}
      />
      {selectedCategories.length > 0 ? (
        <>
          {selectedCategories.map((cate, i) => (
            <>
              {cate.subCategories.length > 0 ? (
                <SelectOptions
                  onSelection={(cate) => handleAddCategory(cate, i + 1)}
                  categories={cate.subCategories}
                  placeholder={t("select_sub_category", "Select Sub Category")}
                />
              ) : null}
            </>
          ))}
          {selectedCategories[-1] &&
          selectedCategories[-1].subCategories &&
          selectedCategories[-1].subCategories.length > 0 ? (
            <>
              <SelectOptions
                onSelection={(cate) =>
                  handleAddCategory(cate, selectedCategories.length)
                }
                categories={selectedCategories[-1].subCategories}
              />
            </>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

interface SelectOptionsProps extends Omit<HtmlSelectProps, "placeholder"> {
  categories: Category[];
  onSelection?: (category: Category) => any;
  placeholder?: string;
}

const SelectOptions: React.FC<SelectOptionsProps> = ({
  categories,
  onSelection,
  placeholder,
  ...props
}) => {
  const [value, setValue] = React.useState<string>("");
  const { t } = useTranslation();
  return (
    <Select
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        onSelection && onSelection(categories[parseInt(e.target.value)]);
      }}
      {...props}
    >
      <option value={undefined}>
        {placeholder ? placeholder : t("select", "Select")}
      </option>
      {categories.map((cate, i) => (
        <option value={i}>{cate.name}</option>
      ))}
    </Select>
  );
};

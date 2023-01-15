import React from "react";
import { useTranslation } from "react-i18next";
import { HtmlSelectProps } from "types";
import { Category } from "types";
import { categories as categoriesPH, Select, SelectOption } from "@UI";

export interface SubCategorySelectProps extends HtmlSelectProps {
  onCateSelection?: (cate: Category[]) => any;
  categories: Category[];
}

export const SubCategorySelect: React.FC<SubCategorySelectProps> = ({
  onCateSelection,
  categories,
}) => {
  const [selectedCategories, setSelectedCategories] = React.useState<
    Category[]
  >([]);

  React.useEffect(() => {
    onCateSelection && onCateSelection(selectedCategories);
  }, [selectedCategories]);

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
      placeholder={placeholder}
      onOptionSelect={(opt) => {
        setValue(opt);
        onSelection && onSelection(categories[parseInt(opt)]);
      }}
      // {...props}
    >
      {categories.map((cate, i) => (
        <SelectOption value={i}>{cate.name}</SelectOption>
      ))}
    </Select>
  );
};

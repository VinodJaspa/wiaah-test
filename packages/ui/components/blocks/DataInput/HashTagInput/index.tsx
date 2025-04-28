import { SearchFilterInput, useCursorScrollPagination } from "@UI";
import React from "react";
import { MdClose } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { mapArray } from "@UI/../utils/src";
import { useGetHashtagsQuery } from "@features/Hashtag/services/useGetHashtagsQuery";
import { twMerge } from "tailwind-merge";

export interface HashTagInputProps {
  onChange?: (HashTags: string[]) => any;
  value?: string[];
  label?: string;
  error?: string;
  className?: string;
}

export const HashTagInput: React.FC<HashTagInputProps> = ({
  onChange,
  value = [],
  className,
}) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const [searchValue, setValue] = React.useState<string>("");
  const { controls, getHasMore, getNextCursor, props } =
    useCursorScrollPagination({ take: 10 });
  const { data: hashtags } = useGetHashtagsQuery({
    args: { pagination: props },
  });

  function resetSearch() {
    setValue("");
  }

  function addHashTag(tag: string) {
    onChange && onChange([...value, tag]);
    resetSearch();
  }

  function removeHashTag(tag: string) {
    onChange && onChange(value.filter((Tag) => Tag !== tag));
  }
  return (
    <div
      className={twMerge(
        "border rounded-xl flex gap-2 items-center px-2 border-gray-300",
        className
      )}
    >
      {mapArray(value, (tag, i) => (
        <span
          key={tag + i}
          className="bg-primary rounded py-1 text-white h-fit flex gap-2 px-2 items-center"
        >
          <p className="whitespace-nowrap">#{tag}</p>
          <MdClose
            onClick={() => removeHashTag(tag)}
            className="bg-green-800 rounded-full cursor-pointer"
          />
        </span>
      ))}
      <SearchFilterInput
        controls={controls}
        placeholder={t("Add Hashtag")}
        value={searchValue}
        onChange={(e) => setValue(e.target.value)}
        className="border-none border-l-2 "
        onSelection={addHashTag}
        onKeyDown={(e) => {
          e.code === "Enter" ? addHashTag(searchValue) : "";
        }}
        components={mapArray(hashtags || [], ({ tag }, i) => ({
          name: `#${tag}`,
          comp: <p>#{tag}</p>,
          value: tag,
        }))}
      />
    </div>
  );
};

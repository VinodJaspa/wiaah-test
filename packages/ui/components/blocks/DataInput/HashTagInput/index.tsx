import { Input, SearchFilterInput } from "ui";
import React from "react";
import { MdClose } from "react-icons/md";
import { useTranslation } from "react-i18next";

export interface HashTagInputProps {}

export const HashTagInput: React.FC = ({}) => {
  const { t } = useTranslation();
  const [value, setValue] = React.useState<string>("");
  const [selectedhashTags, setSelectedHashTags] = React.useState<string[]>([]);

  function resetSearch() {
    setValue("");
  }

  function addHashTag(tag: string) {
    setSelectedHashTags((state) => [...state, tag]);
    resetSearch();
  }

  function removeHashTag(tag: string) {
    setSelectedHashTags((state) => state.filter((Tag) => Tag !== tag));
  }
  return (
    <div className="border-[1px] flex gap-2 items-center px-2 border-gray-300">
      {selectedhashTags.map((tag, i) => (
        <span className="bg-primary rounded py-1 text-white h-fit flex gap-2 px-2 items-center">
          <p className="whitespace-nowrap">#{tag}</p>
          <MdClose
            onClick={() => removeHashTag(tag)}
            className="bg-green-800 rounded-full cursor-pointer"
          />
        </span>
      ))}
      <SearchFilterInput
        placeholder={t("add_hashtag", "Add Hashtag")}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border-none border-l-2 "
        onSelection={addHashTag}
        components={hashtags.map((tag, i) => ({
          name: `#${tag}`,
          comp: <p>#{tag}</p>,
          value: tag,
        }))}
      />
    </div>
  );
};

const hashtags: string[] = [
  "mood",
  "fun",
  "gaming",
  "fashion",
  "testing",
  "development",
  "shopping",
];

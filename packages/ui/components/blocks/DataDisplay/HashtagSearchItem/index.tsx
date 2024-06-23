import { useTranslation } from "react-i18next";
import { HiHashtag } from "react-icons/hi";
import { NumberShortner } from "../../../helpers";
import { HtmlDivProps, SearchHashtagItem } from "types";

export interface HashTagSearchProps extends SearchHashtagItem {
  props?: HtmlDivProps;
}

export const HashTagSearchItem: React.FC<HashTagSearchProps> = ({
  hashtagName,
  hashtagViews,
  props,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex gap-2 items-cneter w-full justify-between" {...props}>
      <div className="flex items-center gap-4">
        <HiHashtag className="border-[1px] border-gray-300 rounded-full p-2 text-5xl" />
        <span className="font-bold">{hashtagName}</span>
      </div>
      <div className="flex items-center gap-2">
        <span>{NumberShortner(hashtagViews)}</span>
        <span>{t("views", "views").toString()}</span>
      </div>
    </div>
  );
};

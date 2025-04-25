
import Link from "next/link";
import { SearchLocalizationItem } from "types";
import { NumberShortner } from "../../../helpers";

export interface LocalizationSearchItemProps {
  location: SearchLocalizationItem;
}
export const LocalizationSearchItem: React.FC<LocalizationSearchItemProps> = ({
  location,
}) => {
  return (
    <div className="flex w-full justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="w-[48px] h-[48px] overflow-hidden rounded-full flex-shrink-0">
          <img
            src={location.image}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <Link href={`/localisation/${location.name}`}>{location.name}</Link>
      </div>
      <p className="text-lg font-medium">{NumberShortner(location.views)}</p>
    </div>
  );
};


import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { MdPlace } from "react-icons/md";
import { useQuery } from "react-query";
import { placesPH } from "ui/placeholder";
import { PlaceCardProps, ListWrapper, PlaceCard, ShadcnIcon } from "ui";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
export interface LocailisationsViewProps { }

export const LocalisationsView: React.FC<LocailisationsViewProps> = ({ }) => {
const { t } = useTranslation();
  
  const cols = useMediaQuery({ maxWidth: 767 }) ? 1 : useMediaQuery({ minWidth: 768, maxWidth: 1023 }) ? 2 : useMediaQuery({ minWidth: 1024 }) ? 3 : 1;

  const router = useRouter();
  const tag = router.query.tag as string;
  const formatCityName = (city: string): string => {
    return city
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const formattedCity = formatCityName(tag);

  const { data: places, isLoading } = useQuery<PlaceCardProps[]>(
    "localisations",
    () => {
      return placesPH;
    }
  );

  return (
    <div className="flex flex-col w-10/12 md:mt-0 mt-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-1 items-center">
          <Image
            alt="thumbnail"
            className="rounded-xl object-cover"
            height={80} 
            width={80} 
            src="/place-1.jpg"
          />
          <div className="flex justify-center items-center gap-2 font-bold text-lg">
            <ShadcnIcon as={MdPlace} className="text-xl" />

            <div className="flex items-center gap-1">
              <p className="text-black font-semibold">
                {formattedCity ? formattedCity : tag}
              </p>
              <p className="text-[#999999] ">(5.5m views) </p>
            </div>
          </div>
        </div>
        <button className="bg-[#3CD399] text-white px-[54px] py-[14px] font-semibold rounded-full">
          {t("follow", "follow")}
        </button>
      </div>
      <div className="h-px bg-gray-300 my-4" />
      {isLoading ? (
        <div className="flex justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
      ) : (
        <ListWrapper
          itemProps={{ className: "flex flex-col items-center" }}
          cols={cols}
        >
          {places &&
            places.map(({ openDays, openFrom, openTo, ...rest }, i) => (
              <PlaceCard fixedHeight="18rem" key={i} {...rest} />
            ))}
        </ListWrapper>
      )}
    </div>
  );
};

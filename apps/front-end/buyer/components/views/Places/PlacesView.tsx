
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineShop } from "react-icons/ai";
import { useQuery } from "react-query";
import { useMediaQuery } from "react-responsive";
import { PlaceCardProps, ListWrapper, PlaceCard } from "ui";
import { placesPH } from "ui/placeholder";

export const PlacesView: React.FC = () => {
  const isBase = useMediaQuery({ maxWidth: 767 });
  const isMd = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isLg = useMediaQuery({ minWidth: 1024 })
  const cols = isBase ? 1 : isMd ? 2 : isLg ? 3 : 1;
  const isMobile = useMediaQuery({ maxWidth: 767 });
 
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();


  const router = useRouter();
  const { tag } = router.query;
  const { data: places, isLoading } = useQuery<PlaceCardProps[]>(
    "places",
    async () => placesPH,
    {
      enabled: !!tag,
    }
  );

  return (
    <div className="flex flex-col my-8 w-full">
      <div className="flex px-4 justify-between w-full">
        {!isMobile && (
          <button className="invisible capitalize">
            {t("follow", "follow")}
          </button>
        )}
        <div className="flex items-center gap-4">
          <img
            alt="thumbnail"
            src="/place-1.jpg"
            className="h-12 w-auto rounded-xl object-cover"
          />
          <AiOutlineShop className="text-3xl" />
          <div className="flex flex-col items-center">
            <p className="font-bold text-xl">{tag}</p>
            <p className="font-bold text-lg">5.5m</p>
          </div>
        </div>
        <button className="capitalize">{t("follow", "follow")}</button>
      </div>

      <div className="border-t border-black my-4"></div>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin border-4 border-primary rounded-full w-8 h-8"></div>
        </div>
      ) : (
        <div className={`grid grid-cols-${cols} gap-4`}>
          {placesPH &&
            placesPH.map((place, i) => (
              <PlaceCard fixedHeight="17rem" key={i} {...place} />
            ))}
        </div>
      )}
    </div>

  );
};

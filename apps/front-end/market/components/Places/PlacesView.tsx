
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { MdPlace } from "react-icons/md";
import { ListWrapper, PlaceCard, PlaceCardProps, placesPlaceholder } from "ui";
import { placeCardPlaceholder } from "placeholder";
import { AiOutlineShop, AiFillShop } from "react-icons/ai";
import Image from "next/image";

const costumPH: PlaceCardProps[] = [
  {
    ...placeCardPlaceholder,
    placeAttachments: [
      {
        src: "/video.mp4",
        type: "video",
      },
    ],
  },
  {
    ...placeCardPlaceholder,
    placeAttachments: [
      {
        src: "/verticalImage.jpg",
        type: "image",
      },
    ],
  },
  {
    ...placeCardPlaceholder,
    placeAttachments: [
      {
        src: "/verticalVideo.mp4",
        type: "video",
      },
    ],
  },
];

const placesPH = [].concat(
  [...Array(9)].map(() => ({
    ...placeCardPlaceholder,
  }))
);

export interface PlaceViewProps {}

export const PlacesView: React.FC<PlaceViewProps> = ({}) => {
  const { t } = useTranslation();


  const router = useRouter();
  const { tag } = router.query;
  const { data: places, isLoading } = useQuery<PlaceCardProps[]>(
    ["places", tag],
    async () => placesPH,
    {
      enabled: !!tag,
    }
  );

  return (
    <div className="flex flex-col my-4">
      <div className="flex justify-between w-full">
        <button className="hidden capitalize">{t("follow", "follow")}</button>
        <div>
          <Image
            className="rounded-xl h-24 w-auto object-cover"
            src="/place-1.jpg"
            alt="place"
            width={100}
            height={100}
          />
          <AiOutlineShop className="text-2xl" />
          <h3 className="font-bold text-xl">{tag}</h3>
        </div>
        <button className="capitalize">{t("follow", "follow")}</button>
      </div>
      <div className="border border-black my-6" />
      <div>
        {placesPH &&
          placesPH.map((place, i) => (
            <PlaceCard fixedHeight="17rem" key={i} {...place} />
          ))}
      </div>
    </div>
  );
};

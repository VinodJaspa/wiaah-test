import {
  Button,
  Text,
  useBreakpointValue,
  Spinner,
  Center,
  Divider,
  Icon,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { MdPlace } from "react-icons/md";
import { ListWrapper, PlaceCard, PlaceCardProps, placesPlaceholder } from "ui";
import { placeCardPlaceholder } from "placeholder";

const randomNum = (max: number) => Math.floor(Math.random() * max);

const costumPH: PlaceCardProps[] = [];

const placesPH = costumPH.concat(
  [...Array(9)].map(() => ({
    ...placeCardPlaceholder,
  }))
);

export interface LocalisationViewProps { }

export const LocalisationView: React.FC<LocalisationViewProps> = ({ }) => {
  const { t } = useTranslation();
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });

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
      <div className="flex justify-center items-center w-full relative">
        <button className="hidden capitalize">{t("follow", "follow")}</button>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col items-between">
            <Image
              className="rounded-full h-20 object-cover w-20 "
              src={"/place-1.jpg"}
              width={200}
              height={200}
              alt=""
            />
            <h2 className="font-bold text-xl">{tag}</h2>
          </div>
          <p className="font-bold text-xl">{`${randomNum(500)}M ${t(
            "Views"
          )}`}</p>
        </div>
        <button className="capitalize absolute right-4">
          {t("follow", "follow")}
        </button>
      </div>
      <div className="border border-black my-2" />
      {isLoading ? (
        <Center>
          <p>...Loading</p>
        </Center>
      ) : (
        <div>
          {places &&
            places.map((place, i) => (
              <PlaceCard fixedHeight="18rem" key={i} {...place} />
            ))}
        </div>
      )}
    </div>
  );
};

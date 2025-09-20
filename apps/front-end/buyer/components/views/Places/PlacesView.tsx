
import { useResponsive } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineShop } from "react-icons/ai";
import { useQuery } from "react-query";
import { useRouting } from "routing";
import {
  PlaceCardProps,
  PlaceCard,
  ShowMapButton,
  HStack,
  Image,
  Button,
  Divider,
  ShadcnIcon,
} from "ui";
import { placesPH } from "ui/placeholder";

export const PlacesView: React.FC = () => {
  const { isMobile } = useResponsive();
const { t } = useTranslation();
  

  const { getParam } = useRouting();

  const place = getParam("place");

  const { data: places, isLoading } = useQuery<PlaceCardProps[]>(
    "places",
    async () => placesPH,
    {
      enabled: !!place,
    },
  );

  return (
    <div className="flex flex-col my-8">
      <HStack className="px-4 justify-between w-full">
        {!isMobile && (
          <div className="w-40">
            <ShowMapButton onClick={() => { }} />
          </div>
        )}
        <HStack>
          <Image
            className="rounded-xl h-12 w-auto object-cover"
            src="/place-1.jpg"
            alt="place"
          />
<ShadcnIcon as={AiOutlineShop} className="text-4xl" />

          <div className="flex flex-col items-center">
            <p className="font-bold text-xl">{place}</p>
            <p className="text-lg font-bold">5.5m</p>
          </div>
        </HStack>
        <Button className="capitalize">{t("follow", "follow")}</Button>
      </HStack>
      <Divider />
      {/* {isLoading ? (
        <Center>
          <Spinner colorScheme={"primary"} />
        </Center>
      ) : ( */}
      <div className="grid grid-cols-4 gap-4">
        {placesPH &&
          placesPH.map((place, i) => (
            <PlaceCard fixedHeight="17rem" key={i} {...place} />
          ))}
      </div>
      {/* )} */}
    </div>
  );
};

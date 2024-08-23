import {
  useBreakpointValue,
  Icon,
  Center,
  Spinner,
  Divider,
  Image,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { MdPlace } from "react-icons/md";
import { useQuery } from "react-query";
import { placesPH } from "ui/placeholder";
import { PlaceCardProps, ListWrapper, PlaceCard } from "ui";
export interface LocailisationsViewProps { }

export const LocalisationsView: React.FC<LocailisationsViewProps> = ({ }) => {
  const { t } = useTranslation();
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });

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
            rounded="xl"
            h="5rem"
            w="auto"
            objectFit="cover"
            src="/place-1.jpg"
          />
          <div className="flex justify-center items-center gap-2 font-bold text-lg">
            <Icon fontSize={"1.5em"} as={MdPlace} />
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
      <Divider borderColor={"#E4E4E4"} my="1rem" />
      {isLoading ? (
        <Center>
          <Spinner colorScheme={"primary"} />
        </Center>
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

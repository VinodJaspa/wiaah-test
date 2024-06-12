import {
  useBreakpointValue,
  Flex,
  HStack,
  Icon,
  Center,
  Spinner,
  Divider,
  Button,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { MdPlace } from "react-icons/md";
import { useQuery } from "react-query";
import { placesPH } from "ui/placeholder";
import { PlaceCardProps, ListWrapper, PlaceCard, GridWrapper } from "ui";
import { useResponsive } from "hooks";
export interface LocailisationsViewProps { }

export const LocalisationsView: React.FC<LocailisationsViewProps> = ({ }) => {
  const { t } = useTranslation();
  // const isMobile = useBreakpointValue({ base: true, sm: false });
  const cols = useBreakpointValue({ base: 3, md: 2, lg: 1 });
  const { isMobile, isTablet } = useResponsive();
  console.log("Screens   " + isMobile, isTablet);

  const router = useRouter();
  const { tag } = router.query;

  const { data: places, isLoading } = useQuery<PlaceCardProps[]>(
    "localisations",
    () => {
      return placesPH;
    }
  );

  return (
    <Flex
      direction={"column"}
      my="2rem"
      align={"center"}
      alignItems={"center"}
      justify={"center"}
      className="flex flex-col justify-center items-center"
    >
      <HStack px="" justify={"space-between"} align={"center"} w="100%">
        {isMobile ? (
          <Button visibility={"hidden"} textTransform={"capitalize"}>
            {t("follow", "follow")}
          </Button>
        ) : null}
        <HStack w="100%">
          <Image
            alt="place"
            rounded="xl"
            h="3rem"
            w="auto"
            objectFit="cover"
            src="/place-1.jpg"
          />
          <Flex
            justify={"center"}
            w="100%"
            align={"center"}
            gap="0.5em"
            fontWeight={"bold"}
            fontSize={{ base: "lg", sm: "x-large" }}
            lineHeight={"1.3em"}
          >
            <Icon fontSize={"1.5em"} as={MdPlace} />

            <p>{tag}</p>
            <p className="font-bold text-lg">
              {"("}5.5m {t("Views")}
              {")"}
            </p>
          </Flex>
        </HStack>
        <Button textTransform={"capitalize"}>{t("follow", "follow")}</Button>
      </HStack>
      <Divider borderColor={"black"} my="1rem" />
      {isLoading ? (
        <Center>
          <Spinner colorScheme={"primary"} />
        </Center>
      ) : (
        <ListWrapper cols={isMobile ? 1 : 3}>
          {places &&
            places.map(({ openDays, openFrom, openTo, ...rest }, i) => (
              <PlaceCard fixedHeight="18rem" key={i} {...rest} />
            ))}
        </ListWrapper>
      )}
    </Flex>
  );
};

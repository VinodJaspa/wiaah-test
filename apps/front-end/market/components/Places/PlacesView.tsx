import {
  Flex,
  HStack,
  Button,
  Text,
  useBreakpointValue,
  Spinner,
  Center,
  Divider,
  Icon,
  Image,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { MdPlace } from "react-icons/md";
import { ListWrapper, PlaceCard, PlaceCardProps, placesPlaceholder } from "ui";
import { placeCardPlaceholder } from "placeholder";
import { AiOutlineShop, AiFillShop } from "react-icons/ai";

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
    <Flex direction={"column"} my="2rem">
      <HStack justify={"space-between"} w="100%">
        <Button visibility={"hidden"} textTransform={"capitalize"}>
          {t("follow", "follow")}
        </Button>
        <HStack>
          <Image
            rounded="xl"
            h="3rem"
            w="auto"
            objectFit="cover"
            src="/place-1.jpg"
          />
          <Icon fontSize={"xx-large"} as={AiOutlineShop} />
          <Text fontWeight={"bold"} fontSize="x-large">
            {tag}
          </Text>
        </HStack>
        <Button textTransform={"capitalize"}>{t("follow", "follow")}</Button>
      </HStack>
      <Divider borderColor={"black"} my="1rem" />
      {isLoading ? (
        <Center>
          <Spinner colorScheme={"primary"} />
        </Center>
      ) : (
        <ListWrapper cols={cols}>
          {placesPH &&
            placesPH.map((place, i) => (
              <PlaceCard fixedHeight="17rem" key={i} {...place} />
            ))}
        </ListWrapper>
      )}
    </Flex>
  );
};

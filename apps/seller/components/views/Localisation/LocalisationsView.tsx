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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { MdPlace } from "react-icons/md";
import { useQuery } from "react-query";
import { placesPH } from "ui/placeholder";
import { PlaceCardProps, ListWrapper, PlaceCard } from "ui";
export interface LocailisationsViewProps {}

export const LocalisationsView: React.FC<LocailisationsViewProps> = ({}) => {
  const { t } = useTranslation();
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  const router = useRouter();
  const { tag } = router.query;

  const { data: places, isLoading } = useQuery<PlaceCardProps[]>(
    "localisations",
    () => {
      return placesPH;
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
          <Icon fontSize={"xx-large"} as={MdPlace} />
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
          {places &&
            places.map((place, i) => (
              <PlaceCard fixedHeight="18rem" key={i} {...place} />
            ))}
        </ListWrapper>
      )}
    </Flex>
  );
};

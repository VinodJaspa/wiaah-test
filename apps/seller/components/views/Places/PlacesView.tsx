import {
  useBreakpointValue,
  Flex,
  HStack,
  Icon,
  Center,
  Spinner,
  Button,
  Divider,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineShop } from "react-icons/ai";
import { useQuery } from "react-query";
import { PlaceCardProps, ListWrapper, PlaceCard, ShowMapButton } from "ui";
import { placesPH } from "ui/placeholder";

export const PlacesView: React.FC = () => {
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const { t } = useTranslation();
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });

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
    <Flex direction={"column"} my="2rem">
      <HStack px="1rem" justify={"space-between"} w="100%">
        {!isMobile && (
          <div className="w-40">
            <ShowMapButton onClick={() => {}} />
          </div>
        )}
        <HStack>
          <Image
            rounded="xl"
            h="3rem"
            w="auto"
            objectFit="cover"
            src="/place-1.jpg"
          />
          <Icon fontSize={"xx-large"} as={AiOutlineShop} />
          <Flex direction={"column"} align="center">
            <Text fontWeight={"bold"} fontSize="x-large">
              {tag}
            </Text>
            <Text fontWeight={"bold"} fontSize="lg">
              5.5m
            </Text>
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

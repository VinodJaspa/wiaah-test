import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  FlexProps,
  HStack,
  Icon,
  Input,
  Text,
  useDimensions,
} from "@chakra-ui/react";
import React from "react";
import { HiDotsHorizontal, HiOutlineLink } from "react-icons/hi";
import { AffiliationOfferCardInfo } from "types/market/Social";
import { useDateDiff, useHandlePostSharing } from "@UI";
import { CommentsViewer, PostInteractions } from "@UI";
import { useTranslation } from "react-i18next";
import { PostAttachmentsViewer, PostInteractionsProps } from "@UI";

export interface SocialAffiliationCardProps extends AffiliationOfferCardInfo {
  showPostInteraction?: boolean;
  onCardClick?: (id: string) => any;
  innerProps?: FlexProps;
  interactionsProps?: Partial<PostInteractionsProps>;
}

export const SocialAffiliationCard: React.FC<SocialAffiliationCardProps> = ({
  affiliationLink,
  commission,
  createdAt,
  name,
  price,
  attachments,
  user,
  noOfComments,
  noOfLikes,
  comments = [],
  showComments,
  id,
  onCardClick,
  showPostInteraction = true,
  innerProps,
  interactionsProps,
}) => {
  const detailsRef = React.useRef(null);
  const detailsDimensions = useDimensions(detailsRef);
  const { handleShare } = useHandlePostSharing();
  const { t } = useTranslation();
  const { getSince } = useDateDiff({
    from: new Date(createdAt),
    to: new Date(),
  });

  const since = getSince();
  function handleCopyLink() {
    navigator.clipboard.writeText(affiliationLink);
  }

  return (
    <Flex
      {...innerProps}
      color="white"
      gap="1rem"
      rounded={"lg"}
      maxH="100%"
      maxW="100%"
      direction={"column"}
      bg="primary.main"
      p="1rem"
      data-testid="socialAffiliationContainer"
      onClick={() => onCardClick && onCardClick(id)}
    >
      <Box h="100%" pb="1rem">
        <Flex justify={"end"} w="100%">
          <Icon as={HiDotsHorizontal} fontSize="lg" />
        </Flex>
        <Flex
          justify={"space-between"}
          h="100%"
          gap="0.5rem"
          direction={"column"}
        >
          <Box>
            <HStack w="100%" justify={"space-between"}>
              <HStack>
                <Avatar
                  bgColor={"black"}
                  src={user.thumbnail}
                  name={user.name}
                />
                <Flex direction={"column"}>
                  <Text>{user.name}</Text>
                  <Text>
                    {since.value} {since.timeUnit}
                  </Text>
                </Flex>
              </HStack>
              <Button
                _focus={{ ring: "0px" }}
                textTransform={"capitalize"}
                bgColor={"primary.main"}
                colorScheme={"primary"}
                pr="0px"
              >
                {t("folow", "follow")}
              </Button>
            </HStack>
            <Flex gap="0.25rem">
              <Text textTransform={"capitalize"}>{t("win", "win")}</Text>{" "}
              <Text>{commission}%</Text>
              <Text>
                {t(
                  "of_comission_by_affiliating_it",
                  "of commision by affiliating it"
                )}
              </Text>
            </Flex>
          </Box>
          <Flex
            bg="black"
            h={
              detailsDimensions
                ? `calc(100% - ${detailsDimensions.borderBox.height}px)`
                : "100%"
            }
            align="center"
            position={"relative"}
          >
            <PostAttachmentsViewer
              carouselProps={{ arrows: false }}
              attachments={attachments}
            />
            <Center
              position={"absolute"}
              bottom="0px"
              right="0px"
              px="1rem"
              py="0.5rem"
              bg="blackAlpha.600"
              color="white"
            >
              ${price.toFixed(2)}
            </Center>
          </Flex>
          <Flex
            ref={detailsRef}
            color="black"
            bg="white"
            gap="0.5rem"
            p="0.5rem"
            direction={"column"}
          >
            <Text fontWeight={"bold"}>{name}</Text>
            <Flex
              borderWidth={"0.5rem"}
              borderColor="primary.main"
              rounded={"xl"}
              align={"center"}
              h="3rem"
            >
              <Center
                h="100%"
                borderRightWidth={"1px"}
                borderColor="gray.200"
                px="1rem"
              >
                <Icon
                  color="gray"
                  cursor={"pointer"}
                  onClick={handleCopyLink}
                  fontSize="lg"
                  as={HiOutlineLink}
                />
              </Center>

              <Input
                border="none"
                w="100%"
                h="100%"
                value={affiliationLink}
                onChange={() => {}}
              />
            </Flex>

            {showPostInteraction && (
              <Box color="black" bg="white" px="1rem">
                <PostInteractions
                  {...interactionsProps}
                  comments={noOfComments}
                  onShare={(mothed) => handleShare(mothed, id)}
                  likes={noOfLikes}
                />
              </Box>
            )}
            {showComments && (
              <CommentsViewer maxInitailComments={4} comments={comments} />
            )}
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

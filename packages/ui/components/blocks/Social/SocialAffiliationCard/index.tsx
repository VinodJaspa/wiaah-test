import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { HiDotsHorizontal, HiOutlineLink } from "react-icons/hi";
import {
  PostAttachment as PostAttachmentType,
  PostComment,
  ProfileInfo,
  AffiliationOfferCardInfo,
} from "types/market/Social";
import { useDateDiff } from "ui/Hooks";
import { CommentsViewer, PostAttachment, PostInteractions } from "ui";
import { useTranslation } from "react-i18next";
import { ControlledCarousel } from "ui";

export interface SocialAffiliationCardProps extends AffiliationOfferCardInfo {}

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
}) => {
  const [active, setActive] = React.useState<number>(0);
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
      color="white"
      gap="1rem"
      rounded={"lg"}
      boxShadow={"main"}
      w="100%"
      direction={"column"}
      bg="primary.main"
    >
      <Box p="1rem">
        <Flex justify={"end"} w="100%">
          <Icon as={HiDotsHorizontal} fontSize="lg" />
        </Flex>
        <Flex gap="0.5rem" direction={"column"}>
          <HStack w="100%" justify={"space-between"}>
            <HStack>
              <Avatar bgColor={"black"} src={user.thumbnail} name={user.name} />
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
          <Box color="black">
            <Box position={"relative"}>
              {attachments && attachments.length > 1 ? (
                <ControlledCarousel
                  arrows={attachments.length > 1}
                  gap={32}
                  onCurrentActiveChange={setActive}
                >
                  {attachments.map((attachment, i) => (
                    <PostAttachment
                      play={i === active}
                      key={attachment.src + i}
                      type={attachment.type}
                      src={attachment.src}
                      alt={name}
                    />
                  ))}
                </ControlledCarousel>
              ) : (
                attachments &&
                attachments.length === 1 && (
                  <PostAttachment {...attachments[0]} alt={name} />
                )
              )}
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
            </Box>
            <Flex bg="white" gap="0.5rem" p="0.5rem" direction={"column"}>
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
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Box color="black" bg="white" px="1rem">
        <PostInteractions comments={noOfComments} likes={noOfLikes} />
        {showComments && (
          <CommentsViewer maxInitailComments={4} comments={comments} />
        )}
      </Box>
    </Flex>
  );
};

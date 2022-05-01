import {
  Button,
  Flex,
  FlexProps,
  HStack,
  Textarea,
  Icon,
  VStack,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { BiImage } from "react-icons/bi";
import { IoVideocamOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsEmojiSmile } from "react-icons/bs";
import { CgPlayButtonR } from "react-icons/cg";
import { Avatar } from "ui";

export interface SellerPostInputProps extends FlexProps {
  userPhotoSrc: string;
  userName: string;
  onPostSubmit?: (text: string) => any;
}

export const SellerPostInput: React.FC<SellerPostInputProps> = ({
  userName,
  userPhotoSrc,
  onPostSubmit,
}) => {
  const [value, setValue] = React.useState<string>("");
  const { t } = useTranslation();

  const handleSubmit = () => {
    onPostSubmit && onPostSubmit(value);
  };

  return (
    <VStack
      boxShadow={"md"}
      p="1rem"
      w="100%"
      gap="1rem"
      divider={<Divider opacity="1" />}
      direction={"column"}
    >
      <Flex w="100%" gap="1rem">
        <Avatar
          data-testid="UserImage"
          photoSrc={userPhotoSrc}
          name={userName}
        />
        <Textarea
          resize={"vertical"}
          minH="3rem"
          maxH={"10rem"}
          data-testid="PostInput"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          textTransform={"capitalize"}
          placeholder={t("write_something", "write something")}
        />
      </Flex>
      <HStack pl="0.5rem" w="100%" justify={"space-between"}>
        <HStack spacing="2rem" fontSize={"xl"}>
          <Icon
            cursor={"pointer"}
            fontSize={"x-large"}
            fill="crimson"
            data-testid="AttachPhotoBtn"
            as={BiImage}
          />
          <Icon
            cursor={"pointer"}
            fontSize={"x-large"}
            color="yellow.300"
            data-testid="AttachVideoBtn"
            as={IoVideocamOutline}
          />
          <Icon
            cursor={"pointer"}
            color="blue.500"
            data-testid="AddPostLocationBtn"
            as={HiOutlineLocationMarker}
          />
          <Icon
            data-testid="AddStatusBtn"
            cursor={"pointer"}
            fill="purple.600"
            as={BsEmojiSmile}
          />
          <Icon
            data-testid="AttachActionBtn"
            cursor={"pointer"}
            color="primary.main"
            as={CgPlayButtonR}
          />
        </HStack>
        <Button
          data-testid="SubmitBtn"
          onClick={handleSubmit}
          px="2rem"
          textTransform={"capitalize"}
        >
          {t("post", "post")}
        </Button>
      </HStack>
    </VStack>
  );
};

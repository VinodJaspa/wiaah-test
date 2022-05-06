import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalHeader,
  Flex,
  Textarea,
  HStack,
  Box,
  IconButton,
  Icon,
  Button,
  Input,
  Center,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { BiImageAlt } from "react-icons/bi";
import { IoVideocam } from "react-icons/io5";
import { Avatar, useNewStoryModal } from "ui";
import React from "react";
import { MdClose } from "react-icons/md";
import { useTranslation } from "react-i18next";

export interface AddNewStoryModalProps {}

const colors: string[] = [
  "red",
  "yellow",
  "purple",
  "green",
  "cyan",
  "gray",
  "lime",
  "orange",
];

export const AddNewStoryModal: React.FC<AddNewStoryModalProps> = () => {
  const { t } = useTranslation();
  const [SelectedColor, setSelectedColor] = React.useState<string>("");
  const { isOpen, closeNewStoryModal } = useNewStoryModal();
  const [imageFile, setImageFile] =
    React.useState<File | null | undefined>(null);
  const [videoFile, setVideoFile] = React.useState<File | null>(null);
  const imgRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    if (FileReader && imageFile && imgRef) {
      var fr = new FileReader();
      fr.onload = function () {
        imgRef.current?.src = fr.result;
      };
      fr.readAsDataURL(imageFile);
    }
  }, [imageFile]);

  return (
    <Modal size={"xl"} isCentered isOpen={isOpen} onClose={closeNewStoryModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Flex gap="2rem" w="100%" direction={"column"}>
            <Center position={"relative"} w="100%">
              <Avatar name="wiaah" size="lg" photoSrc="/wiaah_logo.png" />
              <IconButton
                onClick={closeNewStoryModal}
                p="0rem"
                position={"absolute"}
                right="0px"
                top="50%"
                transform={"auto"}
                translateY={"-50%"}
                variant="icon"
                fontSize={"xx-large"}
                colorScheme={"blackAlpha"}
                color="black"
                bgColor="transparent"
                aria-label="Close new post modal"
                icon={<Icon as={MdClose} />}
              />
            </Center>
            <Textarea
              h="15rem"
              w="100%"
              bgColor={SelectedColor}
              placeholder="type something cool to share"
            />

            <HStack
              w="100%"
              overflowX={"scroll"}
              className="no-scrollBar"
              spacing="1rem"
              justify={"space-between"}
            >
              {colors.map((color, i) => (
                <Box
                  onClick={() => setSelectedColor(color)}
                  cursor={"pointer"}
                  key={i}
                  p="1rem"
                  rounded="full"
                  bgColor={color}
                ></Box>
              ))}
            </HStack>
            <Flex w="100%" justify={"space-between"}>
              <HStack spacing="1rem">
                <label htmlFor="AddImageStoryInput">
                  <Icon
                    cursor={"pointer"}
                    fontSize={"x-large"}
                    fill="primary.main"
                    data-testid="AttachPhotoBtn"
                    as={BiImageAlt}
                  />
                  <Input
                    display={"none"}
                    id="AddImageStoryInput"
                    type={"file"}
                    onChange={(e) => setImageFile(e.target.files[0] || null)}
                    accept="image/png , image/jpeg , image/jpg"
                  />
                </label>
                <label htmlFor="AddVideoStoryInput">
                  <Input
                    display={"none"}
                    id="AddVideoStoryInput"
                    type={"file"}
                    onChange={(e) => setVideoFile(e.target.files[0] || null)}
                    accept="video/mp4 , video/gp3 , video/webm"
                  />
                  <Icon
                    cursor={"pointer"}
                    fontSize={"x-large"}
                    color="primary.main"
                    data-testid="AttachVideoBtn"
                    as={IoVideocam}
                  />
                </label>
              </HStack>
              <Button onClick={closeNewStoryModal} textTransform={"capitalize"}>
                {t("post", "post")}
              </Button>
            </Flex>
            <HStack maxH={"20rem"} justify={"center"} gap="2rem">
              {imageFile && (
                <Image
                  maxH={"100%"}
                  maxW="100%"
                  objectFit={"contain"}
                  ref={imgRef}
                />
              )}
            </HStack>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

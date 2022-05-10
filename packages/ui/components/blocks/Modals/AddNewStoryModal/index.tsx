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
import { useFileUploadModal, ImageUploadModal } from "ui";

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
  const { setUploadType, cancelUpload } = useFileUploadModal();
  const [imgSrc, setImgSrc] = React.useState<string | ArrayBuffer | null>(null);
  const [vidSrc, setVidSrc] = React.useState<string | ArrayBuffer | null>(null);

  const imgRef = React.useRef<HTMLImageElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef && videoRef.current) {
      try {
        console.log(vidSrc);
        //@ts-ignore
        videoRef.current.srcObject = vidSrc;
      } catch (error) {
        console.log("vid error", error);
      }
    }
  }, [vidSrc]);

  React.useEffect(() => {
    if (imgRef && imgRef.current) {
      try {
        //@ts-ignore
        imgRef.current.src = imgSrc;
      } catch (error) {
        console.log(error);
      }
    }
  }, [imgSrc]);

  function resetState() {
    setImgSrc(null);
    setVidSrc(null);
  }

  React.useEffect(() => {
    cancelUpload();
  }, [imgSrc, vidSrc]);

  const fileAdded = !!imgSrc || !!vidSrc;

  return (
    <Modal
      size={"xl"}
      onCloseComplete={resetState}
      isCentered
      isOpen={isOpen}
      onClose={closeNewStoryModal}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <ImageUploadModal setImgSrc={setImgSrc} setVidSrc={setVidSrc} />
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
                <Icon
                  cursor={fileAdded ? "grab" : "pointer"}
                  fontSize={"x-large"}
                  pointerEvents={fileAdded ? "none" : "all"}
                  fill="primary.main"
                  data-testid="AttachPhotoBtn"
                  as={BiImageAlt}
                  onClick={() => setUploadType("picture")}
                />
                <Icon
                  cursor={fileAdded ? "not-allowed" : "pointer"}
                  fontSize={"x-large"}
                  pointerEvents={fileAdded ? "none" : "all"}
                  color="primary.main"
                  data-testid="AttachVideoBtn"
                  as={IoVideocam}
                  onClick={() => setUploadType("video")}
                />
              </HStack>
              <Button onClick={closeNewStoryModal} textTransform={"capitalize"}>
                {t("post", "post")}
              </Button>
            </Flex>
            <HStack
              overflow={"hidden"}
              maxH={"40rem"}
              w="100%"
              justify={"center"}
              gap="2rem"
            >
              {imgSrc && (
                <Center w="100%" h="100%">
                  <Image
                    maxW="100%"
                    maxH={"100%"}
                    objectFit={"contain"}
                    ref={imgRef}
                  />
                </Center>
              )}

              {vidSrc && (
                <Center w="100%" h="100%">
                  <video
                    ref={videoRef}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Center>
              )}
            </HStack>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

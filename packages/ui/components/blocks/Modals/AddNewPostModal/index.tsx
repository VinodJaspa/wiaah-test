import {
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  VStack,
  SimpleGrid,
  Image,
  Center,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useFileUploadModal, useNewPost, MediaUploadModal } from "ui";
import { FloatingContainer, Avatar, useUserData } from "ui";
import { MdClose } from "react-icons/md";
import { BsEmojiSmile, BsPlayFill } from "react-icons/bs";
import { BiImage } from "react-icons/bi";
import { CgPlayButtonR } from "react-icons/cg";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoVideocamOutline } from "react-icons/io5";
import { getFileSrcData, FileRes } from "ui/components/helpers";

export interface AddNewPostModalProps {}

const MAX_UPLOAD_LIMIT = 5;

export const AddNewPostModal: React.FC<AddNewPostModalProps> = () => {
  const { isOpen, CloseModal } = useNewPost();
  const { setUploadType } = useFileUploadModal();
  const [uploadiLimitHit, setUploadLimitHit] = React.useState<boolean>(false);

  const [uploadedImages, setUploadedImages] = React.useState<FileRes[]>([]);
  const [uploadedVideos, setUploadedVideos] = React.useState<string[]>([]);
  const { user } = useUserData();
  const { t } = useTranslation();

  React.useEffect(() => {
    if (!isOpen) {
      cleanUpStates();
    }
  }, [isOpen]);

  function cleanUpStates() {
    setUploadLimitHit(false);
    setUploadedImages([]);
    setUploadedVideos([]);
  }

  const ValidateLimit = React.useCallback(
    (itemsLength: number) => {
      if (
        uploadedImages.length + uploadedVideos.length + itemsLength >
        MAX_UPLOAD_LIMIT
      ) {
        setUploadLimitHit(true);
        return false;
      }
      console.log(uploadedImages.length, uploadedVideos.length);
      return true;
    },
    [uploadedImages, uploadedVideos]
  );

  function addUploadedImg(imgSrc: FileRes) {
    const valid = ValidateLimit(1);
    if (valid) {
      console.log(ValidateLimit(1));
      setUploadedImages((imgs) => [...imgs, imgSrc]);
    }
    // console.log("test");
  }
  function addUploadedVideo(vidSrc: string) {
    const valid = ValidateLimit(1);
    if (valid) {
      setUploadedVideos((vids) => [...vids, vidSrc]);
    }
  }

  function handleFilesUpload(e: React.ChangeEvent<HTMLInputElement>) {
    setUploadLimitHit(false);
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      ValidateLimit(fileArray.length);
      fileArray.slice(0, MAX_UPLOAD_LIMIT).map((file) => {
        if (file.type.includes("image")) {
          getFileSrcData(file, (res) => {
            addUploadedImg(res);
          });
        } else if (file.type.includes("video")) {
          const test = URL.createObjectURL(file);
          addUploadedVideo(test);
        }
      });
    }
  }

  return user ? (
    <Modal
      motionPreset="slideInBottom"
      isCentered
      isOpen={isOpen}
      onClose={CloseModal}
    >
      <ModalOverlay />
      <ModalHeader></ModalHeader>
      <ModalContent
        my="0px"
        maxH={"100%"}
        overflowY="scroll"
        className="thinScroll"
        maxW="container.md"
        px="0px"
      >
        <ModalBody overflowY={"scroll"} className="thinScroll">
          <MediaUploadModal
            onVidUpload={addUploadedVideo}
            onImgUpload={addUploadedImg}
            multiple
          />
          <Flex direction={"column"} py="1rem" gap="1rem">
            <FloatingContainer
              items={[
                {
                  label: (
                    <IconButton
                      fontSize={"xx-large"}
                      colorScheme={"gray"}
                      color="gray.900"
                      rounded={"full"}
                      bgColor="gray.200"
                      aria-label="close new post modal"
                      icon={<Icon as={MdClose} />}
                      onClick={CloseModal}
                    />
                  ),
                  right: true,
                  top: "center",
                  floatingItemProps: {
                    translateY: "-50%",
                  },
                },
              ]}
            >
              <Text
                justifySelf={"flex-end"}
                fontSize="xl"
                fontWeight={"extrabold"}
                textAlign="center"
              >
                {t("create_post", "Create Post")}
              </Text>
            </FloatingContainer>
            <Divider borderColor={"gray.500"} />
            <HStack>
              <Avatar size={"lg"} name={user.name} photoSrc={user.photoSrc} />
              <VStack>
                <Text fontSize={"lg"}>{user.name}</Text>
              </VStack>
            </HStack>
            <Flex gap="1rem" direction={"column"} w="100%">
              <Textarea
                fontSize={"lg"}
                minH="10rem"
                w="100%"
                resize={"none"}
                placeholder={`${t(
                  "what's_on_your_mind",
                  "What's on your mind"
                )}, ${user.name}?`}
              />
              <HStack
                w="100%"
                justify={"center"}
                spacing="2rem"
                fontSize={"xx-large"}
              >
                <Icon
                  cursor={"pointer"}
                  fontSize={"1.3em"}
                  fill="crimson"
                  data-testid="AttachPhotoBtn"
                  onClick={() => setUploadType("picture")}
                  as={BiImage}
                />
                <Icon
                  cursor={"pointer"}
                  fontSize={"1.3em"}
                  color="yellow.300"
                  data-testid="AttachVideoBtn"
                  onClick={() => setUploadType("video")}
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
                py={"1rem"}
                height="auto"
                fontWeight={"bold"}
                fontSize={{ base: "md", lg: "lg", xl: "xl" }}
              >
                {t("post", "Post")}
              </Button>
            </Flex>
            {uploadiLimitHit && (
              <Text
                w="100%"
                textAlign={"center"}
                fontSize="xl"
                color={"crimson"}
              >
                {t("you_can_only_upload", "You can only upload")}{" "}
                {MAX_UPLOAD_LIMIT} {t("files_per_post", "files per post")}
              </Text>
            )}
            <SimpleGrid autoRows={"8rem"} columns={3} gap="1rem">
              {uploadedImages.map((img, i) => (
                <Center
                  w="100%"
                  h="100%"
                  borderWidth={"4px"}
                  borderColor="primary.main"
                  key={i}
                >
                  <Image
                    maxW="100%"
                    maxH="100%"
                    objectFit={"contain"}
                    //@ts-ignore
                    src={img || ""}
                    key={i}
                  />
                </Center>
              ))}
              {uploadedVideos.map((vid, i) => (
                <Center
                  w="100%"
                  h="100%"
                  borderWidth={"4px"}
                  borderColor="primary.main"
                  key={i}
                  position="relative"
                >
                  <Icon
                    position={"absolute"}
                    top="0.25em"
                    left="0.25em"
                    pl="0.1em"
                    bg="blackAlpha.500"
                    color="white"
                    rounded={"full"}
                    fontSize={"xx-large"}
                    as={BsPlayFill}
                  />
                  <video
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                    }}
                    src={vid}
                  />
                </Center>
              ))}
            </SimpleGrid>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  ) : null;
};

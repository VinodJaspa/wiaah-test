import {
  Avatar,
  AvatarGroup,
  Box,
  Center,
  Flex,
  HStack,
  Icon,
  Input,
  Link,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { FlagIcon } from "react-flag-kit";
import { useTranslation } from "react-i18next";
import { BiCamera, BiLink } from "react-icons/bi";
import { MdClose, MdVerified } from "react-icons/md";
import { BiEdit, BiSave } from "react-icons/bi";
import {
  SubscribersPopup,
  EllipsisText,
  useGetMyProfileData,
  Avatar as CustomAvatar,
  AvatarProps,
  MediaUploadModal,
  useFileUploadModal,
  useUpdateMyProfile,
} from "ui";
import { NumberShortner } from "ui/components/helpers";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { IoAdd } from "react-icons/io5";
import { ShopSocialProfileInfo, UpdateProfileDto } from "types";

export interface MyProfileProps {}

export const MyProfile: React.FC<MyProfileProps> = () => {
  const { t } = useTranslation();
  const [shopInfo, setShopInfo] = React.useState<ShopSocialProfileInfo>();
  const { uploadImage, cancelUpload } = useFileUploadModal();
  const [test, setTest] = React.useState(false);
  const { mutate: SubmitChanges, data: mutationData } = useUpdateMyProfile();
  const [editing, setEditing] = React.useState<boolean>(false);
  const [newLink, setNewLink] = React.useState<string>();
  const { data: shopInfoData, isLoading, isError } = useGetMyProfileData();
  const { isOpen, onOpen, onClose } = useDisclosure();

  //   const initialProfileInputs: UpdateProfileDto =

  React.useEffect(() => {
    if (mutationData) {
      setShopInfo(mutationData);
      console.log(mutationData);
    } else if (!shopInfo) {
      setShopInfo(shopInfoData);
    }
  }, [shopInfoData, mutationData]);

  const {
    isOpen: subscriptionsIsOpen,
    onOpen: subscriptionsOnOpen,
    onClose: subscriptionsOnClose,
  } = useDisclosure();
  console.log(
    shopInfo ? (shopInfo.thumbnail ? shopInfo.thumbnail : null) : undefined
  );
  function handleSwitchToEdit() {
    setEditing((edit) => !edit);
  }

  return (
    <Flex>
      {shopInfo && (
        <Formik<UpdateProfileDto>
          initialValues={{
            profileName: shopInfo.name,
            bio: shopInfo.bio,
            location: shopInfo.location,
            countryCode: shopInfo.countryCode,
            links: shopInfo.links,
            profileImageSrc: shopInfo.thumbnail,
            newProfileImage: null,
          }}
          onSubmit={(res, { resetForm, submitForm }) => {
            console.log(shopInfo);
            SubmitChanges(res);
            setTimeout(() => {
              if (!test) {
                submitForm();
                setTest(true);
              }
            }, 1000);
            // resetForm();
            setEditing(false);
          }}
        >
          {({
            isSubmitting,
            submitForm,
            handleChange,
            setFieldValue,
            values,
          }) => (
            <Form>
              <Flex
                align={"center"}
                bg={{ md: "primary.main" }}
                p="1rem"
                color={"white"}
                fontSize="1.5rem"
                justify={"space-between"}
                direction={"column"}
              >
                <SubscribersPopup
                  title={t("subscribers", "subscribers")}
                  isOpen={isOpen}
                  onClose={onClose}
                />
                <SubscribersPopup
                  title={t("subscriptions", "subscriptions")}
                  isOpen={subscriptionsIsOpen}
                  onClose={subscriptionsOnClose}
                />
                <Flex w="100%" justify={"space-between"}>
                  <Box />

                  <div>
                    <MediaUploadModal
                      onImgUpload={(img, raw) => {
                        console.log(raw);
                        setFieldValue("profileImageSrc", img);
                        setFieldValue("newProfileImage", raw);
                        cancelUpload();
                      }}
                    />
                    <EditingProfile
                      mb={"0.5rem"}
                      editable={editing}
                      name={values.profileName}
                      photoSrc={values.profileImageSrc}
                      onChangeClick={uploadImage}
                    />
                  </div>

                  <Icon
                    onClick={() =>
                      editing ? submitForm() : handleSwitchToEdit()
                    }
                    cursor={"pointer"}
                    as={editing ? BiSave : BiEdit}
                  />
                </Flex>
                <Flex
                  bgColor={{ base: "primary.main", md: "transparent" }}
                  align={"center"}
                  mb="0.5rem"
                  px="0.25rem"
                  rounded={"lg"}
                  gap="0.5rem"
                >
                  {editing ? (
                    <>
                      <Field
                        as={Input}
                        placeholder="Profile Name"
                        name="profileName"
                      />
                      <ErrorMessage name="profileName" component="div" />
                    </>
                  ) : (
                    <Text>{shopInfo.name}</Text>
                  )}
                  {shopInfo.verifed && (
                    <Icon fontSize={"x-large"} as={MdVerified} />
                  )}
                </Flex>
                <Flex lineHeight={"1.8rem"} gap="1rem">
                  <Flex
                    direction={"row"}
                    align={"center"}
                    cursor={"pointer"}
                    gap="0.5em"
                  >
                    <Text fontWeight={"bold"}>
                      {NumberShortner(shopInfo.publications)}
                    </Text>
                    <Text fontSize={"md"} textTransform={"capitalize"}>
                      {t("publications", "publications")}
                    </Text>
                  </Flex>
                  <Flex
                    align="center"
                    onClick={subscriptionsOnOpen}
                    cursor={"pointer"}
                  >
                    <HStack mx="0.5rem">
                      <AvatarGroup mr="0.7rem" max={3} spacing="-2.8em">
                        {[...Array(3)].map((_, i) => (
                          <Avatar
                            borderWidth={"1px"}
                            borderColor="white"
                            rounded={"lg"}
                            size={"xs"}
                            h="2em"
                            w="2em"
                            key={i}
                            bgColor={"black"}
                            src="/shop.jpeg"
                            name="test"
                          />
                        ))}
                      </AvatarGroup>
                      <Text fontWeight={"bold"}>
                        {NumberShortner(shopInfo.subscriptions)}
                      </Text>
                    </HStack>
                    <Text fontSize={"md"} textTransform={"capitalize"}>
                      {t("subscriptions", "subscriptions")}
                    </Text>
                  </Flex>
                  <Flex align="center" onClick={onOpen} cursor={"pointer"}>
                    <HStack mx="0.5rem">
                      <AvatarGroup mr="0.7rem" max={3} spacing="-2.8em">
                        {[...Array(3)].map((_, i) => (
                          <Avatar
                            borderWidth={"1px"}
                            borderColor="white"
                            rounded={"md"}
                            size={"xs"}
                            h="2em"
                            w="2em"
                            key={i}
                            bgColor={"black"}
                            src="/shop-2.jpeg"
                            name="test"
                          />
                        ))}
                      </AvatarGroup>
                      <Text fontWeight={"bold"}>
                        {NumberShortner(shopInfo.subscribers)}
                      </Text>
                    </HStack>

                    <Text fontSize={"md"} textTransform={"capitalize"}>
                      {t("subscribers", "Subscribers")}
                    </Text>
                  </Flex>
                </Flex>
                <Flex
                  gap="0.5rem"
                  direction={"column"}
                  py="1rem"
                  fontSize={"md"}
                  w="100%"
                >
                  {editing ? (
                    <>
                      <Field
                        as={Textarea}
                        _focus={{ outline: "none", border: "none" }}
                        placeholder="bio"
                        name="bio"
                        onChange={handleChange}
                        value={values.bio}
                        resize="none"
                        className="thinScroll"
                      />
                      <ErrorMessage name="bio" component="div" />
                    </>
                  ) : (
                    <EllipsisText
                      showMoreColor="primary.main"
                      maxLines={4}
                      content={shopInfo.bio}
                    />
                  )}

                  {editing ? (
                    <Flex gap="0.25em" direction={"column"}>
                      {values.links.map((link, i) => (
                        <HStack justify={"space-between"} key={i}>
                          <HStack>
                            <Icon color={"white"} fontSize="xl" as={BiLink} />
                            <Link color="blue" href={link}>
                              {link}
                            </Link>
                          </HStack>
                          <Icon
                            cursor={"pointer"}
                            onClick={() =>
                              setFieldValue(
                                "links",
                                values.links.filter((lnk) => lnk !== link)
                              )
                            }
                            as={MdClose}
                          />
                        </HStack>
                      ))}

                      <HStack>
                        <Input
                          placeholder={t("add_new_link", "Add New Link")}
                          value={newLink}
                          onChange={(e) => setNewLink(e.target.value)}
                        />
                        <Icon
                          onClick={() => {
                            setFieldValue("links", [...values.links, newLink]);
                            setNewLink("");
                          }}
                          fontSize={"xl"}
                          as={IoAdd}
                        />
                      </HStack>
                    </Flex>
                  ) : (
                    shopInfo.links && (
                      <Flex direction={"column"}>
                        {shopInfo.links.map((link, i) => (
                          <HStack key={i}>
                            <Icon color={"white"} fontSize="xl" as={BiLink} />
                            <Link color="blue" href={link}>
                              {link}
                            </Link>
                          </HStack>
                        ))}
                      </Flex>
                    )
                  )}
                </Flex>

                <Flex
                  bg={{ base: "whiteAlpha.200", md: "transparent" }}
                  gap="0.5rem"
                  w="100%"
                  align={"center"}
                  justify={"end"}
                  pt="0.75rem"
                >
                  <Text fontSize={"lg"}>
                    <FlagIcon code={shopInfo.countryCode} />
                  </Text>
                  {editing ? (
                    <>
                      <Field as={Input} maxW="15rem" name="location" />

                      <ErrorMessage name="location" component="div" />
                    </>
                  ) : (
                    <Text color={"white"} fontSize={"md"}>
                      {shopInfo.location}
                    </Text>
                  )}
                </Flex>
              </Flex>
            </Form>
          )}
        </Formik>
      )}
    </Flex>
  );
};

export interface EditingProfileProps extends AvatarProps {
  onChangeClick?: () => any;
  editable?: boolean;
}

export const EditingProfile: React.FC<EditingProfileProps> = ({
  name,
  onChangeClick,
  photoSrc,
  editable,
  ...props
}) => {
  const [profileHover, setProfileHover] = React.useState<boolean>(false);
  return (
    <Box
      rounded={"full"}
      onMouseOver={() => setProfileHover(true)}
      onMouseLeave={() => setProfileHover(false)}
      position={"relative"}
      {...props}
    >
      <CustomAvatar
        size={"2xl"}
        photoSrc={photoSrc}
        name={name}
        bgColor={"black"}
      />
      {editable && (
        <Center
          opacity={profileHover ? "100%" : "0%"}
          pointerEvents={profileHover ? "all" : "none"}
          rounded={"full"}
          position={"absolute"}
          top="0px"
          left="0px"
          bgColor={"blackAlpha.500"}
          w="100%"
          h="100%"
          cursor={"pointer"}
          zIndex={5}
          onClick={() => onChangeClick && onChangeClick()}
        >
          <Icon fontSize={"xx-large"} as={BiCamera} />
        </Center>
      )}
    </Box>
  );
};

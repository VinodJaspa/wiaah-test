
import React from "react";
import { FlagIcon, FlagIconCode } from "react-flag-kit";
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
  SpinnerFallback,
  ShadcnFlex,
  ShadcnText,
  ShadcnStack,
  ShadcnAvatarGroup,
  ShadcnAvatar,
  ShadCnButton,
  ShadcnBox,
  ShadcnIcon,
  ShadcnLink,
  ShadcnProfileOverlay,
} from "ui";
import { NumberShortner } from "ui/components/helpers";
import { useRouter } from "next/router";
import { AccountSettingsRoute } from "uris";
import { getRandomImage } from "placeholder";
import { getRandomName } from "utils";

const FAKE_USER_DATA = {
  name: "John Doe",
  thumbnail: getRandomImage(),
  verifed: true,
  publications: 33,
  subscriptions: 5,
  subscribers: 55,
  bio: "This is a fake bio",
  links: ["link", "link", "link"],
  countryCode: "MT" as FlagIconCode,
  location: "fake location",
};

export interface MyProfileProps { }

export const MyProfile: React.FC<MyProfileProps> = () => {
const { t } = useTranslation();
  const router = useRouter();
  const {
    data: _profileData,
    isLoading: _isLoadign,
    isError,
  } = useGetMyProfileData();
  const [isOpen, setIsOpen] = React.useState(false);
  const onOpen = () => setIsOpen(true);
const onClose = () => setIsOpen(false);

const profileData = FAKE_USER_DATA;

const [subscriptionsIsOpen, setSubscriptionsIsOpen] = React.useState(false);
const subscriptionsOnOpen = () => setSubscriptionsIsOpen(true);
const subscriptionsOnClose = () => setSubscriptionsIsOpen(false);

  function handleRouteToModifyProfile() {
    router.replace(AccountSettingsRoute);
  }

  return (
    <ShadcnFlex className="flex items-center justify-between w-full">
      <SpinnerFallback isLoading={false} isError={isError}>
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
        <ShadcnFlex className="w-full justify-between">
          <div />
          <CustomAvatar
            className="bg-black w-8 h-8 "
            name={profileData.name}
            photoSrc={profileData.thumbnail}
          />
          <div />
        </ShadcnFlex>
        <ShadcnFlex className="flex flex-col items-center mb-2 px-1 rounded-lg gap-2 bg-primary md:bg-transparent">
          <h4>{profileData.name}</h4>
          {profileData.verifed && <ShadcnIcon as={MdVerified} className="text-3xl"/>}
        </ShadcnFlex>
        <ShadcnFlex className="leading-7 gap-4">
          <ShadcnFlex className="flex flex-row items-center cursor-pointer gap-2">
            <ShadcnText className="font-bold">
              {NumberShortner(profileData.publications)}
            </ShadcnText>
            <ShadcnText className="text-md capitalize">
              {t("publications", "publications")}
            </ShadcnText>
          </ShadcnFlex>
          <ShadcnFlex className="flex items-center cursor-pointer" onClick={subscriptionsOnOpen}>
            <ShadcnStack className="flex items-center gap-2 mx-2">
              <ShadcnAvatarGroup className="flex -space-x-4">
                {[...Array(3)].map((_, i) => (
                  <ShadcnAvatar
                    className="w-8 h-8 border border-white rounded-lg bg-black"
                    key={i}
                    src={getRandomImage()}
                    alt="Profile"
                  />
                ))}
              </ShadcnAvatarGroup>
              <ShadcnText className="font-bold">
                {NumberShortner(profileData.subscriptions)}
              </ShadcnText>
            </ShadcnStack>

            <ShadcnText className="text-md capitalize">
              {t("subscriptions", "subscriptions")}
            </ShadcnText>
          </ShadcnFlex>
          <ShadcnFlex className="flex items-center cursor-pointer" onClick={onOpen}>
            <ShadcnStack className="flex items-center gap-2 mx-2">
              <ShadcnAvatarGroup className="flex -space-x-4">
                {[...Array(3)].map((_, i) => (
                  <ShadcnAvatar
                    className="w-8 h-8 border border-white rounded-md bg-black"
                    key={i}
                    src="/shop-2.jpeg"
                    alt="test"
                  />
                ))}
              </ShadcnAvatarGroup>
              <ShadcnText className="font-bold">
                {NumberShortner(profileData.subscribers)}
              </ShadcnText>
            </ShadcnStack>


            <ShadcnText className="text-md capitalize">
              {t("subscribers", "Subscribers")}
            </ShadcnText>
          </ShadcnFlex>
        </ShadcnFlex>
        <ShadcnFlex className="flex flex-col gap-2 py-4 text-md w-full">
          {profileData.bio && (
            <EllipsisText
              showMoreColor="primary.main"
              maxLines={4}
              content={profileData.bio}
            />
          )}
          {profileData.links && (
            <ShadcnFlex className="flex flex-col">
              {profileData.links.map((link, i) => (
                <ShadcnStack key={i} className="flex items-center gap-2">
                  <ShadcnIcon as={BiLink} className="text-white text-xl" />
                  <ShadcnLink href={link} className="text-blue-500 hover:underline">
                    {link}
                  </ShadcnLink>
                </ShadcnStack>

              ))}
            </ShadcnFlex>
          )}
        </ShadcnFlex>

        <ShadcnStack className="w-full gap-4">
          <ShadCnButton
            onClick={handleRouteToModifyProfile}
            className="w-full border-2 border-white"
          >
            {t("modify_profile", "Modify profile")}
          </ShadCnButton>
        </ShadcnStack>
        <ShadcnFlex className="w-full items-center justify-end gap-2 pt-3 bg-white/20 md:bg-transparent">

          <ShadcnText className="text-lg">
            <FlagIcon code={profileData.countryCode} />
          </ShadcnText>
          <ShadcnText className="text-md text-white">
            {profileData.location}
          </ShadcnText>
        </ShadcnFlex>
      </SpinnerFallback>
    </ShadcnFlex>
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
    <ShadcnBox
      className="rounded-full relative"
      onMouseOver={() => setProfileHover(true)}
      onMouseLeave={() => setProfileHover(false)}
      {...props}
    >
      <CustomAvatar
        className="bg-black w-8 h=8"
        photoSrc={photoSrc}
        name={name}
      />
      {editable && (
      <ShadcnProfileOverlay isVisible={profileHover} onClick={() => onChangeClick && onChangeClick()}>
      <ShadcnIcon as={BiCamera} className="text-4xl" />
    </ShadcnProfileOverlay>
      )}
    </ShadcnBox>
  );
};
{
  /* <Flex>
      {profileData && (
        <Formik<UpdateProfileDto>
          initialValues={{
            profileName: profileData.name,
            bio: profileData.bio,
            location: profileData.location,
            countryCode: profileData.countryCode,
            links: profileData.links,
            profileImageSrc: profileData.thumbnail,
            newProfileImage: null,
          }}
          onSubmit={(res, { resetForm, submitForm }) => {
            console.log(profileData);
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
                    <Text>{profileData.name}</Text>
                  )}
                  {profileData.verifed && (
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
                      {NumberShortner(profileData.publications)}
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
                        {NumberShortner(profileData.subscriptions)}
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
                        {NumberShortner(profileData.subscribers)}
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
                      content={profileData.bio}
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
                    profileData.links && (
                      <Flex direction={"column"}>
                        {profileData.links.map((link, i) => (
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
                    <FlagIcon code={profileData.countryCode} />
                  </Text>
                  {editing ? (
                    <>
                      <Field as={Input} maxW="15rem" name="location" />

                      <ErrorMessage name="location" component="div" />
                    </>
                  ) : (
                    <Text color={"white"} fontSize={"md"}>
                      {profileData.location}
                    </Text>
                  )}
                </Flex>
              </Flex>
            </Form>
          )}
        </Formik>
      )}
    </Flex> */
}

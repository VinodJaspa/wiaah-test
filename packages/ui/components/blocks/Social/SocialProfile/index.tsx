import React from "react";
import {
  SubscribersPopup,
  Avatar,
  SocialStoryModal,
  Button,
  HStack,
  Stack,
  Divider,
  LinkIcon,
  QrcodeDisplay,
  SocialProfileOptionsDropdown,
  HorizontalDotsIcon,
  VerifiedIcon,
} from "@UI";
import { mapArray, NumberShortner } from "utils";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { SocialStoryState } from "@src/state";
import { useDisclouser } from "hooks";
import {
  Profile,
  ProfileVisibility,
  useSendFollowRequestMutation,
} from "@features/Social";
import { useUnFollowProfileMutation } from "@features/Social";

export interface SocialProfileProps {
  profileInfo: Profile & { isFollowed: boolean };
  onFollow?: () => void;
}

export const SocialProfile: React.FC<SocialProfileProps> = ({
  onFollow,
  profileInfo,
}) => {
  const { t } = useTranslation();
  const storyData = useRecoilValue(SocialStoryState);
  const [storyProfileId, setStoryProfileId] = React.useState<string>();

  const { mutate: unFollowProfile } = useUnFollowProfileMutation();
  const { mutate: followProfile } = useUnFollowProfileMutation();
  const { mutate: sendFollowReq } = useSendFollowRequestMutation();

  const isProfilePublic = profileInfo.visibility === ProfileVisibility.Public;

  function handleFollowProfile() {
    if (profileInfo.isFollowed) {
      unFollowProfile({ profileId: profileInfo.id });
      return;
    }
    if (isProfilePublic) {
      followProfile({
        profileId: profileInfo.id,
      });
      return;
    }

    sendFollowReq(profileInfo.id);
  }

  const { isOpen, handleClose, handleOpen } = useDisclouser();

  const {
    isOpen: subscriptionsIsOpen,
    handleOpen: subscriptionsOnOpen,
    handleClose: subscriptionsOnClose,
  } = useDisclouser();

  if (!profileInfo) return null;

  return (
    <div className="flex flex-col w-full bg-primary h-80 relative rounded-2xl ">
      <div className="absolute right-10 text-white text-xl top-2">
        <SocialProfileOptionsDropdown profileId={profileInfo.id}>
          <HorizontalDotsIcon className="cursor-pointer" />
        </SocialProfileOptionsDropdown>
      </div>

      <div className="flex flex-col h-[11rem] w-full  items-end justify-center pt-6 px-8 gap-3 text-white">
        <div className="flex flex-col gap-3 items-center">
          <QrcodeDisplay
            value={profileInfo.id}
            color="#ffffff"
            transparentBg
            className={"w-16 fill-white"}
          />
          <p>{t("Show on map")}</p>
        </div>
      </div>
      {storyProfileId && <SocialStoryModal profileId={storyProfileId} />}
      <SubscribersPopup
        title={t("subscribers", "subscribers")}
        isOpen={isOpen}
        onClose={handleClose}
      />
      <SubscribersPopup
        title={t("subscriptions", "subscriptions")}
        isOpen={subscriptionsIsOpen}
        onClose={subscriptionsOnClose}
      />
      <div
        style={{
          boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.08)",
        }}
        className="absolute w-full bg-white border-2 border-white bottom-0 left-0 h-36 pl-14 pr-8 py-6 flex gap-12"
      >
        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <div className="absolute left-14 top-0 -translate-y-1/2">
              <Avatar
                onClick={() => setStoryProfileId(profileInfo.id)}
                className="w-[6.75rem]"
                src={profileInfo.photo}
                name={profileInfo.username}
              />
            </div>
            <div className="w-24 h-full"></div>

            <HStack>
              <p className="text-xl whitespace-nowrap font-bold">
                {profileInfo.username}
              </p>
              <p className="text-sm font-light text-grayText">
                {profileInfo.profession}
              </p>
              {profileInfo.verified ? (
                <VerifiedIcon className="text-lg text-primary" />
              ) : null}
            </HStack>
          </div>
          <Stack divider={<Divider variant="vert" className="mx-[1.25rem]" />}>
            <HStack>
              <p className="font-bold text-lg">
                {NumberShortner(profileInfo.publications)}
              </p>
              <p>{t("Posts")}</p>
            </HStack>

            <HStack className="cursor-pointer" onClick={() => handleOpen()}>
              <p className="font-bold text-lg">
                {NumberShortner(profileInfo.followers)}
              </p>
              <p>{t("Followers")}</p>
            </HStack>

            <HStack
              className="cursor-pointer"
              onClick={() => subscriptionsOnOpen()}
            >
              <p className="font-bold text-lg">
                {NumberShortner(profileInfo.following)}
              </p>
              <p>{t("Following")}</p>
            </HStack>
          </Stack>
        </div>

        <div className="flex flex-col w-full gap-1">
          <p className="font-semibold text-lg">{t("Bio")}</p>
          <p className="font-light text-base text-lightBlack">
            {profileInfo.bio}
          </p>
          <div className="flex flex-wrap gap-2">
            {mapArray([], (link, i) => (
              <HStack key={i} className="flex gap-2">
                <LinkIcon className="text-base text-primary" />
                <p className="text-base text-black font-light underline underline-offset-4">
                  {link}
                </p>
              </HStack>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <Button onClick={handleFollowProfile} className="whitespace-nowrap">
            {profileInfo.isFollowed
              ? t("Unfollow")
              : isProfilePublic
              ? t("Follow")
              : t("Ask To Follow")}
          </Button>
        </div>
      </div>
    </div>
  );
};

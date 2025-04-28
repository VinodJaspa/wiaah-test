import { mapArray } from "@UI/../utils/src";
import { SocialContentType, useSocialControls } from "@blocks";
import {
  useFollowProfileMutation,
  useGetContentTaggedProfilesQuery,
} from "@features/Social/services";
import {
  Avatar,
  Button,
  CloseIcon,
  Divider,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  HStack,
  VerifiedIcon,
} from "@partials";
import React from "react";
import { useTranslation } from "react-i18next";

export const TaggedProfilesDrawer: React.FC = () => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const { hideContentTaggedProfiles, value } =
    useSocialControls("showTaggedProfiles");

  const isOpen =
    !!value &&
    typeof value.contentId === "string" &&
    Object.values(SocialContentType).includes(value.contentType);

  const { data } = useGetContentTaggedProfilesQuery(
    { contentId: value?.contentId!, contentType: value?.contentType! },
    { enabled: isOpen }
  );

  const { mutate: follow } = useFollowProfileMutation();

  return (
    <Drawer
      position="bottom"
      draggable
      onClose={hideContentTaggedProfiles}
      isOpen={isOpen}
    >
      <DrawerOverlay />
      <DrawerContent>
        <div className="text-xl py-2 font-semibold relative flex justify-center items-center w-full">
          <p>{t("Tagged Profiles")}</p>
          <CloseIcon
            onClick={hideContentTaggedProfiles}
            className="absolute top-1/2 -translate-y-1/2 left-4 text-2xl cursor-pointer"
          />
        </div>
        <Divider />
        <div className="flex flex-col p-4 gap-4">
          {mapArray(
            data?.taggedProfiles,
            ({ id, photo, username, verified, isFollowed }) => (
              <HStack className="justify-between">
                <HStack className="gap-3">
                  <Avatar
                    className="min-w-[3.25rem] border-2 border-primary"
                    src={photo}
                  />
                  <HStack className="gap-1">
                    <p className="font-medium">{username}</p>
                    {verified ? (
                      <VerifiedIcon className="text-secondaryBlue text-xs" />
                    ) : null}
                  </HStack>
                </HStack>

                {isFollowed ? null : (
                  <Button
                    colorScheme="darkbrown"
                    className="text-sm font-semibold"
                    onClick={() => {
                      follow({ profileId: id });
                    }}
                  >
                    {t("Follow")}
                  </Button>
                )}
              </HStack>
            )
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

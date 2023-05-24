import { useRouting } from "@UI/../routing";
import { useSocialControls } from "@blocks";
import { useGetSocialProfileQuery } from "@features/Social/services";
import { AspectRatio, Button, HStack, Image } from "@partials";
import React from "react";
import { useTranslation } from "react-i18next";

export const SocialPostAuthorHeader: React.FC<{ userId: string }> = ({
  userId,
}) => {
  const { visit } = useRouting();
  const { t } = useTranslation();
  const { data, isLoading } = useGetSocialProfileQuery(userId);
  const { viewUserStory } = useSocialControls();
  const newStory = true;
  return (
    <HStack>
      <button
        onClick={() => {
          if (data?.ownerId) {
            viewUserStory(data?.ownerId);
          }
        }}
      >
        <AspectRatio ratio={1}>
          <Image
            isLoading={isLoading}
            src={data?.photo}
            className={`${newStory ? "border border-primary" : ""} w-24 h-full`}
          />
        </AspectRatio>
      </button>

      <div className="flex flex-col gap-4">
        <p className="text-2xl font-semibold">{data?.username}</p>
        <p className="text-xs text-iconGray">{data?.profession}</p>

        <HStack>
          <Button
            colorScheme="darkbrown"
            onClick={() => {
              if (data?.ownerId) {
                visit((r) => r.visitSocialProfile(data?.ownerId));
              }
            }}
          >
            {t("View Profile")}
          </Button>

          <Button
            colorScheme="darkbrown"
            outline
            onClick={() => {
              if (data?.ownerId) {
                visit((r) => r.visitShopOnMap(data?.ownerId));
              }
            }}
          >
            {t("Show on map")}
          </Button>
        </HStack>
      </div>
    </HStack>
  );
};

import { SocialContentType, useSocialControls } from "@blocks";
import { CloseIcon, Drawer, DrawerContent } from "@partials";
import React from "react";
import { useTranslation } from "react-i18next";

export const TaggedProfilesDrawer: React.FC = () => {
  const { t } = useTranslation();
  const { hideContentTaggedProfiles, value } =
    useSocialControls("showTaggedProfiles");

  const isOpen =
    !!value &&
    typeof value.contentId === "string" &&
    Object.values(SocialContentType).includes(value.contentType);

  return (
    <Drawer draggable onClose={hideContentTaggedProfiles} isOpen={isOpen}>
      <DrawerContent>
        <div className="text-xl font-semibold relative flex justify-center items-center w-full">
          <p>{t("Tagged Profiles")}</p>
          <CloseIcon
            onClick={hideContentTaggedProfiles}
            className="absolute top-4 left-4 cursor-pointer"
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

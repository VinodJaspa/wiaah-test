import React from "react";
import { useTranslation } from "react-i18next";
import {
  ShopProductFilter,
  DrawerHeader,
  DrawerCloseButton,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Button,
  CloseIcon,
} from "ui";
import { categories } from "placeholder";
import { useModalDisclouser } from "hooks";
import { useReactPubsub } from "react-pubsub";

export interface FilterModalProps {}

export const FilterModal: React.FC<FilterModalProps> = () => {
  const { t } = useTranslation();
  const { handleClose, handleOpen, isOpen } = useModalDisclouser();

  const { Listen } = useReactPubsub(
    (events) => events.openSocialShopPostsFilterDrawer
  );

  Listen(() => handleOpen());

  return (
    <Drawer
      position="right"
      isOpen={isOpen}
      onClose={handleClose}
      onOpen={handleOpen}
    >
      <DrawerOverlay />
      <DrawerContent>
        <div className="flex h-full w-full flex-col justify-between gap-4">
          <DrawerHeader className="p-4">
            <div></div>
            <DrawerCloseButton>
              <CloseIcon className="text-4xl cursor-pointer" />
            </DrawerCloseButton>
          </DrawerHeader>
          <div className="h-full w-full px-2 overflow-y-scroll thinScroll">
            <ShopProductFilter
              open={true}
              shipping={["Click and Collect", "Free", "International"]}
              colors={["#920", "#059", "#229"]}
              size={["S", "M", "L", "XL", "XXL", "XXXL"]}
              stockStatus
              rating
              countryFilter
              cityFilter
              categories={categories}
              priceRange={{ max: 1000, min: 10 }}
            />
          </div>
          <div className="flex w-full pb-4 pr-4 justify-end self-end gap-4">
            <Button colorScheme="gray">{t("Cancel")}</Button>
            <Button>{t("Submit")}</Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

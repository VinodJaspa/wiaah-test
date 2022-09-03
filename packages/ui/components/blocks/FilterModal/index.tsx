import React from "react";
import { useTranslation } from "react-i18next";
import {
  ShopProductFilter,
  ModalOverlay,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Button,
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
    <Drawer isOpen={isOpen} onClose={handleClose} onOpen={handleOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <div className="flex h-full w-full flex-col justify-between gap-4">
          <div className="h-full w-full overflow-y-scroll thinScroll">
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

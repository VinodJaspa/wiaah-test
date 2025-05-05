import { useSocialControls } from "@blocks";
import { useGetProductsByIds } from "@features/Products/services/queries/useGetProductsByIds";
import {
  AspectRatioImage,
  CloseIcon,
  CountInput,
  HStack,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  PriceDisplay,
  ShoppingCartIcon,
  Slider,
} from "@partials";
import React from "react";
import { useTranslation } from "react-i18next";
import { mapArray, useForm } from "utils";

export const SocialContentProductsListingModal: React.FC = () => {
const { t } = useTranslation();
  const { hideSocialContentProductsListing, value } = useSocialControls(
    "showSocialContentProductsListing"
  );

  const isOpen =
    Array.isArray(value) && value.every((v) => typeof v === "string");

  const { data, isLoading } = useGetProductsByIds(
    { ids: value! },
    { enabled: isOpen }
  );

  const {} = useForm<{}>({});

  return (
    <Modal isOpen={isOpen} onClose={hideSocialContentProductsListing}>
      <ModalContent>
        <ModalHeader
          title={
            <HStack>
              <p className="text-xl font-bold">{t("Products")}</p>
              <ShoppingCartIcon className="text-2xl" />
            </HStack>
          }
          centerTitle
        />

        <div className="flex flex-col gap-4">
          <p>{t("Related Products")}</p>
          <Slider itemsCount={4}>
            {mapArray(data, (v) => (
              <div className="flex flex-col justify-center items-center gap-4">
                <AspectRatioImage src={v.thumbnail} ratio={1} alt={v.title} />
                <p>{v.title}</p>
                <PriceDisplay price={v.price} />
                <CountInput />
                <button>{t("Add to cart")}</button>
              </div>
            ))}
          </Slider>
        </div>
      </ModalContent>
    </Modal>
  );
};

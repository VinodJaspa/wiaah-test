import React, { useState } from "react";
import { useGetProductDetailsQuery } from "../services";
import { useMutateShoppingCart, useResponsive } from "@src/index";
import { SectionHeader } from "@sections/ShoppingManagement";
import { useTranslation } from "react-i18next";
import {
  AspectRatioImage,
  HStack,
  HeartOutlineIcon,
  PaperPlaneAngleIcon,
  PlayFillIcon,
  Slider,
} from "@partials";
import { mapArray, useForm } from "@UI/../utils/src";
import { PresentationType, ShoppingCartItemType } from "@features/API";
import { ProductAttributeDisplay } from "../components/ProductAttributeDisplay";

export const ProductView: React.FC<{ productId: string }> = ({ productId }) => {
  const { data } = useGetProductDetailsQuery({ id: productId });
  const [productImgIdx, setProductIdx] = useState<number>(0);

  const { addShoppingCartItem } = useMutateShoppingCart();
  const { handleChange, form } = useForm<
    Parameters<typeof addShoppingCartItem>[0]
  >({
    itemId: "",
    quantity: 1,
    shippingRuleId: "",
    type: ShoppingCartItemType.Product,
    attributes: [],
  });

  const { isMobile } = useResponsive();
  const { t } = useTranslation();

  return isMobile ? (
    <div className="flex flex-col gap-6">
      <SectionHeader sectionTitle={data?.title || ""} />
      <div className="flex flex-col gap-2">
        <Slider
          currentItemIdx={productImgIdx}
          onSliderChange={(idx) => setProductIdx(idx)}
        >
          {mapArray(data?.presentations, (pres, i) => (
            <AspectRatioImage
              key={i}
              ratio={1.14}
              src={pres.src}
              alt={data?.title || ""}
            />
          ))}
        </Slider>
        <div className="w-full flex items-center gap-4 overflow-x-scroll">
          {mapArray(data?.presentations, (pres, i) => (
            <AspectRatioImage
              key={i}
              alt={data?.title || ""}
              ratio={1}
              src={pres.src}
              onClick={() => setProductIdx(i)}
              className="rounded-xl cursor-pointer"
            >
              {pres.type === PresentationType.Video ? (
                <PlayFillIcon className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
              ) : null}
            </AspectRatioImage>
          ))}
        </div>
        <HStack>
          <p className="text-xl font-semibold">{data?.title}</p>
          <HStack>
            <HeartOutlineIcon />
            <PaperPlaneAngleIcon />
          </HStack>
        </HStack>
        {mapArray(data?.attributes, (att, i) => (
          <div key={i}>
            <p>
              {t("Select")} {att.name}
            </p>
            <HStack className="flex-wrap">
              <ProductAttributeDisplay
                {...att}
                onChange={(value) => {
                  handleChange(
                    "attributes",
                    form.attributes
                      ?.filter((v) => v.id !== att.name)
                      .concat([{ id: att.name, value }])
                  );
                }}
                value={[]}
              />
            </HStack>
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

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
import { PresentationType } from "@features/API";

export const ProductView: React.FC<{ productId: string }> = ({ productId }) => {
  const { data } = useGetProductDetailsQuery({ id: productId });
  const [productImgIdx, setProductIdx] = useState<number>(0);
  
  const { addShoppingCartItem } = useMutateShoppingCart()
  const { } = useForm<Parameters<typeof addShoppingCartItem>[0]>({})

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
        <div>
          <p>{t("Select Colour")}</p>
          {mapArray(data?.colors, (color,i) => (
            <button key={i} className={`${} w-8 h-8 rounded-xl`} style={{backgroundColor:`#${color}`}}></button>
          ))}
        </div>
      </div>
    </div>
  ) : null;
};

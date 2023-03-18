import { useResponsive } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { usePublishRef, useScrollTo } from "state";
import {
  AspectRatio,
  Slider,
  ArrowLeftIcon,
  ArrowRightIcon,
  Button,
  AspectRatioImage,
  ServicePresentation,
  Image,
} from "@UI";
export const ServicePresentationCarosuel: React.FC<{
  data: ServicePresentation[];
}> = ({ data }) => {
  const { isMobile, isTablet } = useResponsive();
  const { ScrollTo } = useScrollTo();
  const ref = usePublishRef("presentation");
  const { t } = useTranslation();
  return (
    <div ref={ref} className="w-full relative">
      {Array.isArray(data) ? (
        <AspectRatio ratio={isMobile ? 5 / 7 : 5 / 11.12}>
          <div className="w-full gap-[1.875rem] flex h-full flex-col md:flex-row">
            <Slider
              gap={4}
              leftArrowComponent={<ArrowLeftIcon />}
              rightArrowComponent={<ArrowRightIcon />}
              // className="min-w-[8.75rem] flex flex-col gap-[1.875rem] overflow-scroll noScroll"
            >
              {data.slice(0, 4).map((img, i) => (
                <Image
                  // ratio={1}
                  className={`${
                    i === 0 ? "" : "pt-2"
                  } rounded-2xl w-full h-full object-cover overflow-hidden`}
                  key={i}
                  src={img.src}
                  alt={""}
                />
              ))}
            </Slider>
            <div
              style={{
                height: isMobile ? "4rem" : "654px",
                width: "calc(100% - 10rem)",
              }}
            >
              <Slider itemsCount={4} variant={"vertical"} gap={16}>
                {data.map((img, i) => (
                  <Image
                    className="w-full h-full object-cover rounded md:rounded-[1.25rem]"
                    key={i}
                    src={img.src}
                  />
                ))}
              </Slider>
            </div>
          </div>
        </AspectRatio>
      ) : null}
    </div>
  );
};

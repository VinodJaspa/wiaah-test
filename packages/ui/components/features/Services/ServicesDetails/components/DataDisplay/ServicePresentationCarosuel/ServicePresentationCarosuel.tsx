import { PresntationMediaType } from "api";
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
} from "ui";
export const ServicePresentationCarosuel: React.FC<{
  data: PresntationMediaType[];
}> = ({ data }) => {
  const { isMobile, isTablet } = useResponsive();
  const { ScrollTo } = useScrollTo();
  const ref = usePublishRef("presentation");
  const { t } = useTranslation();
  return (
    <div ref={ref} className="w-full relative">
      <AspectRatio ratio={isMobile ? 5 / 7 : 5 / 11.12}>
        {Array.isArray(data) ? (
          <div className="w-full gap-4 flex h-full flex-col md:flex-row">
            <div className="w-32 flex flex-col gap-2 overflow-scroll noScroll">
              {data.map((img, i) => (
                <AspectRatioImage
                  ratio={7 / 9}
                  className={`${i === 0 ? "" : "pt-2"} rounded`}
                  key={i}
                  src={img.src}
                  alt={""}
                />
              ))}
            </div>
            <div style={{ width: "calc(100% - 9rem)" }}>
              <Slider
                leftArrowComponent={() => (
                  <div className="bg-black mx-4  bg-opacity-50 text-primary p-1  rounded-full text-3xl">
                    <ArrowLeftIcon />
                  </div>
                )}
                rightArrowComponent={() => (
                  <div className="bg-black  mx-4 bg-opacity-50 text-primary p-1  rounded-full text-3xl">
                    <ArrowRightIcon />
                  </div>
                )}
              >
                {data.map((img, i) => (
                  <img
                    className="w-full h-full object-cover"
                    key={i}
                    src={img.src}
                  />
                ))}
              </Slider>
            </div>
          </div>
        ) : null}
      </AspectRatio>
      <Button
        onClick={() => ScrollTo("map")}
        colorScheme="white"
        className="absolute md:left-36 left-4 bg-white text-black  px-4 py-2 rounded-xl md:bottom-8 bottom-2"
      >
        {t("Show on map")}
      </Button>
    </div>
  );
};

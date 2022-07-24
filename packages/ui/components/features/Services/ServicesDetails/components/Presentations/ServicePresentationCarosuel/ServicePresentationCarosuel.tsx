import { PresntationMediaType } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { usePublishRef, useScrollTo } from "state";
import { AspectRatio, Slider, ArrowLeftIcon, ArrowRightIcon, Button } from "ui";
export const ServicePresentationCarosuel: React.FC<{
  data: PresntationMediaType[];
}> = ({ data }) => {
  const { ScrollTo } = useScrollTo();
  const ref = usePublishRef("presentation");
  const { t } = useTranslation();
  return (
    <div ref={ref} className="w-full relative">
      <AspectRatio ratio={5 / 11.12}>
        {Array.isArray(data) ? (
          <div className="w-full gap-4 flex h-full flex-col md:flex-row">
            <div className="w-32">
              <Slider itemsCount={8} variant="vertical">
                {data.map((img, i) => (
                  <img
                    className={`${
                      i === 0 ? "" : "pt-2"
                    } rounded w-full h-full object-cover`}
                    key={i}
                    src={img.src}
                  />
                ))}
              </Slider>
            </div>
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
        ) : null}
      </AspectRatio>
      <Button
        onClick={() => ScrollTo("map")}
        colorScheme="white"
        className="absolute left-36 bg-white text-black  px-4 py-2 rounded-xl bottom-8"
      >
        {t("Show on map")}
      </Button>
    </div>
  );
};

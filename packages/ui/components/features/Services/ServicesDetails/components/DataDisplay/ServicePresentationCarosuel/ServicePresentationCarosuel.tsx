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
} from "@UI";
export const ServicePresentationCarosuel: React.FC<{
  data: PresntationMediaType[];
}> = ({ data }) => {
  const { isMobile, isTablet } = useResponsive();
  const { ScrollTo } = useScrollTo();
  const ref = usePublishRef("presentation");
  const { t } = useTranslation();
  return (
    <div ref={ref} className="w-full relative">
      {/* <AspectRatio ratio={isMobile ? 5 / 7 : 5 / 11.12}> */}
      {Array.isArray(data) ? (
        <div className="w-full gap-[1.875rem] flex h-full flex-col md:flex-row">
          <div className="min-w-[8.75rem] flex flex-col gap-[1.875rem] overflow-scroll noScroll">
            {data.slice(0, 4).map((img, i) => (
              <AspectRatioImage
                ratio={1}
                className={`${
                  i === 0 ? "" : "pt-2"
                } rounded-2xl overflow-hidden`}
                key={i}
                src={img.src}
                alt={""}
              />
            ))}
          </div>
          <div style={{ height: "654px", width: "calc(100% - 10rem)" }}>
            <Slider gap={16}>
              {data.map((img, i) => (
                <img
                  className="w-full h-full object-cover rounded-[1.25rem]"
                  key={i}
                  src={img.src}
                />
              ))}
            </Slider>
          </div>
        </div>
      ) : null}
      {/* </AspectRatio> */}
    </div>
  );
};

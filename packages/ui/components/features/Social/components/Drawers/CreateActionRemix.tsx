import { mapArray } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";
import { useSocialControls } from "@blocks";
import { Drawer, DrawerContent, DrawerOverlay, HStack, Image } from "@partials";
import React from "react";
import { useTranslation } from "react-i18next";

export const CreateActionRemix: React.FC = () => {
  const { value, cancelRemixAction } = useSocialControls("remixActionId");
  console.log("remix", value);
  const isOpen = typeof value === "string" && value.length > 0;
  const { t } = useTranslation();

  const placements: {
    type: "pop-over" | "beside";
    vPos: 0 | 1;
    hPos: 0 | 1;
    shape: "circle" | "rect";
  }[] = [
    {
      type: "beside",
      hPos: 0,
      shape: "rect",
      vPos: 0,
    },
    {
      type: "beside",
      hPos: 1,
      shape: "rect",
      vPos: 0,
    },
    {
      type: "pop-over",
      hPos: 1,
      shape: "rect",
      vPos: 1,
    },
    {
      type: "pop-over",
      hPos: 1,
      shape: "circle",
      vPos: 1,
    },
    {
      type: "pop-over",
      hPos: 0,
      shape: "circle",
      vPos: 1,
    },
    {
      type: "pop-over",
      hPos: 0,
      shape: "circle",
      vPos: 1,
    },
    {
      type: "pop-over",
      hPos: 1,
      shape: "rect",
      vPos: 0,
    },
    {
      type: "pop-over",
      hPos: 1,
      shape: "circle",
      vPos: 0,
    },
  ];

  return (
    <Drawer
      position="bottom"
      isLazy
      isOpen={isOpen}
      onClose={() => cancelRemixAction()}
      draggable
    >
      <DrawerOverlay />
      <DrawerContent
        style={{
          overflow: "visible",
        }}
        className="noScroll flex flex-col w-full"
      >
        <p className="mb-6 mt-2 mx-auto w-fit text-lg font-semibold">
          {t("Remix")}
        </p>
        <div className="w-full h-full overflow-y-scroll grid grid-cols-2 gap-5 px-4 pb-4">
          {mapArray(placements, ({ hPos, shape, type, vPos }) => (
            <HStack className="gap-0 relative overflow-hidden rounded-md h-32">
              <div
                className={`${
                  shape === "circle" ? "rounded-full" : "rounded-md"
                } ${
                  hPos === 0 ? "left-2 rounded-l-md" : "right-2 rounded-r-md"
                } ${vPos === 0 ? "bottom-2" : "top-2"} ${
                  type === "pop-over" ? "absolute w-12 h-9" : "w-1/2 h-full"
                } border-2 border-primary rounded overflow-hidden`}
              >
                <Image
                  className="w-full h-full object-cover"
                  src={getRandomImage()}
                />
              </div>

              <Image
                className={`${
                  type === "pop-over" ? "w-full" : "w-1/2"
                } h-full object-cover`}
                src={getRandomImage()}
              />
            </HStack>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

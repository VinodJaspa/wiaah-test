import { mapArray } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";
import { useGetActionQuery } from "@features/Social/services";
import { Drawer, DrawerContent, DrawerOverlay, HStack, Image } from "@partials";
import React from "react";
import { useTranslation } from "react-i18next";

export type ChooseRemixPlacement = {
  type: "pop-over" | "beside";
  vPos: 0 | 1;
  hPos: 0 | 1;
  shape: "circle" | "rect";
};

export const ChooseActionRemix: React.FC<{
  actionId?: string;
  onSelect?: (placement: ChooseRemixPlacement) => any;
  onCancel?: () => any;
}> = ({ actionId, onCancel }) => {
  const isOpen = typeof actionId === "string" && actionId.length > 0;
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const { data } = useGetActionQuery(actionId!, { enabled: isOpen });

  const placements: ChooseRemixPlacement[] = [
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
      onClose={() => onCancel && onCancel()}
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
                {/* TODO: add camera photo */}
                <Image
                  className="w-full h-full object-cover"
                  src={"/action_remix_camera.png"}
                />
              </div>

              <Image
                className={`${
                  type === "pop-over" ? "w-full" : "w-1/2"
                } h-full object-cover`}
                src={data?.thumbnail}
              />
            </HStack>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

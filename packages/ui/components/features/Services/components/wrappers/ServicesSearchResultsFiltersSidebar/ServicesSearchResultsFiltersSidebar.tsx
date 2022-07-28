import { useResponsive } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  ShowMapButton,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  OpenFilterIcon,
  CloseIcon,
} from "ui";

export interface ServicesSearchResultsFiltersSidebarProps {
  onShowOnMap: () => any;
}

export const ServicesSearchResultsFiltersSidebar: React.FC<
  ServicesSearchResultsFiltersSidebarProps
> = ({ onShowOnMap, children }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const { isTablet } = useResponsive();
  const { t } = useTranslation();
  return (
    <>
      {isTablet ? (
        <div dir="rtl" className="flex gap-2">
          <p>{t("filters")}</p>
          <OpenFilterIcon className="text-xl" onClick={() => setOpen(true)} />
        </div>
      ) : null}
      <Drawer
        active={isTablet}
        full
        isOpen={open}
        onClose={() => setOpen(false)}
        position="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader className="font-bold text-lg p-4 flex items-center justify-between">
            <p>{t("filters")}</p>
            <DrawerCloseButton>
              <CloseIcon className="text-xl" />
            </DrawerCloseButton>
          </DrawerHeader>
          <div className="flex flex-col gap-4 min-w-[min(15rem,100%)] h-full overflow-scroll md:overflow-hidden">
            <ShowMapButton
              data-testid="FiltersSideBarShowMapButton"
              onClick={() => onShowOnMap && onShowOnMap()}
            />
            {children}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

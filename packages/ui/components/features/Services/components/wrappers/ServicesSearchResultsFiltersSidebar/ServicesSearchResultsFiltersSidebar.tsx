import { useResponsive } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  ShowMapButton,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  OpenFilterIcon,
  CloseIcon,
  SearchIcon,
  Input,
  InputGroup,
  InputLeftElement,
  useMutateSearchFilters,
  useSearchFilters,
} from "@UI";

export interface ServicesSearchResultsFiltersSidebarProps {
  onShowOnMap: () => any;
  children?: React.ReactNode;
}

export const ServicesSearchResultsFiltersSidebar: React.FC<
  ServicesSearchResultsFiltersSidebarProps
> = ({ onShowOnMap, children }) => {
  const { getServiceType } = useSearchFilters();
  const { addFilter } = useMutateSearchFilters();
  const { visit } = useRouting();
  const [open, setOpen] = React.useState<boolean>(false);
  const { isTablet } = useResponsive();
  const { t } = useTranslation();

  const handleOnMapClick = () => {
    if (onShowOnMap) {
      onShowOnMap();
    }
    if (getServiceType) {
      visit((routes) => routes.visitServiceTypeOnMap(getServiceType));
    }
  };

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
              onClick={handleOnMapClick}
            />
            <div className="flex flex-col ">
              <p className="font-bold text-lg">
                {t("Search by property name")}
              </p>
              <InputGroup>
                <InputLeftElement>
                  <SearchIcon />
                </InputLeftElement>
                <Input
                  onChange={(e) =>
                    addFilter((keys) => [keys.propertyName, e.target.value])
                  }
                  placeholder="e.g. Best Western"
                />
              </InputGroup>
            </div>
            <>{children}</>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

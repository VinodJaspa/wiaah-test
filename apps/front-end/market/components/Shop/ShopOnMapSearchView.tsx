import { useResponsive } from "hooks";
import React from "react";
import {
  LocationSearchInput,
  RenderMap,
  ScrollingWrapper,
  ShopsSearchCardsList,
  ShopsOnMapSearchList,
} from "ui";

export const ShopOnMapSearchView: React.FC<{ location: string }> = ({
  location,
}) => {
  const { isTablet } = useResponsive();
  return (
    <div className="flex p-4 flex-col gap-2">
      <span className="w-full md:w-1/2">
        <LocationSearchInput onLocationSelect={() => { }} />
      </span>
      <div className="w-full relative pb-40 md:pb-0 flex-col-reverse md:flex-row h-auto md:h-[75vh] flex gap-8 md:gap-4 justify-between">
        <div className="w-full absolute bottom-0 left-0 z-50 md:static md:w-full md:h-full">
          <ScrollingWrapper horizonatal={isTablet}>
            {isTablet ? <ShopsOnMapSearchList /> : <ShopsSearchCardsList />}
          </ScrollingWrapper>
        </div>
        <div className="w-full h-[75vh] md:h-auto">
          <RenderMap location={location} />
        </div>
      </div>
    </div>
  );
};

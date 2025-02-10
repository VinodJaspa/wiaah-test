import React from "react";
import { HtmlDivProps, HtmlSvgProps, SearchPlaceItem } from "types";
import { Button, LocationOnPointFillIcon } from "@UI";
import Link from "next/link";
export interface LocationButtonProps extends SearchPlaceItem {
  onLocationClick?: (locationName: string) => any;
  props?: HtmlDivProps;
  iconProps?: HtmlSvgProps;
}

export const LocationButton: React.FC<LocationButtonProps> = ({
  name,
  onLocationClick,
  iconProps,
  props,
}) => {
  return (
    <div
      onClick={() => onLocationClick && onLocationClick(name)}
      className="flex items-center gap-4"
      {...props}
    >
      <div className="border-2 p-2 bg-white rounded-full">
        <LocationOnPointFillIcon
          {...iconProps}
          className={`${iconProps?.className || ""} `}
        />
      </div>
      <Link href={`/places/${name}`} className="capitalize font-semibold">
        {name}
      </Link>
    </div>
  );
};

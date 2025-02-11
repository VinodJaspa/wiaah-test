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
      <LocationOnPointFillIcon
        {...iconProps}
        className={`border-[1px] border-gray-300 rounded-full p-2 text-5xl ${iconProps?.className || ""}`}
      />
      <Link href={`/places/${name}`} className="capitalize font-semibold">
        {name}
      </Link>
    </div>
  );
};

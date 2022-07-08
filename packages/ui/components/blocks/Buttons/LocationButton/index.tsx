import React from "react";
import { IconBaseProps } from "react-icons";
import { HiLocationMarker, HiOutlineLocationMarker } from "react-icons/hi";
import { HtmlDivProps, SearchPlaceItem } from "types";
import { Button } from "ui";
export interface LocationButtonProps extends SearchPlaceItem {
  onLocationClick?: (locationName: string) => any;
  props?: HtmlDivProps;
  iconProps?: IconBaseProps;
}

export const LocationButton: React.FC<LocationButtonProps> = ({
  name,
  onLocationClick,
  iconProps,
  props,
}) => {
  return (
    <Button
      className="px-0 w-full justify-start hover:bg-gray-100 text-black bg-white"
      colorScheme="gray"
      onClick={() => onLocationClick && onLocationClick(name)}
    >
      <div className="flex items-center gap-4" {...props}>
        <span className="border-2 border-gray-200 rounded-full p-2">
          <HiOutlineLocationMarker
            {...iconProps}
            className={`${iconProps?.className || ""} text-2xl`}
          />
        </span>
        <span className="capitalize font-semibold">{name}</span>
      </div>
    </Button>
  );
};

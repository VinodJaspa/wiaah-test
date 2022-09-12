import React from "react";
import { usePublishRef } from "state";

export interface RestaurantDetailsDescriptionSectionProps {
  description: string;
}

export const RestaurantDetailsDescriptionSection: React.FC<
  RestaurantDetailsDescriptionSectionProps
> = ({ description }) => {
  const descriptionRef = usePublishRef((keys) => keys.description);
  return (
    <div ref={descriptionRef} className="flex flex-col gap-[1.875rem]">
      <p className="md:text-lg">{description}</p>
    </div>
  );
};

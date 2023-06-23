import { DesignPlacement } from "@features/API";
import { useGetDesignPlacementQuery } from "@features/Moderation";
import { AspectRatio, AspectRatioImage, Image, Slider } from "@partials";
import React, { useState } from "react";
import { mapArray } from "utils";

export const HomeView: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <HomeViewDesignsDisplay />
    </div>
  );
};

const HomeViewDesignsDisplay: React.FC = () => {
  const { data: designs } = useGetDesignPlacementQuery({
    placement: DesignPlacement.Homepage,
    pagination: {
      page: 1,
      take: 10,
    },
  });
  const [idx, setIdx] = useState<number>(0);

  return (
    <Slider onSliderChange={(idx) => setIdx(idx)} currentItemIdx={idx}>
      <AspectRatio className="" ratio={0.3}>
        {mapArray(designs, (design, i) => (
          <Image alt={design.name} src={design.src}>
            <div className="absolute flex flex-col gap-4 left-8 top-1/2 -translate-y-1/2">
              <h1 className="text-4xl font-semibold">{design.text}</h1>
            </div>
            <div className="flex gap-1 items-center absolute bottom-2"></div>
          </Image>
        ))}
        {mapArray([...Array(designs?.length)], (_, i) => (
          <div
            className={`${
              idx === i ? "bg-primary w-7 h-2" : "w-2 h-2 bg-grayText"
            }`}
          ></div>
        ))}
      </AspectRatio>
    </Slider>
  );
};

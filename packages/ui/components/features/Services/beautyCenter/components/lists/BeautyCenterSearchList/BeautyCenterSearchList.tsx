import React from "react";
import {
  BeautyCenterRecommendedSearchCard,
  ServicesSearchGrid,
  BeautyCenterRecommendedSearchCardProps,
} from "@UI";

export interface BeautyCenterSearchListProps {
  treatments: BeautyCenterRecommendedSearchCardProps["treatment"][];
}

export const RecommendedBeautyCenterSearchList: React.FC<
  BeautyCenterSearchListProps
> = ({ treatments }) => {
  return (
    <ServicesSearchGrid
      data={treatments}
      component={BeautyCenterRecommendedSearchCard}
      handlePassData={(props) => ({ treatment: props })}
    />
  );
};

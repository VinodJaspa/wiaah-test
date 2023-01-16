import React from "react";
import {
  BeautyCenterRecommendedSearchCard,
  ServicesSearchGrid,
  BeautyCenterTreatment,
} from "@UI";

export interface BeautyCenterSearchListProps {
  treatments: BeautyCenterTreatment[];
}

export const RecommendedBeautyCenterSearchList: React.FC<
  BeautyCenterSearchListProps
> = ({ treatments }) => {
  return (
    <ServicesSearchGrid
      data={treatments}
      component={BeautyCenterRecommendedSearchCard}
      handlePassData={(props) => props}
    />
  );
};

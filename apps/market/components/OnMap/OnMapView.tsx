import { ServicesViewsList } from "@data";
import { useRouter } from "next/router";
import React from "react";
import { RenderMap, ScrollingWrapper } from "ui";
import {
  ExtractServiceTypeFromQuery,
  getServiceView,
  ServicesTypeSwitcher,
} from "utils";

export const OnMapView: React.FC = () => {
  const router = useRouter();
  const serviceType = ExtractServiceTypeFromQuery(router.query);
  return (
    <div className="w-screen h-[75vh] flex p-4 gap-4 justify-between">
      <ScrollingWrapper>
        <ServicesTypeSwitcher
          servicesList={ServicesViewsList}
          get={getServiceView.LIST}
          serviceType={serviceType}
        />
      </ScrollingWrapper>
      <RenderMap />
    </div>
  );
};

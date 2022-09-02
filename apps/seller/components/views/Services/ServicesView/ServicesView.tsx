import React from "react";
import { ServicesSearchBadgeList, SocialServicesPostsMetaDataList } from "ui";

export interface ServicesViewProps {}

export const ServicesView: React.FC<ServicesViewProps> = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <ServicesSearchBadgeList />
      <SocialServicesPostsMetaDataList />
    </div>
  );
};

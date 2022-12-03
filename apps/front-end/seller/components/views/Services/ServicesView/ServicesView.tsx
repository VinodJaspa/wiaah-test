import React from "react";
import { useRouting } from "routing";
import { ServicesType } from "types";
import { ServicesSearchBadgeList, SocialServicesPostsMetaDataList } from "ui";

export interface ServicesViewProps {}

export const ServicesView: React.FC<ServicesViewProps> = () => {
  const serviceTabKey = "tab";
  const { getParam, visit } = useRouting();
  const tabKey = getParam(serviceTabKey) as ServicesType;
  return (
    <div className="flex flex-col gap-4 w-full">
      <ServicesSearchBadgeList
        activeKey={tabKey || "hotel"}
        onClick={(type) => {
          visit((r) => r.addQuery({ [serviceTabKey]: type }));
        }}
      />
      <SocialServicesPostsMetaDataList />
    </div>
  );
};

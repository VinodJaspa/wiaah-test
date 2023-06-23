import React from "react";
import { useRouting } from "routing";
import { ServicesType } from "types";
import {
  ServicesSearchBadgeList,
  SocialServicesPostsMetaDataList,
  useGetServicePostSuggestionQuery,
  usePaginationControls,
} from "ui";

export interface ServicesViewProps {}

export const ServicesView: React.FC<ServicesViewProps> = () => {
  const serviceTabKey = "tab";
  const { getParam, visit } = useRouting();
  const tabKey = getParam(serviceTabKey) as ServicesType;
  const { controls, pagination } = usePaginationControls();
  const { data } = useGetServicePostSuggestionQuery({
    serviceType: tabKey,
    pagination,
  });

  return (
    <div className="flex flex-col gap-4 w-full">
      <ServicesSearchBadgeList
        activeKey={tabKey || "hotel"}
        onClick={(type) => {
          visit((r) => r.addQuery({ [serviceTabKey]: type }));
        }}
      />
      <SocialServicesPostsMetaDataList
        posts={data?.map((v) => ({
          ...v,
          profile: v.user.profile,
          serviceType: tabKey,
        }))}
      />
    </div>
  );
};

import {
  HealthCenterServicePrviderHeaderData,
  ServicesProviderHeaderData,
} from "api";
import React from "react";
import { useScrollTo } from "state";
import { Avatar, SectionTabType, SectionsScrollTabList } from "ui";

export interface HealthCenterHeaderProps
  extends HealthCenterServicePrviderHeaderData {}

export const HealthCenterHeader: React.FC<HealthCenterHeaderProps> = ({
  name,
  rating,
  reviewsCount,
  thumbnail,
  specialty,
}) => {
  const { ScrollTo } = useScrollTo();
  return (
    <div className="relative w-full flex flex-col h-[20rem]">
      <div className="bg-primary h-3/4"></div>
      <div className="h-1/4 bg-white"></div>
      <div className="absolute items-stretch -translate-y-1/4 w-fit gap-8 flex top-1/2 left-1/2 -translate-x-1/2">
        <Avatar className="w-[12rem] h-[12rem]" src={thumbnail} />
        <div className="flex flex-col justify-between">
          <div className="text-white flex flex-col gap-2">
            <p className="font-bold text-2xl">{name}</p>
            <p>{specialty}</p>
          </div>
          <div className="flex gap-8">
            <SectionsScrollTabList tabs={ServicesProviderTabs} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ServicesProviderTabs: SectionTabType[] = [
  {
    slug: "description",
    name: "Summary",
  },
  {
    name: "Map",
    slug: "map",
  },
  {
    slug: "presentation",
    name: "Presentation",
  },
];

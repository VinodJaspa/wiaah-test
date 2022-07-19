import React from "react";
import { useTranslation } from "react-i18next";
import { TabType } from "types";
import {
  ProductImageGallery,
  ServicesProviderHeader,
  SpinnerFallback,
  useGetServicesProviderQuery,
  useSearchFilters,
  AspectRatio,
  Divider,
  Tabs,
  TabItem,
  TabList,
  TabTitle,
  TabsHeader,
  ServicesProviderLocationWorkDetailsSection,
  ServiceRightView,
  ServicesProviderDescriptionSection,
  ServiceReservastion,
} from "ui";

export const ServicesProviderView: React.FC = () => {
  const { filters } = useSearchFilters();
  const {
    data: res,
    isError,
    isLoading,
  } = useGetServicesProviderQuery(filters);
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8 py-8">
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        {res ? <ServicesProviderHeader {...res.data} /> : null}
      </SpinnerFallback>
      <Divider />
      <div className="w-full">
        <AspectRatio ratio={5 / 11.12}>
          <ProductImageGallery
            images={
              res
                ? Array.isArray(res.data.heroImages)
                  ? res.data.heroImages.map((img, i) => ({
                      original: img.src,
                      thumbnail: img.thumbnail,
                      type: img.type,
                      alt: String(i),
                    }))
                  : []
                : []
            }
          />
        </AspectRatio>
      </div>
      <div className="flex flex-col gap-4">
        <Tabs>
          <TabsHeader className="justify-center" />
          <div className="flex gap-4">
            <TabList className="flex justify-center" />
            <div className="w-full gap-4 flex">
              <div className="w-full">
                <ServiceRightView serviceId="123" />
              </div>
              <div className="w-full">
                <ServiceReservastion />
              </div>
            </div>
          </div>
          {ServicesProviderTabs.map(({ component, name }, i) => (
            <React.Fragment key={i}>
              <TabTitle TabKey={i}>
                {({ currentTabIdx }) => (
                  <p className={`${currentTabIdx === i ? "text-primary" : ""}`}>
                    {t(name)}
                  </p>
                )}
              </TabTitle>
              <TabItem>{component}</TabItem>
            </React.Fragment>
          ))}
        </Tabs>
        <span className="w-full flex justify-center">
          {res ? (
            <ServicesProviderLocationWorkDetailsSection {...res.data} />
          ) : null}
        </span>
      </div>
    </div>
  );
};

const ServicesProviderTabs: TabType[] = [
  {
    component: <ServicesProviderDescriptionSection />,
    name: "Description",
  },
  {
    name: "Location",
    component: <div />,
  },
  {
    component: <div></div>,
    name: "Hotel services",
  },
  {
    component: <div></div>,
    name: "Rooms",
  },
  {
    component: <div></div>,
    name: "Customer reviews",
  },
];

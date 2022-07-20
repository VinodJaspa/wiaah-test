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
  TabTitle,
  TabsHeader,
  ServicesProviderLocationWorkDetailsSection,
  ServiceRightView,
  ServicesProviderDescriptionSection,
  ServiceReservastion,
  Button,
  Reviews,
} from "ui";
import { useElementScrolling, useScrollTo } from "utils";
import { reviews } from "placeholder";

export const ServicesProviderView: React.FC = () => {
  const { filters } = useSearchFilters();
  const {
    data: res,
    isError,
    isLoading,
  } = useGetServicesProviderQuery(filters);
  const reservationRef = React.useRef<HTMLDivElement>(null);
  const mapRef = React.useRef<HTMLDivElement>(null);
  const LocationSectionRef = React.useRef<HTMLDivElement>(null);

  const { ScrollTo } = useScrollTo([
    { key: "map", ref: mapRef },
    { key: "locationSection", ref: LocationSectionRef },
  ]);

  const { passed, y } = useElementScrolling(reservationRef);
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8 py-8">
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        {res ? <ServicesProviderHeader {...res.data} /> : null}
      </SpinnerFallback>
      <Divider />
      <div className="w-full relative">
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
        <Button
          onClick={() => ScrollTo("map")}
          colorScheme="white"
          className="absolute left-36 bg-white text-black  px-4 py-2 rounded-xl bottom-8"
        >
          {t("Show on map")}
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Tabs>
          <TabsHeader className="justify-center" />
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
        <div className="flex gap-4">
          <div className="flex flex-col w-full gap-4">
            <div className="w-full gap-4 flex">
              <ServicesProviderDescriptionSection />
            </div>
            {res ? (
              <div ref={LocationSectionRef} className="w-full">
                <ServicesProviderLocationWorkDetailsSection {...res.data} />
              </div>
            ) : null}
            <div>
              <Reviews id={res?.data.id || ""} reviews={reviews} />
            </div>
          </div>
          <div
            ref={reservationRef}
            className={`w-[min(30rem,100%)] relative h-full`}
          >
            <div
              style={{
                top: `${Math.abs(0) + 16 || 0}px`,
              }}
              className={`${
                passed ? `absolute left-0` : ""
              } w-full h-fit transition-all`}
            >
              <ServiceReservastion />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServicesProviderTabs: TabType[] = [
  {
    component: <div />,
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

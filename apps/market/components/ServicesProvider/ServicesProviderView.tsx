import React from "react";
import { useTranslation } from "react-i18next";
import {
  ServicesProviderHeader,
  SpinnerFallback,
  useGetServicesProviderQuery,
  useSearchFilters,
  AspectRatio,
  Divider,
  Tabs,
  TabTitle,
  TabsHeader,
  ServicesProviderLocationWorkDetailsSection,
  PopularAmenitiesSection,
  ServicesProviderDescriptionSection,
  ServiceReservastion,
  Button,
  Reviews,
  Slider,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "ui";
import { useElementScrolling } from "utils";
import { useScrollTo, usePublishRef } from "state";
import { reviews } from "placeholder";

export const ServicesProviderView: React.FC = () => {
  const { filters } = useSearchFilters();
  const {
    data: res,
    isError,
    isLoading,
  } = useGetServicesProviderQuery(filters);

  const descriptionRef = usePublishRef("description");
  const reviewsRef = usePublishRef("reviews");

  const { ScrollTo } = useScrollTo();

  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8 py-8">
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        {res ? <ServicesProviderHeader {...res.data} /> : null}
      </SpinnerFallback>
      <Divider />
      <div className="w-full relative">
        <AspectRatio ratio={5 / 11.12}>
          {res && Array.isArray(res.data.heroImages) ? (
            <div className="w-full gap-4 flex h-full flex-col md:flex-row">
              <div className="w-32">
                <Slider itemsCount={8} variant="vertical">
                  {res.data.heroImages.map((img, i) => (
                    <img
                      className={`${
                        i === 0 ? "" : "pt-2"
                      } rounded w-full h-full object-cover`}
                      key={i}
                      src={img.src}
                    />
                  ))}
                </Slider>
              </div>
              <Slider
                leftArrowComponent={() => (
                  <div className="bg-black mx-4  bg-opacity-50 text-primary p-1  rounded-full text-3xl">
                    <ArrowLeftIcon />
                  </div>
                )}
                rightArrowComponent={() => (
                  <div className="bg-black  mx-4 bg-opacity-50 text-primary p-1  rounded-full text-3xl">
                    <ArrowRightIcon />
                  </div>
                )}
              >
                {res.data.heroImages.map((img, i) => (
                  <img
                    className="w-full h-full object-cover"
                    key={i}
                    src={img.src}
                  />
                ))}
              </Slider>
            </div>
          ) : null}
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
          {ServicesProviderTabs.map(({ slug, name }, i) => (
            <React.Fragment key={i}>
              <TabTitle TabKey={i}>
                {({ currentTabIdx }) => (
                  <p
                    onClick={() => ScrollTo(slug)}
                    className={`${currentTabIdx === i ? "text-primary" : ""}`}
                  >
                    {t(name)}
                  </p>
                )}
              </TabTitle>
            </React.Fragment>
          ))}
        </Tabs>
        <div className="flex gap-4 ">
          <div
            style={{
              width: `calc(100% - min(30rem , 100%))`,
            }}
            className="flex flex-col w-full gap-4"
          >
            <div ref={descriptionRef} className="w-full ">
              <ServicesProviderDescriptionSection />
            </div>
            <Divider />
            {res ? (
              <>
                <PopularAmenitiesSection
                  cols={2}
                  amenities={res.data.PopularAmenities || []}
                />
                <Divider />
                <div className="w-full">
                  <ServicesProviderLocationWorkDetailsSection {...res.data} />
                </div>
              </>
            ) : null}
            <div ref={reviewsRef}>
              <Reviews id={res?.data.id || ""} reviews={reviews} />
            </div>
          </div>
          <div className="w-[min(30rem,100%)]">
            <ServiceReservationSideBar />
          </div>
        </div>
      </div>
    </div>
  );
};

const ServicesProviderTabs: { name: string; slug: string }[] = [
  {
    slug: "description",
    name: "Description",
  },
  {
    name: "Contact",
    slug: "contact",
  },
  {
    slug: "policies",
    name: "Policies",
  },
  {
    name: "Working hours",
    slug: "workingHours",
  },
  {
    slug: "rooms",
    name: "Rooms",
  },
  {
    slug: "reviews",
    name: "Customer reviews",
  },
];

export const ServiceReservationSideBar = () => {
  const reservationRef = React.useRef<HTMLDivElement>(null);
  const { passed, y } = useElementScrolling(reservationRef);

  return (
    <div ref={reservationRef} className={`w-full relative h-full`}>
      <div
        style={{
          top: `${Math.abs(y) + 16 || 0}px`,
        }}
        className={`${
          passed ? `absolute left-0` : ""
        } w-full h-fit transition-all`}
      >
        <ServiceReservastion />
      </div>
    </div>
  );
};

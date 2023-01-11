import React from "react";
import {
  SpinnerFallback,
  Divider,
  ServiceReachOutSection,
  ServicePoliciesSection,
  ServiceWorkingHoursSection,
  ServicesProviderDescriptionSection,
  Reviews,
  SectionTabType,
  ServicePresentationCarosuel,
  StaticSideBarWrapper,
  SectionsScrollTabList,
  Accordion,
  useGetHealthCenterDetailsQuery,
  ServicesProviderHeader,
  WorkingDaysCalender,
  HealthCenterDoctorsList,
  ServiceOnMapLocalizationSection,
} from "ui";
import { reviews } from "placeholder";
import { useResponsive } from "hooks";

export const HealthCenterDetailsView: React.FC<{ id: string }> = ({ id }) => {
  const {
    data: res,
    isError,
    isLoading,
  } = useGetHealthCenterDetailsQuery({ id });

  const { isMobile } = useResponsive();

  return (
    <div className="flex flex-col gap-8 px-2 py-8">
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        {res ? (
          <ServicesProviderHeader
            serviceTitle={res.data.getHealthCenter.serviceMetaInfo.title}
            rating={res.data.getHealthCenter.rating}
            reviewsCount={res.data.getHealthCenter.totalReviews}
          />
        ) : null}
      </SpinnerFallback>
      <Divider />
      <ServicePresentationCarosuel
        data={res ? res.data.getHealthCenter.presentations || [] : []}
      />
      <SectionsScrollTabList visible={!isMobile} tabs={ServicesProviderTabs} />
      <StaticSideBarWrapper
        sidebar={
          <WorkingDaysCalender
            workingDates={
              res
                ? Object.values(
                    res.data.getHealthCenter.workingHours.weekdays
                  ).map((value) => ({
                    date: new Date().toString(),
                    workingHoursRanges:
                      typeof value === "object"
                        ? [{ from: value.periods[0], to: value.periods[1] }]
                        : [],
                  }))
                : []
            }
          />
        }
      >
        {res ? (
          <>
            <Accordion>
              <ServicesProviderDescriptionSection
                description={
                  res.data.getHealthCenter.serviceMetaInfo.description
                }
              />
              <Divider />
              <HealthCenterDoctorsList
                cancelation={res.data.getHealthCenter.cancelationPolicies || []}
                doctors={res.data.getHealthCenter.doctors || []}
              />
              <ServiceReachOutSection
                email={res.data.getHealthCenter.contact.email}
                location={res.data.getHealthCenter.location}
                telephone={res.data.getHealthCenter.contact.phone}
              />
              <ServiceWorkingHoursSection
                workingHours={res.data.getHealthCenter.workingHours}
              />
              <ServicePoliciesSection
                title=""
                policies={res.data.getHealthCenter.policies}
              />
              <ServiceOnMapLocalizationSection
                location={res.data.getHealthCenter.location}
              />
            </Accordion>
          </>
        ) : null}
        <Reviews id={res?.data.getHealthCenter.id || ""} reviews={reviews} />
      </StaticSideBarWrapper>
    </div>
  );
};

const ServicesProviderTabs: SectionTabType[] = [
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
    slug: "doctors",
    name: "Doctors",
  },
  {
    slug: "localization",
    name: "Localization",
  },
  {
    slug: "reviews",
    name: "Customer reviews",
  },
];

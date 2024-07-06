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
  const { data: res, isError, isLoading } = useGetHealthCenterDetailsQuery(id);

  const { isMobile } = useResponsive();

  return (
    <div className="flex flex-col gap-8 px-2 py-8">
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        {res ? (
          <ServicesProviderHeader
            serviceTitle={res.serviceMetaInfo.title}
            rating={res.rating}
            reviewsCount={res.totalReviews}
          />
        ) : null}
      </SpinnerFallback>
      <Divider />
      <ServicePresentationCarosuel data={res ? res.presentations || [] : []} />
      <SectionsScrollTabList visible={!isMobile} tabs={ServicesProviderTabs} />
      <StaticSideBarWrapper
        sidebar={
          <div className="w-full h-full overflow-hidden">
            <WorkingDaysCalender
              takenDates={
                res
                  ? Object.values(res.takenSchedule!.weekdays).map((value) => ({
                    date: new Date().toString(),
                    workingHoursRanges:
                      typeof value === "object"
                        ? [{ from: value!.periods[0], to: value!.periods[1] }]
                        : [],
                  }))
                  : []
              }
              workingDates={
                res
                  ? Object.values(res.workingSchedule!.weekdays).map(
                    (value) => ({
                      date: new Date().toString(),
                      workingHoursRanges:
                        typeof value === "object"
                          ? [
                            {
                              from: value!.periods[0],
                              to: value!.periods[1],
                            },
                          ]
                          : [],
                    })
                  )
                  : []
              }
            />
          </div>
        }
      >
        {res ? (
          <>
            <Accordion>
              <ServicesProviderDescriptionSection
                description={res.serviceMetaInfo.description}
              />
              <Divider />
              <HealthCenterDoctorsList
                cancelation={res.cancelationPolicies || []}
                doctors={res.doctors || []}
              />
              <ServiceReachOutSection
                email={res.contact.email}
                location={res.location}
                telephone={res.contact.phone}
              />
              <ServiceWorkingHoursSection workingHours={res.workingSchedule!} />
              <ServicePoliciesSection title="" policies={res.policies} />
              <ServiceOnMapLocalizationSection location={res.location} />
            </Accordion>
          </>
        ) : null}
        <Reviews id={res?.id || ""} reviews={reviews} />
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

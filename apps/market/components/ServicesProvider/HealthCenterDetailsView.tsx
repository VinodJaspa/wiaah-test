import React from "react";
import {
  SpinnerFallback,
  useSearchFilters,
  Divider,
  ServiceReachOutSection,
  ServiceOnMapLocationSection,
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
  WorkingDaysCalander,
  HealthCenterDoctorsList,
} from "ui";
import { reviews } from "placeholder";
import { useTranslation } from "react-i18next";
import { useResponsive } from "hooks";

export const HealthCenterDetailsView: React.FC = () => {
  const { filters } = useSearchFilters();
  const {
    data: res,
    isError,
    isLoading,
  } = useGetHealthCenterDetailsQuery(filters);

  const { isMobile } = useResponsive();

  return (
    <div className="flex flex-col gap-8 px-2 py-8">
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        {res ? <ServicesProviderHeader {...res.data} /> : null}
      </SpinnerFallback>
      <Divider />
      <ServicePresentationCarosuel
        data={res ? res.data.presintations || [] : []}
      />
      <SectionsScrollTabList visible={!isMobile} tabs={ServicesProviderTabs} />
      <StaticSideBarWrapper
        sidebar={
          <WorkingDaysCalander
            workingDates={res ? res.data.workingDates : []}
          />
        }
      >
        {res ? (
          <>
            <Accordion>
              <ServicesProviderDescriptionSection
                description={res.data.description}
                name={res.data.name}
                proprtyType={res.data.proprtyType}
              />
              <Divider />
              <HealthCenterDoctorsList doctors={res.data.doctors || []} />
              <ServiceReachOutSection
                email={res.data.email}
                location={res.data.location}
                telephone={res.data.telephone}
              />
              <ServiceWorkingHoursSection workingDays={res.data.workingDays} />
              <ServicePoliciesSection policies={res.data.policies} />
              <ServiceOnMapLocationSection location={res.data.location} />
            </Accordion>
          </>
        ) : null}
        <Reviews id={res?.data.id || ""} reviews={reviews} />
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

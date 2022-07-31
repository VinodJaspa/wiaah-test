import React from "react";
import {
  ServicesProviderHeader,
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
  useGetBeautyCenterDetailsQuery,
  BeautyCenterTreatmentsList,
} from "ui";
import { reviews } from "placeholder";
import { useTranslation } from "react-i18next";
import { randomNum } from "utils";

export const BeautyCenterServiceDetailsView: React.FC = () => {
  const { filters } = useSearchFilters();
  const {
    data: res,
    isError,
    isLoading,
  } = useGetBeautyCenterDetailsQuery(filters["id"] as string);

  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8 px-2 py-8">
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        {res ? <ServicesProviderHeader {...res.data} /> : null}
      </SpinnerFallback>
      <Divider />
      <ServicePresentationCarosuel
        data={res ? res.data.presintations || [] : []}
      />
      <SectionsScrollTabList tabs={ServicesProviderTabs} />
      <StaticSideBarWrapper sidebar={null}>
        {res ? (
          <>
            <ServicesProviderDescriptionSection
              description={res.data.description}
              name={res.data.name}
              proprtyType={res.data.proprtyType}
            />
            <Divider />
            <BeautyCenterTreatmentsList
              cancelation={res.data.cancelationPolicies || []}
              treatments={res.data.treatments}
            />
            <ServiceReachOutSection
              email={res.data.email}
              location={res.data.location}
              telephone={res.data.telephone}
            />

            <ServiceWorkingHoursSection workingDays={res.data.workingDays} />
            <ServicePoliciesSection policies={res.data.policies} />
            <ServiceOnMapLocationSection location={res.data.location} />
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
    name: "Treatments",
    slug: "treatments",
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

import React from "react";
import {
  ServicesProviderHeader,
  SpinnerFallback,
  useSearchFilters,
  Divider,
  ServiceReachOutSection,
  ServiceOnMapLocalizationSection,
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

export const BeautyCenterServiceDetailsView: React.FC<{ id: string }> = ({
  id,
}) => {
  const { data: res, isError, isLoading } = useGetBeautyCenterDetailsQuery(id);

  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8 px-2 py-8">
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        {res ? (
          <ServicesProviderHeader
            rating={res.data.getBeautyCenterById.rating}
            reviewsCount={res.data.getBeautyCenterById.totalReviews}
            serviceTitle={res.data.getBeautyCenterById.serviceMetaInfo.title}
          />
        ) : null}
      </SpinnerFallback>
      <Divider />
      <ServicePresentationCarosuel
        data={res ? res.data.getBeautyCenterById.presentations || [] : []}
      />
      <SectionsScrollTabList tabs={ServicesProviderTabs} />
      <StaticSideBarWrapper sidebar={null}>
        {res ? (
          <>
            <ServicesProviderDescriptionSection
              description={
                res.data.getBeautyCenterById.serviceMetaInfo.description
              }
            />
            <Divider />
            <BeautyCenterTreatmentsList
              cancelation={
                res.data.getBeautyCenterById.cancelationPolicies || []
              }
              treatments={res.data.getBeautyCenterById.treatments}
            />
            <ServiceReachOutSection
              email={res.data.getBeautyCenterById.contact.email}
              location={res.data.getBeautyCenterById.location}
              telephone={res.data.getBeautyCenterById.contact.phone}
            />

            <ServiceWorkingHoursSection
              workingHours={res.data.getBeautyCenterById.workingHours}
            />
            <ServicePoliciesSection
              policies={res.data.getBeautyCenterById.policies}
              title=""
            />
            <ServiceOnMapLocalizationSection
              location={res.data.getBeautyCenterById.location}
            />
          </>
        ) : null}
        <Reviews
          id={res?.data.getBeautyCenterById.id || ""}
          reviews={reviews}
        />
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

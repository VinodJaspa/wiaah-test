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
  WorkingDaysCalender,
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
            rating={res.rating}
            reviewsCount={res.totalReviews}
            serviceTitle={res.serviceMetaInfo.title}
          />
        ) : null}
      </SpinnerFallback>
      <Divider />
      <ServicePresentationCarosuel data={res ? res.presentations || [] : []} />
      <SectionsScrollTabList tabs={ServicesProviderTabs} />
      <StaticSideBarWrapper
        sidebar={
          <div className="w-full h-full overflow-hidden">
            <WorkingDaysCalender
              workingDates={
                res
                  ? Object.values(res.workingHours.weekdays).map((value) => ({
                      date: new Date().toString(),
                      workingHoursRanges:
                        typeof value === "object"
                          ? [{ from: value.periods[0], to: value.periods[1] }]
                          : [],
                    }))
                  : []
              }
            />
          </div>
        }
      >
        {res ? (
          <>
            <ServicesProviderDescriptionSection
              description={res.serviceMetaInfo.description}
            />
            <Divider />
            <BeautyCenterTreatmentsList
              cancelation={res.cancelationPolicies || []}
              treatments={res.treatments}
            />
            <ServiceReachOutSection
              email={res.contact.email}
              location={res.location}
              telephone={res.contact.phone}
            />

            <ServiceWorkingHoursSection workingHours={res.workingHours} />
            <ServicePoliciesSection policies={res.policies} title="" />
            <ServiceOnMapLocalizationSection location={res.location} />
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

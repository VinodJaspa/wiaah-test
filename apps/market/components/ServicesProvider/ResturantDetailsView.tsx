import React from "react";
import {
  ServicesProviderHeader,
  SpinnerFallback,
  useSearchFilters,
  Divider,
  ServiceOnMapLocationSection,
  ServiceReachOutSection,
  ServiceWorkingHoursSection,
  ServicePoliciesSection,
  ServicesProviderDescriptionSection,
  Reviews,
  SectionTabType,
  ServicePresentationCarosuel,
  StaticSideBarWrapper,
  SectionsScrollTabList,
  ResturantFindTableFilterStepper,
  Accordion,
  ResturantMenuListSection,
  useGetResturantServiceDetaislDataQuery,
  HStack,
  PriceDisplay,
} from "ui";
import { reviews } from "placeholder";
import { useTranslation } from "react-i18next";
import { useGetUserInput } from "state";

export const ResturantDetailsView: React.FC = () => {
  const { filters } = useSearchFilters();
  const {
    data: res,
    isError,
    isLoading,
  } = useGetResturantServiceDetaislDataQuery(filters);

  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8 py-8">
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        {res ? <ServicesProviderHeader {...res.data} /> : null}
      </SpinnerFallback>
      <Divider />
      <ServicePresentationCarosuel
        data={res ? res.data.presintations || [] : []}
      />
      <SectionsScrollTabList tabs={ServicesProviderTabs} />
      <StaticSideBarWrapper
        sidebar={() => {
          const { input } = useGetUserInput();
          const orders = input["orders"];

          const totalOrdersCost = orders
            ? Array.isArray(orders)
              ? orders.reduce((acc, curr) => acc + curr.qty * curr.price, 0)
              : 0
            : 0;

          const vatPercent = res ? res.data.vatPercent : 0;

          const vatCost = (vatPercent / 100) * totalOrdersCost;

          return (
            <div className="flex flex-col">
              <ResturantFindTableFilterStepper />
              <Divider className="my-4 border-gray-300" />
              <div className="flex flex-col gap-4">
                <HStack className="text-xl font-bold justify-between">
                  <p>{t("Total")}</p>
                  <PriceDisplay
                    priceObject={{
                      amount: totalOrdersCost,
                    }}
                  />
                </HStack>
                <HStack className="font-semibold text-lg justify-between">
                  <span className="flex whitespace-nowrap gap-2">
                    <p>
                      {t("VAT")} {vatPercent}%
                    </p>
                    <span className="flex whitespace-nowrap">
                      {`(`} <PriceDisplay priceObject={{ amount: vatCost }} />{" "}
                      {`)`}
                    </span>
                  </span>
                  <PriceDisplay
                    priceObject={{
                      amount: vatCost,
                    }}
                  />
                </HStack>
                <Divider />
                <HStack className="text-2xl font-bold justify-between">
                  <p>{t("Finale total")}</p>
                  <PriceDisplay
                    priceObject={{
                      amount: totalOrdersCost + vatCost,
                    }}
                  />
                </HStack>
              </div>
            </div>
          );
        }}
      >
        <SpinnerFallback isError={isError} isLoading={isLoading}>
          {res ? (
            <ServicesProviderDescriptionSection
              description={res.data.description}
              name={res.data.name}
              proprtyType={res.data.proprtyType}
            />
          ) : null}
        </SpinnerFallback>
        <Divider />
        <Accordion defaultOpenItems={[...Array(10)].map((_, i) => `${i}`)}>
          <SpinnerFallback isLoading={isLoading} isError={isError}>
            {res ? (
              <ServiceReachOutSection
                email={res.data.email}
                location={res.data.location}
                telephone={res.data.telephone}
              />
            ) : null}
          </SpinnerFallback>
          <SpinnerFallback isLoading={isLoading} isError={isError}>
            {res ? <ResturantMenuListSection menus={res.data.menus} /> : null}
          </SpinnerFallback>
          <SpinnerFallback isLoading={isLoading} isError={isError}>
            {res ? (
              <ServiceWorkingHoursSection workingDays={res.data.workingDays} />
            ) : null}
          </SpinnerFallback>
          <SpinnerFallback isLoading={isLoading} isError={isError}>
            {res ? (
              <ServicePoliciesSection policies={res.data.policies} />
            ) : null}
          </SpinnerFallback>
          <SpinnerFallback isLoading={isLoading} isError={isError}>
            {res ? (
              <ServiceOnMapLocationSection location={res.data.location} />
            ) : null}
          </SpinnerFallback>
        </Accordion>
        <SpinnerFallback isLoading={isLoading} isError={isError}>
          {res ? <Reviews id={res?.data.id || ""} reviews={reviews} /> : null}
        </SpinnerFallback>
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
    slug: "menu",
    name: "Menu",
  },
  {
    slug: "reviews",
    name: "Customer reviews",
  },
];

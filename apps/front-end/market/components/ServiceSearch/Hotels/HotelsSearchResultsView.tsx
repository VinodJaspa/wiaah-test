import { FormatedSearchableFilter } from "api";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { debounce } from "utils";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  DateFormInput,
  DateFormInputProps,
  FormikInput,
  SearchInput,
  SearchInputProps,
  Select,
  SelectOption,
  SelectProps,
  ServiceSearchFilter,
  HotelsSearchList,
  ServicesSearchResultsFiltersSidebar,
  useMutateSearchFilters,
  useGetFilteredHotelRoomsQuery,
} from "ui";
import { useResponsive } from "hooks";

export const HotelsSearchResultsView: React.FC = () => {
  const { addFilter, setFilters, filtersKeys } = useMutateSearchFilters();
  const { t } = useTranslation();
  const router = useRouter();
  const { isTablet } = useResponsive();
  const { data } = useGetFilteredHotelRoomsQuery({});

  React.useEffect(() => {
    if (typeof router.query.location === "string") {
      addFilter((keys) => [keys.location, router.query.location]);
    }
  }, [router]);

  const handleFiltersUpdate = debounce(
    (filters: FormatedSearchableFilter) =>
      setFilters((state) => ({ ...state, ...filters })),
    1000
  );

  return (
    <div
      className={`${
        isTablet ? "flex-col gap-4" : "flex-row gap-12"
      } relative flex  py-4`}
    >
      <ServicesSearchResultsFiltersSidebar onShowOnMap={() => {}}>
        <Formik<FormatedSearchableFilter>
          validateOnBlur={false}
          initialValues={{}}
          onSubmit={() => {}}
        >
          {({ setFieldValue, values }) => {
            handleFiltersUpdate(values);
            const searchQueryKey = filtersKeys.searchQuery;
            return (
              <Form>
                <div className="p-4 w-full bg-primary-200 text-black flex flex-col gap-2">
                  <FormikInput<SearchInputProps>
                    as={SearchInput}
                    onValueChange={(v) => setFieldValue("search_query", v)}
                    value={
                      typeof values[searchQueryKey] === "string"
                        ? values[searchQueryKey].length > 0
                          ? values[searchQueryKey]
                          : typeof router.query.location === "string"
                          ? router.query.location
                          : ""
                        : ""
                    }
                    innerProps={{ className: "bg-white text-black h-12" }}
                    label={t("Destination") + "/" + t("property name") + ":"}
                    name="search_query"
                  />
                  <FormikInput<DateFormInputProps>
                    as={DateFormInput}
                    className={"bg-white h-12"}
                    menuProps={{
                      menuListProps: {
                        className: "translate-x-full origin-top-left",
                      },
                    }}
                    placeholder={t("Check-in") + " " + t("date")}
                    label={t("Check-in") + " " + t("date") + ":"}
                    onDateChange={(date) =>
                      setFieldValue("check-in_date", date)
                    }
                    dateValue={values["check-in_date"] as string}
                    name="check-in_date"
                  />
                  <FormikInput<DateFormInputProps>
                    as={DateFormInput}
                    menuProps={{
                      menuListProps: {
                        className: "translate-x-full origin-top-left",
                      },
                    }}
                    onDateChange={(date) =>
                      setFieldValue("check-out_date", date)
                    }
                    dateValue={values["check-out_date"] as string}
                    placeholder={t("Check-out") + " " + t("date")}
                    className={"bg-white h-12 "}
                    label={t("Check-out") + " " + t("date") + ":"}
                    name="check-out_date"
                  />
                  <FormikInput<SelectProps> as={Select} name="test">
                    <SelectOption value={"1"}>test</SelectOption>
                    <SelectOption value={"1"}>test</SelectOption>
                    <SelectOption value={"1"}>test</SelectOption>
                    <SelectOption value={"1"}>test</SelectOption>
                  </FormikInput>
                  <Button>{t("Search")}</Button>
                </div>

                <ServiceSearchFilter
                  onChange={{
                    onOptionSelect: setFieldValue,
                    onOptionsSelect: setFieldValue,
                    onRangeChange: setFieldValue,
                  }}
                />
              </Form>
            );
          }}
        </Formik>
      </ServicesSearchResultsFiltersSidebar>

      <HotelsSearchList rooms={data} total={data.length} />
    </div>
  );
};

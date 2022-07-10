import { FilteredServiceMetaDataType, FormatedSearchableFilter } from "api";
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
  ServiceDetailedSearchCard,
  ServiceSearchFilter,
  ServicesSearchList,
  ShowMapButton,
  SpinnerFallback,
  useGetFilteredServicesMetaDataQuery,
  useSearchFilters,
} from "ui";

export const ServiceFilteredSearchView: React.FC = () => {
  const { setFilters, filters } = useSearchFilters();
  const { t } = useTranslation();
  const router = useRouter();
  React.useEffect(() => {
    console.log(router);
    if (typeof router.query.location === "string") {
      console.log(router.query.location);
      setFilters((fs) => ({ ...fs, search_query: router.query.location }));
    }
  }, [router]);
  const [services, setServices] = React.useState<FilteredServiceMetaDataType[]>(
    []
  );
  const { isLoading, isError } = useGetFilteredServicesMetaDataQuery(filters, {
    onSuccess: (data) => {
      setServices(data);
    },
  });
  const handleFiltersUpdate = debounce(
    (filters: FormatedSearchableFilter) => setFilters(filters),
    1000
  );
  return (
    <div className="relative flex gap-12 p-4">
      <div className="">
        <ShowMapButton
          onClick={() => {
            router.replace("/search/services/onmap");
          }}
        />
        <Formik<FormatedSearchableFilter>
          validateOnBlur={false}
          initialValues={{}}
          onSubmit={() => {}}
        >
          {({ setFieldValue, values }) => {
            handleFiltersUpdate(values);
            return (
              <Form>
                <div className="p-4 w-64 bg-primary-200 text-black flex flex-col gap-2">
                  <FormikInput<SearchInputProps>
                    as={SearchInput}
                    onValueChange={(v) => setFieldValue("search_query", v)}
                    value={
                      typeof values["search_query"] === "string" &&
                      values["search_query"].length > 0
                        ? values["search_query"]
                        : typeof router.query.location === "string"
                        ? router.query.location
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
      </div>
      <ServicesSearchList />
    </div>
  );
};

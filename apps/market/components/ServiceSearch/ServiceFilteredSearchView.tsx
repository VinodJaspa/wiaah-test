import { FilteredServiceMetaDataType } from "api";
import { Form, Formik } from "formik";
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
  ShowMapButton,
  SpinnerFallback,
  useGetFilteredServicesMetaDataQuery,
} from "ui";

export const ServiceFilteredSearchView: React.FC = () => {
  const { t } = useTranslation();
  const [services, setServices] = React.useState<FilteredServiceMetaDataType[]>(
    []
  );
  const { isLoading, isError } = useGetFilteredServicesMetaDataQuery([], {
    onSuccess: (data) => {
      console.log(data);
      setServices(data);
    },
  });
  return (
    <div className="relative flex gap-12 p-4">
      <div className="">
        <ShowMapButton onClick={() => {}} />
        <Formik initialValues={{}} onSubmit={() => {}}>
          {({}) => {
            return (
              <Form>
                <div className="p-4 w-64 bg-primary-200 text-black flex flex-col gap-2">
                  <FormikInput<SearchInputProps>
                    as={SearchInput}
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
                    name="check-in_date"
                  />
                  <FormikInput<DateFormInputProps>
                    as={DateFormInput}
                    menuProps={{
                      menuListProps: {
                        className: "translate-x-full origin-top-left",
                      },
                    }}
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

                <ServiceSearchFilter />
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className="w-full flex flex-col gap-4 justify-center">
        <SpinnerFallback isLoading={isLoading} isError={isError}>
          {services.length < 1 ? (
            <div className="w-fit h-48 flex just-center items-center text-2xl">
              <span>{t("no services found")}</span>
            </div>
          ) : (
            services.map((service, i) => (
              <ServiceDetailedSearchCard key={i} {...service} />
            ))
          )}
        </SpinnerFallback>
      </div>
    </div>
  );
};

import { Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  ArrowRoundBack,
  Button,
  EditIcon,
  FlagIcon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRequiredStar,
  MinusIcon,
  PlusIcon,
  SaveIcon,
  Select,
  SelectOption,
  Table,
  TBody,
  Td,
  Th,
  THead,
  Tr,
} from "ui";
import { mapArray, WiaahLanguageCountriesIsoCodes } from "utils";
import { array, InferType, number, object, string } from "yup";

const FilterValuesValidationSchema = object({
  filterValues: array(
    object({
      filterName: string().required(),
      sortOrder: number().required(),
      countryIsoCode: string().required(),
    }).required()
  )
    .min(1)
    .required(),
}).required();

const ServiceShopFilterForm = () => {
  const { t } = useTranslation();
  const { getParam } = useRouting();
  const filterId = getParam("filter_id");

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <p className="text-xl">{t("Filters")}</p>
        <div className="text-lg items-stretch h-12 gap-1 flex">
          <Button className="fill-white">
            <SaveIcon />
          </Button>
          <Button className="text-black" colorScheme="white">
            <ArrowRoundBack />
          </Button>
        </div>
      </div>

      <div className="border flex flex-col gap-2">
        <div className="flex text-xl font-semibold gap-2 items-center">
          <EditIcon />
          <p>{filterId ? t("Edit Filter") : t("Add Filter")}</p>
        </div>

        <div className="flex flex-col gap-8 w-full">
          <div className="text-2xl my-4 border-b">
            <p>{t("Filter Group")}</p>
          </div>

          <div className="grid grid-cols-8 gap-8">
            <p className="text-xl font-bold text-right">
              <InputRequiredStar />
              {t("Filter Group Name")}
            </p>
            <InputGroup className="col-span-7 h-fit">
              <InputLeftElement className="px-[0px]">
                <Select className="h-full">
                  {mapArray(WiaahLanguageCountriesIsoCodes, (code, i) => (
                    <SelectOption className="h-full" value={code} key={i}>
                      <FlagIcon code={code} />
                    </SelectOption>
                  ))}
                </Select>
              </InputLeftElement>
              <Input />
            </InputGroup>
            <p className="font-bold text-xl text-right">{t("Sort Order")}</p>
            <Input className="col-span-7 h-12" type={"number"} />
          </div>
        </div>

        <div className="flex flex-col border p-4 gap-4 border-b w-full">
          <p className="text-2xl border-b">{t("Filter Values")}</p>

          <Table ThProps={{ align: "left", className: "border" }}>
            <THead>
              <Th>
                <p className="text-xl font-bold">
                  <InputRequiredStar />
                  {t("Filter Name")}
                </p>
              </Th>
              <Th>{t("Sort Order")}</Th>
              <Th></Th>
            </THead>

            <TBody>
              <Formik<InferType<typeof FilterValuesValidationSchema>>
                validationSchema={FilterValuesValidationSchema}
                initialValues={{
                  filterValues: [],
                }}
                onSubmit={() => { }}
              >
                {({ values, setFieldValue, handleChange }) => {
                  return (
                    <>
                      {mapArray(
                        values.filterValues,
                        ({ filterName, sortOrder, countryIsoCode }, idx) => (
                          <Tr key={idx}>
                            <Td>
                              <InputGroup className="col-span-7">
                                <InputLeftElement className="px-[0px]">
                                  <Select
                                    value={
                                      countryIsoCode.length > 0
                                        ? countryIsoCode
                                        : "GB"
                                    }
                                    onOptionSelect={(v) =>
                                      setFieldValue("countryIsoCode", v)
                                    }
                                    className="h-full"
                                  >
                                    {mapArray(
                                      WiaahLanguageCountriesIsoCodes,
                                      (code, i) => (
                                        <SelectOption
                                          className="h-full"
                                          value={code}
                                          key={i}
                                        >
                                          <FlagIcon code={code} />
                                        </SelectOption>
                                      )
                                    )}
                                  </Select>
                                </InputLeftElement>
                                <Input />
                              </InputGroup>
                            </Td>
                            <Td>
                              <Input type={"number"} />
                            </Td>
                            <Td align="right">
                              <Button
                                onChange={() =>
                                  setFieldValue(
                                    "filterValues",
                                    values.filterValues.filter(
                                      (_, i) => i !== idx
                                    )
                                  )
                                }
                                colorScheme="danger"
                                className="w-12 h-12 flex justify-center items-center"
                              >
                                <span className="fill-black  text-black flex justify-center items-center bg-white rounded-full">
                                  <MinusIcon />
                                </span>
                              </Button>
                            </Td>
                          </Tr>
                        )
                      )}
                      <Tr>
                        <Td></Td>
                        <Td></Td>
                        <Td align="right">
                          <Button
                            onClick={() =>
                              setFieldValue("filterValues", [
                                ...values.filterValues,
                                {
                                  countryIsoCode: "GB",
                                  filterName: "",
                                  sortOrder: 1,
                                },
                              ])
                            }
                            className="text-white flex justify-center items-center text-2xl h-12 w-12"
                          >
                            <PlusIcon />
                          </Button>
                        </Td>
                      </Tr>
                    </>
                  );
                }}
              </Formik>
            </TBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ServiceShopFilterForm;

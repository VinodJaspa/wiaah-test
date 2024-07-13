import React from "react";
import { NextPage } from "next";
import {
  AdminGetTaxRateQuery,
  ArrowRoundBack,
  Button,
  Checkbox,
  EditIcon,
  GetCountriesQuery,
  Input,
  InputRequiredStar,
  SaveIcon,
  Select,
  SelectOption,
  Table,
  TBody,
  Td,
  Tr,
  useAdminCreateTaxRateMutation,
  useAdminGetTaxRateQuery,
  useAdminUpdateTaxRateMutation,
  useGetCountriesQuery,
} from "ui";
import { useTranslation } from "react-i18next";
import { mapArray, useForm } from "utils";
import { useRouting } from "routing";

const EditVatRate: NextPage = () => {
  const { t } = useTranslation();
  const { back, getParam } = useRouting();

  const id = getParam("id");
  const { data: _countries } = useGetCountriesQuery("");
  const countries = FAKE_COUNTRIES;

  const isNew = id === "new";

  const { data: _data } = useAdminGetTaxRateQuery(id);
  const data = FAKE_TAXES;

  const {
    form: updateForm,
    inputProps: updateProps,
    handleChange: updateChange,
  } = useForm<Parameters<typeof update>[0]>(data, { id });
  const {
    form: createForm,
    inputProps: createProps,
    handleChange: createChange,
  } = useForm<Parameters<typeof create>[0]>({
    appliedOnCountryIds: [],
    percent: 0,
    title: "",
  });

  const { mutate: update } = useAdminUpdateTaxRateMutation();
  const { mutate: create } = useAdminCreateTaxRateMutation();

  const inputProps = isNew ? createProps : updateProps;

  const form = isNew ? createForm : updateForm;

  const handleChange = isNew ? createChange : updateChange;

  return (
    <section>
      <div className="w-full gap-2 flex justify-end py-4">
        <Button
          onClick={() => (isNew ? create(createForm) : update(updateForm))}
          center
          className="text-white fill-white w-8 h-8"
        >
          <SaveIcon />
        </Button>
        <Button className="w-8 h-8" colorScheme="white" center>
          <ArrowRoundBack onClick={() => back()} />
        </Button>
      </div>
      <div className="border border-gray-300">
        <div className="flex border-b border-gray-300 items-center gap-2 p-4">
          <EditIcon />
          <p>{t("Edit Tax Rate")}</p>
        </div>
        <div className="p-4">
          <Table
            className="w-full"
            TdProps={{
              className:
                "even:w-3/4 odd:flex odd:items-center odd:w-1/4 odd:whitespace-nowrap",
            }}
          >
            <TBody>
              <Tr>
                <Td>
                  <InputRequiredStar />
                  <p>{t("Tax Name")}</p>
                </Td>
                <Td>
                  <Input {...inputProps("title")} />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <InputRequiredStar />
                  <p>{t("Tax Rate")}</p>
                </Td>
                <Td>
                  <Input {...inputProps("percent")} />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <p>{t("Geo Zone")}</p>
                </Td>
                <Td>
                  <div className="p-4 overflow-y-scroll thinScroll rounded h-64 bg-gray-200">
                    <div className="py-2">
                      <Checkbox
                        checked={countries.every((v) =>
                          form.appliedOnCountryIds.includes(v.id)
                        )}
                        onChange={(e) =>
                          handleChange(
                            "appliedOnCountryIds",
                            e.target.checked ? countries.map((v) => v.id) : []
                          )
                        }
                      >
                        {t("All")}
                      </Checkbox>
                    </div>
                    {mapArray(countries, ({ id, name }, i) => (
                      <div key={id + i} className="py-2">
                        <Checkbox
                          checked={form.appliedOnCountryIds.includes(id)}
                          onChange={(e) =>
                            handleChange(
                              "appliedOnCountryIds",
                              form.appliedOnCountryIds
                                .filter((v) => v !== id)
                                .concat(e.target.checked ? [id] : [])
                            )
                          }
                          key={id}
                        >
                          {name}
                        </Checkbox>
                      </div>
                    ))}
                  </div>
                </Td>
              </Tr>
            </TBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default EditVatRate;

const FAKE_TAXES: AdminGetTaxRateQuery["adminGetTaxRate"] = {
  __typename: "TaxRate",
  id: "1",
  percent: 20,
  title: "Standard VAT",
  appliedOnCountryIds: ["1", "2"],
  appliedOnCountries: [
    {
      __typename: "Country",
      code: "US",
      id: "1",
      name: "United States",
    },
    {
      __typename: "Country",
      code: "CA",
      id: "2",
      name: "Canada",
    },
  ],
};

const FAKE_COUNTRIES: GetCountriesQuery["getCountries"] = [
  {
    __typename: "Country",
    code: "US",
    name: "United States",
    id: "1",
  },
  {
    __typename: "Country",
    code: "CA",
    name: "Canada",
    id: "2",
  },
  {
    __typename: "Country",
    code: "GB",
    name: "United Kingdom",
    id: "3",
  },
  {
    __typename: "Country",
    code: "AU",
    name: "Australia",
    id: "4",
  },
];

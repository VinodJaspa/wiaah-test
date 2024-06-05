import React from "react";
import { NextPage } from "next";
import {
  ArrowRoundBack,
  Button,
  Checkbox,
  EditIcon,
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
  const { data: countries } = useGetCountriesQuery("");

  const isNew = id === "new";

  const { data } = useAdminGetTaxRateQuery(id);

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

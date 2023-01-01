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
} from "ui";
import { useTranslation } from "react-i18next";
import { countries, mapArray } from "utils";
import { useRouting } from "routing";

const _countries = countries.map((v) => ({ id: v.isoCode, name: v.name }));

const EditVatRate: NextPage = () => {
  const { t } = useTranslation();
  const { back } = useRouting();
  return (
    <section>
      <div className="w-full gap-2 flex justify-end py-4">
        <Button center className="text-white fill-white w-8 h-8">
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
                  <Input />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <InputRequiredStar />
                  <p>{t("Tax Rate")}</p>
                </Td>
                <Td>
                  <Input />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <p>{t("Type")}</p>
                </Td>
                <Td>
                  <Select>
                    <SelectOption value={"fixed"}>
                      {t("Fixed Amount")}
                    </SelectOption>
                    <SelectOption value={"percent"}>
                      {t("Percent")}
                    </SelectOption>
                  </Select>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <p>{t("Geo Zone")}</p>
                </Td>
                <Td>
                  <div className="p-4 overflow-y-scroll thinScroll rounded h-64 bg-gray-200">
                    <div className="py-2">
                      <Checkbox>{t("All")}</Checkbox>
                    </div>
                    {mapArray(_countries, ({ id, name }) => (
                      <div className="py-2">
                        <Checkbox key={id}>{name}</Checkbox>
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

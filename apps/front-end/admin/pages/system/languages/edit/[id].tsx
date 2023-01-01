import {
  EditIcon,
  TBody,
  InputRequiredStar,
  AspectRatioImage,
  Table,
  Tr,
  Td,
  Input,
  Select,
  SelectOption,
} from "ui";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";

const EditLanguage: NextPage = () => {
  const { t } = useTranslation();
  return (
    <section>
      <div className="border border-gray-300">
        <div className="flex border-b border-gray-300 items-center gap-2 p-4">
          <EditIcon />
          <p>{t("Edit Lanuages")}</p>
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
                  <p>{t("Language name")}</p>
                </Td>
                <Td>
                  <Input />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <InputRequiredStar />
                  <p>{t("Code")}</p>
                </Td>
                <Td>
                  <Input />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <InputRequiredStar />
                  <p>{t("Locale")}</p>
                </Td>
                <Td>
                  <Input description="Example: en_US.UTF-8,en_US,en-gb,en_gb,english" />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <p>{t("Status")}</p>
                </Td>
                <Td>
                  <Select>
                    <SelectOption value={"on"}>{t("Enabled")}</SelectOption>
                    <SelectOption value={"off"}>{t("Disabled")}</SelectOption>
                  </Select>
                  <p>{t("Hide/Show it in lanuage dropdown")}</p>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <p>{t("Sort Order")}</p>
                </Td>
                <Td>
                  <Input />
                </Td>
              </Tr>
            </TBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default EditLanguage;

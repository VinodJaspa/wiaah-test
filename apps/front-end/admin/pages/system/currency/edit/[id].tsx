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
  Button,
  SaveIcon,
  ArrowRoundBack,
} from "ui";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";

const EditCurrency: NextPage = () => {
  const { t } = useTranslation();
  return (
    <section>
      <div className="w-full gpa-2 flex justify-end py-4">
        <Button center>
          <SaveIcon />
        </Button>
        <Button colorScheme="white" center>
          <ArrowRoundBack />
        </Button>
      </div>
      <div className="border border-gray-300">
        <div className="flex border-b border-gray-300 items-center gap-2 p-4">
          <EditIcon />
          <p>{t("Edit Currency")}</p>
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
                  <p>{t("Currency Title")}</p>
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
                  <p>{t("Symbol Left")}</p>
                </Td>
                <Td>
                  <Input description="Example: en_US.UTF-8,en_US,en-gb,en_gb,english" />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <p>{t("Symbol Right")}</p>
                </Td>
                <Td>
                  <Input />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <p>{t("Decimal Places")}</p>
                </Td>
                <Td>
                  <Input type="number" />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <p>{t("Value")}</p>
                </Td>
                <Td>
                  <Input type="number" />
                  <p>
                    {t(
                      "edit_currency_value_input",
                      "The value of your default currency in the current currency unit. Set to 1 for your default currency."
                    )}
                  </p>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <p>{t("Status")}</p>
                </Td>
                <Td>
                  <Select>
                    <SelectOption value={true}>{t("Enabled")}</SelectOption>
                    <SelectOption value={false}>{t("Disabled")}</SelectOption>
                  </Select>
                </Td>
              </Tr>
            </TBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default EditCurrency;

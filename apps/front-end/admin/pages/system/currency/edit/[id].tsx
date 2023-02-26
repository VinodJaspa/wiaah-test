import {
  EditIcon,
  TBody,
  InputRequiredStar,
  Table,
  Tr,
  Td,
  Input,
  Select,
  SelectOption,
  Button,
  SaveIcon,
  ArrowRoundBack,
  useAdminUpdateCurrencyMutation,
} from "ui";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "utils";
import { useRouting } from "routing";

const EditCurrency: NextPage = () => {
  const { t } = useTranslation();

  const { getParam, back } = useRouting();

  const id = getParam("id");

  const { form, inputProps, selectProps } = useForm<
    Parameters<typeof updateCurrecny>[0]
  >({ code: id }, { code: id });
  const { mutate: updateCurrecny } = useAdminUpdateCurrencyMutation();

  return (
    <section>
      <div className="w-full gpa-2 flex justify-end py-4">
        <Button
          className="p-2 fill-white"
          onClick={() => updateCurrecny(form)}
          center
        >
          <SaveIcon />
        </Button>
        <Button
          className="p-2"
          onClick={() => back()}
          colorScheme="white"
          center
        >
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
                  <Input {...inputProps("name")} />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <InputRequiredStar />
                  <p>{t("Code")}</p>
                </Td>
                <Td>
                  <Input {...inputProps("code")} />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <p>{t("Symbol Left")}</p>
                </Td>
                <Td>
                  <Input
                    {...inputProps("symbol")}
                    description="Example: en_US.UTF-8,en_US,en-gb,en_gb,english"
                  />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <p>{t("Value")}</p>
                </Td>
                <Td>
                  <Input {...inputProps("exchangeRate")} type="number" />
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
                  <Select {...selectProps("enabled")}>
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

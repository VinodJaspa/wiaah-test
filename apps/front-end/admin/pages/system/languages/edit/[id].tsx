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
  useAdminUpdateLanguageMutation,
  HStack,
  Button,
} from "ui";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "utils";
import { useRouting } from "routing";

const EditLanguage: NextPage = () => {
  const { t } = useTranslation();

  const { getParam } = useRouting();

  const id = getParam("id");

  const { form, inputProps } = useForm<Parameters<typeof update>[0]>({ id });

  const { mutate: update } = useAdminUpdateLanguageMutation();

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
                  <InputRequiredStar />
                  <p>{t("Locale")}</p>
                </Td>
                <Td>
                  <Input
                    {...inputProps("locale")}
                    description="Example: en_US.UTF-8,en_US,en-gb,en_gb,english"
                  />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <p>{t("Enabled")}</p>
                </Td>
                <Td>
                  <Select
                    {...inputProps(
                      "enabled",
                      "value",
                      "onOptionChange",
                      (e) => e
                    )}
                  >
                    <SelectOption value={true}>{t("Enabled")}</SelectOption>
                    <SelectOption value={false}>{t("Disabled")}</SelectOption>
                  </Select>
                  <p>{t("Hide/Show it in lanuage dropdown")}</p>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <p>{t("Sort Order")}</p>
                </Td>
                <Td>
                  <Input type="number" {...inputProps("sortOrder")} />
                </Td>
              </Tr>
            </TBody>
          </Table>
          <HStack className="justify-end">
            <Button
              onClick={() => {
                update(form);
              }}
            >
              {t("Save")}
            </Button>
          </HStack>
        </div>
      </div>
    </section>
  );
};

export default EditLanguage;

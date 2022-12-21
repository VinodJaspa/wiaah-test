import {
  Button,
  EmailIcon,
  Input,
  InputRequiredStar,
  Select,
  SelectOption,
  Table,
  TBody,
  Td,
  Textarea,
  Th,
  THead,
  Tr,
} from "ui";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";

const Mailing: NextPage = () => {
  const { t } = useTranslation();
  return (
    <section>
      <div className="flex py-4 justify-end">
        <Button className="fill-white text-white flex items-center gap-2">
          <EmailIcon />
          <p>{t("Send")}</p>
        </Button>
      </div>
      <div className="border">
        <div className="text-lg border-b border-b-gray-300 p-4 flex items-center gap-2">
          <EmailIcon />
          <p>{t("Send e-mail's to customers")}</p>
        </div>

        <div className="p-4">
          <Table
            TdProps={{ className: "odd:w-1/4 even:w-3/4" }}
            className="w-full"
          >
            <TBody>
              <Tr>
                <Td>{t("From")}</Td>
                <Td>
                  <Select className="w-full">
                    <SelectOption value={"default"}>
                      {t("Default")}
                    </SelectOption>
                  </Select>
                </Td>
              </Tr>

              <Tr>
                <Td>{t("to")}</Td>
                <Td>
                  <Select className="w-full">
                    <SelectOption value={"subscribers"}>
                      {t("All Newsletter Subscribers")}
                    </SelectOption>
                    <SelectOption value={"all"}>
                      {t("All Customers")}
                    </SelectOption>
                    <SelectOption value={"shops"}>
                      {t("Products sellers")}
                    </SelectOption>
                    <SelectOption value={"services"}>
                      {t("Services sellers")}
                    </SelectOption>
                    <SelectOption value={"buyers"}>{t("Buyers")}</SelectOption>
                  </Select>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <InputRequiredStar />
                  {t("Subject")}
                </Td>
                <Td>
                  <Input placeholder={t("Subject")} />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <InputRequiredStar />
                  {t("Message")}
                </Td>
                <Td>
                  <Textarea />
                </Td>
              </Tr>
            </TBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default Mailing;

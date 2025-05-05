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
  useAdminSendMailToUsers,
} from "ui";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { setTestid, useForm } from "utils";
import { MailUserType } from "@features/API";
import Head from "next/head";

const Mailing: NextPage = () => {
  const { t }: { t: (key: string, ...args: any[]) => string } =
    useTranslation();

  const { form, inputProps, selectProps } = useForm<
    Parameters<typeof sendMail>[0]
  >({ message: "", subject: "", userType: MailUserType.Subscribers });
  const { mutate: sendMail } = useAdminSendMailToUsers();

  return (
    <React.Fragment>
      <Head>
        <title>Admin | Market - Mail</title>
      </Head>
      <section>
        <div className="flex py-4 justify-end">
          <Button
            onClick={() => {
              sendMail(form);
            }}
            {...setTestid("sendBtn")}
            className="fill-white text-white flex items-center gap-2"
          >
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
                    <Select
                      {...setTestid("sendToSelect")}
                      {...selectProps("userType")}
                      className="w-full"
                    >
                      <SelectOption
                        {...setTestid("sendToOption")}
                        value={MailUserType.Subscribers}
                      >
                        {t("All Newsletter Subscribers")}
                      </SelectOption>
                      <SelectOption
                        {...setTestid("sendToOption")}
                        value={MailUserType.All}
                      >
                        {t("All Customers")}
                      </SelectOption>
                      <SelectOption
                        {...setTestid("sendToOption")}
                        value={MailUserType.Shops}
                      >
                        {t("Products sellers")}
                      </SelectOption>
                      <SelectOption
                        {...setTestid("sendToOption")}
                        value={MailUserType.Service}
                      >
                        {t("Services sellers")}
                      </SelectOption>
                      <SelectOption
                        {...setTestid("sendToOption")}
                        value={MailUserType.Buyers}
                      >
                        {t("Buyers")}
                      </SelectOption>
                    </Select>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <InputRequiredStar />
                    {t("Subject")}
                  </Td>
                  <Td>
                    <Input
                      {...inputProps("subject")}
                      {...setTestid("subject")}
                      placeholder={t("Subject")}
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td valign="top">
                    <InputRequiredStar />
                    {t("Message")}
                  </Td>
                  <Td>
                    <Textarea
                      {...setTestid("message")}
                      {...inputProps("message")}
                      placeholder={t("message")}
                      className="h-72"
                    />
                  </Td>
                </Tr>
              </TBody>
            </Table>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Mailing;

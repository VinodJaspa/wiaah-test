import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { BiCloudDownload, BiFolder } from "react-icons/bi";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  ListIcon,
  SearchIcon,
  Select,
  SelectOption,
  Table,
  TableContainer,
  TBody,
  Td,
  Th,
  THead,
  Tr,
  TrashIcon,
} from "ui";

interface NewsletterUser {
  email: string;
  name: string;
  user_id: string;
}

const newsletter: NextPage = () => {
  const newsletter: NewsletterUser[] = [...Array(10)].map((_, i) => ({
    email: `test${i}@gmail.com`,
    name: `name-${i}`,
    user_id: `id-${i}`,
  }));

  const { t } = useTranslation();
  return (
    <section>
      <div className="p-4 flex flex-col gap-8">
        <div className="w-full flex justify-between">
          <div className="flex items-center gap-2">
            <ListIcon />
            <p>{t("Newsletter Subscription List")}</p>
          </div>
          <InputGroup flushed>
            <InputLeftElement>
              <SearchIcon />
            </InputLeftElement>
            <Input className="w-fit" placeholder={t("Search")} />
          </InputGroup>
        </div>
        <div className="whitespace-nowrap gap-4 flex items-center">
          <BiFolder className="text-xl" />
          <p>{t("Export to")}</p>
          <Input flushed className="w-[fit-content]" />
          <Button className="flex items-center">
            <BiCloudDownload />
            <p>{t("Export")}</p>
          </Button>
        </div>
        <TableContainer>
          <Table
            ThProps={{ className: "", align: "left" }}
            TdProps={{ align: "left", className: "border border-gray-300" }}
            className="w-full"
          >
            <THead>
              <Tr>
                <Th>{t("E-Mail")}</Th>
                <Th>{t("Customer Name")}</Th>
                <Th align="right">{t("Action")}</Th>
              </Tr>
            </THead>
            <TBody>
              {newsletter.map(({ email, name, user_id }, i) => (
                <Tr key={user_id}>
                  <Td>{email}</Td>
                  <Td>{name}</Td>
                  <Td align="right">
                    <TrashIcon className="text-white rounded cursor-pointer hover:bg-red-600 w-8 h-8 p-2 bg-red-500" />
                  </Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        </TableContainer>
      </div>
    </section>
  );
};

export default newsletter;

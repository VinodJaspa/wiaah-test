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
  Table,
  TableContainer,
  TBody,
  Td,
  Th,
  THead,
  Tr,
  TrashIcon,
  useAdminGetNewsletterSubscribersQuery,
  useAdminRemoveNewsletterSubscriber,
  usePaginationControls,
} from "ui";
import { mapArray, useForm } from "utils";

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

  const { pagination, controls } = usePaginationControls();

  const { form, inputProps } = useForm<
    Parameters<typeof useAdminGetNewsletterSubscribersQuery>[0]
  >({ pagination }, { pagination });

  const { data: subs } = useAdminGetNewsletterSubscribersQuery(form);
  const { mutate } = useAdminRemoveNewsletterSubscriber();

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
            <Input
              type={"email"}
              {...inputProps("email")}
              className="w-fit"
              placeholder={t("Search email")}
            />
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
              {mapArray(subs, ({ user, ownerId }, i) => (
                <Tr key={ownerId}>
                  <Td>{user?.email}</Td>
                  <Td>
                    {user?.firstName} {user?.lastName}
                  </Td>
                  <Td align="right">
                    <TrashIcon
                      onClick={() => {
                        mutate(ownerId);
                      }}
                      className="text-white rounded cursor-pointer hover:bg-red-600 w-8 h-8 p-2 bg-red-500"
                    />
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

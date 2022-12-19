import { getRandomImage } from "placeholder";
import React from "react";
import { useTranslation } from "react-i18next";
import { ImCheckmark } from "react-icons/im";
import {
  Avatar,
  Badge,
  Checkbox,
  DateFormInput,
  Input,
  ListIcon,
  NotAllowedIcon,
  Pagination,
  Select,
  SelectOption,
  Table,
  TableContainer,
  TBody,
  Td,
  Th,
  THead,
  Tr,
} from "ui";
import { mapArray, randomNum } from "utils";

interface DeletionRequests {
  photo: string;
  username: string;
  email: string;
  request: string;
  status: string;
  createdAt: string;
  id: string;
}

const AccountDeletion: React.FC = () => {
  const { t } = useTranslation();

  const requests: DeletionRequests[] = [...Array(10)].map((_, i) => ({
    id: randomNum(9999999).toString(),
    createdAt: new Date().toString(),
    email: `test-${i}@email.com`,
    request: "Delete",
    status: "Pending",
    photo: getRandomImage(),
    username: `username-${i}`,
  }));

  return (
    <section className="border border-gray-300">
      <div className="border border-gray-300">
        <div className="p-4 text-xl flex items-center gap-2">
          <ListIcon />
          <p>{t("Account Deletion Requests")}</p>
        </div>
      </div>
      <div className="p-4">
        <TableContainer>
          <Table className="w-full">
            <THead>
              <Tr>
                <Th>{t("Photo")}</Th>
                <Th>{t("Username")}</Th>
                <Th>{t("E-Mail")}</Th>
                <Th>{t("Status")}</Th>
                <Th>{t("Date Added")}</Th>
              </Tr>
              <Tr>
                <Th></Th>
                <Th>
                  <Input />
                </Th>
                <Th>
                  <Input />
                </Th>
                <Th>
                  <Select>
                    <SelectOption value={"pending"}>
                      {t("Pending")}
                    </SelectOption>
                    <SelectOption value={"approved"}>
                      {t("Approved")}
                    </SelectOption>
                    <SelectOption value={"rejected"}>
                      {t("Rejected")}
                    </SelectOption>
                  </Select>
                </Th>
                <Th>
                  <DateFormInput />
                </Th>
                <Th></Th>
              </Tr>
            </THead>
            <TBody>
              {mapArray(
                requests,
                ({
                  createdAt,
                  email,
                  id,
                  request,
                  status,
                  photo,
                  username,
                }) => (
                  <Tr>
                    <Td>
                      <Avatar src={photo} />
                    </Td>
                    <Td>{username}</Td>
                    <Td>{email}</Td>
                    <Td>
                      <Badge
                        value={request}
                        cases={{ fail: "Delete" }}
                        className="flex justify-center"
                      >
                        {status}
                      </Badge>
                    </Td>
                    <Td>{new Date(createdAt).toDateString()}</Td>
                  </Tr>
                )
              )}
            </TBody>
          </Table>
        </TableContainer>
      </div>
      <Pagination />
    </section>
  );
};

export default AccountDeletion;

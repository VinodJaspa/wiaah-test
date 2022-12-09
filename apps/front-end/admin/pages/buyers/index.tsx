import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { BsKey } from "react-icons/bs";
import { useRouting } from "routing";
import {
  Table,
  TBody,
  Tr,
  Td,
  THead,
  Th,
  Avatar,
  TrashIcon,
  Input,
  Select,
  SelectOption,
  DateFormInput,
  Pagination,
  usePaginationControls,
  NotAllowedIcon,
  SearchIcon,
  LockIcon,
  EditIcon,
} from "ui";
import { randomNum } from "utils";

type Seller = {
  id: string;
  thumbanil: string;
  name: string;
  email: string;
  products: number;
  sales: number;
  balance: number;
  status: string;
  createdAt: Date;
};

let mockSellers: Seller[] = [...Array(15)].map((_, i) => ({
  id: i.toString(),
  name: "seller company name" + i,
  balance: randomNum(2000),
  email: "testemail" + i + "@email.com",
  createdAt: new Date(),
  products: randomNum(50),
  sales: randomNum(150),
  status: randomNum(100) % 2 === 0 ? "active" : "inActive",
  thumbanil: "/wiaah_logo.png",
}));

const sellers: NextPage = () => {
  const { t } = useTranslation();
  const { visit, getCurrentPath } = useRouting();
  const { changeTotalItems, controls, pagination } = usePaginationControls();
  return (
    <>
      <Table TrProps={{ className: "border-b border-darkerGray" }}>
        <THead>
          <Tr>
            <Th></Th>
            <Th className="text-left">{t("Buyer")}</Th>
            <Th>{t("Email")}</Th>
            <Th>{t("Balance")}</Th>
            <Th>{t("Status")}</Th>
            <Th>{t("Date Created")}</Th>
            <Th>{t("Action")}</Th>
          </Tr>
        </THead>

        <TBody>
          <Tr>
            <Td></Td>

            <Td>
              <Input />
            </Td>
            <Td>
              <Input />
            </Td>
            <Td>
              <Input />
            </Td>
            <Td>
              <Select>
                <SelectOption value={"active"}>{t("active")}</SelectOption>
                <SelectOption value={"inActive"}>{t("inActive")}</SelectOption>
              </Select>
            </Td>
            <Td>
              <DateFormInput />
            </Td>
          </Tr>

          {mockSellers.map((seller, i) => (
            <Tr className="hover:bg-darkerGray cursor-pointer" key={i}>
              <Td>
                <Avatar src={seller.thumbanil} />
              </Td>
              <Td>{seller.name}</Td>
              <Td>{seller.email}</Td>

              <Td>{seller.balance}</Td>
              <Td>{seller.status}</Td>
              <Td>{new Date(seller.createdAt).toDateString()}</Td>
              <Td>
                <div className="flex justify-center gap-2 fill-white text-white text-sm flex-wrap">
                  <SearchIcon className="w-8 h-8 p-2 bg-cyan-600" />
                  <EditIcon
                    onClick={() =>
                      visit((r) =>
                        r
                          .addPath(getCurrentPath())
                          .addPath("edit")
                          .addPath(seller.id)
                      )
                    }
                    className="w-8 h-8 p-2 bg-cyan-400"
                  />
                  <BsKey className="w-8 h-8 p-2 bg-green-500" />
                  <LockIcon className="w-8 h-8 p-2 bg-yellow-500" />
                  <NotAllowedIcon className="w-8 h-8 p-2 bg-red-500" />
                  <TrashIcon className="w-8 h-8 p-2 bg-red-500" />
                </div>
              </Td>
            </Tr>
          ))}
        </TBody>
      </Table>
      <Pagination />
    </>
  );
};

export default sellers;

import React from "react";
import { useTranslation } from "react-i18next";
import { HiTruck } from "react-icons/hi";
import { useRouting } from "routing";
import {
  Badge,
  Checkbox,
  DateFormInput,
  Input,
  ListIcon,
  Pagination,
  PlusIcon,
  PriceDisplay,
  SaveIcon,
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
import { mapArray, randomNum } from "utils";

interface Book {
  id: string;
  seller: string;
  buyer: string;
  status: string;
  total: number;
  createdAt: Date;
  type: string;
}

const books: Book[] = [...Array(10)].map((_, i) => ({
  id: i.toString(),
  buyer: `buyer-${i}`,
  seller: `seller-${i}`,
  status: "pending",
  total: randomNum(150),
  createdAt: new Date(),
  type: randomNum(100) < 50 ? "Hotel" : "Restaurant",
}));

const Bookings = () => {
  const { t } = useTranslation();
  const { getCurrentPath, visit } = useRouting();

  return (
    <section className="w-full flex flex-col gap-8">
      <div className="flex justify-between fill-white text-white">
        <div></div>
        <div className="flex items-center gap-1">
          <SaveIcon className="rounded cursor-pointer hover:bg-cyan-600 w-8 h-8 p-2 bg-cyan-400" />
          <HiTruck className="rounded cursor-pointer hover:bg-cyan-600 w-8 h-8 p-2 bg-cyan-400" />
          <PlusIcon className="rounded cursor-pointer hover:bg-blue-600 w-8 h-8 p-2 bg-blue-500" />
          <TrashIcon className="rounded cursor-pointer hover:bg-red-600 w-8 h-8 p-2 bg-red-500" />
        </div>
      </div>
      <div className="border border-gray-300">
        <div className="p-4 flex items-center gap-2 border-b border-b-gray-300">
          <ListIcon />
          <p>{t("Order List")}</p>
        </div>
        <div className="p-4">
          <TableContainer>
            <Table
              TdProps={{ className: "border border-gray-300" }}
              className="border-collapse w-full border border-gray-300"
            >
              <THead>
                <Tr>
                  <Th className="w-fit">
                    <Checkbox />
                  </Th>
                  <Th>{t("Book ID")}</Th>
                  <Th>{t("Type")}</Th>
                  <Th>{t("Seller")}</Th>
                  <Th>{t("Buyer")}</Th>
                  <Th>{t("Status")}</Th>
                  <Th>{t("Total")}</Th>
                  <Th>{t("Date Added")}</Th>
                  <Th>{t("Action")}</Th>
                </Tr>
                <Tr>
                  <Th></Th>
                  <Th>
                    <Input type="number" />
                  </Th>
                  <Th>
                    <Select>
                      <SelectOption value={"hotel"}>{t("Hotel")}</SelectOption>
                    </Select>
                  </Th>
                  <Th>
                    <Input />
                  </Th>
                  <Th>
                    <Input />
                  </Th>
                  <Th>
                    <Input />
                  </Th>
                  <Th>
                    <Input type="number" />
                  </Th>
                  <Th>
                    <DateFormInput />
                  </Th>
                  <Th></Th>
                </Tr>
              </THead>
              <TBody>
                {mapArray(books, (order, i) => (
                  <Tr key={order.id}>
                    <Td>
                      <Checkbox />
                    </Td>
                    <Td>{order.id}</Td>
                    <Td>
                      <Badge className="flex justify-center" variant="info">
                        {order.type}
                      </Badge>
                    </Td>
                    <Td>{order.seller}</Td>
                    <Td>{order.buyer}</Td>
                    <Td>{order.status}</Td>
                    <Td>
                      <PriceDisplay price={order.total} />
                    </Td>
                    <Td>{new Date(order.createdAt).toDateString()}</Td>
                    <Td className="text-white">
                      <SearchIcon
                        onClick={() => {
                          visit((r) =>
                            r
                              .addPath(getCurrentPath())
                              .addPath("edit")
                              .addPath(order.id)
                          );
                        }}
                        className="rounded cursor-pointer text-white fill-white hover:bg-cyan-600 w-8 h-8 p-2 bg-cyan-500"
                      />
                    </Td>
                  </Tr>
                ))}
              </TBody>
            </Table>
          </TableContainer>
          <Pagination />
        </div>
      </div>
    </section>
  );
};

export default Bookings;

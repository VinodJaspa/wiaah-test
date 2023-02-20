import { OrderStatusEnum } from "@features/API";
import React from "react";
import { useTranslation } from "react-i18next";
import { HiTruck } from "react-icons/hi";
import { useRouting } from "routing";
import {
  Checkbox,
  DateFormInput,
  Input,
  ListIcon,
  Pagination,
  PlusIcon,
  PriceDisplay,
  SaveIcon,
  SearchIcon,
  Table,
  TableContainer,
  TBody,
  Td,
  Th,
  THead,
  Tr,
  TrashIcon,
  useAdminGetOrdersQuery,
  usePaginationControls,
} from "ui";
import { AddToDate, mapArray, useForm } from "utils";

const order = () => {
  const { t } = useTranslation();

  const { getCurrentPath, visit } = useRouting();

  const { pagination, controls } = usePaginationControls();

  const { form, handleChange, inputProps } = useForm<
    Parameters<typeof useAdminGetOrdersQuery>[0]
  >({ pagination }, { pagination, status: OrderStatusEnum.Pending });

  const { data: orders } = useAdminGetOrdersQuery(form);

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
                  <Th>{t("Order ID")}</Th>
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
                    <Input {...inputProps("id")} type="number" />
                  </Th>
                  <Th>
                    <Input {...inputProps("seller")} />
                  </Th>
                  <Th>
                    <Input {...inputProps("buyer")} />
                  </Th>
                  <Th></Th>
                  <Th>
                    <Input {...inputProps("total")} type="number" />
                  </Th>
                  <Th>
                    <DateFormInput
                      onDateChange={(e) => {
                        handleChange(
                          "date_from",
                          new Date(new Date(e).setHours(0)).toString()
                        );
                        handleChange(
                          "date_to",
                          AddToDate(new Date(new Date(e).setHours(0)), {
                            days: 1,
                          }).toString()
                        );
                      }}
                      dateValue={form.date_from}
                    />
                  </Th>
                  <Th></Th>
                </Tr>
              </THead>
              <TBody>
                {mapArray(orders, (order, i) => (
                  <Tr key={order.id}>
                    <Td>
                      <Checkbox />
                    </Td>
                    <Td>{order.id}</Td>
                    <Td>{order.seller?.profile?.username}</Td>
                    <Td>{order.buyer?.profile?.username}</Td>
                    <Td>{order.status.of}</Td>
                    <Td>
                      <PriceDisplay price={order.paid} />
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
                        className="rounded cursor-pointer fill-white text-white hover:bg-cyan-600 w-8 h-8 p-2 bg-cyan-500"
                      />
                    </Td>
                  </Tr>
                ))}
              </TBody>
            </Table>
          </TableContainer>
          <Pagination controls={controls} />
        </div>
      </div>
    </section>
  );
};

export default order;

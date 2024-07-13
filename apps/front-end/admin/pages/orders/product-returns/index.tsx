import { RefundStatusType } from "@features/API";
import React from "react";
import { useTranslation } from "react-i18next";
import { GiCheckMark } from "react-icons/gi";
import { useRouting } from "routing";
import {
  Button,
  Checkbox,
  CloseIcon,
  DateFormInput,
  HStack,
  Input,
  ListIcon,
  Pagination,
  randomNum,
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
  useAdminCloseRefundRequestMutation,
  useAdminConfirmRefundRequestMutation,
  useGetAdminFilteredRefundRequests,
  usePaginationControls,
} from "ui";
import { mapArray, useForm } from "utils";

const ProductReturns = () => {
  const { t } = useTranslation();
  const { getCurrentPath, visit } = useRouting();

  const { pagination, controls } = usePaginationControls();
  const { form, inputProps, selectProps, dateInputProps } = useForm<
    Parameters<typeof useGetAdminFilteredRefundRequests>[0]
  >({
    pagination,
  });
  const { data: _data } = useGetAdminFilteredRefundRequests(form);
  const data = FAKE_REQUEST;

  const { mutate: confirmRefund } = useAdminConfirmRefundRequestMutation();
  const { mutate: closeRefund } = useAdminCloseRefundRequestMutation();

  return (
    <section>
      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col gap-4 w-full shadow-lg border p-2 rounded-lg">
          <div className="flex items-center text-xl font-bold gap-2">
            <ListIcon className="text-base" />
            <p>{t("Product Retrun List")}</p>
          </div>
          <TableContainer>
            <Table
              TrProps={{ className: "w-fit" }}
              TdProps={{ className: "border" }}
              ThProps={{ className: "whitespace-nowrap border" }}
              className=""
            >
              <THead>
                <Th className="w-fit" align="left">
                  <Checkbox />
                </Th>
                <Th>{t("Return ID")}</Th>
                <Th>{t("Order ID")}</Th>
                <Th>{t("Seller")}</Th>
                <Th>{t("Buyer")}</Th>
                <Th>{t("Comment")}</Th>
                <Th>{t("Product")}</Th>
                <Th>{t("Status")}</Th>
                <Th>{t("Date Added")}</Th>
                <Th>{t("Date Modified")}</Th>
                <Th>{t("Action")}</Th>
                <Tr>
                  <Th></Th>
                  <Th>
                    <Input {...inputProps("refundId")} />
                  </Th>
                  <Th>
                    <Input {...inputProps("orderId")} />
                  </Th>
                  <Th>
                    <Input {...inputProps("seller")} />
                  </Th>
                  <Th>
                    <Input {...inputProps("buyer")} />
                  </Th>
                  <Th>
                    <Input {...inputProps("comment")} />
                  </Th>
                  <Th>
                    <Input {...inputProps("product")} />
                  </Th>
                  <Th>
                    <Select {...selectProps("status")}>
                      {Object.values(RefundStatusType).map((v, i) => (
                        <SelectOption key={v + i} value={v}>
                          {v}
                        </SelectOption>
                      ))}
                    </Select>
                  </Th>
                  <Th>
                    <DateFormInput {...dateInputProps("addedDate")} />
                  </Th>
                  <Th>
                    <DateFormInput {...dateInputProps("dateModified")} />
                  </Th>
                  <Th></Th>
                </Tr>
              </THead>
              <TBody>
                {mapArray(data, (prod, i) => (
                  <Tr>
                    <Td>
                      <Checkbox />
                    </Td>
                    <Td>{prod.id}</Td>
                    <Td>{prod?.orderItem?.id}</Td>
                    <Td className="whitespace-nowrap">
                      {prod?.orderItem?.seller?.firstName}{" "}
                      {prod?.orderItem?.seller?.lastName}
                    </Td>
                    <Td className="whitespace-nowrap">
                      {prod?.orderItem?.buyer?.firstName}{" "}
                      {prod?.orderItem?.buyer?.lastName}
                    </Td>
                    <Td className="w-80">{prod.reason}</Td>
                    <Td>{prod?.product?.title}</Td>
                    <Td>{prod.status}</Td>
                    <Td>{new Date(prod.createdAt).toDateString()}</Td>
                    <Td>{new Date(prod.updatedAt).toDateString()}</Td>
                    <Td>
                      <HStack>
                        <SearchIcon
                          onClick={() =>
                            visit((r) =>
                              r
                                .addPath(getCurrentPath())
                                .addPath("edit")
                                .addPath(prod.id)
                            )
                          }
                          className="w-8 h-8 p-2 text-white cursor-pointer fill-white rounded hover:bg-cyan-600 bg-cyan-500"
                        />
                        {[
                          RefundStatusType.Accepted,
                          RefundStatusType.Rejected,
                          RefundStatusType.Pending,
                        ].includes(prod.status) ? (
                          <>
                            <Button
                              onClick={() => {
                                confirmRefund({ id: prod.id });
                              }}
                              center
                              className="p-2"
                            >
                              <GiCheckMark />
                            </Button>
                            <Button
                              onClick={() => {
                                closeRefund({ id: prod.id });
                              }}
                              center
                              className="p-2"
                              colorScheme="danger"
                            >
                              <CloseIcon />
                            </Button>
                          </>
                        ) : null}
                      </HStack>
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

export default ProductReturns;

const FAKE_REQUEST = [...Array(10)].map((_, i) => ({
  amount: randomNum(2000),
  createdAt: new Date().toString(),
  id: "id" + i,
  product: {
    title: "prod" + i,
  },
  reason:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took",
  status:
    Object.values(RefundStatusType)[i % Object.values(RefundStatusType).length],
  updatedAt: new Date().toString(),
  orderItem: {
    buyer: {
      firstName: "first",
      lastName: "last",
    },
    id: "orderid-" + i,
    seller: {
      firstName: "first",
      lastName: "last",
    },
  },
}));

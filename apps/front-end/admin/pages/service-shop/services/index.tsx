import { useAdminDeleteServiceMutation } from "@features/Services/Services/mutation";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  Checkbox,
  EditIcon,
  Image,
  Input,
  Pagination,
  PriceDisplay,
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
  useGetFilteredServicesQuery,
  usePaginationControls,
  ServiceType,
} from "ui";
import { mapArray, useForm } from "utils";

const Services: NextPage = () => {
  const { visit, getCurrentPath } = useRouting();
  const { t } = useTranslation();
  const { pagination } = usePaginationControls();

  const filters = [{ id: "432", value: ["id"] }];

  const { form, inputProps } = useForm<
    Parameters<typeof useGetFilteredServicesQuery>[0]
  >({ filters, pagination });

  const { data: services } = useGetFilteredServicesQuery(form);

  const { mutate } = useAdminDeleteServiceMutation();

  function handleDeleteService(id: string) {
    mutate({
      id,
      deletionReason: "",
    });
  }

  return (
    <>
      <section>
        <TableContainer>
          <Table ThProps={{ className: "whitespace-nowrap" }}>
            <THead>
              <Tr>
                <Th className="w-fit">
                  <Checkbox />
                </Th>
                <Th className="w-32">{t("Image")}</Th>
                <Th>{t("Service")}</Th>
                <Th>{t("Seller")}</Th>
                <Th>{t("Id")}</Th>
                <Th>{t("Price")}</Th>
                <Th>{t("Type")}</Th>
                <Th>{t("Day Clicks")}</Th>
                <Th>{t("Earnings")}</Th>
                <Th>{t("Sales")}</Th>
                <Th>{t("Total Ordered Items")}</Th>
                <Th>{t("Total Discounted Orders")}</Th>
                <Th>{t("Total Discounted Amount")}</Th>
                <Th>{t("Items Refunded")}</Th>
                <Th>{t("Refund Rate")}</Th>
                <Th>{t("Positive feedback received")}</Th>
                <Th>{t("Received Positive feedback rate")}</Th>
                <Th>{t("Negative feedback received")}</Th>
                <Th>{t("Received negative feedback rate")}</Th>
                <Th>{t("Status")}</Th>
                <Th>{t("Views")}</Th>
                <Th>{t("Date modified")}</Th>
                <Th>{t("Action")}</Th>
              </Tr>
              <Tr>
                <Th></Th>
                <Th></Th>
                <Th>
                  <Input />
                </Th>
                <Th>
                  <Input type="number" />
                </Th>
                <Th>
                  <Input />
                </Th>
                <Th>
                  <Input />
                </Th>
                <Th>
                  <Select>
                    <SelectOption value={"hotel"}>{t("hotel")}</SelectOption>
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
                  <Input />
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
                  <Input />
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
                  <Select>
                    <SelectOption value={"active"}>{t("Active")}</SelectOption>
                    <SelectOption value={"inActive"}>
                      {t("inActive")}
                    </SelectOption>
                  </Select>
                </Th>
                <Th>
                  <Input />
                </Th>
                <Th>
                  <Input />
                </Th>
              </Tr>
            </THead>

            <TBody>
              <div>
                {mapArray(services.data, (serv, i) => (
                  <Tr key={serv.id}>
                    <Td>
                      <Checkbox />
                    </Td>
                    <Td>
                      <Image
                        className="w-full"
                        src={serv.thumbnail}
                        alt="thumbnail"
                      />
                    </Td>
                    <Td>{serv.title}</Td>
                    <Td>{serv.shop.sellerProfile.username}</Td>
                    <Td>{serv.id.slice(0, 8)}...</Td>
                    <Td>
                      <PriceDisplay price={serv.price[0]} />
                    </Td>
                    <Td className="whitespace-nowrap">{serv.type}</Td>
                    <Td>{serv.shop.status}</Td>
                    <Td>{new Date(serv.updatedAt).toDateString()}</Td>
                    <Td>
                      <div className="grid grid-cols-2d justify-center gap-2 fill-white text-white text-sm ">
                        <SearchIcon className="w-8 h-8 p-2 bg-cyan-600" />
                        <EditIcon
                          onClick={() =>
                            visit((r) =>
                              r
                                .addPath(getCurrentPath())
                                .addPath("edit")
                                .addPath(serv.id)
                            )
                          }
                          className="w-8 h-8 p-2 bg-cyan-400"
                        />
                        <TrashIcon
                          onClick={() => handleDeleteService(serv.id)}
                          className="w-8 h-8 p-2 bg-red-500"
                        />
                      </div>
                    </Td>
                  </Tr>
                ))}
              </div>
            </TBody>
          </Table>
        </TableContainer>
        <Pagination />
      </section>
    </>
  );
};

export default Services;

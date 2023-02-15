import {
  GetFilteredProductsAdminInput,
  PresentationType,
  ProductUsageStatus,
} from "@features/API";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  Badge,
  Checkbox,
  DateFormInput,
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
  useGetAdminProductsQuery,
  usePaginationControls,
} from "ui";

const Products: NextPage = () => {
  const { visit, getCurrentPath } = useRouting();
  const { t } = useTranslation();
  const { pagination, controls } = usePaginationControls();
  const [filters, setfilters] = React.useState<
    Omit<GetFilteredProductsAdminInput, "pagination">
  >({});
  const { data: products } = useGetAdminProductsQuery({ pagination });

  function getFitler(key: keyof typeof filters) {
    return filters[key] || "";
  }

  function setFilter(
    key: keyof typeof filters,
    value: typeof filters[keyof typeof filters]
  ) {
    setfilters((old) => ({ ...old, [key]: value }));
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
                <Th>{t("Product")}</Th>
                <Th>{t("Seller")}</Th>
                <Th>{t("Id")}</Th>
                <Th>{t("Type of item")}</Th>
                <Th>{t("Price")}</Th>
                <Th>{t("Quantity")}</Th>
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
                  <Input
                    value={getFitler("title")}
                    onChange={(v) => setFilter("title", v.target.value)}
                  />
                </Th>
                <Th>
                  <Input
                    value={getFitler("seller")}
                    onChange={(v) => setFilter("seller", v.target.value)}
                  />
                </Th>
                <Th>
                  <Input
                    value={getFitler("productId")}
                    onChange={(v) => setFilter("productId", v.target.value)}
                  />
                </Th>
                <Th>
                  <Select
                    value={JSON.stringify(getFitler("usageStatus"))}
                    onOptionSelect={(v) => setFilter("usageStatus", v)}
                  >
                    <SelectOption value={ProductUsageStatus.Used}>
                      {t("Used")}
                    </SelectOption>
                    <SelectOption value={ProductUsageStatus.New}>
                      {t("New")}
                    </SelectOption>
                  </Select>
                </Th>
                <Th>
                  <Input
                    type="number"
                    value={getFitler("price")}
                    onChange={(v) => setFilter("price", v.target.value)}
                  />
                </Th>
                <Th>
                  <Input
                    type="number"
                    value={getFitler("qty")}
                    onChange={(v) => setFilter("qty", v.target.value)}
                  />
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
                  <Select
                    value={JSON.stringify(getFitler("status"))}
                    onOptionSelect={(v) => setFilter("status", v)}
                  >
                    <SelectOption value={"active"}>{t("Active")}</SelectOption>
                    <SelectOption value={"inActive"}>
                      {t("inActive")}
                    </SelectOption>
                  </Select>
                </Th>
                <Th>
                  <Input
                    type="number"
                    value={getFitler("views" as any)}
                    onChange={(v) => setFilter("views" as any, v.target.value)}
                  />
                </Th>
                <Th>
                  <DateFormInput
                    dateValue={getFitler("updatedAt")}
                    onDateChange={(v) => setFilter("updatedAt", v)}
                  />
                </Th>
              </Tr>
            </THead>
            <TBody>
              {products?.map((prod, i) => (
                <Tr data-testid="product-record" key={prod.id}>
                  <Td>
                    <Checkbox />
                  </Td>
                  <Td>
                    <Image className="w-full" src={prod.thumbnail} />
                  </Td>
                  <Td>{prod.title}</Td>
                  <Td>{prod.sellerId}</Td>
                  <Td>{prod.id.slice(0, 8)}...</Td>
                  <Td>
                    <Badge
                      cases={{
                        success: ProductUsageStatus.New,
                        off: ProductUsageStatus.Used,
                      }}
                      value={prod.usageStatus}
                    >
                      {prod.usageStatus}
                    </Badge>
                  </Td>
                  <Td>
                    <PriceDisplay price={prod.price} />
                  </Td>
                  <Td align="center">{prod.stock}</Td>
                  <Td align="center">{prod.earnings}</Td>
                  <Td align="center">{prod.sales}</Td>
                  <Td align="center">{prod.totalOrdered}</Td>
                  <Td align="center">{prod.totalDiscounted}</Td>
                  <Td align="center">{prod.totalDiscountedAmount}</Td>
                  <Td align="center">{prod.unitsRefunded}</Td>
                  <Td align="center">
                    %
                    {prod.unitsRefunded / prod.sales === Infinity
                      ? 0
                      : prod.unitsRefunded / prod.sales}
                  </Td>
                  <Td align="center">{prod.positiveFeedback}</Td>
                  <Td align="center">
                    %
                    {prod.positiveFeedback / prod.reviews === Infinity
                      ? 0
                      : prod.positiveFeedback / prod.reviews}
                  </Td>
                  <Td align="center">{prod.negitiveFeedback}</Td>
                  <Td align="center">
                    %
                    {prod.negitiveFeedback / prod.reviews === Infinity
                      ? 0
                      : prod.negitiveFeedback / prod.reviews}
                  </Td>
                  <Td>{prod.status}</Td>
                  <Td>{1698}</Td>
                  <Td>{new Date(prod.updatedAt).toDateString()}</Td>
                  <Td>
                    <div className="grid grid-cols-2d justify-center gap-2 fill-white text-white text-sm ">
                      <SearchIcon className="w-8 h-8 p-2 bg-cyan-600" />
                      <EditIcon
                        onClick={() =>
                          visit((r) =>
                            r
                              .addPath(getCurrentPath())
                              .addPath("edit")
                              .addPath(prod.id)
                          )
                        }
                        className="w-8 h-8 p-2 bg-cyan-400"
                      />
                      <TrashIcon className="w-8 h-8 p-2 bg-red-500" />
                    </div>
                  </Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        </TableContainer>
        <Pagination controls={controls} />
      </section>
    </>
  );
};

export default Products;

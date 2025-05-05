import { ProductStatus, ProductUsageStatus } from "@features/API";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  Badge,
  Checkbox,
  DateFormInput,
  EditIcon,
  GetAdminProductsQuery,
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
import { useForm } from "utils";

const Products: NextPage = () => {
  const { visit, getCurrentPath } = useRouting();
  const { t }: { t: (key: string, ...args: any[]) => string } =
    useTranslation();
  const { pagination, controls } = usePaginationControls();
  const { form, inputProps, selectProps, dateInputProps } = useForm<
    Parameters<typeof useGetAdminProductsQuery>[0]
  >({
    pagination,
  });
  const { data: _products } = useGetAdminProductsQuery(form);
  const products = FAKE_PROD;

  return (
    <React.Fragment>
      <Head>
        <title>Admin | Products </title>
      </Head>
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
                <Th>{t("Stock")}</Th>
                <Th>{t("Status")}</Th>
                <Th>{t("Date modified")}</Th>
                <Th>{t("Action")}</Th>
              </Tr>
              <Tr>
                <Th></Th>
                <Th></Th>
                <Th>
                  <Input {...inputProps("title")} />
                </Th>
                <Th>
                  <Input {...inputProps("seller")} />
                </Th>
                <Th>
                  <Input {...inputProps("productId")} />
                </Th>
                <Th>
                  <Select {...inputProps("type")}>
                    <SelectOption value={ProductUsageStatus.Used}>
                      {t("Used")}
                    </SelectOption>
                    <SelectOption value={ProductUsageStatus.New}>
                      {t("New")}
                    </SelectOption>
                  </Select>
                </Th>
                <Th>
                  <Input type="number" {...inputProps("price")} />
                </Th>
                <Th>
                  <Input type="number" {...inputProps("qty")} />
                </Th>
                <Th>
                  <Select {...selectProps("status")}>
                    <SelectOption value={"active"}>{t("Active")}</SelectOption>
                    <SelectOption value={"inActive"}>
                      {t("inActive")}
                    </SelectOption>
                  </Select>
                </Th>
                <Th>
                  <DateFormInput {...dateInputProps("updatedAt")} />
                </Th>
              </Tr>
            </THead>
            <TBody>
              {products?.map((prod, i) => (
                <Tr data-testid="product-record" key={prod.id}>
                  <Td>
                    <Checkbox />
                  </Td>
                  <Td className="min-w-[8rem]">
                    <Image
                      className="w-full"
                      src={prod.thumbnail}
                      alt="thumbnail"
                    />
                  </Td>
                  <Td>{prod.title}</Td>
                  <Td>{prod?.seller?.profile?.username}</Td>
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
                  <Td>{prod.status}</Td>
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
                              .addPath(prod.id),
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
    </React.Fragment>
  );
};

export default Products;

const FAKE_PROD: GetAdminProductsQuery["getAdminFilteredProducts"] = [
  {
    __typename: "Product",
    title: "Product A",
    sellerId: "seller1",
    id: "product1",
    price: 50,
    stock: 100,
    usageStatus: ProductUsageStatus.New,
    thumbnail: "/shop.jpeg",
    status: ProductStatus.Active,
    totalOrdered: 500,
    totalDiscountedAmount: 100,
    totalDiscounted: 50,
    unitsRefunded: 10,
    positiveFeedback: 80,
    negitiveFeedback: 5,
    sales: 400,
    reviews: 50,
    earnings: 2000,
    updatedAt: "2024-07-13T12:00:00Z",
    external_clicks: 200,
    seller: {
      __typename: "Account",
      profile: {
        __typename: "Profile",
        username: "seller1username",
      },
    },
  },
  {
    __typename: "Product",
    title: "Product B",
    sellerId: "seller2",
    id: "product2",
    price: 70,
    stock: 50,
    usageStatus: ProductUsageStatus.New,
    thumbnail: "/shop.jpeg",
    status: ProductStatus.Active,
    totalOrdered: 200,
    totalDiscountedAmount: 50,
    totalDiscounted: 20,
    unitsRefunded: 5,
    positiveFeedback: 40,
    negitiveFeedback: 2,
    sales: 150,
    reviews: 25,
    earnings: 1000,
    updatedAt: "2024-07-12T15:30:00Z",
    external_clicks: 100,
    seller: {
      __typename: "Account",
      profile: {
        __typename: "Profile",
        username: "seller2username",
      },
    },
  },
];

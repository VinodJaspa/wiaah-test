import { Form, Formik } from "formik";
import { NextPage } from "next";
import { getRandomImage } from "placeholder";
import React from "react";
import { useTranslation } from "react-i18next";
import { BiCloudDownload, BiFolder } from "react-icons/bi";
import { useRouting } from "routing";
import {
  Button,
  DateFormInput,
  FormikInput,
  Image,
  ListIcon,
  Pagination,
  PriceDisplay,
  SearchFilterInput,
  Table,
  TableContainer,
  TBody,
  Td,
  Th,
  THead,
  Tr,
} from "ui";
import { mapArray, randomNum } from "utils";

interface Sale {
  id: string;
  thumbnail: string;
  product_name: string;
  qty: number;
  buyer: string;
  address: string;
  payment_method: string;
  status: string;
  amount: number;
  date: string;
}

const SalesStatistics: NextPage = () => {
  const { t } = useTranslation();
  const { getParam } = useRouting();

  const period = getParam("period");

  const sales: Sale[] = [...Array(10)].map((_, i) => ({
    address: `testaddress`,
    amount: randomNum(150) + 1,
    buyer: `buyer-${i}`,
    date: new Date().toUTCString(),
    id: i.toString(),
    payment_method: `Stripe`,
    product_name: `product name-${i}`,
    qty: randomNum(5) + 1,
    status: `Confirmed`,
    thumbnail: getRandomImage(),
  }));

  return (
    <section className="flex flex-col gap-8 w-full">
      <div className="border border-gray-300">
        <div className="text-xl bg-gray-100 p-4 flex gap-2 items-center w-full">
          <ListIcon />
          <p>{t("Sales List")}</p>
        </div>
        <div className="px-4">
          <Formik initialValues={{}} onSubmit={() => {}}>
            {() => (
              <Form>
                <div className="flex w-full justify-between">
                  <div className="flex items-center gap-2">
                    <p>{t("Filter Orders")}</p>
                    <DateFormInput flushed />
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <div className="flex gap-1 items-center ">
                      <BiFolder />
                      <p>{t("Export to")}</p>
                      <SearchFilterInput value="" flushed />
                    </div>
                    <Button className="flex items-center gap-1">
                      <BiCloudDownload />
                      <p>{t("Export")}</p>
                    </Button>
                  </div>
                </div>
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  <FormikInput
                    placeholder={t("Product Name")}
                    flushed
                    name="product_name"
                  />
                  <FormikInput
                    placeholder={t("Seller")}
                    flushed
                    name="seller"
                  />
                  <FormikInput placeholder={t("Buyer")} flushed name="buyer" />
                  <FormikInput placeholder={t("Quantity")} flushed name="qty" />
                  <FormikInput
                    placeholder={t("Address")}
                    flushed
                    name="address"
                  />
                  <FormikInput
                    placeholder={t("Payment Method")}
                    flushed
                    name="payment_method"
                  />
                  <FormikInput
                    placeholder={t("Status")}
                    flushed
                    name="status"
                  />
                </div>
              </Form>
            )}
          </Formik>

          <TableContainer>
            <Table
              TrProps={{ className: "border-t border-t-gray-200" }}
              className="w-full"
            >
              <THead>
                <Tr>
                  <Th className="w-32">{t("Cover")}</Th>
                  <Th>{t("Product Name")}</Th>
                  <Th>{t("Quantity")}</Th>
                  <Th>{t("Buyer")}</Th>
                  <Th>{t("Address")}</Th>
                  <Th>{t("Payment Method")}</Th>
                  <Th>{t("Status")}</Th>
                  <Th>{t("Amount")}</Th>
                  <Th>{t("Date")}</Th>
                </Tr>
              </THead>
              <TBody>
                {mapArray(
                  sales,
                  ({
                    address,
                    amount,
                    buyer,
                    date,
                    id,
                    payment_method,
                    product_name,
                    qty,
                    status,
                    thumbnail,
                  }) => (
                    <Tr>
                      <Td>
                        <Image src={thumbnail} />
                      </Td>
                      <Td>{product_name}</Td>
                      <Td>{qty}</Td>
                      <Td>{buyer}</Td>
                      <Td>{address}</Td>
                      <Td>{payment_method}</Td>
                      <Td>{status}</Td>
                      <Td>
                        <PriceDisplay price={amount} />
                      </Td>
                      <Td>{new Date(date).toDateString()}</Td>
                    </Tr>
                  )
                )}
              </TBody>
            </Table>
          </TableContainer>
        </div>
        <Pagination />
      </div>
    </section>
  );
};

export default SalesStatistics;

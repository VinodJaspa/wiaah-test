import {
  Button,
  Checkbox,
  EditIcon,
  Input,
  ListIcon,
  Pagination,
  PlusIcon,
  PriceDisplay,
  randomNum,
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
import React from "react";
import { useTranslation } from "react-i18next";
import { mapArray } from "utils";
import { NextPage } from "next";
import { useRouting } from "routing";
import Head from "next/head";

interface Coupon {
  id: string;
  name: string;
  code: string;
  discount: number;
  enabled: boolean;
}

const coupons: Coupon[] = [...Array(5)].map((_, i) => ({
  id: i.toString(),
  name: `coupon-${i}`,
  code: `code-${i}`,
  discount: randomNum(20),
  enabled: randomNum(100) > 50 ? true : false,
}));

const Coupons: NextPage = () => {
  const { t }: { t: (key: string, ...args: any[]) => string } =
    useTranslation();
  const { visit, getCurrentPath } = useRouting();
  return (
    <React.Fragment>
      <Head>
        <title>Admin | Market - Coupons</title>
      </Head>
      <section>
        <div className="flex gap-1 py-4 justify-end">
          <Button center className="w-8 h-8">
            <PlusIcon />
          </Button>
          <Button center className="w-8 h-8" colorScheme="danger">
            <TrashIcon />
          </Button>
        </div>

        <div className="border">
          <div className="p-4 border-b border-b-gray-300 flex items-center gap-2">
            <ListIcon />
            <p>{t("Coupon List")}</p>
          </div>
          <TableContainer>
            <Table className="w-full">
              <THead>
                <Tr>
                  <Th>
                    <Checkbox />
                  </Th>
                  <Th>{t("Coupon Name")}</Th>
                  <Th>{t("Code")}</Th>
                  <Th>{t("Discount")}</Th>
                  <Th>{t("Status")}</Th>
                  <Th>{t("Action")}</Th>
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
                    <Input type="number" />
                  </Th>
                  <Th>
                    <Select>
                      <SelectOption value={"off"}>{t("Disabled")}</SelectOption>
                      <SelectOption value={"on"}>{t("Enabled")}</SelectOption>
                    </Select>
                  </Th>
                  <Th></Th>
                </Tr>
              </THead>
              <TBody>
                {mapArray(coupons, ({ code, discount, enabled, name, id }) => (
                  <Tr>
                    <Td>
                      <Checkbox />
                    </Td>
                    <Td>{name}</Td>
                    <Td>{code}</Td>
                    <Td>
                      <PriceDisplay decimel price={discount} />
                    </Td>
                    <Td>{enabled ? t("Enabled") : t("Disabled")}</Td>
                    <Td>
                      <Button
                        onClick={() =>
                          visit((r) =>
                            r
                              .addPath(getCurrentPath())
                              .addPath("form")
                              .addPath(id),
                          )
                        }
                      >
                        <EditIcon />
                      </Button>
                    </Td>
                  </Tr>
                ))}
                <Tr>
                  <Td>
                    <></>
                  </Td>
                </Tr>
              </TBody>
            </Table>
          </TableContainer>
          <Pagination />
        </div>
      </section>
    </React.Fragment>
  );
};

export default Coupons;

import { NextPage } from "next";
import { useRouter } from "next/router";
import { getRandomImage } from "placeholder";
import React from "react";
import { useTranslation } from "react-i18next";
import { BsKey } from "react-icons/bs";
import { useRouting } from "routing";
import {
  Checkbox,
  EditIcon,
  Image,
  Input,
  LockIcon,
  NotAllowedIcon,
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
} from "ui";
import { randomNum } from "utils";

interface Product {
  id: string;
  sellerName: string;
  name: string;
  price: number;
  qty: number;
  status: string;
  updatedAt: string;
  thubmnail: string;
}

const products: NextPage = () => {
  const { visit, getCurrentPath } = useRouting();
  const { t } = useTranslation();

  const products: Product[] = [...Array(15)].map((_, i) => ({
    id: i.toString(),
    price: randomNum(15),
    qty: randomNum(5),
    sellerName: "seller name",
    thubmnail: getRandomImage(),
    status: "Active",
    updatedAt: new Date().toString(),
    name: `product name ${i}`,
  }));

  return (
    <>
      <section>
        <TableContainer className="w-fit">
          <Table>
            <THead>
              <Tr>
                <Th className="w-fit">
                  <Checkbox />
                </Th>
                <Th className="w-32">{t("Image")}</Th>
                <Th>{t("Product")}</Th>
                <Th>{t("Seller")}</Th>
                <Th>{t("Id")}</Th>
                <Th>{t("Price")}</Th>
                <Th>{t("Quantity")}</Th>
                <Th>{t("Status")}</Th>
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
                  <Input />
                </Th>
                <Th>
                  <Input />
                </Th>
                <Th>
                  <Input type="number" />
                </Th>
                <Th>
                  <Input type="number" />
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
              </Tr>
            </THead>

            <TBody>
              {products.map((prod, i) => (
                <Tr key={prod.id}>
                  <Td>
                    <Checkbox />
                  </Td>
                  <Td>
                    <Image className="w-full" src={prod.thubmnail} />
                  </Td>
                  <Td>{prod.name}</Td>
                  <Td>{prod.sellerName}</Td>
                  <Td>{prod.id.slice(0, 8)}...</Td>
                  <Td>
                    <PriceDisplay price={prod.price} />
                  </Td>
                  <Td>{prod.qty}</Td>
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
        <Pagination />
      </section>
    </>
  );
};

export default products;

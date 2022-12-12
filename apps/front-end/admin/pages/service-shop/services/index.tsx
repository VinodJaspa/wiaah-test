import { NextPage } from "next";
import { getRandomImage } from "placeholder";
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
} from "ui";
import { randomNum } from "utils";

interface Service {
  id: string;
  sellerName: string;
  name: string;
  price: number;
  status: string;
  updatedAt: string;
  thubmnail: string;
  type: string;
}

const serviceTypes = [
  "hotel",
  "restaurant",
  "health-center",
  "beauty-center",
  "vehicle",
  "holiday-rentals",
];

const products: NextPage = () => {
  const { visit, getCurrentPath } = useRouting();
  const { t } = useTranslation();

  const products: Service[] = [...Array(15)].map((_, i) => ({
    id: i.toString(),
    price: randomNum(15),
    qty: randomNum(5),
    type: serviceTypes[randomNum(serviceTypes.length)],
    sellerName: "seller name",
    thubmnail: getRandomImage(),
    status: "Active",
    updatedAt: new Date().toString(),
    name: `service name ${i}`,
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
                <Th>{t("Service")}</Th>
                <Th>{t("Seller")}</Th>
                <Th>{t("Id")}</Th>
                <Th>{t("Price")}</Th>
                <Th>{t("Type")}</Th>
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
                  <Select>
                    <SelectOption value={"hotel"}>{t("hotel")}</SelectOption>
                  </Select>
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
                  <Td className="whitespace-nowrap">{prod.type}</Td>
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

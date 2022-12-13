import { t } from "i18next";
import { NextPage } from "next";
import { getRandomImage } from "placeholder";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  Badge,
  Checkbox,
  DateFormInput,
  Divider,
  EditIcon,
  Image,
  Input,
  Pagination,
  PlusIcon,
  Rate,
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

interface Review {
  id: string;
  seller: {
    name: string;
    id: string;
  };
  product: {
    id: string;
    thumbnail: string;
    title: string;
    sellerId: string;
  };
  author: {
    id: string;
    name: string;
  };
  rating: number;
  status: string;
  createdAt: string;
}

const reviewsData: Review[] = [...Array(10)].map((_, i) => ({
  author: {
    id: "test" + i,
    name: "author name " + i,
  },
  createdAt: new Date().toDateString(),
  id: "review " + i,
  product: {
    id: i.toString(),
    sellerId: i.toString(),
    thumbnail: getRandomImage(),
    title: "title " + i,
  },
  rating: randomNum(5),
  status: "Active",
  seller: {
    id: i.toString(),
    name: "seller name",
  },
}));

const reviews: NextPage = () => {
  const { t } = useTranslation();
  const { visit, getCurrentPath } = useRouting();
  return (
    <section>
      <div className="py-4 text-white gap-2 flex justify-end">
        <PlusIcon
          onClick={() =>
            visit((r) => r.addPath(getCurrentPath()).addPath("new"))
          }
          className="w-8 h-8 p-2 bg-sky-500"
        />
        <TrashIcon className="w-8 h-8 p-2 bg-red-500" />
      </div>
      <Divider />
      <TableContainer>
        <Table>
          <THead>
            <Tr>
              <Th>
                <Checkbox />
              </Th>
              <Th className="w-32">{t("Photo")}</Th>
              <Th>{t("Product")}</Th>
              <Th>{t("ID")}</Th>
              <Th>{t("buyer")}</Th>
              <Th>{t("seller")}</Th>
              <Th>{t("Rating")}</Th>
              <Th>{t("Status")}</Th>
              <Th>{t("Date Added")}</Th>
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
                <Input />
              </Th>
              <Th>
                <Input type={"number"} />
              </Th>
              <Th>
                <Select>
                  <SelectOption value={"active"}>{t("Active")}</SelectOption>
                </Select>
              </Th>
              <Th>
                <DateFormInput />
              </Th>
            </Tr>
          </THead>
          <TBody>
            {reviewsData.map((v, i) => (
              <Tr key={v.id}>
                <Td>
                  <Checkbox />
                </Td>
                <Td>
                  <Image src={v.product.thumbnail} />
                </Td>
                <Td>{v.product.title.slice(0, 20)}</Td>
                <Td>{v.product.id.slice(0, 10)}</Td>
                <Td>{v.author.name.slice(0, 20)}</Td>
                <Td>{v.seller.name.slice(0, 20)}</Td>
                <Td>
                  <Rate rating={v.rating} />
                </Td>
                <Td align="center">
                  <Badge className="w-fit">{v.status}</Badge>
                </Td>
                <Td>{new Date(v.createdAt).toDateString()}</Td>
                <Td>
                  <div className="grid min-w-[8rem] grid-cols-3 justify-center gap-2 fill-white text-white text-sm">
                    <EditIcon
                      onClick={() =>
                        visit((r) =>
                          r
                            .addPath(getCurrentPath())
                            .addPath("edit")
                            .addPath(v.id)
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
  );
};

export default reviews;

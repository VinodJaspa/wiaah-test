import { Link } from "@components";
import { NextPage } from "next";
import { getRandomImage } from "placeholder";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  DateFormInput,
  EditIcon,
  Image,
  Input,
  Pagination,
  Table,
  TableContainer,
  TBody,
  Td,
  Th,
  THead,
  Tr,
  TrashIcon,
} from "ui";
import { mapArray, randomNum } from "utils";

type Affiliation = {
  id: string;
  sellerId: string;
  sellerName: string;
  affiliationLink: string;
  createdAt: string;
  commision: number;
  product: {
    thumbnail: string;
    price: number;
    id: string;
  };
};

const affiliations: Affiliation[] = [...Array(10)].map((_, i) => ({
  id: randomNum(165464).toString(),
  affiliationLink: `test link ${i}`,
  commision: randomNum(15),
  sellerId: i.toString(),
  sellerName: `seller name ${i}`,
  createdAt: new Date().toString(),
  product: {
    id: i.toString(),
    price: randomNum(150),
    thumbnail: getRandomImage(),
  },
}));

const AffiliationManagement: NextPage = () => {
  const { getCurrentPath, visit } = useRouting();
  const { t } = useTranslation();
  return (
    <section>
      <TableContainer className="w-full">
        <Table className="w-full">
          <THead>
            <Tr>
              <Th className="w-32">{t("Photo")}</Th>
              <Th>{t("Seller")}</Th>
              <Th>{t("commission")}</Th>
              <Th>{t("Price")}</Th>
              <Th>{t("Link")}</Th>
              <Th>{t("Created at")}</Th>
              <Th>{t("action")}</Th>
            </Tr>
            <Tr>
              <Th></Th>
              <Th>
                <Input />
              </Th>
              <Th>
                <Input type={"number"} />
              </Th>
              <Th>
                <Input type={"number"} />
              </Th>
              <Th>
                <Input />
              </Th>
              <Th>
                <DateFormInput />
              </Th>
            </Tr>
          </THead>
          <TBody>
            {mapArray(
              affiliations,
              (
                {
                  affiliationLink,
                  commision,
                  createdAt,
                  id,
                  product,
                  sellerId,
                  sellerName,
                },
                i
              ) => (
                <Tr>
                  <Td>
                    <Image src={product.thumbnail} />
                  </Td>
                  <Td>
                    <Link
                      href={
                        (r) => ""
                        // r.visitSocialPostAuthorProfile({ id: sellerId }).route
                      }
                    >
                      <p className="underline text-primary">{sellerName}</p>
                    </Link>
                  </Td>
                  <Td>{commision}%</Td>
                  <Td>{product.price}</Td>
                  <Td>{affiliationLink.slice(0, 15)}</Td>
                  <Td>{new Date(createdAt).toDateString()}</Td>
                  <Td>
                    <div className="grid grid-cols-3 justify-center gap-2 fill-white text-white text-sm">
                      <EditIcon
                        onClick={() =>
                          visit((r) =>
                            r
                              .addPath(getCurrentPath())
                              .addPath("edit")
                              .addPath(id)
                          )
                        }
                        className="w-8 h-8 p-2 bg-cyan-400"
                      />
                      <TrashIcon className="w-8 h-8 p-2 bg-red-500" />
                    </div>
                  </Td>
                </Tr>
              )
            )}
          </TBody>
        </Table>
      </TableContainer>
      <Pagination />
    </section>
  );
};

export default AffiliationManagement;

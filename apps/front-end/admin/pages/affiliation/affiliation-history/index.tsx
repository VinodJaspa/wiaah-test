import { Link } from "@components";
import { NextPage } from "next";
import { getRandomImage } from "placeholder";
import React from "react";
import { useTranslation } from "react-i18next";
import { BsKey } from "react-icons/bs";
import { useRouting } from "routing";
import {
  EditIcon,
  Image,
  Input,
  LockIcon,
  NotAllowedIcon,
  Pagination,
  PriceDisplay,
  SearchIcon,
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

interface AffiliationHistory {
  id: string;
  productId: string;
  seller: string;
  sellerId: string;
  marketer: string;
  marketerId: string;
  thumbnail: string;
  buyer: string;
  buyerId: string;
  purchasedAt: string;
  commission: number;
  price: number;
  commissionPrice: number;
  affiliationLink;
}

const history: AffiliationHistory[] = [...Array(10)].map((_, i) => ({
  buyer: "buyer name",
  buyerId: "buyer-" + i,
  commission: randomNum(15),
  commissionPrice: randomNum(30),
  id: "id-" + i,
  marketer: "marketer name",
  marketerId: "marketer-" + i,
  price: randomNum(150),
  productId: "prod-" + i,
  purchasedAt: new Date().toString(),
  seller: "seller name",
  sellerId: "seller-" + i,
  thumbnail: getRandomImage(),
  affiliationLink: "affiliation link test-" + i,
}));

const AffiliationHistory: NextPage = () => {
  const { getCurrentPath, visit } = useRouting();
  const { t } = useTranslation();
  return (
    <section>
      <TableContainer>
        <Table>
          <THead>
            <Tr>
              <Th className="w-32">{t("Photo")}</Th>
              <Th>{t("Seller")}</Th>
              <Th>{t("Marketer")}</Th>
              <Th>{t("Buyer")}</Th>
              <Th>{t("Price")}</Th>
              <Th>{t("Commission")}</Th>
              <Th>{t("Price rewarded")}</Th>
              <Th>{t("Purchased at")}</Th>
              <Th>{t("Affiliation link")}</Th>
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
                <Input />
              </Th>
              <Th>
                <Input type="number" />
              </Th>
              <Th>
                <Input type="number" />
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
            </Tr>
          </THead>
          <TBody>
            {history.map(
              (
                {
                  buyer,
                  commission,
                  commissionPrice,
                  marketer,
                  price,
                  purchasedAt,
                  seller,
                  thumbnail,
                  affiliationLink,
                },
                i
              ) => (
                <Tr>
                  <Td>
                    <Image src={thumbnail} />
                  </Td>
                  <Td>
                    <Link href={(r) => ""}>
                      <p className="text-primary underline cursor-pointer">
                        {seller}
                      </p>
                    </Link>
                  </Td>
                  <Td>
                    <Link href={(r) => ""}>
                      <p className="text-primary underline cursor-pointer">
                        {marketer}
                      </p>
                    </Link>
                  </Td>
                  <Td>
                    <Link href={(r) => ""}>
                      <p className="text-primary underline cursor-pointer">
                        {buyer}
                      </p>
                    </Link>
                  </Td>
                  <Td>
                    <PriceDisplay price={price} />
                  </Td>
                  <Td>{commission}%</Td>
                  <Td>
                    <PriceDisplay price={commissionPrice} />
                  </Td>
                  <Td>{new Date(purchasedAt).toDateString()}</Td>
                  <Td>{affiliationLink.slice(0, 15)}</Td>
                  <Td>
                    <div className="grid grid-cols-3 justify-center gap-2 fill-white text-white text-sm">
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

export default AffiliationHistory;

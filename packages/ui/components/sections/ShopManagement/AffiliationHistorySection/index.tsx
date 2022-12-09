import React from "react";
import { useTranslation } from "react-i18next";
import { BsFilePdfFill } from "react-icons/bs";
import { PriceType } from "types";
import {
  Button,
  ItemsPagination,
  Table,
  Tr,
  Td,
  TBody,
  Th,
  THead,
  TableContainer,
  SectionHeader,
  usePaginationControls,
} from "ui";

export interface AffiliationHistorySection {}

type AffiliationHistoryCardData = {
  productName: string;
  productPrice: PriceType;
  affilator: string;
  purchaser: string;
  commission: number;
  commissionAmount: PriceType;
  productImage: string;
};

export const AffiliationHistorySection: React.FC<
  AffiliationHistorySection
> = () => {
  const {
    changeTotalItems,
    controls,
    pagination: { page, take },
  } = usePaginationControls();
  const { t } = useTranslation();
  React.useEffect(() => {
    changeTotalItems(AffiliationHistoryCards.length);
  }, []);
  return (
    <div className="flex flex-col gap-4 w-full">
      <SectionHeader
        sectionTitle={t("affiliation_history", "Affiliation History")}
      >
        <Button className="flex py-1 items-center gap-2">
          <BsFilePdfFill /> {t("pdf", "pdf")}
        </Button>
      </SectionHeader>
      <TableContainer className="w-full">
        <Table
          className="w-full"
          ThProps={{
            className: "border-[1px] border-gray-300",
          }}
          TdProps={{
            className: "border-[1px] border-gray-300",
          }}
          TrProps={{
            className: "border-collapse",
          }}
        >
          <THead>
            <Tr>
              <Th>{t("product_image", "Product Image")}</Th>
              <Th>{t("product_name", "Product Name")}</Th>
              <Th>{t("product_price", "Product Price")}</Th>
              <Th>{t("affilator", "Affilator")}</Th>
              <Th>{t("purchaser", "Purchaser")}</Th>
              <Th>{t("commission", "Commission")}</Th>
              <Th>{t("commission_amount", "Commission Amount")}</Th>
            </Tr>
          </THead>
          <TBody>
            {AffiliationHistoryCards.map((card, i) => (
              <Tr key={i}>
                <Td className="w-fit">
                  <img className="w-32 h-auto" src={card.productImage} />
                </Td>
                <Td>{card.productName}</Td>
                <Td>
                  {card.productPrice.amount} {card.productPrice.currency}
                </Td>
                <Td>{card.affilator}</Td>
                <Td>{card.purchaser}</Td>
                <Td>{card.commission}%</Td>
                <Td>
                  {card.commissionAmount.amount}{" "}
                  {card.commissionAmount.currency}
                </Td>
              </Tr>
            ))}
            <Tr>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td className="border-[1px] border-gray-300">
                {t("total_money", "Total Money")}:
              </Td>
              <Td className="border-[1px] border-gray-300">
                {AffiliationHistoryCards.reduce((acc, card) => {
                  return (acc += card.commissionAmount.amount);
                }, 0)}{" "}
                {AffiliationHistoryCards[0].commissionAmount.currency}
              </Td>
            </Tr>
          </TBody>
        </Table>
      </TableContainer>
      <ItemsPagination controls={controls} />
    </div>
  );
};

const AffiliationHistoryCards: AffiliationHistoryCardData[] = [...Array(3)].map(
  (_, i) => ({
    productImage: `/place-${i + 1}.jpg`,
    productName: `product ${i}`,
    affilator: `affilator ${i}`,
    commission: 10,
    commissionAmount: {
      amount: 20,
      currency: "USD",
    },
    productPrice: {
      amount: 200,
      currency: "USD",
    },
    purchaser: `purchaser ${i}`,
  })
);

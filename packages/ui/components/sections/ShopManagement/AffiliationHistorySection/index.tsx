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
  Image,
  PriceDisplay,
  useResponsive,
  Divider,
  HStack,
} from "@UI";
import { useGetMyAffiliationHistoryQuery } from "@features/Affiliation/services/queries/useGetMyAffiliationHistory";
import { mapArray } from "@UI/../utils/src";

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
  const { changeTotalItems, controls, pagination } = usePaginationControls();

  const { isMobile } = useResponsive();

  const { data } = useGetMyAffiliationHistoryQuery({
    pagination,
  });

  const { t } = useTranslation();
  React.useEffect(() => {
    changeTotalItems(AffiliationHistoryCards.length);
  }, []);
  return (
    <div className="flex flex-col gap-4 w-full">
      <SectionHeader
        sectionTitle={t("affiliation_history", "Affiliation History")}
      >
        {isMobile ? null : (
          // {/* TODO: donwload affiliation history list as a pdf  */}
          <Button className="flex py-1 items-center gap-2">
            <BsFilePdfFill /> {t("pdf")}
          </Button>
        )}
      </SectionHeader>
      {isMobile ? (
        <div className="flex flex-col gap-4">
          {mapArray(data, (v, i) => {
            const thumbnail =
              v.itemType === "product"
                ? v.product?.thumbnail
                : v.service?.thumbnail;
            const title =
              v.itemType === "product" ? v.product?.title : v.service?.name;

            return (
              <div className="border rounded-lg  p-2 flex flex-col">
                <div className="border rounded-lg border-primary p-2 flex justify-between">
                  <div className="flex flex-col gap-2 items-center">
                    <p className="text-lg text-center pb-2 border-b-primary border-b font-semibold">
                      {t("Affiliator")}
                    </p>
                    <p className="font-medium">
                      {v.affiliator.profile?.username}
                    </p>
                  </div>
                  <Divider variant="vert" className="border-primary py-8" />
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-lg text-center pb-2 border-b-primary border-b font-semibold">
                      {t("Purchaser")}
                    </p>
                    <p className="font-medium">
                      {v.affiliator.profile?.username}
                    </p>
                  </div>
                </div>
                <Divider />
                <div className="flex gap-2">
                  <Image
                    src={thumbnail}
                    className="w-36 h-24 object-cover rounded-md"
                  />
                  <div className="flex flex-col gap-2 justify-between">
                    <p className="text-lg font-semibold">{title}</p>
                    <div className="text-sm flex flex-col gap-2">
                      <HStack>
                        <p>
                          {t("Commission")} {"(%)"}:
                        </p>
                        <p className="font-semibold text-sm">
                          {v.paidCommissionPercent}
                        </p>
                      </HStack>
                      <HStack>
                        <p>{t("Commission amount")}</p>
                        <p className="font-semibold">
                          {v.paidCommissionAmount}
                        </p>
                      </HStack>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <>
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
                  <Th>{t("Product Image")}</Th>
                  <Th>{t("Product Name")}</Th>
                  <Th>{t("Product Price")}</Th>
                  <Th>{t("Affilator")}</Th>
                  <Th>{t("Purchaser")}</Th>
                  <Th>{t("Commission")}</Th>
                  <Th>{t("Commission Amount")}</Th>
                </Tr>
              </THead>
              <TBody>
                {Array.isArray(data)
                  ? data.map((card, i) => (
                      <Tr key={i}>
                        <Td className="w-fit">
                          <Image
                            className="w-32 h-auto"
                            src={card.product?.thumbnail}
                          />
                        </Td>
                        <Td>{card.product?.title}</Td>
                        <Td>
                          <PriceDisplay price={card.product?.price} />
                        </Td>
                        <Td>{card.affiliator?.profile?.username}</Td>
                        <Td>{card.purchaser.profile?.username}</Td>
                        <Td>{card.paidCommissionPercent}%</Td>
                        <Td>
                          <PriceDisplay price={card.paidCommissionAmount} />
                        </Td>
                      </Tr>
                    ))
                  : null}
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
                    <PriceDisplay
                      price={data?.reduce((acc, card) => {
                        return (acc += card.paidCommissionAmount);
                      }, 0)}
                    />
                  </Td>
                </Tr>
              </TBody>
            </Table>
          </TableContainer>
          <ItemsPagination controls={controls} />
        </>
      )}
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

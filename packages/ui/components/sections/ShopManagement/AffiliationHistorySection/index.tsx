import { useGetMyAffiliationHistoryQuery } from "@features/Affiliation/services/queries/useGetMyAffiliationHistory";
import {
  Divider,
  HStack,
  Image,
  PriceDisplay,
  SectionHeader,
  ShadcnTable,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  usePaginationControls,
  useResponsive
} from "@UI";
import { mapArray } from "@UI/../utils/src";
import React from "react";
import { useTranslation } from "react-i18next";
import { BsFilePdfFill } from "react-icons/bs";
import { PriceType } from "types";

import PrimaryButton from "@UI/components/shadcn-components/Buttons/primaryButton";
import Pagination from "@UI/components/shadcn-components/Pagination/Pagination";
import { Avatar } from "@UI/components/shadcn-components/table";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
export interface AffiliationHistorySection { }

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
  const [total, setTotal] = React.useState(5);
  const [currrentItem, setCurrrentItem] = React.useState(1);
  const { isMobile } = useResponsive();

  const { data } = useGetMyAffiliationHistoryQuery({
    pagination,
  });

  const { t } = useTranslation();
  const handleNextList = () => {

  }
  // PDF download function
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text(String(t("Affiliation History")), 14, 15);

    autoTable(doc, {
      startY: 25,
      head: [[
        String(t("Product Name")),
        String(t("Product Price")),
        String(t("Affiliator")),
        String(t("Purchaser")),
        String(t("Commission")),
        String(t("Commission Amount")),
      ]],
      body: (data || [])
        .map((item) => [
          item.product?.title || "",
          `${item.product?.price || 0}`,
          item.affiliator?.profile?.username || "",
          item.purchaser?.profile?.username || "",
          `${item.paidCommissionPercent || 0}%`,
          `${item.paidCommissionAmount || 0}`,
        ])
        .map((row) => row.map((cell) => String(cell))),
      theme: "striped",
    });

    doc.save("affiliation-history.pdf");
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <SectionHeader
        sectionTitle={t("affiliation_history", "Affiliation History")}
      >
        {isMobile ? null : (
          // {/* TODO: donwload affiliation history list as a pdf  */}
          (<PrimaryButton onClick={handleDownloadPDF} className="flex py-1 items-center gap-2">
            <BsFilePdfFill /> {t("pdf")}
          </PrimaryButton>)
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
                    <p className="text-lg font-semibold">{String(title ?? "")}</p>
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
          <TableList data={data} />
          <Pagination total={total} current={currrentItem} onPageChange={() => handleNextList()} />
        </>
      )}
    </div>
  );
};

export function TableList({ data }) {
  const { t } = useTranslation()

  return (
    <div className="w-full overflow-x-auto border rounded-lg shadow-sm">
      <ShadcnTable>
        <TableHeader>
          <TableRow>
            <TableHead>{t("Product Image")}</TableHead>
            <TableHead>{t("Product Name")}</TableHead>
            <TableHead>{t("Product Price")}</TableHead>
            <TableHead>{t("Affiliator")}</TableHead>
            <TableHead>{t("Purchaser")}</TableHead>
            <TableHead>{t("Commission")}</TableHead>
            <TableHead>{t("Commission Amount")}</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.isArray(data) &&
            data.map((card, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Avatar className="w-fit justify-center mx-auto" src={card.product?.thumbnail}
                    alt={card.product?.title || "Product"} />

                </TableCell>
                <TableCell>{card.product?.title}</TableCell>
                <TableCell>
                  <PriceDisplay price={card.product?.price} />
                </TableCell>
                <TableCell>{card.affiliator?.profile?.username}</TableCell>
                <TableCell>{card.purchaser?.profile?.username}</TableCell>
                <TableCell>{card.paidCommissionPercent}%</TableCell>
                <TableCell>
                  <PriceDisplay price={card.paidCommissionAmount} />
                </TableCell>
              </TableRow>
            ))}

          <TableRow className="font-medium bg-muted/40">
            <TableCell colSpan={5}></TableCell>
            <TableCell className="border-t">
              {t("total_money", "Total Money")}:
            </TableCell>
            <TableCell className="border-t">
              <PriceDisplay
                price={data?.reduce((acc, card) => acc + card.paidCommissionAmount, 0)}
              />
            </TableCell>
          </TableRow>
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={7} className="text-right text-muted-foreground">
              {t("Commission summary")}
            </TableCell>
          </TableRow>
        </TableFooter>
      </ShadcnTable>
    </div>
  )
}


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

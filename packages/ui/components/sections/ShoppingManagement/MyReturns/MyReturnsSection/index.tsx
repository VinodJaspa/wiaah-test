import { useResponsive } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { HtmlDivProps, PriceType } from "types";
import { getRandomImage } from "ui/placeholder";
import { SectionContext } from "state";
import { randomNum } from "utils";
import {
  Divider,
  PriceDisplay,
  Select,
  SelectOption,
  Table,
  TBody,
  Td,
  Th,
  Tr,
  TableContainer,
  HStack,
  ArrowLeftIcon,
  AddIcon,
  ModalExtendedWrapper,
  ModalButton,
  AskForReturnModal,
} from "ui";

export interface MyReturnsSectionProps {}

export const MyReturnsSection: React.FC<MyReturnsSectionProps> = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4">
      <SectionHeader sectionTitle={t("my_returns", "My Returns")} />
      <HStack className="justify-between">
        <Select
          className="text-2xl w-96"
          placeholder={t("filter_returns", "Filter Returns")}
        >
          <SelectOption value={"returnPending"}>
            {t("return", "Return")} {t("pending", "Pending")}
          </SelectOption>
          <SelectOption value={"returnAccepted"}>
            {t("return", "Return")} {t("accepted", "Accepted")}
          </SelectOption>
          <SelectOption value={"returnRejected"}>
            {t("return", "Return")} {t("rejected", "rejceted")}
          </SelectOption>
        </Select>
        <ModalExtendedWrapper>
          <ModalButton>
            <AddIcon className="text-xl cursor-pointer" />
          </ModalButton>
          <AskForReturnModal />
        </ModalExtendedWrapper>
      </HStack>
      <TableContainer>
        <Table ThProps={{ className: "whitespace-nowrap" }} className="w-full">
          <Tr>
            <Th>{t("product_image", "Product Image")}</Th>
            <Th>{t("product_name", "Product Name")}</Th>
            <Th>{t("quantity", "Quantity")}</Th>
            <Th>{t("paid_price", "Paid price")}</Th>
            <Th>{t("shipping_amount", "Shipping Amount")}</Th>
            <Th>{t("return_reason", "Return Reason")}</Th>
            <Th>{t("other_reason", "Other Reason")}</Th>
            <Th>{t("admin_status", "Admin Status")}</Th>
            <Th>{t("seller_status", "Seller Status")}</Th>
          </Tr>
          <TBody>
            {returnedProducts &&
              returnedProducts.length > 0 &&
              returnedProducts.map((prod, i) => (
                <Tr key={i}>
                  <Td>
                    <img
                      className="w-16 h-auto"
                      src={prod.productImage}
                      alt={prod.productName}
                    />
                  </Td>
                  <Td>{prod.productName}</Td>
                  <Td>{prod.quantity}</Td>
                  <Td>
                    <PriceDisplay priceObject={prod.paidPrice} />
                  </Td>
                  <Td>
                    <PriceDisplay priceObject={prod.shippingAmount} />
                  </Td>
                  <Td>{prod.returnReason}</Td>
                  <Td>{prod.otherReason}</Td>
                  <Td>{prod.adminStatus}</Td>
                  <Td>{prod.sellerStatus}</Td>
                </Tr>
              ))}
          </TBody>
        </Table>
      </TableContainer>
      {!returnedProducts || returnedProducts.length < 1 ? (
        <span className="text-xl">
          {t("no_records_found", "No Records Found")}
        </span>
      ) : null}
    </div>
  );
};

type ReturnedProductDetails = {
  productImage: string;
  productName: string;
  quantity: number;
  paidPrice: PriceType;
  shippingAmount: PriceType;
  returnReason: string;
  otherReason: string;
  adminStatus: string;
  sellerStatus: string;
};

const returnedProducts: ReturnedProductDetails[] = [...Array(5)].map(
  (_, i) => ({
    productImage: getRandomImage(),
    productName: `product ${i}`,
    quantity: randomNum(10),
    paidPrice: {
      amount: randomNum(50),
      currency: "USD",
    },
    shippingAmount: {
      amount: randomNum(20),
      currency: "USD",
    },
    returnReason: "reason",
    otherReason: "reason 2",
    adminStatus: "Status",
    sellerStatus: "Status",
  })
);

export interface SectionHeaderProps extends HtmlDivProps {
  sectionTitle: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  sectionTitle,
  children,
  className,
  ...props
}) => {
  const { onReturn } = React.useContext(SectionContext);
  const { isMobile } = useResponsive();
  return isMobile ? (
    <div {...props} className={`${className || ""} flex flex-col gap-2`}>
      <div className="w-full text-2xl items-center py-2 flex justify-between">
        <ArrowLeftIcon onClick={onReturn} />
        <span>{sectionTitle}</span>
        <span className="text-base">{children}</span>
      </div>
      <Divider />
    </div>
  ) : (
    <div {...props} className={`${className || ""} flex flex-col gap-3`}>
      <div className="w-full flex justify-between items-center">
        <span className="text-4xl font-semibold">{sectionTitle}</span>
        {children}
      </div>
      <Divider className="border-primary" />
    </div>
  );
};

import { useResponsive } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { HtmlDivProps } from "types";
import { SectionContext } from "state";
import { mapArray, setTestid } from "utils";
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
  Image,
  useGetMyReturnedProductsQuery,
  usePaginationControls,
} from "@UI";
import { Product, ReturnedOrder } from "@features/API";

export interface MyReturnsSectionProps {}

export const MyReturnsSection: React.FC<MyReturnsSectionProps> = () => {
  const { t } = useTranslation();

  const { pagination, controls } = usePaginationControls();
  const { data } = useGetMyReturnedProductsQuery({ pagination });

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader sectionTitle={t("My Returns")} />
      <HStack className="justify-between">
        <Select className="text-lg w-96" placeholder={t("Filter Returns")}>
          <SelectOption value={"pending"}>{t("Pending")}</SelectOption>
          <SelectOption value={"accepted"}>{t("Accepted")}</SelectOption>
          <SelectOption value={"rejected"}>{t("Rejceted")}</SelectOption>
        </Select>
        <ModalExtendedWrapper>
          <ModalButton>
            <AddIcon className="text-xl cursor-pointer" />
          </ModalButton>
          <AskForReturnModal />
        </ModalExtendedWrapper>
      </HStack>

      {!data || data.length < 1 ? (
        <span className="text-xl">{t("No Records Found")}</span>
      ) : null}
    </div>
  );
};

export const ProductReturnsList: React.FC<{
  items: (Pick<ReturnedOrder, "id" | "reason" | "amount" | "status"> & {
    product: Pick<Product, "title" | "thumbnail">;
  })[];
}> = ({ items }) => {
  const { t } = useTranslation();

  return (
    <TableContainer>
      <Table ThProps={{ className: "whitespace-nowrap" }} className="w-full">
        <Tr>
          <Th>{t("Product Image")}</Th>
          <Th>{t("Product Name")}</Th>
          <Th>{t("Paid price")}</Th>
          <Th>{t("Return Reason")}</Th>
          <Th>{t("Admin Status")}</Th>
          <Th>{t("Seller Status")}</Th>
        </Tr>
        <TBody>
          {mapArray(items, (prod, i) => (
            <Tr {...setTestid("item")} key={i}>
              <Td>
                <Image
                  {...setTestid("item-thumbnail")}
                  className="w-16 h-auto"
                  src={prod.product.thumbnail}
                  alt={prod.product.title}
                />
              </Td>
              <Td {...setTestid("item-title")}>{prod.product.title}</Td>
              <Td>
                <PriceDisplay
                  {...setTestid("item-price")}
                  price={prod.amount}
                />
              </Td>

              <Td {...setTestid("item-reason")}>{prod.reason}</Td>
              <Td {...setTestid("item-status")}>{prod.status}</Td>
              <Td>{prod.status}</Td>
            </Tr>
          ))}
        </TBody>
      </Table>
    </TableContainer>
  );
};

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

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
  Pagination,
  Badge,
  Button,
  RoundedPlusIcon,
} from "@UI";
import { Product, RefundStatusType, ReturnedOrder } from "@features/API";

export interface MyReturnsSectionProps {}

export const MyReturnsSection: React.FC<MyReturnsSectionProps> = () => {
const { t } = useTranslation();
  const { isMobile } = useResponsive();

  const { pagination, controls } = usePaginationControls();
  const { data } = useGetMyReturnedProductsQuery({ pagination });

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader sectionTitle={t("My Returns")} />
      {isMobile ? (
        <div className="flex flex-col gap-4">
          <Select>
            <SelectOption value={0}>{t("Most Recent")}</SelectOption>
          </Select>

          <div className="flex flex-col gap-4 h-full overflow-y-scroll noScroll">
            {mapArray(data, (returnedProduct) => (
              <div className="flex gap-3">
                <Image
                  src={returnedProduct.product.thumbnail}
                  className="h-full w-32 object-cover"
                />
                <div className="flex flex-col gap-3">
                  <p>
                    {returnedProduct.product.title[0].value ?? ''} X {returnedProduct.qty}
                  </p>
                  <p>
                    {t("Return reason")}: <span>{returnedProduct.reason}</span>
                  </p>
                  <p>
                    {t("Paid amount")}:{" "}
                    <span>{returnedProduct.fullAmount}</span>
                  </p>
                  <p>
                    {t("Admin status")}:{" "}
                    <span>
                      <Badge
                        cases={{
                          fail: [
                            RefundStatusType.Rejected,
                            RefundStatusType.Closed,
                          ],
                          success: [
                            RefundStatusType.Accepted,
                            RefundStatusType.Refunded,
                          ],
                          off: RefundStatusType.Pending,
                        }}
                        value={returnedProduct.status}
                      />
                    </span>
                  </p>
                  <p>
                    {t("Seller status")}:{" "}
                    <span>
                      <Badge
                        cases={{
                          fail: [
                            RefundStatusType.Rejected,
                            RefundStatusType.Closed,
                          ],
                          success: [
                            RefundStatusType.Accepted,
                            RefundStatusType.Refunded,
                          ],
                          off: RefundStatusType.Pending,
                        }}
                        value={returnedProduct.adminStatus}
                      />
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <ModalExtendedWrapper>
            <ModalButton>
              <Button colorScheme="darkbrown">
                <HStack>
                  <RoundedPlusIcon />
                  <p>{t("Ask for refund")}</p>
                </HStack>
              </Button>
            </ModalButton>
            <AskForReturnModal />
          </ModalExtendedWrapper>
        </div>
      ) : (
        <>
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

          <ProductReturnsList items={data}></ProductReturnsList>
          <Pagination></Pagination>

          {!data || data.length < 1 ? (
            <span className="text-xl">{t("No Records Found")}</span>
          ) : null}
        </>
      )}
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
                  alt={prod.product.title[0].value ??''}
                />
              </Td>
              <Td {...setTestid("item-title")}>{prod.product.title[0].value ??''}</Td>
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
  onBack?: () => any;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  sectionTitle,
  children,
  className,
  onBack,
  ...props
}) => {
  const { onReturn } = React.useContext(SectionContext);
  const { isMobile } = useResponsive();
  return isMobile ? (
    <div {...props} className={`${className || ""} flex flex-col gap-2`}>
      <div className="w-full text-3xl items-center flex justify-between">
        <ArrowLeftIcon onClick={onBack ? onBack : onReturn} />
        <p className="text-sm font-semibold">{sectionTitle}</p>
        <span className="text-base">{children}</span>
      </div>
      <Divider className="my-0" />
    </div>
  ) : (
    <div {...props} className={`${className || ""} flex flex-col gap-3`}>
      <div className="w-full flex justify-between items-center">
        <span className="text-sm font-semibold">{sectionTitle}</span>
        {children}
      </div>
      <Divider className="border-primary" />
    </div>
  );
};

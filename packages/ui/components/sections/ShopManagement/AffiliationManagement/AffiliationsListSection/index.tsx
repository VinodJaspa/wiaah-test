import React from "react";
import { useTranslation } from "react-i18next";
import { BiCopy, BiEdit } from "react-icons/bi";
import { IoTrash } from "react-icons/io5";
import {
  AffiliationManagementContext,
  ItemsPagination,
  usePaginationControls,
  Button,
  Table,
  TBody,
  Td,
  Tr,
  Th,
  TableContainer,
  SectionHeader,
  Image,
  Badge,
  useGetMyAffiliationQuery,
} from "@UI";
import { useResponsive } from "hooks";
import { FiPlusSquare } from "react-icons/fi";
import { mapArray, useClipboard } from "utils";
import { useRouting } from "routing";
import { AffiliationStatus } from "@features/API";

export interface AffiliationListSectionProps {}

export const AffiliationListSection: React.FC<
  AffiliationListSectionProps
> = () => {
  const { addNew } = React.useContext(AffiliationManagementContext);
  const { isMobile } = useResponsive();
  const { getUrl } = useRouting();
  const { copy } = useClipboard();
  const { changeTotalItems, controls, pagination } = usePaginationControls();
  const { t } = useTranslation();
  const { data: affiliations } = useGetMyAffiliationQuery({ pagination });

  React.useEffect(() => {
    changeTotalItems(affiliations?.length || 0);
  }, []);

  return (
    <div className="flex flex-col">
      <SectionHeader sectionTitle={t("affiliation_list", "Affiliation List")}>
        {isMobile ? (
          <FiPlusSquare className="text-2xl" onClick={addNew} />
        ) : (
          <Button onClick={addNew}>
            {t("add_new_affiliation", "Add New Affiliation")}
          </Button>
        )}
      </SectionHeader>
      <TableContainer>
        <Table
          ThProps={{ className: "whitespace-nowrap" }}
          className="w-full overflow-scroll"
        >
          <Th>{t("product_image", "Product Image")}</Th>
          <Th>{t("product_id", "Product Id")}</Th>
          <Th>{t("product_name", "Product Name")}</Th>
          <Th>{t("commission", "Commission")} %</Th>
          <Th>{t("expiry_date", "Expiry Date")}</Th>
          <Th>{t("affiliation_link", "Affiliation Link")}</Th>
          <Th>{t("status", "Status")}</Th>
          <Th className="pr-0 text-right">{t("action", "Action")}</Th>
          <TBody>
            {mapArray(affiliations, (link, i) => (
              <Tr key={link.id}>
                <Td>
                  <Image
                    className="w-16 md:w-20 lg:w-24 xl:w-32 h-auto"
                    src={link.product?.thumbnail}
                    alt={link.product?.title}
                  />
                </Td>
                <Td>{link.itemId}</Td>
                <Td>{link.product?.title}</Td>
                <Td>{link.commision}</Td>
                <Td>{new Date(link.expireAt).toDateString()}</Td>
                <Td>
                  <Button
                    onClick={() =>
                      copy(getUrl((r) => r.visitProduct(link.itemId)))
                    }
                  >
                    <BiCopy />
                  </Button>
                </Td>
                <Td>
                  <Badge
                    value={link.status}
                    cases={{ off: AffiliationStatus.InActive }}
                  >
                    {link.status}
                  </Badge>
                </Td>
                <Td className="pr-0">
                  <div className="w-full justify-end flex items-center gap-2">
                    <BiEdit className="text-xl cursor-pointer" />
                    <IoTrash className="text-red-700 text-xl cursor-pointer" />
                  </div>
                </Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      </TableContainer>
      <ItemsPagination controls={controls} />
    </div>
  );
};

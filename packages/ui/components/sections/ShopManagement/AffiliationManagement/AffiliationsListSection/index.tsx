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
  useGetUserAffiliationQuery,
  HStack,
  LinkIcon,
  Divider,
  CheckmarkCircleFillIcon,
  TrashIcon,
  EditIcon,
} from "@UI";
import { useResponsive } from "hooks";
import { mapArray, useClipboard } from "utils";
import { useRouting } from "routing";
import { AffiliationStatus } from "@features/API";

export interface AffiliationListSectionProps {}

export const AffiliationListSection: React.FC<
  AffiliationListSectionProps
> = () => {
  const { addNew, edit } = React.useContext(AffiliationManagementContext);
  const { isMobile } = useResponsive();
  const { getUrl } = useRouting();
  const { copy } = useClipboard();
  const { changeTotalItems, controls, pagination } = usePaginationControls();
const { t } = useTranslation();

  const { data: affiliations } = useGetUserAffiliationQuery({ pagination });

  React.useEffect(() => {
    changeTotalItems(affiliations?.length || 0);
  }, []);

  return (
    <div className="flex flex-col">
      <SectionHeader sectionTitle={t("Affiliation List")}>
        {isMobile ? null : (
          <Button onClick={addNew}>
            {t("add_new_affiliation", "Add New Affiliation")}
          </Button>
        )}
      </SectionHeader>
      {isMobile ? (
        <div className="flex flex-col h-full w-full">
          <div className="flex flex-col gap-4 h-full overflow-y-scroll">
            {mapArray(affiliations, (v, i) => {
              const type = v.itemType;
              const thumbnail =
                type === "product"
                  ? v.product?.thumbnail
                  : v.service?.thumbnail;
              const title =
                type === "product" ? v.product?.title : v.service?.name;
              return (
                <div
                  key={i}
                  className="p-2 border rounded-2xl border-opacity-50 border-gray-300"
                >
                  <HStack className="justify-between">
                    <div className="flex gap-2">
                      <Image
                        className="rounded-md w-20 h-16 object-cover"
                        src={thumbnail}
                      />
                      <p className="font-medium">{title}</p>
                    </div>
                    <Button
                      onClick={() =>
                        copy(getUrl((r) => r.visitProduct(v.itemId)))
                      }
                    >
                      <HStack>
                        <LinkIcon className="text-2xl" />
                        <p className="font-medium">{t("Link")}</p>
                      </HStack>
                    </Button>
                  </HStack>
                  <Divider />
                  <div className="flex text-sm flex-col gap-2">
                    <HStack>
                      <p>{t("Product ID")}:</p>
                      <p className="font-semibold">{v.itemId}</p>
                    </HStack>
                    <HStack>
                      <p>
                        {t("Commission")} {"(%)"}:
                      </p>
                      <p className="font-semibold">{v.commision}%</p>
                    </HStack>
                    <HStack>
                      <p>{t("Time")}:</p>
                      <p className="font-semibold">
                        {new Date(v.createdAt).toLocaleTimeString("en-us", {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          timeZoneName: "long",
                        })}
                      </p>
                    </HStack>
                    <HStack>
                      <p>{t("Status")}:</p>
                      <Badge
                        cases={{
                          success: AffiliationStatus.Active,
                          off: AffiliationStatus.InActive,
                        }}
                        value={v.status}
                        className="font-semibold"
                      >
                        <HStack className="text-primary text-xs">
                          <CheckmarkCircleFillIcon />
                          <p>{t("Active")}</p>
                        </HStack>
                      </Badge>
                    </HStack>
                  </div>
                  <Divider />

                  <HStack className="justify-end gap-6">
                    {/* TODO: bind delete functionality */}
                    <Button colorScheme="danger" outline>
                      <HStack>
                        <TrashIcon className="text-red-500 text-lg" />
                        <p>{t("Delete")}</p>
                      </HStack>
                    </Button>

                    <Button onClick={() => edit(v.id)} colorScheme="darkbrown">
                      <HStack>
                        <EditIcon className="text-lg" />
                        <p>{t("Edit")}</p>
                      </HStack>
                    </Button>
                  </HStack>
                </div>
              );
            })}
          </div>
          <Button className="w-full mx-8" colorScheme="darkbrown">
            {t("Add New Affiliation")}
          </Button>
        </div>
      ) : (
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
      )}
      <ItemsPagination controls={controls} />
    </div>
  );
};

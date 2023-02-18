import { Link } from "@components";
import { NextPage } from "next";
import { getRandomImage } from "placeholder";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  DateFormInput,
  EditIcon,
  getAdminAffiliationsFetcher,
  Image,
  Input,
  Pagination,
  PriceDisplay,
  Table,
  TableContainer,
  TBody,
  Td,
  Th,
  THead,
  Tr,
  TrashIcon,
  useGetAdminAffiliationsQuery,
  usePaginationControls,
} from "ui";
import { mapArray, randomNum, useForm } from "utils";

const AffiliationManagement: NextPage = () => {
  const { getCurrentPath, visit, getUrl } = useRouting();
  const { t } = useTranslation();

  const { pagination } = usePaginationControls();
  const { form, inputProps } = useForm<
    Parameters<typeof getAdminAffiliationsFetcher>[0]
  >({ pagination }, { pagination });
  const { data } = useGetAdminAffiliationsQuery(form);

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
                <Input {...inputProps("seller")} />
              </Th>
              <Th>
                <Input {...inputProps("commission")} type={"number"} />
              </Th>
              <Th>
                <Input {...inputProps("price")} type={"number"} />
              </Th>
              <Th>
                <Input {...inputProps("link")} />
              </Th>
              <Th>
                <DateFormInput
                  {...inputProps(
                    "createdAfter",
                    "dateValue",
                    "onDateChange",
                    (e) => e
                  )}
                />
              </Th>
            </Tr>
          </THead>
          <TBody>
            {mapArray(
              data,
              ({
                commision,
                createdAt,
                id,
                product,
                seller,
                sellerId,
                service,
                itemId,
                itemType,
              }) => (
                <Tr key={id}>
                  <Td>
                    <Image src={product.thumbnail || service.thumbnail} />
                  </Td>
                  <Td>
                    <Link
                      href={
                        (r) => ""
                        // r.visitSocialPostAuthorProfile({ id: sellerId }).route
                      }
                    >
                      <p className="underline text-primary">
                        {seller?.profile?.username}
                      </p>
                    </Link>
                  </Td>
                  <Td>{commision}%</Td>
                  <Td>
                    <PriceDisplay price={product.price || service.price} />
                  </Td>
                  <Td>
                    {itemType === "product"
                      ? getUrl((r) => r.visitProduct(itemId))
                      : getUrl((r) => r.visitService({ id: itemId }, itemType))}
                  </Td>
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

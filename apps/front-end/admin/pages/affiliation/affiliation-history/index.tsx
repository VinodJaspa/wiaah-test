import { Link } from "@components";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  DateFormInput,
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
  useGetAdminAffiliationsHistoryQuery,
  usePaginationControls,
} from "ui";
import { useForm } from "utils";
const FAKE_HISTORY_DATA = [
  {
    id: "1",
    itemId: "item-1",
    itemType: "product",
    paidCommissionAmount: 50,
    paidCommissionPercent: 10,
    affiliatorId: "affiliator-1",
    purchaserId: "purchaser-1",
    sellerId: "seller-1",
    product: {
      title: "Sample Product",
      thumbnail: "path/to/thumbnail.jpg",
      price: 100,
    },
    service: null,
    seller: {
      profile: {
        username: "seller_username",
      },
    },
    purchaser: {
      profile: {
        username: "purchaser_username",
      },
    },
    affiliation: {
      id: "affiliation-1",
    },
    affiliator: {
      profile: {
        username: "affiliator_username",
        photo: "path/to/photo.jpg",
      },
    },
  },
];

const AffiliationHistory: NextPage = () => {
  const { t } = useTranslation();
  const { getUrl } = useRouting();
  const { pagination, controls } = usePaginationControls();
  const { form, inputProps, handleChange } = useForm<
    Parameters<typeof useGetAdminAffiliationsHistoryQuery>[0]
  >({ pagination }, { pagination });
  //Warning this graphql query is not ready yet
  const { data: _history } = useGetAdminAffiliationsHistoryQuery(form);

  return (
    <section>
      <TableContainer>
        <Table className="w-max">
          <THead>
            <Tr>
              <Th className="w-32">{t("Photo")}</Th>
              <Th>{t("Title")}</Th>
              <Th>{t("Seller")}</Th>
              <Th>{t("Affiliator")}</Th>
              <Th>{t("Purchaser")}</Th>
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
                <Input {...inputProps("title")} />
              </Th>
              <Th>
                <Input {...inputProps("seller")} />
              </Th>
              <Th>
                <Input {...inputProps("affiliator")} />
              </Th>
              <Th>
                <Input {...inputProps("purchaser")} />
              </Th>
              <Th>
                <Input {...inputProps("price")} type="number" />
              </Th>
              <Th>
                <Input {...inputProps("commission")} type="number" />
              </Th>
              <Th>
                <Input {...inputProps("money_generated")} type="number" />
              </Th>
              <Th>
                <DateFormInput
                  {...inputProps(
                    "purchasedAfter",
                    "dateValue",
                    "onDateChange",
                    (e) => e
                  )}
                />
              </Th>
              <Th>
                <Input />
              </Th>
            </Tr>
          </THead>
          <TBody>
            {FAKE_HISTORY_DATA.map(
              ({
                affiliator,
                paidCommissionAmount,
                paidCommissionPercent,
                purchaser,
                seller,
                product,
                service,
                itemId,
                itemType,
                affiliatorId,
                affiliation,
                sellerId,
                purchaserId,
                id,
              }) => (
                <Tr key={id}>
                  <Td>
                    <Image
                      src={product?.thumbnail || service?.thumbnail}
                      alt="thumbnail"
                    />
                  </Td>
                  {product?.title ||
                    (service?.title && (
                      <Td>
                        {(product?.title || service?.title).slice(0, 15)}...
                      </Td>
                    ))}
                  <Td>
                    <Link
                      href={(r) =>
                        r.visitSellerSocialProfile({ id: seller }).route
                      }
                    >
                      <p className="text-primary underline cursor-pointer">
                        {seller?.profile?.username}
                      </p>
                    </Link>
                  </Td>
                  <Td>
                    <Link
                      href={(r) =>
                        r.visitSellerSocialProfile({ id: affiliatorId }).route
                      }
                    >
                      <p className="text-primary underline cursor-pointer">
                        {affiliator?.profile?.username}
                      </p>
                    </Link>
                  </Td>
                  <Td>
                    <Link
                      href={(r) =>
                        r.visitBuyerSocialProfile({ id: purchaserId }).route
                      }
                    >
                      <p className="text-primary underline cursor-pointer">
                        {purchaser?.profile?.username}
                      </p>
                    </Link>
                  </Td>
                  <Td>
                    <PriceDisplay price={product?.price || service?.price} />
                  </Td>
                  <Td>{paidCommissionPercent}%</Td>
                  <Td>
                    <PriceDisplay price={paidCommissionAmount} />
                  </Td>
                  <Td>{new Date().toDateString()}</Td>
                  <Td>
                    {itemType === "service"
                      ? getUrl((r) => r.visitService({ id: itemId }, itemType))
                      : getUrl((r) => r.visitProduct(itemId))}
                  </Td>
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

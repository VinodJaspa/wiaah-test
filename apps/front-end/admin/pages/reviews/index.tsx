import { NextPage } from "next";
import Head from "next/head";
import { getRandomImage } from "placeholder";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  AdminGetReviewsQuery,
  Checkbox,
  DateFormInput,
  Divider,
  EditIcon,
  Image,
  Input,
  Pagination,
  PlusIcon,
  Rate,
  Table,
  TableContainer,
  TBody,
  Td,
  Th,
  THead,
  Tr,
  TrashIcon,
  useAdminDeleteProductReviewMutation,
  useAdminGetProductReviews,
  usePaginationControls,
} from "ui";
import { mapArray, randomNum, useForm } from "utils";

interface Review {
  id: string;
  seller: {
    name: string;
    id: string;
  };
  product: {
    id: string;
    thumbnail: string;
    title: string;
    sellerId: string;
  };
  author: {
    id: string;
    name: string;
  };
  rating: number;
  status: string;
  comment: string;
  createdAt: string;
}

const Reviews: NextPage = () => {
  const { t } = useTranslation();
  const { visit, getCurrentPath } = useRouting();

  const { pagination, controls } = usePaginationControls();
  const { form, inputProps } = useForm<
    Parameters<typeof useAdminGetProductReviews>[0]
  >({ pagination }, { pagination });
  const { data: _reviews } = useAdminGetProductReviews(form);
  const reviews = FAKE_REIVEWS;
  const { mutate: deleteReview } = useAdminDeleteProductReviewMutation();

  return (
    <React.Fragment>
      <Head>
        <title>Admin | Reviews </title>
      </Head>
      <section>
        <div className="py-4 text-white gap-2 flex justify-end">
          {/* <PlusIcon
          onClick={() =>
            visit((r) => r.addPath(getCurrentPath()).addPath("new"))
          }
          className="w-8 h-8 p-2 bg-sky-500"
        /> */}
          <TrashIcon className="w-8 h-8 p-2 bg-red-500" />
        </div>
        <Divider />
        <TableContainer>
          <Table>
            <THead>
              <Tr>
                <Th>
                  <Checkbox />
                </Th>
                <Th className="w-32">{t("Photo")}</Th>
                <Th>{t("Product")}</Th>
                <Th>{t("ID")}</Th>
                <Th>{t("buyer")}</Th>
                <Th>{t("seller")}</Th>
                <Th>{t("Review")}</Th>
                <Th>{t("Rating")}</Th>
                <Th>{t("Date Added")}</Th>
                <Th>{t("Action")}</Th>
              </Tr>
              <Tr>
                <Th></Th>
                <Th></Th>
                <Th>
                  <Input {...inputProps("product")} />
                </Th>
                <Th>
                  <Input {...inputProps("id")} />
                </Th>
                <Th>
                  <Input {...inputProps("buyer")} />
                </Th>
                <Th>
                  <Input {...inputProps("seller")} />
                </Th>
                <Th>
                  <Input {...inputProps("review")} />
                </Th>
                <Th>
                  <Input {...inputProps("rating")} type={"number"} />
                </Th>
                <Th>
                  <DateFormInput
                    {...inputProps(
                      "dateAdded",
                      "dateValue",
                      "onDateChange",
                      (e) => e,
                    )}
                  />
                </Th>
              </Tr>
            </THead>
            <TBody>
              {mapArray(reviews, (v, i) => (
                <Tr key={v.id}>
                  <Td>
                    <Checkbox />
                  </Td>
                  <Td>
                    <Image src={v?.product?.thumbnail} />
                  </Td>
                  <Td>{v.product?.title.slice(0, 20)}</Td>
                  <Td>{v.product?.id.slice(0, 10)}</Td>
                  <Td>{v.reviewer?.profile?.username.slice(0, 20)}</Td>
                  <Td>{v.product?.seller?.profile?.username.slice(0, 20)}</Td>
                  <Td>{v.message.slice(0, 60)}...</Td>
                  <Td>
                    <Rate rating={v.rate} />
                  </Td>
                  <Td>{new Date(v.createdAt).toDateString()}</Td>
                  <Td>
                    <div className="grid min-w-[8rem] grid-cols-3 justify-center gap-2 fill-white text-white text-sm">
                      <EditIcon
                        onClick={() =>
                          visit((r) =>
                            r
                              .addPath(getCurrentPath())
                              .addPath("edit")
                              .addPath(v.id),
                          )
                        }
                        className="w-8 h-8 p-2 bg-cyan-400"
                      />
                      <TrashIcon
                        onClick={() => deleteReview(v.id)}
                        className="cursor-pointer w-8 h-8 p-2 bg-red-500"
                      />
                    </div>
                  </Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        </TableContainer>
        <Pagination controls={controls} />
      </section>
    </React.Fragment>
  );
};

export default Reviews;

const FAKE_REIVEWS: AdminGetReviewsQuery["adminGetFilteredProductReviews"] = [
  {
    __typename: "ProductReview",
    message: "Great product, highly recommend!",
    rate: 4.5,
    createdAt: "2024-07-13T10:00:00Z",
    id: "review1",
    product: {
      __typename: "Product",
      title: "Product A",
      thumbnail: "/shop.jpeg",
      id: "product1",
      seller: {
        __typename: "Account",
        id: "seller1",
        profile: {
          __typename: "Profile",
          photo: "https://example.com/seller1.jpg",
          username: "seller1username",
        },
      },
    },
    reviewer: {
      __typename: "Account",
      profile: {
        __typename: "Profile",
        username: "reviewer1username",
        photo: "/shop.jpeg",
        id: "reviewer1",
      },
    },
  },
  {
    __typename: "ProductReview",
    message: "Could be better, had some issues.",
    rate: 3.2,
    createdAt: "2024-07-12T15:30:00Z",
    id: "review2",
    product: {
      __typename: "Product",
      title: "Product B",
      thumbnail: "/shop.jpeg",
      id: "product2",
      seller: {
        __typename: "Account",
        id: "seller2",
        profile: {
          __typename: "Profile",
          photo: "/shop.jpeg",
          username: "seller2username",
        },
      },
    },
    reviewer: {
      __typename: "Account",
      profile: {
        __typename: "Profile",
        username: "reviewer2username",
        photo: "https://example.com/reviewer2.jpg",
        id: "reviewer2",
      },
    },
  },
];

import { NextPage } from "next";
import { getRandomImage } from "placeholder";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
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

const reviews: NextPage = () => {
  const { t } = useTranslation();
  const { visit, getCurrentPath } = useRouting();

  const { pagination, controls } = usePaginationControls();
  const { form, inputProps } = useForm<
    Parameters<typeof useAdminGetProductReviews>[0]
  >({ pagination }, { pagination });
  const { data: reviews } = useAdminGetProductReviews(form);
  const { mutate: deleteReview } = useAdminDeleteProductReviewMutation();

  return (
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
                    (e) => e
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
                            .addPath(v.id)
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
  );
};

export default reviews;

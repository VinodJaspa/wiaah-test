import { Link } from "@components";
import { AttachmentType } from "@features/API";
import React from "react";
import { useTranslation } from "react-i18next";
import { BsKey } from "react-icons/bs";
import {
  Badge,
  DateFormInput,
  getRandomImage,
  Image,
  Input,
  Pagination,
  Table,
  TableContainer,
  TBody,
  Td,
  Th,
  THead,
  Tr,
  TrashIcon,
  useAdminDeleteNewsfeedPostMutation,
  useGetAdminFilteredNewsfeedPosts,
} from "ui";
import { mapArray, NumberShortner, randomNum, useForm } from "utils";

const SocialPosts = () => {
  const { t } = useTranslation();

  const { mutate } = useAdminDeleteNewsfeedPostMutation();
  const { form, handleChange, inputProps } = useForm<
    Parameters<typeof useGetAdminFilteredNewsfeedPosts>[0]
  >({});
  const { data } = useGetAdminFilteredNewsfeedPosts(form);

  return (
    <>
      <TableContainer>
        <Table className="w-full">
          <THead>
            <Tr>
              <Th>{t("Thumbnail")}</Th>
              <Th>{t("ID")}</Th>
              <Th>{t("Username")}</Th>
              <Th>{t("Legend")}</Th>
              <Th>{t("Views")}</Th>
              <Th>{t("Likes")}</Th>
              <Th>{t("Comments")}</Th>
              <Th>{t("Shares")}</Th>
              <Th>{t("Publish Date")}</Th>
              <Th>{t("Action")}</Th>
            </Tr>
          </THead>
          <TBody>
            <Tr>
              <Td></Td>
              <Td>
                <Input {...inputProps("id")} />
              </Td>
              <Td>
                <Input {...inputProps("username")} />
              </Td>
              <Td>
                <Input {...inputProps("legend")} />
              </Td>
              <Td>
                <Input {...inputProps("views")} type="number" />
              </Td>
              <Td>
                <Input {...inputProps("likes")} type="number" />
              </Td>
              <Td>
                <Input {...inputProps("comments")} type="number" />
              </Td>
              <Td>
                <Input {...inputProps("shares")} type="number" />
              </Td>
              <Td>
                <DateFormInput
                  dateValue={form.date}
                  onDateChange={(v) => handleChange("date", v)}
                />
              </Td>
            </Tr>

            {mapArray(data, (data, i) => (
              <Tr key={i}>
                <Td className="w-fit">
                  {data.attachments[0].type === AttachmentType.Vid ? (
                    <>vid</>
                  ) : (
                    <Image className="w-32" src={data.attachments[0].src} />
                  )}
                </Td>
                <Td>{data.id.slice(0, 4)}...</Td>
                <Td className="text-primary">
                  <Link
                    href={(r) =>
                      r.visitSocialPostAuthorProfile({
                        id: data.authorProfileId,
                      }).route
                    }
                  >
                    <p className="text-primary underline cursor-pointer">
                      {data.publisher.username}
                    </p>
                  </Link>
                </Td>
                <Td className="w-[30%]">
                  <div className="flex flex-col gap-4">
                    <p>{data.content.slice(0, 80)}...</p>
                    <div className="flex flex-wrap gap-2">
                      {data.hashtags.map((tag, i) => (
                        <Badge variant="off" key={i}>
                          <>#{tag}</>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Td>
                <Td>{NumberShortner(data.views)}</Td>
                <Td>{NumberShortner(data.reactionNum)}</Td>
                <Td>{NumberShortner(data.comments)}</Td>
                <Td>{NumberShortner(data.shares)}</Td>
                <Td>{new Date(data.createdAt).toDateString()}</Td>
                <Td className="text-white">
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={(r) => r.visitNewsfeedAccountsPostPage(data).route}
                    >
                      <BsKey className="w-8 h-8 p-2 bg-green-500" />
                    </Link>
                    <TrashIcon
                      onClick={() => mutate(data.id)}
                      className="w-8 h-8 p-2 bg-red-500"
                    />
                  </div>
                </Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      </TableContainer>
      <Pagination />
    </>
  );
};

export default SocialPosts;

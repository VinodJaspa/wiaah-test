import {
  Badge,
  Button,
  DateFormInput,
  getRandomImage,
  Image,
  Input,
  NotAllowedIcon,
  Pagination,
  Select,
  SelectOption,
  Table,
  TableContainer,
  TBody,
  Td,
  Th,
  THead,
  Tr,
  useAdminGetSocialReports,
  useAdminMarkReportedContentCleanMutation,
  useAdminSuspenseReportedContentMutation,
  usePaginationControls,
} from "ui";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { mapArray, NumberShortner, randomNum, useForm } from "utils";
import { ImCheckmark } from "react-icons/im";
import { AttachmentType, ReportType } from "@features/API";

const SocialReports: NextPage = () => {
  const { t } = useTranslation();

  const { controls, pagination } = usePaginationControls();
  const { form, inputProps } = useForm<
    Parameters<typeof useAdminGetSocialReports>[0]
  >({ pagination }, { pagination, type: ReportType.Post });
  const { data: reports } = useAdminGetSocialReports(form);
  const { mutate: clean } = useAdminMarkReportedContentCleanMutation();
  const { mutate: suspense } = useAdminSuspenseReportedContentMutation();

  return (
    <>
      <TableContainer>
        <Table
          ThProps={{ className: "max-w-[10rem]" }}
          TdProps={{ className: "max-w-[10rem]" }}
          className="min-w-max"
        >
          <THead>
            <Tr>
              <Th>{t("Thumbnail")}</Th>
              <Th>{t("ID")}</Th>
              <Th>{t("Reason")}</Th>
              <Th>{t("Status")}</Th>
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
                <Input {...inputProps("reason")} />
              </Td>
              <Td>
                <Select
                  {...inputProps("status", "value", "onOptionChange", (e) => e)}
                >
                  <SelectOption value={"appropriate"}>
                    {t("Appropriate")}
                  </SelectOption>
                  <SelectOption value={"inappropriate"}>
                    {t("inAppropriate")}
                  </SelectOption>
                </Select>
              </Td>
              <Td>
                <Input {...inputProps("legend")} />
              </Td>
              <Td>
                <Input type="number" {...inputProps("views")} />
              </Td>
              <Td>
                <Input type="number" {...inputProps("likes")} />
              </Td>
              <Td>
                <Input type="number" {...inputProps("comments")} />
              </Td>
              <Td>
                <Input type="number" {...inputProps("shares")} />
              </Td>
              <Td>
                <DateFormInput
                  {...inputProps(
                    "publishDate",
                    "dateValue",
                    "onDateChange",
                    (e) => e
                  )}
                />
              </Td>
            </Tr>

            {mapArray(
              reports,
              ({ createdAt, id, message, post, status }, i) => (
                <Tr key={i}>
                  <Td className="w-fit">
                    {post.attachments[0].type === AttachmentType.Vid ? (
                      <></>
                    ) : (
                      <Image
                        className="w-32"
                        src={post.attachments[0].src}
                        alt=""
                      />
                    )}
                  </Td>
                  <Td>{id.slice(0, 4)}...</Td>
                  <Td>{message.slice(0, 30)}</Td>
                  <Td>{status}</Td>
                  <Td className="w-[30%]">
                    <div className="flex flex-col gap-4">
                      <p>{post.content.slice(0, 80)}...</p>
                      <div className="flex flex-wrap gap-2">
                        {post.hashtags.map((tag, i) => (
                          <Badge variant="off" key={i}>
                            #{tag.tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Td>
                  <Td>{NumberShortner(post.views)}</Td>
                  <Td>{NumberShortner(post.reactionNum)}</Td>
                  <Td>{NumberShortner(post.comments)}</Td>
                  <Td>{NumberShortner(post.shares)}</Td>
                  <Td>{new Date(createdAt).toDateString()}</Td>
                  <Td className="text-white">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        onClick={() => {
                          clean(id);
                        }}
                        center
                        className="p-2"
                      >
                        <ImCheckmark className="text-white" />
                      </Button>
                      <Button onClick={() => suspense(id)}>
                        <NotAllowedIcon className="text-white" />
                      </Button>
                    </div>
                  </Td>
                </Tr>
              )
            )}
          </TBody>
        </Table>
      </TableContainer>
      <Pagination controls={controls} />
    </>
  );
};

export default SocialReports;

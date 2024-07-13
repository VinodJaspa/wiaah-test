import {
  AdminGetPostReportsQuery,
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
import { AttachmentType, ReportStatus, ReportType } from "@features/API";

const SocialReports: NextPage = () => {
  const { t } = useTranslation();

  const { controls, pagination } = usePaginationControls();
  const { form, inputProps } = useForm<
    Parameters<typeof useAdminGetSocialReports>[0]
  >({ pagination }, { pagination, type: ReportType.Post });
  const { data: _reports } = useAdminGetSocialReports(form);
  const reports = FAKE_REPORTS;
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

const FAKE_REPORTS: AdminGetPostReportsQuery["getReports"] = [
  {
    __typename: "Report",
    id: "1",
    type: ReportType.Post,
    createdAt: "2024-07-13T09:00:00Z",
    status: ReportStatus.Clean,
    message: "This post contains spammy content.",
    reportedBy: {
      __typename: "Profile",
      id: "user123",
      username: "reporter1",
    },
    post: {
      __typename: "NewsfeedPost",
      title: "Exciting News Update!",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      reactionNum: 50,
      shares: 20,
      comments: 30,
      views: 100,
      hashtags: [
        { __typename: "Hashtag", tag: "news" },
        { __typename: "Hashtag", tag: "update" },
      ],
      attachments: [
        {
          __typename: "Attachment",
          src: getRandomImage(),
          type: AttachmentType.Img,
        },
        {
          __typename: "Attachment",
          src: getRandomImage(),
          type: AttachmentType.Img,
        },
      ],
    },
  },
  {
    __typename: "Report",
    id: "2",
    type: ReportType.Post,
    createdAt: "2024-07-12T14:30:00Z",
    status: ReportStatus.Clean,
    message: "This post is inappropriate for the platform.",
    reportedBy: {
      __typename: "Profile",
      id: "user456",
      username: "reporter2",
    },
    post: {
      __typename: "NewsfeedPost",
      title: "Important Announcement",
      content:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
      reactionNum: 40,
      shares: 10,
      comments: 25,
      views: 80,
      hashtags: [
        { __typename: "Hashtag", tag: "announcement" },
        { __typename: "Hashtag", tag: "important" },
      ],
      attachments: [
        {
          __typename: "Attachment",
          src: getRandomImage(),
          type: AttachmentType.Img,
        },
      ],
    },
  },
];

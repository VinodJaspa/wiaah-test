import { Link } from "@components";
import { ContentHostType } from "@features/API";
import React from "react";
import { useTranslation } from "react-i18next";
import { BiChat } from "react-icons/bi";
import { BsKey } from "react-icons/bs";
import { useRouting } from "routing";
import {
  Badge,
  DateFormInput,
  EditIcon,
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
  usePaginationControls,
  AdminUpdatePostSettingsModal,
  Button,
  HStack,
  EyeIcon,
  AdminGetPostCommentsModal,
  EmailIcon,
  MessageOutlineIcon,
} from "ui";
import { mapArray, NumberShortner, useForm } from "utils";

const SocialPosts = () => {
  const { t } = useTranslation();

  const { visit } = useRouting();

  const { mutate } = useAdminDeleteNewsfeedPostMutation();

  const { controls, pagination } = usePaginationControls();

  const { form, handleChange, inputProps } = useForm<
    Parameters<typeof useGetAdminFilteredNewsfeedPosts>[0]
  >({ pagination });

  const { data } = useGetAdminFilteredNewsfeedPosts(form);

  const [editId, setEditId] = React.useState<string>();
  const [showComments, setShowComments] =
    React.useState<[string, ContentHostType]>();

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
                  <Image className="w-32" src={data?.attachments[0]?.src} />
                </Td>
                <Td>{data.id.slice(0, 4)}...</Td>
                <Td className="text-primary">
                  <Link
                    href={(r) =>
                      r.visitSocialPostAuthorProfile({
                        id: data?.authorProfileId,
                      }).route
                    }
                  >
                    <p className="text-primary underline cursor-pointer">
                      {data?.publisher?.username}
                    </p>
                  </Link>
                </Td>
                <Td className="w-[30%]">
                  <div className="flex flex-col gap-4">
                    <p>{data?.content?.slice(0, 80)}...</p>
                    <div className="flex flex-wrap gap-2">
                      {data?.hashtags?.map((tag, i) => (
                        <Badge variant="off" key={i}>
                          <>#{tag}</>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Td>
                <Td>{NumberShortner(data?.views)}</Td>
                <Td>{NumberShortner(data?.reactionNum)}</Td>
                <Td>
                  <Button
                    colorScheme="white"
                    onClick={() =>
                      setShowComments([data.id, ContentHostType.PostNewsfeed])
                    }
                  >
                    <HStack>
                      <p>{NumberShortner(data?.comments)}</p>
                      <BiChat />
                    </HStack>
                  </Button>
                </Td>
                <Td>{NumberShortner(data?.shares)}</Td>
                <Td>{new Date(data.createdAt).toDateString()}</Td>
                <Td className="text-white">
                  <HStack>
                    <Button
                      center
                      className="p-2"
                      onClick={() =>
                        visit((r) => r.visitNewsfeedAccountsPostPage(data))
                      }
                    >
                      <BsKey />
                    </Button>
                    <Button colorScheme="danger" center className="p-2">
                      <TrashIcon onClick={() => mutate(data?.id)} />
                    </Button>
                    <Button
                      onClick={() => setEditId(data?.id)}
                      className="p-2"
                      colorScheme="info"
                      center
                    >
                      <EditIcon />
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      </TableContainer>
      <AdminUpdatePostSettingsModal
        onClose={() => setEditId(undefined)}
        postId={editId}
      />
      <AdminGetPostCommentsModal
        onClose={() => setShowComments(undefined)}
        contentType={showComments?.at(1)}
        postId={showComments?.at(0)}
      />
      <Pagination controls={controls} />
    </>
  );
};

export default SocialPosts;

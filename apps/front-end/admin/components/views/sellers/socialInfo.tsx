import { DateFormInput, SocialProfile, usePaginationControls } from "@blocks";
import {
  PostType,
  ProfileVisibility,
  ServiceType,
  StoryType,
} from "@features/API";
import {
  AccountType,
  ActiveStatus,
  StoreType,
} from "@features/API/gql/generated";
import {
  Badge,
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
} from "@partials";
import Image from "next/image";
import { useGetProfilePosts } from "@UI";
import React from "react";
import { useTranslation } from "react-i18next";
import { BsKey } from "react-icons/bs";
import { mapArray, NumberShortner, useForm } from "utils";

export const AccountSocialInfo: React.FC<{
  accountId: string;
}> = ({ accountId }) => {
  const { t } = useTranslation();
  const { changeTotalItems, controls, pagination } = usePaginationControls();
  const { data: posts } = useGetProfilePosts({
    userId: accountId,
    type: PostType.NewsfeedPost,
    pagination: { page: 1, take: 5 },
  });

  return (
    <div>
      <SocialProfile
        profileInfo={{
          id: "1230",
          username: "Jane Daniel",
          publications: 5,
          photo: "/shop-2.jpeg",
          verified: true,
          bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend diam cras eu felis egestas aliquam. Amet ornare",
          followers: 4,
          following: 10,
          profession: "programmer",
          ownerId: "jkl",
          activeStatus: ActiveStatus.Active,
          visibility: ProfileVisibility.Public,
          createdAt: "2024-1-1",
          lastActive: "2024-12-12",
          updatedAt: "2024-2-2",
          user: {
            id: "33",
            verified: true,
            accountType: AccountType.Seller,
            shop: {
              id: "22",
              type: ServiceType.BeautyCenter,
              storeType: StoreType.Service,
            },
          },
        }}
        isFollowed={false}
        isPublic={ProfileVisibility.Public}
        storeType={StoreType.Product}
      />
      <TableContainer>
        <Table className="w-full">
          <THead>
            <Tr>
              <Th>{t("Thumbnail")}</Th>
              <Th>{t("ID")}</Th>
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
                <Input />
              </Td>
              <Td>
                <Input />
              </Td>
              <Td>
                <Input type="number" />
              </Td>
              <Td>
                <Input type="number" />
              </Td>
              <Td>
                <Input type="number" />
              </Td>
              <Td>
                <Input type="number" />
              </Td>
              <Td>
                <DateFormInput />
              </Td>
            </Tr>

            {mapArray(posts, (data, i) => (
              <Tr key={i}>
                <Td className="w-fit">
                  {data.mediaType === "video" ? (
                    <></>
                  ) : (
                    <Image
                      className="w-32"
                      src={data.thumbnail}
                      alt="thumbnail"
                    />
                  )}
                </Td>
                <Td>{data.id.slice(0, 4)}...</Td>
                <Td className="w-[30%]">
                  <div className="flex flex-col gap-4">
                    <p>{data.content.slice(0, 80)}...</p>
                    <div className="flex flex-wrap gap-2">
                      {data.hashtags.map((hashtag, i) => (
                        <Badge variant="off" key={i}>
                          #{hashtag.tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Td>
                <Td>{NumberShortner(data.views)}</Td>
                <Td>{NumberShortner(data.likes)}</Td>
                <Td>{NumberShortner(data.comments)}</Td>
                <Td>{NumberShortner(data.shares)}</Td>
                <Td>{new Date(data.createdAt).toDateString()}</Td>
                <Td className="text-white">
                  <div className="flex flex-wrap gap-2">
                    <BsKey className="w-8 h-8 p-2 bg-green-500" />
                    <TrashIcon className="w-8 h-8 p-2 bg-red-500" />
                  </div>
                </Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      </TableContainer>
      <Pagination />
    </div>
  );
};

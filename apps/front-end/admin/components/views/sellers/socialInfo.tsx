import { DateFormInput, SocialProfile, usePaginationControls } from "@blocks";
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
import { useAdminGetProfileQuery } from "@UI";
import React from "react";
import { useTranslation } from "react-i18next";
import { BsKey } from "react-icons/bs";
import { mapArray, NumberShortner, useForm } from "utils";

export const AccountSocialInfo: React.FC<{
  accountId: string;
}> = ({ accountId }) => {
  const { t } = useTranslation();
  const { changeTotalItems, controls, pagination } = usePaginationControls();
  const {} = useForm<>();
  const {} = useAdminGetProfileQuery(accountId);

  return (
    <div>
      <SocialProfile
        profileInfo={{
          accountType: "seller",
          userId: "1325",
          id: "1230",
          name: "Jane Daniel",
          public: true,
          thumbnail: "/shop-2.jpeg",
          verified: true,
          bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend diam cras eu felis egestas aliquam. Amet ornare",
          isFollowed: false,
          links: ["this is a test link"],
          location: {
            address: "address",
            city: "city",
            cords: {
              lat: 32,
              lng: 23,
            },
            country: "country",
            countryCode: "CH",
            postalCode: 1234,
            state: "Geneve",
          },
          profileCoverPhoto: "/shop-2.jpeg",
          publications: 156,
          subscribers: 135,
          subscriptions: 14,
          profession: "Agent",
        }}
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
                  {data.type === "video" ? (
                    <></>
                  ) : (
                    <Image className="w-32" src={data.thumbnail} />
                  )}
                </Td>
                <Td>{data.id.slice(0, 4)}...</Td>
                <Td className="w-[30%]">
                  <div className="flex flex-col gap-4">
                    <p>{data.description.slice(0, 80)}...</p>
                    <div className="flex flex-wrap gap-2">
                      {data.hashtags.map((tag, i) => (
                        <Badge variant="off" key={i}>
                          #{tag}
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

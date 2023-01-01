import { Link } from "@components";
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
} from "ui";
import { mapArray, NumberShortner, randomNum } from "utils";

const posts = [...Array(10)].map(() => ({
  id: randomNum(500000).toString(),
  username: "Wiaah",
  authorId: "test id",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It h",
  hashtags: ["new", "sports", "fun", "world cup"],
  comments: randomNum(500000),
  likes: randomNum(50000),
  views: randomNum(50000),
  shares: randomNum(5000),
  thumbnail: getRandomImage(),
  type: "image",
  createdAt: new Date(),
}));

const SocialPosts = () => {
  const { t } = useTranslation();
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
                <Input />
              </Td>
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
                <Td className="text-primary">
                  <Link
                    href={(r) =>
                      r.visitSocialPostAuthorProfile({ id: data.authorId })
                        .route
                    }
                  >
                    <p className="text-primary underline cursor-pointer">
                      {data.username}
                    </p>
                  </Link>
                </Td>
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
    </>
  );
};

export default SocialPosts;

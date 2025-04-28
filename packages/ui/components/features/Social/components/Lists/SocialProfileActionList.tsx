import { NumberShortner, mapArray, useForm } from "@UI/../utils/src";
import { useGetProfileActionsQuery } from "@features/Social/services";
import {
  AspectRatio,
  HStack,
  Image,
  PlayButtonFillIcon,
  ScrollCursorPaginationWrapper,
  useCursorScrollPagination,
} from "@partials";
import React from "react";
import { useTranslation } from "react-i18next";
import { ArrElement } from "types";
import { IoPlayOutline } from "react-icons/io5";
import { getRandomImage } from "placeholder";

export const SocialProfileActionList: React.FC<{
  userId: string;
}> = ({ userId }) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const { controls, getHasMore, getNextCursor, props } =
    useCursorScrollPagination();
  const { form } = useForm<Parameters<typeof useGetProfileActionsQuery>[0]>(
    {
      take: props.take,
      userId,
      cursor: props.cursor,
    },
    { cursor: props.cursor, take: props.take, userId }
  );
  const {
    data: _data,
    isLoading,
    fetchNextPage,
  } = useGetProfileActionsQuery(form, {
    getNextPageParam: (page) => {
      return page.data.at(page.data.length - 1);
    },
  });
  const data = FAKE_ACTIONS;

  React.useEffect(() => {
    getHasMore(data?.pages.at(data.pages.length - 1)?.hasMore || false);
  }, [data]);

  return (
    <ScrollCursorPaginationWrapper
      controls={{ ...controls, next: fetchNextPage }}
    >
      <div className="grid grid-cols-3 gap-[1px] sm:gap-4 lg:grid-cols-6">
        {mapArray(
          data?.pages.reduce(
            (acc, curr) => [...(acc || []), ...(curr.data || [])],
            [] as ArrElement<typeof data["pages"]>["data"]
          ) || [],
          (v, i) => (
            <AspectRatio key={i} ratio={1.2}>
              <Image src={v.cover} className="w-full h-full object-cover" />
              <HStack className="text-white  font-bold absolute left-2 bottom-2">
                <IoPlayOutline />
                <p>{NumberShortner(v.views)}</p>
              </HStack>
            </AspectRatio>
          )
        )}
      </div>
    </ScrollCursorPaginationWrapper>
  );
};
const FAKE_ACTIONS = {
  pages: [
    {
      cursor: "cursor_placeholder",
      hasMore: true,
      __typename: "GetActionsCursorResponse",
      data: [
        {
          id: "1",
          cover: getRandomImage(),
          views: 100,
          __typename: "Action",
        },
        {
          id: "2",
          cover: getRandomImage(),
          views: 200,
          __typename: "Action",
        },
        {
          id: "3",
          cover: getRandomImage(),
          views: 300,
          __typename: "Action",
        },

        {
          id: "4",
          cover: getRandomImage(),
          views: 100,
          __typename: "Action",
        },
        {
          id: "5",
          cover: getRandomImage(),
          views: 200,
          __typename: "Action",
        },
        {
          id: "6",
          cover: getRandomImage(),
          views: 300,
          __typename: "Action",
        },
      ],
    },
  ],
};

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

export const SocialProfileActionList: React.FC<{
  userId: string;
}> = ({ userId }) => {
  const { t } = useTranslation();
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
  const { data, isLoading, fetchNextPage } = useGetProfileActionsQuery(form, {
    getNextPageParam: (page) => {
      return page.data.at(page.data.length - 1);
    },
  });

  React.useEffect(() => {
    getHasMore(data?.pages.at(data.pages.length - 1)?.hasMore || false);
  }, [data]);

  return (
    <ScrollCursorPaginationWrapper
      controls={{ ...controls, next: fetchNextPage }}
    >
      <div className="grid grid-cols-3 gap-[1px] lg:grid-cols-6">
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

import React, { useEffect, useState } from "react";
import {
  useGetDiscoverPosts,
  useGetDiscoverUsers,
  usePaginationControls,
  useGetDiscoverHashtags,
  SimpleTabs,
  SimpleTabHead,
  HStack,
  InputGroup,
  Input,
  InputLeftElement,
  SearchIcon,
  LocationDistanceIcon,
  GridListOrganiser,
  ScrollPaginationWrapper,
  getRandomImage,
  Image,
  SimpleTabItemList,
  AspectRatio,
  Avatar,
  Verified,
  LocationOutlineIcon,
  PersonPlusIcon,
  hashtagsPlaceholder,
  HashtagCircleIcon,
  NumberShortner,
  LocationFillSquareIcon,
} from "ui";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { mapArray, randomNum, useForm } from "utils";
import { ServiceType } from "@features/API";
import { startCase } from "lodash";

const discoverHashtagsPlaceholder: {
  tag: string;
  posts: number;
}[] = [...Array(20)].map((_, i) => ({
  tag: hashtagsPlaceholder[randomNum(hashtagsPlaceholder.length)],
  posts: randomNum(1000000),
}));

const placeTypes = Object.values(ServiceType).concat([ServiceType.Hotel]);

const discoverPlacesPlaceHolder: {
  name: string;
  id: string;
  type: ServiceType | "store";
  location: {
    city: string;
    address: string;
    country: string;
  };
}[] = [...Array(15)].map((_, i) => ({
  id: "",
  name: "Atlas Villa",
  location: {
    address: "4348 Heritage Road",
    city: "Fresno",
    country: "US",
  },
  type: placeTypes[randomNum(placeTypes.length)],
}));

export const discoverStoriesPlaceholder: {
  thumbnail: string;
  id: string;
  user: {
    photo: string;
    verified: boolean;
    name: string;
    id: string;
  };
}[] = [...Array(15)].map((_, i) => ({
  id: "",
  thumbnail: getRandomImage(),
  user: {
    id: "",
    name: "",
    photo: getRandomImage(),
    verified: true,
  },
}));

export const DiscoverView: React.FC = ({ }) => {
  const { t } = useTranslation();
  const [state, setState] = React.useState<number>(0);
  const { form, handleChange, inputProps } = useForm<{ q: string }>({ q: "" });

  const { visit } = useRouting();

  const { pagination: usersPagination, controls: usersControls } =
    usePaginationControls();
  const { pagination: postsPagination, controls: postsControls } =
    usePaginationControls();
  const { pagination: hashtagPagination, controls: hashtagControls } =
    usePaginationControls();

  const { data: discoverUsers } = useGetDiscoverUsers({
    q: form.q,
    pagination: usersPagination,
  });

  const { data: discoverPosts } = useGetDiscoverPosts({
    q: form.q,
  });

  const { data: discoverHashtags } = useGetDiscoverHashtags({
    q: form.q,
    pagination: hashtagPagination,
  });

  React.useEffect(() => {
    // setTabsData([
    //   {
    //     name: t("community", "community"),
    //     component: (
    //       <ScrollPaginationWrapper controls={postsControls}>
    //         <GridListOrganiser
    //           rowSize="14.5rem"
    //           presets={[
    //             {
    //               cols: 5,
    //               points: [
    //                 { c: 2, r: 1 },
    //                 { c: 1, r: 2 },
    //                 { c: 1, r: 1 },
    //                 { c: 1, r: 1 },
    //                 { c: 2, r: 2 },
    //                 { c: 1, r: 1 },
    //                 { c: 1, r: 1 },
    //                 { c: 1, r: 1 },
    //                 { c: 1, r: 1 },
    //                 { c: 1, r: 1 },
    //               ],
    //             },
    //           ]}
    //         >
    //           {mapArray(discoverPosts, (item, i) =>
    //             item.type === "newsfeedpost" ? (
    //               <PostCard
    //                 postInfo={item.newsfeed}
    //                 profileInfo={item.newsfeed.publisher}
    //                 key={item.id}
    //               />
    //             ) : null
    //           )}
    //         </GridListOrganiser>
    //       </ScrollPaginationWrapper>
    //     ),
    //     link: "/",
    //   },
    //   {
    //     name: t("users", "users"),
    //     component: (
    //       <ScrollPaginationWrapper controls={usersControls}>
    //         <ListWrapper>
    //           {mapArray(discoverUsers?.accounts || [], (user, i) => (
    //             <UserProfile user={user.profile} key={i} />
    //           ))}
    //         </ListWrapper>
    //       </ScrollPaginationWrapper>
    //     ),
    //     link: "users",
    //   },
    //   {
    //     name: t("places", "places"),
    //     component: (
    //       <ListWrapper>
    //         {mapArray(discoverPlacesPlaceHolder, (place, i) => (
    //           <LocationButton name={place} key={i} />
    //         ))}
    //       </ListWrapper>
    //     ),
    //     link: "places",
    //   },
    //   {
    //     name: t("hashtags", "hashtags"),
    //     component: (
    //       <ScrollPaginationWrapper controls={hashtagControls}>
    //         <ListWrapper>
    //           {mapArray(discoverHashtags, (tag, i) => (
    //             <HashTagSearchItem
    //               props={{
    //                 onClick: () => {
    //                   visit((r) => r.visitSellerHashtagPage(tag.name));
    //                 },
    //               }}
    //               key={tag.id}
    //               hashtagName={tag.name}
    //               hashtagViews={tag.usage}
    //             />
    //           ))}
    //         </ListWrapper>
    //       </ScrollPaginationWrapper>
    //     ),
    //     link: "hashtags",
    //   },
    // ]);
  }, []);
  return (
    <div className="flex flex-col w-full overflow-y-scroll thinScroll items-start pt-4 h-full">
      <HStack className="w-full p-4">
        <InputGroup className="border-none w-full bg-[#F6F6F6] rounded-lg">
          <InputLeftElement>
            <SearchIcon />
          </InputLeftElement>
          <Input
            {...inputProps("q")}
            className="w-full bg-[#F6F6F6]"
            placeholder={t("Let's explore") + ".."}
          />
        </InputGroup>
        <LocationDistanceIcon className="text-xl" />
      </HStack>
      <SimpleTabs
        value={state}
        onChange={(v) => {
          setState(v);
        }}
      >
        <HStack className="w-full px-6 justify-between">
          <SimpleTabHead>
            {["discover", "stories", "users", "places", "hashtags"].map(
              (v, i) => (
                <p
                  className={`${state === i
                      ? "border-b-black font-bold text-black"
                      : "border-b-white text-[#707070]"
                    } border-black pb-1 border-b-2 font-semibold`}
                  key={i}
                >
                  {startCase(v)}
                </p>
              )
            )}
          </SimpleTabHead>
        </HStack>
        <div className="h-2"></div>
        <SimpleTabItemList>
          <ScrollPaginationWrapper controls={postsControls}>
            <GridListOrganiser
              rowSize="8rem"
              gap={0.25}
              presets={[
                {
                  cols: 14,
                  points: [
                    { c: 6, r: 2 },
                    { c: 8, r: 1 },
                    { c: 4, r: 1 },
                    { c: 4, r: 1 },
                  ],
                },
                {
                  cols: 6,
                  points: [
                    { c: 3, r: 1 },
                    { c: 3, r: 1 },
                    { c: 2, r: 1 },
                    { c: 2, r: 1 },
                    { c: 2, r: 1 },
                  ],
                },
              ]}
            >
              {[...Array(30)].map((v, i) => (
                <Image
                  key={i}
                  alt="randumImage"
                  className="w-full h-full object-cover"
                  src={getRandomImage()}
                />
              ))}
            </GridListOrganiser>
          </ScrollPaginationWrapper>

          <ScrollPaginationWrapper className="w-full" controls={postsControls}>
            <div className="grid grid-cols-2 px-4 gap-2 w-full">
              {mapArray(discoverStoriesPlaceholder, (v, i) => (
                <AspectRatio ratio={1.45} className="rounded-xl">
                  <Image
                    alt="thumbnail"
                    src={v.thumbnail}
                    className="w-full h-full object-cover rounded-xl"
                  />

                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-20"></div>

                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <Avatar
                        name={v.user.name}
                        alt={v.user.name}
                        src={v.user.photo}
                        className="min-w-[4.25rem] border-2 border-primary"
                      />
                      <Verified className="absolute z-10  top-3/4 left-3/4 text-[#0084FF]  stroke-white" />
                    </div>
                  </div>
                </AspectRatio>
              ))}
            </div>
          </ScrollPaginationWrapper>

          <ScrollPaginationWrapper className="w-full" controls={postsControls}>
            <div className="grid grid-cols-3 px-4 gap-2 w-full">
              {mapArray(discoverUsers?.accounts, (v, i) => (
                <AspectRatio ratio={1.6} className="rounded-lg">
                  <Image
                    alt="avatar"
                    src={v?.profile?.photo}
                    className="w-full h-full object-cover rounded-lg"
                  />

                  <div className="absolute top-0 left-0 right-0 bottom-0 rounded-lg bg-black bg-opacity-25"></div>

                  <div className="absolute pb-3 text-white items-center bottom-0 w-full left-0 flex flex-col gap-2">
                    <div className="flex flex-col items-center">
                      <p className="font-bold leading-4 text-sm">
                        {v.profile.username}
                      </p>
                      <HStack className="gap-1 text-[0.625rem] text-[#E7E7E7]">
                        <LocationOutlineIcon />
                        <p>
                          {v.profile.location.city},{" "}
                          {v.profile.location.country}
                        </p>
                      </HStack>
                      <PersonPlusIcon className="text-2xl" />
                    </div>
                  </div>
                </AspectRatio>
              ))}
            </div>
          </ScrollPaginationWrapper>

          <ScrollPaginationWrapper className="w-full" controls={postsControls}>
            <div className="w-full px-4 flex flex-col gap-4">
              {mapArray(discoverPlacesPlaceHolder, (v, i) => (
                <HStack
                  key={i}
                  className="hover:bg-gray-100 cursor-pointer justify-between w-full"
                >
                  <HStack>
                    <LocationFillSquareIcon className="text-[2.625rem] text-primary" />
                    <div className="flex flex-col gap-1">
                      <p className="text-[0.938rem] font-medium">{v.name}</p>
                      <p className="text-xs text-[#656565]">
                        {v.location.address}, {v.location.city},{" "}
                        {v.location.country}
                      </p>
                    </div>
                  </HStack>
                  <p className="text-sm text-primary">{startCase(v.type)}</p>
                </HStack>
              ))}
            </div>
          </ScrollPaginationWrapper>

          <ScrollPaginationWrapper className="w-full" controls={postsControls}>
            <div className="w-full px-4 flex flex-col gap-4">
              {mapArray(discoverHashtagsPlaceholder, (v, i) => (
                <HStack
                  onClick={() => {
                    handleChange("q", v.tag);
                  }}
                  key={i}
                  className="hover:bg-gray-100 cursor-pointer justify-between w-full"
                >
                  <HStack>
                    <HashtagCircleIcon className="text-[2.625rem] text-primary" />
                    <p className="font-medium">{v.tag}</p>
                  </HStack>

                  <p>
                    <span>{NumberShortner(v.posts)}</span>
                  </p>
                </HStack>
              ))}
            </div>
          </ScrollPaginationWrapper>
        </SimpleTabItemList>
      </SimpleTabs>
    </div>
  );
};

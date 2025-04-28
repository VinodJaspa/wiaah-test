import React, { ReactNode } from "react";
import {
  getRandomContrastingColor,
  mapArray,
  NumberShortner,
  randomNum,
  runIfFn,
  useForm,
} from "utils";
import { useTranslation } from "react-i18next";
import { BiArrowToBottom, BiArrowToTop } from "react-icons/bi";
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from "recharts";
import {
  AspectRatio,
  CommentIcon,
  HeartFillIcon,
  HStack,
  Image,
  LocationOnPointIcon,
  Pagination,
  PersonPlusIcon,
  SaveFlagFIllIcon,
  Table,
  TBody,
  Td,
  Th,
  THead,
  Tr,
} from "@partials";
import { getRandomImage } from "placeholder";
import {
  useGetProfileOverviewStatisticsQuery,
  useGetProfilePopularStoriesViewsQuery,
  useGetProfileReachedAudienceQuery,
  useGetProfileStatisticsQuery,
  useGetProfileTopStoriesQuery,
  useGetProfileVisitsDetailsQuery,
  useGetSocialProfileQuery,
  usePaginationControls,
  useUserData,
} from "@UI";
import { ProfileReachedGender } from "@features/API";
import { HtmlSvgProps } from "types";
import { twMerge } from "tailwind-merge";

export const ProfileStatistics: React.FC<{
  accountId: string;
}> = ({ accountId }) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const [overviewDims, setOverviewDims] = React.useState<{
    h: number;
    w: number;
  }>({
    h: 0,
    w: 0,
  });
  const [reachedDims, setReachedDims] = React.useState<{
    h: number;
    w: number;
  }>({
    h: 0,
    w: 0,
  });

  const [ageGenderDims, setAgeGenderDims] = React.useState<{
    h: number;
    w: number;
  }>({
    h: 0,
    w: 0,
  });

  const [storiesViewsDims, setStoriesViewDims] = React.useState<{
    h: number;
    w: number;
  }>({
    h: 0,
    w: 0,
  });

  const [visitsPieDims, setVisitsPieDims] = React.useState<{
    h: number;
    w: number;
  }>({
    h: 0,
    w: 0,
  });

  const overviewRef = React.useRef<HTMLDivElement>(null);
  const reachedAudinesRef = React.useRef<HTMLDivElement>(null);
  const ageGenderRef = React.useRef<HTMLDivElement>(null);
  const storiesViewsRef = React.useRef<HTMLDivElement>(null);
  const visitsPieRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (overviewRef.current) {
      const h = overviewRef.current.clientHeight;
      const w = overviewRef.current.clientWidth;

      setOverviewDims({ h, w });
    }
  }, [overviewRef]);

  React.useEffect(() => {
    if (reachedAudinesRef.current) {
      const h = reachedAudinesRef.current.clientHeight;
      const w = reachedAudinesRef.current.clientWidth;

      setReachedDims({ h, w });
    }
  }, [reachedAudinesRef]);

  React.useEffect(() => {
    if (ageGenderRef.current) {
      const h = ageGenderRef.current.clientHeight;
      const w = ageGenderRef.current.clientWidth;

      setAgeGenderDims({ h, w });
    }
  }, [ageGenderRef]);

  React.useEffect(() => {
    if (storiesViewsRef.current) {
      const h = storiesViewsRef.current.clientHeight;
      const w = storiesViewsRef.current.clientWidth;

      setStoriesViewDims({ h, w });
    }
  }, [storiesViewsRef]);

  React.useEffect(() => {
    if (visitsPieRef.current) {
      const h = visitsPieRef.current.clientHeight;
      const w = visitsPieRef.current.clientWidth;

      setVisitsPieDims({ h, w });
    }
  }, [visitsPieRef]);

  const { form, handleChange, selectProps, inputProps } = useForm<{
    stats: number;
    audinece: number;
    ageGender: number;
    overview: number;
    storyPopularity: Date;
    topStories: number;
    topPosts: number;
    details: number;
    viewsDetailsCountry: string;
    detailsOrderBy: number;
  }>({
    ageGender: 24,
    audinece: 24,
    overview: 24,
    details: 24,
    stats: 24,
    storyPopularity: new Date(),
    topPosts: 24,
    topStories: 24,
    viewsDetailsCountry: "",
    detailsOrderBy: 1,
  });

  const { data: profile } = useGetSocialProfileQuery(accountId);

  const { data: stats } = useGetProfileStatisticsQuery({
    profileId: profile?.id || "",
    sinceHours: form.stats,
    userId: accountId,
  });
  const { data: overview } = useGetProfileOverviewStatisticsQuery({
    profileId: profile?.id || "",
    sinceHours: form.overview,
    userId: accountId,
  });
  const { data: reachedAudience } = useGetProfileReachedAudienceQuery({
    profileId: profile?.id || "",
    sinceHours: form.audinece,
    userId: accountId,
  });
  const { data: reachedAudineceAge } = useGetProfileReachedAudienceQuery({
    profileId: profile?.id || "",
    sinceHours: form.ageGender,
    userId: accountId,
  });
  const { data: storyPopularity } = useGetProfilePopularStoriesViewsQuery({
    profileId: profile?.id || "",
    userId: accountId,
    date: new Date(form.storyPopularity).toString(),
  });
  const { data: visitsDetails } = useGetProfileVisitsDetailsQuery({
    profileId: profile?.id || "",
    country: form.viewsDetailsCountry,
    visitsOrderBy: form.detailsOrderBy,
  });

  const { controls: storiesControls, pagination: storiesPagination } =
    usePaginationControls();
  const { form: storiesForm } = useForm<
    Parameters<typeof useGetProfileTopStoriesQuery>[0]
  >({
    pagination: storiesPagination,
    userId: profile?.id || "",
    sinceHours: form.topStories,
  });
  const { data: topStories } = useGetProfileTopStoriesQuery(storiesForm);

  const overviewdata: { x: number; y: number; z: number; name: string }[] = [
    ...Array(12),
  ].map((v, i) => ({
    name: new Date(new Date().setMonth(i)).toLocaleDateString("en-us", {
      month: "short",
    }),
    x: randomNum(400000),
    y: randomNum(200000),
    z: randomNum(300000),
  }));

  const ageGenderData = ["18-24", "24-34", "35-44", "65+"]
    .reverse()
    .map((v, i) => ({
      name: v,
      male: randomNum(15000),
      female: randomNum(15000),
    }));

  const storiesViewsData = [...Array(14)].map((_, i) => ({
    name: new Date(new Date().setHours(8 + i)).toLocaleTimeString("en-us", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
    male: randomNum(150000),
    female: randomNum(150000),
  }));

  const totalAudienece = randomNum(2500000);

  const reachedData: { name: string; value: number; fill: string }[] = [
    {
      name: t("female"),
      value: randomNum(2500000),
      fill: "#FFD66B",
    },
    {
      name: t("other"),
      value: totalAudienece,
      fill: "#FF6B6B",
    },
    {
      name: t("male"),
      value: randomNum(2500000),
      fill: "#5B93FF",
    },
  ];

  const boxShadowStyles = {
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 0px 40px rgba(0, 0, 0, 0.12)",
    borderRadius: "10px",
  };

  const countries: {
    name: string;
    color: string;
    visits: number;
  }[] = [
      {
        name: "France",
        color: "#87B2D2",
        visits: randomNum(500000),
      },
      {
        name: "United States",
        color: "#70AB51",
        visits: randomNum(500000),
      },
      {
        name: "Saudi Arabia",
        color: "#DB5E31",
        visits: randomNum(500000),
      },
      {
        name: "New Zeeland",
        color: "#6BC5E1",
        visits: randomNum(500000),
      },
      {
        name: "Belgium",
        color: "#82E37B",
        visits: randomNum(500000),
      },
      {
        name: "Italy",
        color: "#E89D64",
        visits: randomNum(500000),
      },
      {
        name: "Germeny",
        color: "#F8F679",
        visits: randomNum(500000),
      },
    ];

  const totalVisits = countries.reduce((acc, curr) => acc + curr.visits, 0);

  const countriesPercentage = countries.map((v) => ({
    name: v.name,
    color: v.color,
    visits: v.visits / totalVisits,
  }));

  const posts: {
    thumbnail: string;
    date: string;
    name: string;
    views: number;
    likes: number;
    gender: string;
    countryName: string;
    city: string;
    visits: number;
    comments: number;
  }[] = [...Array(5)].map((_, i) => ({
    city: "Geneve",
    comments: randomNum(15000000),
    countryName: "Switzerland",
    date: new Date().toString(),
    gender: "Male",
    likes: randomNum(450000),
    name: "Post name",
    thumbnail: getRandomImage(),
    views: randomNum(90000000),
    visits: randomNum(90000000),
  }));

  const day = 24;
  const month = day * 30;
  const year = month * 12;

  return (
    <div className="flex flex-col gap-14 w-full">
      <div>
        <div className="flex gap-2 w-full justify-between">
          <StatisticsCard
            icon={{
              color: "#01D022",
              node: <LocationOnPointIcon />,
            }}
            amount={stats?.total_visits || 0}
            prevAmount={stats?.prev_total_visits || 0}
            title={t("Total of Visits")}
          />
          <StatisticsCard
            icon={{
              color: "#FFD66B",
              node: <PersonPlusIcon />,
            }}
            amount={stats?.total_followers || 0}
            prevAmount={stats?.prev_total_followers || 0}
            title={t("Total of Followers")}
          />
          <StatisticsCard
            icon={{
              color: "#E91010",
              node: <HeartFillIcon />,
            }}
            prevAmount={stats?.total_likes || 0}
            amount={stats?.prev_total_likes || 0}
            title={t("Total of Likes")}
          />
          <StatisticsCard
            icon={{
              color: "#1227E2",
              node: <CommentIcon />,
            }}
            amount={stats?.total_comments || 0}
            prevAmount={stats?.prev_total_comments || 0}
            title={t("Total of Comments")}
          />
          <StatisticsCard
            icon={{
              color: "#ACC418",
              node: <SaveFlagFIllIcon />,
            }}
            amount={stats?.total_saves || 0}
            prevAmount={stats?.prev_total_saves || 0}
            title={t("Total of Saved")}
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 w-full">
        <div className="p-6 col-span-7 flex flex-col gap-4 h-full">
          <p className="font-bold text-xl">{t("Overview")}</p>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-8">
              <BarChartLegend color="#4339F2" name={t("Account Reached")} />
              <BarChartLegend color="#34B53A" name={t("Account Engaged")} />
              <BarChartLegend color="#FFB200" name={t("Profile Activity")} />
            </div>
          </div>
          <div ref={overviewRef} className="flex flex-col h-80 gap-4 w-full">
            <BarChart
              width={overviewDims.w}
              height={overviewDims.h}
              data={overviewdata}
            >
              <XAxis axisLine={false} dataKey="name" />
              <YAxis axisLine={false} />
              <Tooltip />
              <Legend />
              <Bar
                legendType="none"
                dataKey="x"
                stackId={"1"}
                barSize={10}
                fill="#4339F2"
              />
              <Bar
                legendType="none"
                dataKey="y"
                stackId={"1"}
                barSize={10}
                fill="#34B53A"
              />
              <Bar
                radius={[10, 10, 0, 0]}
                legendType="none"
                dataKey="z"
                stackId={"1"}
                barSize={10}
                fill="#FFB200"
              />
            </BarChart>
          </div>
        </div>
        <div className="p-6 col-span-5 h-full">
          <div className="flex flex-col gap-1 w-full h-full">
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold">{t("Reached Audience")}</p>
            </div>
            <div className="flex flex-col gap-2 h-full items-center">
              <div
                ref={reachedAudinesRef}
                className="flex relative items-center justify-center h-full w-full"
              >
                <div className="absolute w-2/4 top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2">
                  <AspectRatio ratio={1}>
                    <div className="flex flex-col gap-2 justify-center h-full w-full items-center rounded-full">
                      <p>{t("Total of audience")}</p>
                      <p className="font-bold text-xl">
                        {NumberShortner((reachedAudience || [])?.length)}
                      </p>
                    </div>
                  </AspectRatio>
                </div>

                <EllipseStats
                  fill="#5B93FF"
                  thinkness={15}
                  max={1200}
                  value={1200}
                />
              </div>

              <div className="flex justify-around">
                <BarChartLegend
                  amount={
                    (reachedAudience || []).filter(
                      (v, i) => v.gender === ProfileReachedGender.Male
                    ).length
                  }
                  color="#5B93FF"
                  name={t("Total of Men")}
                />

                <BarChartLegend
                  amount={
                    (reachedAudience || []).filter(
                      (v, i) => v.gender === ProfileReachedGender.Female
                    ).length
                  }
                  color="#FFD66B"
                  name={t("Total of Women")}
                />

                <BarChartLegend
                  amount={
                    (reachedAudience || []).filter(
                      (v, i) => v.gender === ProfileReachedGender.Male
                    ).length
                  }
                  color="#FF6B6B"
                  name={t("Other")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid w-full grid-cols-2">
        <div className="flex p-8 flex-col">
          <div className="flex items-center justify-between">
            <p className="font-bold whitespace-nowrap text-xl">
              {t("Age & Gender")}
            </p>
            <HStack className="gap-4">
              <HStack>
                <div className="h-4 w-4 rounded-full bg-[#FFB200]" />
                <p>{t("Men")}</p>
              </HStack>

              <HStack>
                <div className="h-4 w-4 rounded-full bg-[#4339F2]" />
                <p>{t("Women")}</p>
              </HStack>

              <HStack>
                <div className="h-4 w-4 rounded-full bg-[#FF6B6B]" />
                <p>{t("Other")}</p>
              </HStack>
            </HStack>
          </div>
          <div className="h-12"></div>
          <div className="h-44" ref={ageGenderRef}>
            <StatisticsAgeIndicator
              min={15}
              max={30}
              label={"18-24"}
              value={65}
            />
          </div>
        </div>

        <div className="flex p-8 flex-col">
          <p className="font-bold text-xl">{t("Daily audience")}</p>

          <div className=" w-full overflow-x-scroll overflow-y-hidden noScroll">
            <BarChart
              width={overviewDims.w}
              height={overviewDims.h}
              data={overviewdata}
            >
              <XAxis axisLine={false} dataKey="name" />
              <YAxis axisLine={false} />
              <Tooltip />
              <Legend />
              <Bar
                legendType="none"
                dataKey="x"
                stackId={"1"}
                barSize={10}
                fill="#4339F2"
              />
              <Bar
                legendType="none"
                dataKey="y"
                stackId={"1"}
                barSize={10}
                fill="#FFD66B"
              />
            </BarChart>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-8">
        <p className="font-bold text-xl whitespace-nowrap">
          {t("Detials Level")}
        </p>

        <Table TdProps={{ align: "center" }}>
          <THead>
            <Tr>
              <Th>No.</Th>
              <Th align="left">{t("Country/Terrorist")}</Th>
              <Th>{t("Visits")}</Th>
              <Th>{t("Visit Percentage")}</Th>
              <Th>{t("Contribution Total")}</Th>
            </Tr>
          </THead>

          <TBody>
            {mapArray(visitsDetails?.countries, (item, idx) => {
              const color = getRandomContrastingColor();
              return (
                <Tr>
                  <Td>{idx + 1}</Td>
                  <Td
                    className="text-lg font-semibold"
                    style={{ color }}
                    align="left"
                  >
                    {item.country}
                  </Td>
                  <Td>{item.visits}</Td>
                  <Td>
                    <p>%{item.visitPercent / 100}</p>
                  </Td>
                  <Td>
                    <EllipseStats
                      value={item.visitPercent}
                      max={100}
                      fill={color}
                      thinkness={5}
                    />
                  </Td>
                </Tr>
              );
            })}
          </TBody>
        </Table>
      </div>
      <div className="flex flex-col p-8 gap-4">
        <p className="font-bold text-xl whitespace-nowrap">
          {t("Most Popular Post")}
        </p>

        <Table
          ThProps={{ align: "left", className: "first:pl-0 text-gray-500" }}
          TdProps={{ className: "font-semibold first:pl-0", align: "left" }}
          className="w-full"
        >
          <THead>
            <Tr>
              <Th>{t("Post Image")}</Th>
              <Th>{t("Date")}</Th>
              <Th>{t("Name")}</Th>
              <Th>{t("Total Views")}</Th>
              <Th>{t("Total Likes")}</Th>
              <Th>{t("Number of Visits")}</Th>
              <Th>{t("Comments")}</Th>
            </Tr>
          </THead>
          <TBody>
            {mapArray(posts, (v, i) => (
              <Tr>
                <Td>
                  <Image className="w-20 h-12 object-cover" src={v.thumbnail} />
                </Td>
                <Td>
                  {new Date(v.date).toLocaleDateString("en-us", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </Td>
                <Td>{v.name}</Td>
                <Td>{v.views}</Td>
                <Td>{v.likes}</Td>
                <Td>{v.visits}</Td>
                <Td>{v.comments}</Td>
              </Tr>
            ))}
          </TBody>
        </Table>
        <div className="self-center">
          <Pagination />
        </div>
      </div>

      <div className="flex flex-col p-8 gap-4">
        <p className="font-bold text-xl whitespace-nowrap">
          {t("Most Popular Actions")}
        </p>

        <Table
          ThProps={{ align: "left", className: "first:pl-0 text-gray-500" }}
          TdProps={{ className: "font-semibold first:pl-0", align: "left" }}
          className="w-full"
        >
          <THead>
            <Tr>
              <Th>{t("Post Image")}</Th>
              <Th>{t("Name")}</Th>
              <Th>{t("Date")}</Th>
              <Th>{t("Total Views")}</Th>
              <Th>{t("Total Likes")}</Th>
              <Th>{t("Number of Visits")}</Th>
              <Th>{t("Comments")}</Th>
            </Tr>
          </THead>
          <TBody>
            {mapArray(posts, (v, i) => (
              <Tr>
                <Td>
                  <Image className="w-20 h-12 object-cover" src={v.thumbnail} />
                </Td>
                <Td>{v.name}</Td>
                <Td>
                  {new Date(v.date).toLocaleDateString("en-us", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </Td>
                <Td>{v.views}</Td>
                <Td>{v.likes}</Td>
                <Td>{v.visits}</Td>
                <Td>{v.comments}</Td>
              </Tr>
            ))}
          </TBody>
        </Table>
        <div className="self-center">
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export const StatisticsCard: React.FC<{
  amount: number;
  title: string;
  prevAmount: number;
  icon: {
    node: ReactNode;
    color: string;
  };
}> = ({ amount, prevAmount, title, icon }) => {
  const change = (amount / prevAmount - 1) * 100;
  const positive = change > 0;
  return (
    <div className="flex gap-2 px-3 py-6 bg-white rounded-xl">
      <div className="flex gap-2 items-center">
        <div className="relative">
          <div
            style={{
              backgroundColor: icon.color,
            }}
            className={`text-xl opacity-10 h-16 rounded-full w-16`}
          />
          <div
            style={{
              color: icon.color,
              fill: icon.color,
            }}
            className="absolute text-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            {runIfFn(icon.node)}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-xl font-extrabold">{NumberShortner(amount)}</p>
          <p className="text-sm">{title}</p>
        </div>
      </div>
      <div
        className={`${positive ? "text-primary" : "text-secondaryRed"
          } self-start text-[0.5rem] flex items-center px-1 rounded`}
      >
        {positive ? <BiArrowToTop /> : <BiArrowToBottom />}
        {Math.floor(change || 0)}%
      </div>
    </div>
  );
};

export const BarChartLegend: React.FC<{
  name: string;
  amount?: number;
  color: string;
  children?: React.ReactNode;
}> = ({ amount, name, children, color }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <div
          style={{
            backgroundColor: color,
          }}
          className="w-8 h-4 rounded"
        />
        <p className="whitespace-nowrap">{name}</p>
      </div>
      {amount ? <p className="font-bold">{NumberShortner(amount)}</p> : null}
    </div>
  );
};

export const MyProfileStatistics = () => {
  // const { user } = useUserData();
  const user = { id: "33" };

  return user ? (
    <ProfileStatistics accountId={user?.id}></ProfileStatistics>
  ) : (
    <p>error</p>
  );
};

const StatisticsAgeIndicator: React.FC<{
  label: string;
  value: number;
  min: number;
  max: number;
}> = ({ label, value, max, min }) => {
  const [trackStyles, setTrackStyles] = React.useState<React.CSSProperties>({});

  function fillColor(minSlideValue: number, maxSlideValue: number) {
    const minPercent = (minSlideValue / max) * 100;
    const maxPercent = (maxSlideValue / max) * 100;
    setTrackStyles((state) => ({
      ...state,
      right: `${100 - maxPercent}%`,
      width: `${maxPercent - minPercent}%`,
    }));
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="w-full justify-between flex items-center">
        <div className="relative mt-2">
          <span
            style={trackStyles}
            className="pointer-events-none absolute top-0 right-0 h-2 -translate-y-3/4 rounded-full bg-[#57bf9c] "
          ></span>
          <input
            data-test="minRangeInput"
            // min={min}
            // max={max}
            // value={minRange}
            // onChange={(e) => handleMinChange(e)}
            className="RangeInput absolute w-full"
            type="range"
          />
          <input
            // min={min}
            data-test="maxRangeInput"
            // max={max}
            // value={maxRange}
            // onChange={(e) => handleMaxChange(e)}
            className="RangeInput absolute w-full"
            type="range"
          />
        </div>
      </div>
    </div>
  );
};

const EllipseStats: React.FC<{
  max: number;
  value: number;
  fill: string;
  thinkness: number;
  className?: string;
}> = ({ max, value, fill, thinkness, className }) => {
  const fillPercent = value / max;

  const dasharray = 530;

  return (
    <Ellipse
      style={{
        fill: "none",
        strokeLinecap: "round",
        strokeDasharray: dasharray,
        strokeDashoffset: dasharray + 83 - fillPercent * dasharray,
        strokeWidth: thinkness,
        stroke: fill,
      }}
      className={twMerge("-rotate-90", className)}
    />
  );
};

const Ellipse: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      {...props}
      width="1em"
      height="1em"
      viewBox="0 0 172 172"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="85.9999" cy="85.9998" r="0.3em" />
    </svg>
  );
};

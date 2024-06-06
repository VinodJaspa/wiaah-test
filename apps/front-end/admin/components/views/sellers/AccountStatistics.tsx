import React from "react";
import { mapArray, NumberShortner, randomNum, weekDays } from "utils";
import { useTranslation } from "react-i18next";
import { BiArrowToBottom, BiArrowToTop } from "react-icons/bi";
import {
  Bar,
  BarChart,
  CartesianGrid,
  CartesianAxis,
  Legend,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  LabelList,
} from "recharts";
import {
  AspectRatio,
  BoxShadow,
  Button,
  HStack,
  Image,
  Pagination,
  Select,
  SelectOption,
  Table,
  TBody,
  Td,
  Th,
  THead,
  Tr,
} from "@partials";
import { BsArrowDown } from "react-icons/bs";
import { getRandomImage } from "placeholder";

export const AccountStatistics: React.FC<{
  accountId: string;
}> = ({ accountId }) => {
  const { t } = useTranslation();
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
      fill: "#EA4335",
    },
    {
      name: t("other"),
      value: totalAudienece,
      fill: "rgba(0, 0, 0, 0.0)",
    },
    {
      name: t("male"),
      value: randomNum(2500000),
      fill: "#4285F4",
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

  return (
    <div className="flex flex-col gap-14 w-full">
      <div className="flex gap-2 w-full">
        <StatisticsCard
          amount={2562156}
          prevAmount={1234658}
          title={t("Total of Visits")}
        />
        <StatisticsCard
          amount={2562156}
          prevAmount={1234658}
          title={t("Total of Followers")}
        />
        <StatisticsCard
          prevAmount={2562156}
          amount={1234658}
          title={t("Total of Likes")}
        />
        <StatisticsCard
          amount={2562156}
          prevAmount={1234658}
          title={t("Total of Comments")}
        />
        <StatisticsCard
          amount={2562156}
          prevAmount={1234658}
          title={t("Total of Saved")}
        />
      </div>
      <div className="grid grid-cols-12 gap-4 w-full">
        <div
          style={boxShadowStyles}
          className="p-6 col-span-7 flex flex-col gap-4 h-full"
        >
          <div className="flex justify-between w-full">
            <p className="font-bold text-xl">{t("Overview")}</p>
            <Select className="w-28">
              <SelectOption value={"day"}>{t("day")}</SelectOption>
              <SelectOption value={"month"}>{t("month")}</SelectOption>
              <SelectOption value={"year"}>{t("year")}</SelectOption>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <div></div>
            <div className="flex flex-wrap items-center gap-8">
              <BarChartLegend color="#4285F4" name={t("Account Reached")} />
              <BarChartLegend color="#34A853" name={t("Account Engaged")} />
              <BarChartLegend color="#EA4335" name={t("Profile Activity")} />
            </div>
          </div>
          <div ref={overviewRef} className="flex flex-col h-80 gap-4 w-full">
            <BarChart
              width={overviewDims.w}
              height={overviewDims.h}
              data={overviewdata}
            >
              <CartesianGrid vertical={false} />
              <XAxis axisLine={false} dataKey="name" />
              <YAxis axisLine={false} />
              <Tooltip />
              <Legend />
              <Bar
                legendType="none"
                dataKey="x"
                stackId={"1"}
                barSize={10}
                fill="#4285F4"
              />
              <Bar
                legendType="none"
                dataKey="y"
                stackId={"1"}
                barSize={10}
                fill="#34A853"
              />
              <Bar
                radius={[10, 10, 0, 0]}
                legendType="none"
                dataKey="z"
                stackId={"1"}
                barSize={10}
                fill="#EA4335"
              />
            </BarChart>
          </div>
        </div>
        <div style={boxShadowStyles} className="p-6 col-span-5 h-full">
          <div className="flex flex-col gap-1 w-full h-full">
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold">{t("Reached Audience")}</p>

              <Select className="w-28">
                <SelectOption value={"day"}>{t("day")}</SelectOption>
                <SelectOption value={"month"}>{t("month")}</SelectOption>
                <SelectOption value={"year"}>{t("year")}</SelectOption>
              </Select>
            </div>
            <div className="flex gap-2 h-full items-center">
              <div className="flex flex-col gap-4">
                <BarChartLegend
                  amount={randomNum(150000)}
                  color="#EA4335"
                  name={t("Total of Women")}
                />
                <BarChartLegend
                  amount={randomNum(150000)}
                  color="#4285F4"
                  name={t("Total of Men")}
                />
              </div>

              <div
                ref={reachedAudinesRef}
                className="flex relative items-center justify-center h-full w-full"
              >
                <div className="absolute w-2/4 top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2">
                  <AspectRatio ratio={1}>
                    <div className="flex flex-col gap-2 justify-center h-full w-full items-center rounded-full bg-black bg-opacity-[0.12]">
                      <p>{t("Total of audience")}</p>
                      <p className="font-bold text-xl">
                        {NumberShortner(totalAudienece)}
                      </p>
                    </div>
                  </AspectRatio>
                </div>
                <PieChart width={reachedDims.h} height={reachedDims.h}>
                  <Pie
                    data={[
                      {
                        name: t("male"),
                        value: 350,
                        fill: "rgba(0, 0, 0, 0.12)",
                      },
                    ]}
                    innerRadius={100}
                    outerRadius={120}
                    paddingAngle={0}
                    dataKey={"value"}
                    isAnimationActive={false}
                  />
                  <Pie
                    data={reachedData}
                    innerRadius={100}
                    outerRadius={120}
                    paddingAngle={4}
                    dataKey={"value"}
                    cornerRadius={10}
                    animationBegin={90}
                  >
                    {reachedData.map((entry, index) => (
                      <Cell
                        radius={100}
                        key={`cell-${index}`}
                        fill={entry.fill}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid w-full grid-cols-2">
        <div style={boxShadowStyles} className="flex p-8 flex-col">
          <div className="flex justify-between w-full">
            <p className="font-bold text-xl">{t("Age and Gender")}</p>
            <Select className="w-28">
              <SelectOption value={"day"}>{t("day")}</SelectOption>
              <SelectOption value={"month"}>{t("month")}</SelectOption>
              <SelectOption value={"year"}>{t("year")}</SelectOption>
            </Select>
          </div>
          <div className="h-12"></div>
          <div className="h-44" ref={ageGenderRef}>
            <BarChart
              data={ageGenderData}
              width={ageGenderDims.w}
              height={ageGenderDims.h}
              layout={"vertical"}
            >
              <XAxis type="number" hide />
              <YAxis
                tickLine={false}
                axisLine={false}
                type="category"
                dataKey={"name"}
              />
              <Tooltip />
              <Bar
                background={{ fill: "rgba(0, 0, 0, 0.08)" }}
                radius={[4, 4, 0, 0]}
                barSize={20}
                fill="#4285F4"
                dataKey={"male"}
                stackId="1"
              >
                <LabelList
                  content={({ width, value }) => (
                    <p className="absolute">test</p>
                  )}
                />
              </Bar>
              <Bar
                radius={[4, 4, 0, 0]}
                barSize={20}
                fill="#91D4EF"
                dataKey={"female"}
                stackId="1"
              />
            </BarChart>
          </div>

          <HStack>
            <BarChartLegend color="#4285F4" name={t("Male")} />
            <BarChartLegend color="#91D4EF" name={t("Female")} />
          </HStack>
        </div>

        <div style={boxShadowStyles} className="flex p-8 flex-col">
          <p className="font-bold text-xl">{t("Popular Stories Views")}</p>
          <HStack className="h-12">
            {weekDays.map((v, i) => (
              <Button key={i} className="text-xs " colorScheme="white">
                {new Date(
                  new Date().setDate(new Date().getDate())
                ).toLocaleDateString("en-us", {
                  weekday: "long",
                })}
              </Button>
            ))}
          </HStack>
          <div className="h-44" ref={storiesViewsRef}>
            <BarChart
              data={storiesViewsData}
              width={storiesViewsDims.w}
              height={storiesViewsDims.h}
            >
              <CartesianGrid vertical={false} />
              <XAxis tickLine={false} axisLine={false} dataKey={"name"} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar
                radius={[4, 4, 0, 0]}
                barSize={20}
                fill="#4285F4"
                dataKey={"male"}
                stackId="1"
              />
              <Bar
                radius={[4, 4, 0, 0]}
                barSize={20}
                fill="#91D4EF"
                dataKey={"female"}
                stackId="1"
              />
            </BarChart>
          </div>

          <HStack>
            <BarChartLegend color="#4285F4" name={t("Male")} />
            <BarChartLegend color="#91D4EF" name={t("Female")} />
          </HStack>
        </div>
      </div>
      <div className="flex flex-col p-8" style={boxShadowStyles}>
        <div className="flex justify-between w-full">
          <p className="font-semibold">{t("Detials Level")}</p>

          <Select className="w-28">
            <SelectOption value={"day"}>{t("day")}</SelectOption>
            <SelectOption value={"month"}>{t("month")}</SelectOption>
            <SelectOption value={"year"}>{t("year")}</SelectOption>
          </Select>
        </div>

        <div className="grid grid-rows-4 grid-cols-12">
          <div className="col-span-2 border-r pb-4 pr-4 border-b row-span-1 flex flex-col gap-2">
            <Select
              className="w-40 bg-[#F3F3F3]"
              placeholder={`${t("Country")}/${t("Territory")}`}
            >
              <SelectOption value={"test"}>test</SelectOption>
            </Select>
          </div>
          <div className="col-span-3 border-b row-span-1 grid grid-cols-3">
            <div></div>
            <div></div>
            <div className="flex items-center">
              <Button className="bg-[#F3F3F3] text-black">
                <HStack>
                  <p>{t("Visits")}</p>
                  <BsArrowDown />
                </HStack>
              </Button>
            </div>
          </div>
          <div className="col-span-7 border-l border-b row-span-1 items-center grid grid-cols-6">
            <div className="col-span-2 flex justify-center items-center">
              <p className="font-bold">{t("Visits")}</p>
            </div>
            <div className="col-span-4 justify-end flex gap-8 items-center">
              <p>{t("Country/Territory contribution to total")}</p>
              <Button className="bg-[#F3F3F3] text-black">
                <HStack>
                  {t("Visits")}
                  <BsArrowDown />
                </HStack>
              </Button>
            </div>
          </div>
          <div className="col-span-2 border-r row-span-3 pt-4 flex flex-col gap-4">
            {countries.map((v, i) => (
              <div key={i} className="flex gap-6 items-center">
                <p className="font-bold">
                  {(i + 1).toLocaleString("en-us", { minimumIntegerDigits: 2 })}
                </p>
                <HStack>
                  <div
                    style={{
                      backgroundColor: v.color,
                    }}
                    className="w-5 h-5"
                  />
                  <p>{v.name}</p>
                </HStack>
              </div>
            ))}
          </div>
          <div className="col-span-3 row-span-3 grid grid-cols-3">
            <div></div>
            <div></div>
            <div className="flex flex-col pt-4 gap-4">
              {countries.map((v, i) => (
                <p key={i} className="font-semibold">
                  {Intl.NumberFormat("en-us", {
                    compactDisplay: "long",
                  }).format(v.visits)}
                </p>
              ))}
            </div>
          </div>
          <div className="col-span-7 row-span-3 border-l pt-4 grid grid-cols-6">
            <div className="col-span-2 flex flex-col items-center gap-4">
              {countriesPercentage.map((v, i) => (
                <p key={i} className="font-semibold">
                  {(v.visits * 100).toFixed(2)}%
                </p>
              ))}
            </div>
            <div
              ref={visitsPieRef}
              className="col-span-4 flex justify-center items-center"
            >
              <PieChart width={visitsPieDims.w} height={visitsPieDims.h}>
                <Pie
                  data={countries}
                  dataKey="visits"
                  nameKey="name"
                  cx={visitsPieDims.w / 2}
                  cy={visitsPieDims.h / 2}
                  outerRadius={90}
                  fill="#82ca9d"
                  label
                >
                  {countries.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </div>
        </div>
      </div>
      <div style={boxShadowStyles} className="flex flex-col p-8 gap-4">
        <div className="flex justify-between w-full">
          <p className="font-bold text-xl">{t("Most Popular Post")}</p>
          <Select className="w-28">
            <SelectOption value={"day"}>{t("day")}</SelectOption>
            <SelectOption value={"month"}>{t("month")}</SelectOption>
            <SelectOption value={"year"}>{t("year")}</SelectOption>
          </Select>
        </div>
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
              <Th>{t("Gender")}</Th>
              <Th>{t("Country Name")}</Th>
              <Th>{t("City")}</Th>
              <Th>{t("Number of Visits")}</Th>
              <Th>{t("Comments")}</Th>
            </Tr>
          </THead>
          <TBody>
            {mapArray(posts, (v, i) => (
              <Tr>
                <Td>
                  <Image
                    className="w-20 h-12 object-cover"
                    src={v.thumbnail}
                    alt="thumbnail"
                  />
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
                <Td>{v.gender}</Td>
                <Td>{v.countryName}</Td>
                <Td>{v.city}</Td>
                <Td>{v.likes}</Td>
                <Td>{v.comments}</Td>
              </Tr>
            ))}
          </TBody>
        </Table>
        <div className="self-center">
          <Pagination></Pagination>
        </div>
      </div>

      <div style={boxShadowStyles} className="flex flex-col p-8 gap-4">
        <div className="flex justify-between w-full">
          <p className="font-bold text-xl">{t("Most Popular Post")}</p>
          <Select className="w-28">
            <SelectOption value={"day"}>{t("day")}</SelectOption>
            <SelectOption value={"month"}>{t("month")}</SelectOption>
            <SelectOption value={"year"}>{t("year")}</SelectOption>
          </Select>
        </div>
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
              <Th>{t("Gender")}</Th>
              <Th>{t("Country Name")}</Th>
              <Th>{t("City")}</Th>
              <Th>{t("Number of Visits")}</Th>
              <Th>{t("Comments")}</Th>
            </Tr>
          </THead>
          <TBody>
            {mapArray(posts, (v, i) => (
              <Tr>
                <Td>
                  <Image
                    className="w-20 h-12 object-cover"
                    src={v.thumbnail}
                    alt="thumbnail"
                  />
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
                <Td>{v.gender}</Td>
                <Td>{v.countryName}</Td>
                <Td>{v.city}</Td>
                <Td>{v.likes}</Td>
                <Td>{v.comments}</Td>
              </Tr>
            ))}
          </TBody>
        </Table>
        <div className="self-center">
          <Pagination></Pagination>
        </div>
      </div>
    </div>
  );
};

export const StatisticsCard: React.FC<{
  amount: number;
  title: string;
  prevAmount: number;
}> = ({ amount, prevAmount, title }) => {
  const change = (amount / prevAmount - 1) * 100;
  const positive = change > 0;
  return (
    <BoxShadow className="w-full">
      <div className="w-full px-4 py-2 rounded bg-[#F3F3F3] min-h-[6rem] flex flex-col justify-between">
        <p className="font-bold text-sm">{title}</p>
        <div className="w-full items-center flex justify-between">
          <div
            className={`${
              positive
                ? "text-primary bg-primary-100"
                : "text-secondaryRed bg-red-100"
            } flex items-center px-1 rounded`}
          >
            {positive ? <BiArrowToTop /> : <BiArrowToBottom />}
            {Math.floor(change)}%
          </div>
          <p className="font-bold text-lg">{NumberShortner(amount)}</p>
        </div>
      </div>
    </BoxShadow>
  );
};

export const BarChartLegend: React.FC<{
  name: string;
  amount?: number;
  color: string;
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

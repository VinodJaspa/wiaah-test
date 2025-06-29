import React from "react";
import { useTranslation } from "react-i18next";
import {
  TabItem,
  TabList,
  Tabs,
  TabsHeader,
  TabTitle,
  SectionWrapper,
  SectionHeader,

  useResponsive,
  HStack,
  ArrowLeftAlt1Icon,
  Switch,
  ArrowRefreshIcon,
  Divider,
  ArrowLeftIcon,
  ArrowRightIcon,
  SimpleTabs,
  SimpleTabItemList,
  Select,
  useGetMyProfileQuery,
  SelectOption,
} from "@UI";
import { Calender, SpecialSchedule } from "./SpecialSchedule";
import { WeekdaysSchedule } from "./WeekdaysSchedule";
import { getAllMonthsOfYear, mapArray, weekDayLong } from "@UI/../utils/src";
import { useRouting } from "@UI/../routing";
export interface TimeManagementSectionProps { }
import { useGetMyWorkingHoursQuery } from "ui/components/features/Services/Services/queries"
import { useUpdateWeekWorkingHoursMutation } from "ui/components/features/Services/Services/mutation";
export const TimeManagementSection: React.FC<
  TimeManagementSectionProps
> = ({ }) => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();
  const [tab, setTab] = React.useState(0);

  const { data: profile } = useGetMyProfileQuery();
  const months = getAllMonthsOfYear(2023);
  const { back } = useRouting();

  const { data } = useGetMyWorkingHoursQuery();

  const { mutate } = useUpdateWeekWorkingHoursMutation();
  const createdYear = new Date(profile?.createdAt || "").getFullYear();
  const currentYear = new Date().getFullYear();

  const yearOptions =
    !isNaN(createdYear) && createdYear <= currentYear
      ? [...Array(currentYear - createdYear + 1)].map((_, i) => createdYear + i)
      : [];
  return isMobile ? (
    <div className="flex flex-col gap-2 w-full p-2">
      <HStack className="justify-center relative">
        <p className="text-lg font-semibold">{t("Open Time Management")}</p>
        <button onClick={() => back()}>
          <ArrowLeftAlt1Icon className="absolute left-0 top-1/2 -translate-y-1/2" />
        </button>
      </HStack>
      <HStack className="self-center text-3xl">
        <ArrowLeftIcon
          onClick={() => setTab(0)}
          className={`${tab === 0 ? "text-grayText" : "text-primary"} `}
        />
        <p className="text-base font-medium">
          {tab === 0 ? t("Schedule for the week") : t("Special days schedule")}
        </p>
        <ArrowRightIcon
          onClick={() => setTab(1)}
          className={`${tab === 1 ? "text-grayText" : "text-primary"} `}
        />
      </HStack>

      <SimpleTabs value={tab} onChange={(v) => setTab(v)}>
        <SimpleTabItemList>
          <div className="h-full flex flex-col gap-4 overflow-y-scroll">
            {mapArray(weekDayLong, (v, i) => (
              <div key={i} className="flex flex-col gap-6">
                <HStack className="justify-between">
                  <p className="text-lg font-medium border-b border-primary">
                    {v}
                  </p>
                  <Switch />
                </HStack>
                <div className="flex flex-col gap-4 w-full">
                  <div className="text-lg flex items-end self-center gap-6">
                    <TimeInput
                      label={t("Open")}
                      date={new Date()}
                      onChange={() => { }}
                    />
                    <ArrowRefreshIcon className="text-xl mb-4" />
                    <TimeInput
                      label={t("Close")}
                      date={new Date()}
                      onChange={() => { }}
                    />
                  </div>
                  <Divider className="my-0" />
                  <div className="justify-center w-full flex">
                    <p className="font-medium border-b border-primary pb-2">
                      {t("Break Period")}
                    </p>
                  </div>
                  <div className="text-base flex items-center self-center gap-6">
                    <TimeInput date={new Date()} onChange={() => { }} p="p-2" />
                    <p className="text-lg font-medium">{t("to")}</p>
                    <TimeInput date={new Date()} onChange={() => { }} p="p-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col w-full gap-2">
            {/* <Select className="">
              {[
                ...Array(
                  new Date().getFullYear() -
                    new Date(profile?.createdAt || "").getFullYear() +
                    1
                ),
              ].map((v, i) => {
                const year = new Date(
                  new Date().setFullYear(new Date().getFullYear() - i)
                ).getFullYear();
                return (
                  <SelectOption key={i} value={year}>
                    {year}
                  </SelectOption>
                );
              })}
            </Select> */}
            <Select className="">
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>


            <div className="flex flex-col gap-4">
              {months.map((month, i) => (
                <Calender
                  onDaySelect={(d) => {
                    // if (multiSelect) {
                    //   setSelectedDates((state) => [...state, d]);
                    // } else {
                    //   modifiDays([d]);
                    // }
                  }}
                  scheduledDays={[]}
                  key={i}
                  monthDetails={month}
                />
              ))}
            </div>
          </div>
        </SimpleTabItemList>
      </SimpleTabs>
    </div>
  ) : (
    <SectionWrapper>
      <SectionHeader sectionTitle={t("Open Time Management")} />
      <Tabs>
        <TabsHeader>
          <TabTitle TabKey="0">
            {({ currentTabIdx }) => (
              <p
                className={`${currentTabIdx === 0 ? "border-b-2" : ""
                  }  border-b-primary pb-2`}
              >
                {t("Schedule for the week")}
              </p>
            )}
          </TabTitle>
          <TabTitle TabKey={"1"}>
            {({ currentTabIdx }) => (
              <p
                className={`${currentTabIdx === 1 ? "border-b-2" : ""
                  }  border-b-primary pb-2`}
              >
                {t("Special days schedule")}
              </p>
            )}
          </TabTitle>
        </TabsHeader>
        <TabList>
          <TabItem>
            <WeekdaysSchedule />
          </TabItem>
          <TabItem>
            <SpecialSchedule />
          </TabItem>
        </TabList>
      </Tabs>
    </SectionWrapper>
  );
};

const TimeInput: React.FC<{
  date: Date;
  onChange: (date: Date) => any;
  label?: string;
  p?: string;
}> = ({ date, onChange, label, p }) => {
  return (
    <div className="flex flex-col gap-2 font-semibold">
      {label ? <p className="text-center font-medium">{label}</p> : null}
      <div
        className={`border flex gap-2 ${p ?? "p-3"} border-gray-300 rounded-lg`}
      >
        <p className="border-r border-r-gray-300 pr-3">
          {formatAMPM(new Date(date))}
        </p>

        <p>{new Date(date).getHours() > 11 ? "PM" : "AM"}</p>
      </div>
    </div>
  );
};

function formatAMPM(date: Date) {
  let hours = date.getHours();
  let minutes: string | number = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const strTime = (hours < 10 ? "0" + hours : hours) + ":" + minutes;
  return strTime;
}

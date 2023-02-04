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
  useGetMyWorkingHoursQuery,
  useUpdateWeekWorkingHoursMutation,
} from "@UI";
import { SpecialSchedule } from "./SpecialSchedule";
import { WeekdaysSchedule } from "./WeekdaysSchedule";
export interface TimeManagementSectionProps {}

export const TimeManagementSection: React.FC<
  TimeManagementSectionProps
> = ({}) => {
  const { t } = useTranslation();

  const { data } = useGetMyWorkingHoursQuery();

  const { mutate } = useUpdateWeekWorkingHoursMutation();

  return (
    <SectionWrapper>
      <SectionHeader
        sectionTitle={t("opening_time_management", "Open Time Management")}
      />
      <Tabs>
        <TabsHeader>
          <TabTitle TabKey="0">
            {({ currentTabIdx }) => (
              <p
                className={`${
                  currentTabIdx === 0 ? "border-b-2" : ""
                }  border-b-primary pb-2`}
              >
                {t("Schedule for the week")}
              </p>
            )}
          </TabTitle>
          <TabTitle TabKey={"1"}>
            {({ currentTabIdx }) => (
              <p
                className={`${
                  currentTabIdx === 1 ? "border-b-2" : ""
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

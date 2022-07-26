export type DateType = string | number;

export interface WorkingHoursRange {
  from: DateType;
  to: DateType;
}

export interface WorkingDate {
  date: DateType;
  workingHoursRanges: WorkingHoursRange[];
}

export type FormatedWorkingDaysType = {
  weekday: string;
  dayNum: number;
  monthName: string;
  times: WorkingHoursRange[];
};

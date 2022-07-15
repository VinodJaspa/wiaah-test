export type DateType = string | number;

export interface WorkingHoursRange {
  from: DateType;
  to: DateType;
}

export interface WorkingDate {
  date: string | number;
  workingHoursRanges: WorkingHoursRange[];
}

export type FormatedWorkingDaysType = {
  weekday: string;
  dayNum: number;
  monthName: string;
  times: WorkingHoursRange[];
};

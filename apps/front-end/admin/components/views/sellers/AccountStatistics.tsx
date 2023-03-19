import { ArrowDownIcon, ArrowUpIcon, Badge } from "@partials";
import React from "react";
import { NumberShortner } from "utils";
import { useTranslation } from "react-i18next";
import { BiArrowToBottom, BiArrowToTop } from "react-icons/bi";

export const AccountStatistics: React.FC<{
  accountId: string;
}> = ({ accountId }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-8 w-full">
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
      <div className="grid grid-cols-12 gap-4 w-full h-96">
        <div className="shadow-lg h-full col-span-7"></div>
        <div className="shadow-lg h-full col-span-5"></div>
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
    <div className="w-full px-4 py-2 rounded bg-gray-100 min-h-[6rem] flex flex-col justify-between">
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
  );
};

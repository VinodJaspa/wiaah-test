import React from "react";
import { useTranslation } from "react-i18next";
import { AiFillCheckCircle, AiOutlineInbox } from "react-icons/ai";
import { FiBox } from "react-icons/fi";
import { Button } from "ui";

export interface SelectPackageStepProps {}
const FREE_PLAN = 0;
const PAY_PLAN = 1;
export const SelectPackageStep: React.FC<SelectPackageStepProps> = () => {
  const { t } = useTranslation();
  let [plan, setPlan] = React.useState(FREE_PLAN);

  return (
    <div className="w-full flex flex-col h-full justify-center gap-4">
      <h2 className="hidden text-xl font-bold lg:block">
        {t("Select_a_plan", "Select a plan")}
      </h2>
      <div className="flex flex-col h-[30rem] gap-4 justify-between lg:flex-row">
        <div
          onClick={() => {
            setPlan(0);
          }}
          className={`${
            plan == FREE_PLAN ? "border-8" : ""
          } w-full flex justify-between flex-col cursor-pointer border-primary rounded-xl bg-slate-900 p-6 `}
        >
          <div>
            <div className="flex items-center">
              <div className="green-text mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl">
                <FiBox />
              </div>
              <div>
                <div className="text-lg text-white">
                  {t("Free_Plan", "Free Plan")}
                </div>
                <div className="text-gray-400">
                  <span>$</span>
                  <span className="mx-1 text-2xl text-white">0</span>
                  <span>/ {t("month", "month")}</span>
                </div>
              </div>
            </div>
            <div className="my-4 h-px bg-white opacity-50"></div>
            <div className="mb-2 flex items-center text-lg text-white">
              <AiFillCheckCircle className="mr-2 text-xl" />{" "}
              <span>$0 / {t("no_limit", "no limit")}</span>
            </div>
            <div className="flex items-center text-lg text-white">
              <AiFillCheckCircle className="mr-2 text-xl" />{" "}
              <span>
                20% {t("commission_on_each_sale", "commission on each sale")}
              </span>
            </div>
          </div>
          <div className="mt-9 mb-6">
            <Button className="w-full">
              {t("choose_a_plan", "Choose a plan")}
            </Button>
          </div>
        </div>
        <div
          onClick={() => {
            setPlan(1);
          }}
          className={`${
            plan == PAY_PLAN ? "border-8" : ""
          } w-full flex flex-col justify-between border-primary cursor-pointer rounded-xl bg-slate-900 p-6 `}
        >
          <div>
            <div className="flex items-center">
              <div className="green-text mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl">
                <AiOutlineInbox />
              </div>
              <div>
                <div className="text-lg text-white">
                  {t("Pay_Plan", "Pay Plan")}
                </div>
                <div className="text-gray-400">
                  <span>$</span>
                  <span className="mx-1 text-2xl text-white">500</span>
                  <span>/ {t("mounth", "mounth")}</span>
                </div>
              </div>
            </div>
            <div className="my-4 h-px bg-white opacity-50"></div>
            <div className="mb-2 flex items-center text-lg text-white">
              <AiFillCheckCircle className="mr-2 text-xl" />{" "}
              <span>$500 / {t("no_limit", "no limit")}</span>
            </div>
            <div className="flex items-center text-lg text-white">
              <AiFillCheckCircle className="mr-2 text-xl" />{" "}
              <span>
                {t("No_commission_on_sales", "No commission on sales")}
              </span>
            </div>
          </div>
          <div className="mt-9 mb-6">
            <Button className="w-full">{t("Choose a plan")}</Button>
          </div>
        </div>
        <div
          onClick={() => {
            setPlan(2);
          }}
          className={`${
            plan == PAY_PLAN ? "border-8" : ""
          } w-full flex flex-col justify-between border-primary cursor-pointer rounded-xl bg-slate-900 p-6 `}
        >
          <div>
            <div className="flex items-center">
              <div className="green-text mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl">
                <AiOutlineInbox />
              </div>
              <div>
                <div className="text-lg text-white">{t("Pay Plan")}</div>
                <div className="text-gray-400">
                  <span>$</span>
                  <span className="mx-1 text-2xl text-white">500</span>
                  <span>/ {t("month")}</span>
                </div>
              </div>
            </div>
            <div className="my-4 h-px bg-white opacity-50"></div>
            <div className="mb-2 flex items-center text-lg text-white">
              <AiFillCheckCircle className="mr-2 text-xl" />{" "}
              <span>$500 / {t("no limit")}</span>
            </div>
            <div className="flex items-center text-lg text-white">
              <AiFillCheckCircle className="mr-2 text-xl" />{" "}
              <span>{t("No commission on sales")}</span>
            </div>
          </div>
          <div className="mt-9 mb-6">
            <Button className="w-full">{t("Choose a plan")}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

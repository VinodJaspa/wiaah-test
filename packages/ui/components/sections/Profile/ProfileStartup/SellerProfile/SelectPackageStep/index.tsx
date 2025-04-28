import React from "react";
import { useTranslation } from "react-i18next";
import { AiFillCheckCircle, AiOutlineInbox } from "react-icons/ai";
import { Button, PriceDisplay } from "@UI";
import { CommissionType, useGetMembershipsQuery } from "@features/Membership";
import { mapArray } from "utils";

export interface SelectPackageStepProps {
  shopType: string;
  onChange: (id: string) => any;
  value: string;
}

export const SelectPackageStep: React.FC<SelectPackageStepProps> = ({
  shopType,
  onChange: setPlan,
  value: plan,
}) => {
  const isProductsShop = shopType === "products";
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();

  const { data } = useGetMembershipsQuery();

  return (
    <div className="w-full flex flex-col h-full justify-center gap-4">
      <h2 className="hidden text-xl font-bold lg:block">
        {t("Select a plan")}
      </h2>
      <div className="flex flex-col  lg:h-[30rem] gap-4 justify-between lg:flex-row">
        {mapArray(data, (data) => (
          <div
            onClick={() => {
              setPlan(data.id);
            }}
            className={`${
              plan == data.id ? "border-8" : ""
            } w-full flex flex-col justify-between border-primary cursor-pointer rounded-xl bg-slate-900 p-4 `}
          >
            <div>
              <div className="flex items-center">
                <div className="green-text mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl">
                  <AiOutlineInbox />
                </div>
                <div>
                  <div className="text-lg text-white">{data.name}</div>
                  <div className="text-gray-400">
                    {data.turnover_rules.at(0)?.commissionType ===
                    CommissionType.Fixed ? (
                      <PriceDisplay
                        price={data.turnover_rules.at(0)?.commission || 0}
                      />
                    ) : (
                      <>%{data.turnover_rules.at(0)?.commission || 0}</>
                    )}
                    <span>/ {t("month")}</span>
                  </div>
                </div>
              </div>
              <div className="my-4 h-px bg-white opacity-50"></div>
              {mapArray(data.includings, (data) => (
                <div className="mb-2 flex text-lg text-white">
                  <AiFillCheckCircle className="mr-2 mt-1 text-xl" />{" "}
                  {data.title}
                </div>
              ))}
            </div>
            <div className="mt-9 lg:mb-6">
              <Button onClick={() => setPlan(data.id)} className="w-full">
                {t("Choose a plan")}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

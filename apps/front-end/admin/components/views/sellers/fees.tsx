import { Divider, Input, InputGroup, InputLeftElement } from "@partials";
import React from "react";
import { useTranslation } from "react-i18next";

export const AccountFeesTab: React.FC<{
  accountId: string;
}> = ({ accountId }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold text-3xl">{t("Selling fees")}</p>
      <div className="gap-4 flex items-center">
        <InputGroup flushed>
          <InputLeftElement>
            <p className="font-bold text-2xl">{"$"}</p>
          </InputLeftElement>
          <Input type="number" placeholder="cash" />
        </InputGroup>
        <p className="font-bold text-4xl">+</p>
        <InputGroup flushed>
          <InputLeftElement>
            <p className="font-bold text-2xl">{"%"}</p>
          </InputLeftElement>
          <Input type="number" placeholder="percent" />
        </InputGroup>
      </div>
      <Divider></Divider>
      <p className="font-semibold text-3xl">{t("Listing fees")}</p>
      <div className="gap-4 flex items-center">
        <InputGroup flushed>
          <InputLeftElement>
            <p className="font-bold text-2xl">{"$"}</p>
          </InputLeftElement>
          <Input type="number" placeholder="cash" />
        </InputGroup>
        <p className="font-bold text-4xl">+</p>
        <InputGroup flushed>
          <InputLeftElement>
            <p className="font-bold text-2xl">{"%"}</p>
          </InputLeftElement>
          <Input type="number" placeholder="percent" />
        </InputGroup>
      </div>
    </div>
  );
};

import React, { FC } from "react";
import { Button, Input, Spacer, Textarea } from "ui";
import { IoMdMail } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export const ContactUsForm: FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-[40rem] gap-4">
        <Input icon={<FaUser />} placeholder="Name" />
        <Input icon={<IoMdMail />} placeholder="Email" />
      </div>
      <div className="">{<Textarea placeholder="How can we Help you ?" />}</div>
      <Spacer />
      <Button>{t("submit", "Submit")}</Button>
    </div>
  );
};

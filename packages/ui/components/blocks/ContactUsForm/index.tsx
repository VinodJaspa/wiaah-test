import React, { FC } from "react";
import { Button, Input, Spacer, TextArea } from "ui/components/partials";
import { IoMdMail } from "react-icons/io";
import { FaUser } from "react-icons/fa";

export const ContactUsForm: FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-[40rem] gap-4">
        <Input icon={<FaUser />} placeholder="Name" />
        <Input icon={<IoMdMail />} placeholder="Email" />
      </div>
      <div className="">{<TextArea placeholder="How can we Help you ?" />}</div>
      <Spacer />
      <Button text="Submit" />
    </div>
  );
};

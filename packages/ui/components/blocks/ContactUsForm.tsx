import React, { FC } from "react";
import { Button, Input, Spacer, TextArea } from "../partials";
import { IoMdMail } from "react-icons/io";
import { FaUser } from "react-icons/fa";

export const ContactUsForm: FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-[40rem] gap-4">
        <Input
          inputClassName="flex-wrap"
          icon={<FaUser />}
          placeholder="Name"
          containerClassName="w-full"
        />
        <Input
          icon={<IoMdMail />}
          placeholder="Email"
          containerClassName="w-full"
        />
      </div>
      <div className="">{<TextArea placeholder="How can we Help you ?" />}</div>
      <Spacer />
      <Button text="Submit" />
    </div>
  );
};

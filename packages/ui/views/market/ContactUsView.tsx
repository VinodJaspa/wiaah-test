import React, { FC } from "react";
import { ContactUsForm, Spacer } from "../../components";

export const ContactUsView: FC = () => {
  return (
    <div className="my-20 flex w-full flex-col items-center">
      <div className="text-5xl">Contact Us</div>
      <Spacer spaceInRem={8} />
      <ContactUsForm />
    </div>
  );
};

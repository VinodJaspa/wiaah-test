import React from "react";
import {
  Button,
  SectionHeader,
  Input,
  useResponsive,
  Image,
  HStack,
} from "@UI";
import { useTranslation } from "react-i18next";
import { Field, Form, Formik } from "formik";
import { mapArray } from "@UI/../utils/src";
import PrimaryButton from "@UI/components/shadcn-components/Buttons/primaryButton";
import Subtitle from "@UI/components/shadcn-components/Title/Subtitle";

export interface FindYourFriendsStepProps { }

const MAIL_SERVICES: { name: string; image: string }[] = [
  {
    name: "gmail",
    image: "/gmail-logo.png",
  },
  {
    name: "yahoo",
    image: "/yahoo-logo.png",
  },
  {
    name: "outlook",
    image: "/outlook-logo.png",
  },
  {
    name: "whatsapp",
    image: "/whatsapp-logo.png",
  },
];

export const FindYourFriendsStep = React.forwardRef(
  ({ }: { onSuccess: () => any }, ref) => {
    const { t } = useTranslation();
    const [mailService, setMailService] = React.useState(0);

    React.useImperativeHandle(ref, () => ({
      onSubmit: () => { },
    }));

    return (
      <div className="bg-white p-4 space-y-4">
        <div className="text-left md:text-center space-y-2">
          <Subtitle>
            {t("Find_friends_on_Wiaah", "Find friends on Wiaah")}
          </Subtitle>
          <p className="text-gray-500 text-sm hidden md:block">
            {t("This_information_will_help", "This information will help you find friends on Wiaah")}
          </p>
        </div>

        <div className="space-y-3">
          {MAIL_SERVICES.map((service, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 md:px-4 md:py-2 rounded-xl"
            >
              <div className="flex items-center gap-3 truncate">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="h-6 w-6 object-contain"
                  />
                </div>
                <span className="text-sm font-medium truncate capitalize">
                  {service.name}
                </span>
              </div>

              <PrimaryButton
                onClick={() => setMailService(index)}
                className="text-sm font-medium rounded-full bg-[#aeb2b5b9] px-4 py-2 md:bg-gray-300 md:rounded-lg md:px-4 md:py-1"
              >
                {t("Find_Friends", "Find Friends")}
              </PrimaryButton>
            </div>
          ))}
        </div>

        <div className="flex justify-center md:justify-end mt-6 md:mt-10">
          <PrimaryButton className="w-full md:w-[480px] h-10 bg-[#828485] text-black font-semibold rounded-xl">
            {t("Find_Friends", "Find Friends")}
          </PrimaryButton>
        </div>
      </div>
    );
  }
);


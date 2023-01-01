import { ServiceReachOutType } from "api";
import { useTranslation } from "react-i18next";
import { usePublishRef } from "state";
import {
  HStack,
  LocationIcon,
  TelephoneFillIcon,
  EmailIcon,
  LocationAddressDisplay,
} from "@UI";
import { runIfFn } from "utils";

export interface ServiceReachOutSectionProps extends ServiceReachOutType {}
export const ServiceReachOutSection: React.FC<ServiceReachOutSectionProps> = ({
  email,
  location,
  telephone,
}) => {
  const { t } = useTranslation();
  const contactRef = usePublishRef((keys) => keys.contact);

  const contacts: {
    label: string;
    value: React.ReactNode;
    icon: React.ReactNode;
  }[] = [
    {
      label: t("Address"),
      icon: <LocationIcon className="fill-primary" />,
      value: <LocationAddressDisplay {...location} />,
    },
    {
      label: t("E-mail"),
      icon: EmailIcon,
      value: email,
    },
    {
      label: t("Phone"),
      icon: TelephoneFillIcon,
      value: `+${telephone}`,
    },
  ];

  return (
    <div ref={contactRef} className="flex flex-col gap-[1.875rem] w-full">
      <p className="text-3xl text-lightBlack font-bold">{t("Contact")}</p>
      <div className="flex flex-col gap-10 w-full">
        {contacts.map(({ icon, label, value }, i) => (
          <HStack className="gap-5">
            <div className="rounded-[0.625rem] fill-primary bg-primary-100 text-primary text-3xl h-[3.125rem] w-[3.125rem] flex items-center justify-center">
              {runIfFn(icon)}
            </div>
            <div className="flex flex-col text-lightBlack">
              <p className="text-base font-normal">{label}</p>
              <p className="text-lg font-bold">{runIfFn(value)}</p>
            </div>
          </HStack>
        ))}
      </div>
    </div>
  );
};

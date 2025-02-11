import { ServiceLocation } from "@features/API";
import { LocationAddress } from "@features/Services/components";
import { EmailIcon, HStack, LocationIcon, TelephoneFillIcon } from "@partials";
import { useTranslation } from "react-i18next";
import { usePublishRef } from "state";
import { runIfFn } from "utils";

export interface ServiceReachOutSectionProps {
  email: string;
  location: Pick<
    ServiceLocation,
    "address" | "city" | "country" | "lat" | "lon" | "postalCode" | "state"
  >;
  telephone: string;
  showContact?: boolean;
}

export const ServiceReachOutSection: React.FC<ServiceReachOutSectionProps> = ({
  email,
  location,
  telephone,
  showContact,
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
      value: <LocationAddress location={location} />,
    },
    {
      label: t("Phone"),
      icon: <TelephoneFillIcon className="fill-primary" />,
      value: `+${telephone}`,
    },
    {
      label: t("E-mail"),
      icon: <EmailIcon className="fill-primary" />,
      value: email,
    },
  ];

  return (
    <div ref={contactRef} className="flex flex-col gap-[1.875rem] w-full">
      {showContact ? (
        <p className="text-3xl text-lightBlack font-bold">{t("Contact")}</p>
      ) : null}
      <div className="flex flex-col gap-5 w-full">
        {contacts.map(({ icon, label, value }, i) => (
          <HStack className="gap-5">
            <div className="rounded-full fill-primary bg-primary-100 text-primary text-xl lg:text-3xl min-w-[2.5rem] h-10 lg:h-[3.125rem] lg:w-[3.125rem] flex items-center justify-center">
              {runIfFn(icon)}
            </div>
            <div className="flex flex-col text-lightBlack">
              <p className="text-xs lg:text-base text-[#646464] font-normal">
                {label}
              </p>
              <p className="lg:text-lg text-sm font-medium text-black lg:font-bold">
                {runIfFn(value)}
              </p>
            </div>
          </HStack>
        ))}
      </div>
    </div>
  );
};

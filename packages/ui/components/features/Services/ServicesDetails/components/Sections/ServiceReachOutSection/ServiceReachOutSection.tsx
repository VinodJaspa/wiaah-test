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
      label: t("Phone"),
      icon: <TelephoneFillIcon className="fill-primary" />,
      value: `+${telephone}`,
    },
    {
      label: t("E-mail"),
      icon: <EmailIcon className="fill-primary" />,
      value: email,
    },
    {
      label: t("Address"),
      icon: <LocationIcon className="fill-primary" />,
      value: <LocationAddress location={location} />,
    },
  ];

  return (
    <div ref={contactRef} className="flex flex-col gap-6 w-full">
      {showContact && (
        <p className="text-xl md:text-2xl font-semibold text-lightBlack tracking-tight">
          {t("Contact")}
        </p>
      )}
      <div className="flex flex-col gap-4 w-full">
        {contacts.map(({ icon, label, value }, i) => (
          <HStack key={i} className="gap-4 items-start">
            {/* Icon bubble */}
            <div className="rounded-full bg-primary-100 text-primary text-lg md:text-xl w-10 h-10 flex items-center justify-center shrink-0">
              {runIfFn(icon)}
            </div>

            {/* Label & Value */}
            <div className="flex flex-col leading-snug">
              <p className="text-xs md:text-sm text-gray-500">{label}</p>
              <p className="text-sm md:text-base font-medium text-black">
                {runIfFn(value)}
              </p>
            </div>
          </HStack>
        ))}
      </div>
    </div>
  );
};

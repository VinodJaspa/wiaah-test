import { ServiceReachOutType } from "api";
import { useTranslation } from "react-i18next";
import { usePublishRef } from "state";
import { HStack, LocationIcon, TelephoneIcon, EmailIcon } from "ui";

export interface ServiceReachOutSectionProps extends ServiceReachOutType {}
export const ServiceReachOutSection: React.FC<ServiceReachOutSectionProps> = ({
  email,
  location,
  telephone,
}) => {
  const { t } = useTranslation();
  const contactRef = usePublishRef((keys) => keys.contact);
  return (
    <div className="flex flex-col gap-4 w-full">
      <p className="font-bold text-lg">{t("Contact")}</p>
      <p ref={contactRef ?? undefined}>{t("Address")}</p>
      <HStack>
        <LocationIcon />
        <div className="underline font-bold">
          <p>{location.address}</p>
          <p>
            {location.postalCode} {location.city}
          </p>
          <p>{location.country}</p>
        </div>
      </HStack>
      <p>{t("Telephone")}</p>
      <HStack>
        <TelephoneIcon />
        <p className="underline font-bold">{telephone}</p>
      </HStack>
      <p>{t("Email")}</p>
      <HStack>
        <EmailIcon />
        <p className="underline font-bold">{email}</p>
      </HStack>
    </div>
  );
};

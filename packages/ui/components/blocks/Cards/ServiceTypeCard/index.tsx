import { ServiceType } from "dto";
import { useTranslation } from "react-i18next";
import { runIfFn } from "utils";
import { Button, TranslationText } from "@UI";

export type ServiceSelectingInfo = {
  serviceIcon: React.ReactNode;
  serviceKey: ServiceType;
  serviceName: string;
  serviceDescription: string;
};

export interface ServiceTypeCardProps {
  serviceInfo: ServiceSelectingInfo;
  onServiceChoosen: (serviceType: ServiceType) => any;
}

export const ServiceTypeCard: React.FC<ServiceTypeCardProps> = ({
  serviceInfo,
  onServiceChoosen,
}) => {
const { t } = useTranslation();
  return (
    <div className="flex w-48 min-h-[15rem] justify-between flex-col items-center gap-4">
      <div className="text-8xl text-primary fill-primary">
        {runIfFn(serviceInfo.serviceIcon, {})}
      </div>
      <div className="flex flex-col gap-4">
        <TranslationText
          className="text-center font-semibold"
          translationObject={serviceInfo.serviceName}
        />
        <TranslationText
          className="text-center text-gray-500"
          translationObject={serviceInfo.serviceDescription}
        />
      </div>
      <Button
        onClick={() =>
          onServiceChoosen && onServiceChoosen(serviceInfo.serviceKey)
        }
        className="whitespace-nowrap w-full"
      >
        {t("List your property")}
      </Button>
    </div>
  );
};

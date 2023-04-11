import React from "react";
import { Translation, useTranslation } from "react-i18next";
import { FormOptionType } from "types";
import { Checkbox, HStack, TranslationText, Select, SelectOption } from "@UI";

export type IncludedServicesCost = "free" | "paid";

export interface IncludedServicesProps {
  onChange: (includedServices: string[], price: IncludedServicesCost) => any;
}

export const IncludedServices: React.FC<IncludedServicesProps> = ({
  onChange,
}) => {
  const { t } = useTranslation();
  const [services, setServices] = React.useState<string[]>([]);
  const [cost, setCost] = React.useState<IncludedServicesCost>("free");

  React.useEffect(() => {
    onChange && onChange(services, cost);
  }, [services, cost]);

  function handleIncludeService(serviceKey: string) {
    setServices((state) => {
      const filterdState = state.filter((service) => service !== serviceKey);

      return [...filterdState, serviceKey];
    });
  }

  function handleRemoveService(serviceKey: string) {
    setServices((state) => state.filter((service) => service !== serviceKey));
  }

  return (
    <HStack className="gap-2 w-full flex-col md:flex-row">
      <div className="grid-cols-2  grid w-full gap-16 py-16">
        {IncludableServices.map((service, i) => (
          <HStack className="">
            <Checkbox
              onChange={({ target: { checked } }) =>
                checked
                  ? handleIncludeService(service.value)
                  : handleRemoveService(service.value)
              }
              checked={services.includes(service.value)}
            />
            <span>
              <TranslationText translationObject={service.name} />
            </span>
          </HStack>
        ))}
      </div>
      <div className="w-48">
        <Select<IncludedServicesCost>
          className=""
          onOptionSelect={(opt) => setCost(opt)}
        >
          <SelectOption value={"free"}>
            <p>{t("free")}</p>
          </SelectOption>
          <SelectOption value={"paid"}>
            <p>{t("paid")}</p>
          </SelectOption>
        </Select>
      </div>
    </HStack>
  );
};

export const IncludableServices: FormOptionType[] = [
  {
    name: {
      translationKey: "Free Wifi",
    },
    value: "free-wifi",
  },
  {
    name: {
      translationKey: "Resturant",
    },
    value: "resturant",
  },
  {
    name: {
      translationKey: "Room service",
    },
    value: "room-service",
  },
  {
    name: {
      translationKey: "Bar",
    },
    value: "bar",
  },
  {
    name: { translationKey: "24-hour front desk" },
    value: "24-hour-front-desk",
  },
  {
    name: {
      translationKey: "Sauna",
    },
    value: "sauna",
  },
  {
    name: {
      translationKey: "Fitness center",
    },
    value: "fitness-center",
  },
  {
    name: {
      translationKey: "Garden",
    },
    value: "garden",
  },
  {
    name: {
      translationKey: "Terrace",
    },
    value: "terrace",
  },
  {
    name: {
      translationKey: "Airport shuttle",
    },
    value: "airport-shuttle",
  },
  {
    name: {
      translationKey: "Family rooms",
    },
    value: "family-rooms",
  },
  {
    name: {
      translationKey: "spa",
    },
    value: "spa",
  },
  {
    name: {
      translationKey: "Hot tub/Jacuzzi",
    },
    value: "hot-tub/jacuzzi",
  },
  {
    name: {
      translationKey: "Air conditioning",
    },
    value: "air-conditioning",
  },
  {
    name: {
      translationKey: "Water park",
    },
    value: "water-park",
  },
  {
    name: {
      translationKey: "Electric vehicle charging station",
    },
    value: "electric vehicle charging station",
  },
  {
    name: {
      translationKey: "Swimming pool",
    },
    value: "swimming pool",
  },
];

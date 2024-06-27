import { VehicleMyServiceDataType } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  PriceDisplay,
  VehicleProprtiesList,
  Badge,
  EditIcon,
  TrashIcon,
  AspectRatioImage,
  ServiceRefundableTypeDescription,
  DotIcon,
  LocationAddressDisplay,
} from "@UI";
import { setTestid } from "utils";
import { VehicleProperties } from "@features/API/gql/generated";
import { CreateVehiclePropertiesInput } from "@features/API";

export interface VehicleMyServiceCardProps extends VehicleMyServiceDataType {
  onEdit: (id: string) => any;
  onRemove: (id: string) => any;
}

export const VehicleMyServiceCard: React.FC<VehicleMyServiceCardProps> = ({
  onEdit,
  onRemove,
  ...props
}) => {
  const { t } = useTranslation();

  const {
    cancelationPolicies,
    id,
    pricePerDay,
    thumbnail,
    vehicleProps,
    location,
    title,
  } = props;

  const convertToVehicleProperties = (
    props: { type?: string; value?: boolean | number }[],
  ): VehicleProperties => {
    const vehicleProperties: Partial<VehicleProperties> = {
      __typename: "VehicleProperties",
      seats: 0,
      windows: 0,
      maxSpeedInKm: 0,
      lugaggeCapacity: 0,
      gpsAvailable: false,
      airCondition: false,
    };

    props.forEach((prop) => {
      switch (prop.type) {
        case "passengers":
          vehicleProperties.seats = prop.value as number;
          break;
        case "windows":
          vehicleProperties.windows = prop.value as number;
          break;
        case "bags":
          vehicleProperties.lugaggeCapacity = prop.value as number;
          break;
        case "a/c":
          vehicleProperties.airCondition = prop.value as boolean;
          break;
        case "gps":
          vehicleProperties.gpsAvailable = prop.value as boolean;
          break;
        // Add more cases if there are additional properties
      }
    });

    return vehicleProperties as VehicleProperties;
  };

  const adjustedvehicleProps = convertToVehicleProperties(vehicleProps);

  return (
    <div className="border flex-col sm:flex-row border-gray-400 rounded p-2 flex justify-between gap-4">
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <div className="min-w-[13rem]">
          <AspectRatioImage alt={title} ratio={3 / 4} src={thumbnail} />
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-semibold text-lg">{title}</p>
          {pricePerDay ? (
            <div className="flex flex-col font-bold gap-2"></div>
          ) : null}
          <span className="text-lg">
            <VehicleProprtiesList VehicleProps={adjustedvehicleProps} />
          </span>
          <LocationAddressDisplay
            location={{
              city: location.city,
              country: location.country!,
              state: location.state!,
              address: location.address!,
              postalCode: location.postalCode!,
              lat: location.lat!,
              lon: location.lon!,
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          {cancelationPolicies.map((policy, i) => (
            <div key={i} className="flex items-center gap-4 justify-between">
              <div className="flex items-center gap-2">
                <DotIcon className="text-xl" />
                <ServiceRefundableTypeDescription
                  {...policy}
                  bookedDate={new Date()}
                />
              </div>

              <span className="font-bold">
                {policy.cost > 0 ? (
                  <PriceDisplay price={policy.cost} />
                ) : policy.duration > 0 ? (
                  <p>{t("FREE")}</p>
                ) : null}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 justify-between">
        <div className="flex flex-col items-end text-xl gap-6">
          <Badge className="whitespace-nowrap">{t("Vehicle")}</Badge>
          <div className="flex gap-2 text-3xl">
            <EditIcon
              {...setTestid("EditServiceBtn")}
              className="cursor-pointer"
              onClick={() => onEdit && onEdit(id)}
            />
            <TrashIcon
              {...setTestid("RemoveServiceBtn")}
              onClick={() => onRemove && onRemove(id)}
              className="text-secondaryRed cursor-pointer"
            />
          </div>
        </div>
        <span className="text-lg text-primary flex whitespace-nowrap gap-2">
          <PriceDisplay
            priceObject={{
              amount: pricePerDay,
            }}
          />{" "}
          | {t("day")}
        </span>
      </div>
    </div>
  );
};

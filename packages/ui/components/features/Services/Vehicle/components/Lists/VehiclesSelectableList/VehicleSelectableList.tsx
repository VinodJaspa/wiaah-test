import { Vehicle } from "api";
import { useResponsive } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { usePublishRef } from "state";
import {
  Slider,
  CaruoselLeftArrow,
  CaruoselRightArrow,
  VehicleSearchCard,
  ServiceCancelationPolicyInput,
  Button,
} from "@UI";

export const VehiclesSelectableList: React.FC<{
  vehicles: Vehicle[];
}> = ({ vehicles }) => {
  const { t } = useTranslation();
  const { isMobile, isTablet } = useResponsive();
  const VehiclesRef = usePublishRef((keys) => keys.vehicle);
  const [selectedVehicles, setSelectedVehicles] = React.useState<string[]>([]);

  return (
    <div ref={VehiclesRef}>
      <Slider
        gap={0}
        itemsCount={isMobile ? 1 : isTablet ? 2 : 3}
        leftArrowComponent={CaruoselLeftArrow}
        rightArrowComponent={CaruoselRightArrow}
      >
        {vehicles
          ? Array.isArray(vehicles)
            ? vehicles.map((vehicle, i) => {
                const selected = selectedVehicles.includes(vehicle.id);
                function handleSelect(id: string) {
                  if (selected) {
                  } else {
                    setSelectedVehicles((state) => [...state, id]);
                  }
                }

                function handleUnSelect(id: string) {
                  if (selected) {
                    setSelectedVehicles((state) =>
                      state.filter((vehicleId) => vehicleId !== id)
                    );
                  }
                }

                return (
                  <div className="flex flex-col gap-2 mx-4">
                    <VehicleSearchCard showTotal={false} key={i} {...vehicle} />
                    {/* <div className="flex flex-col gap-1">
                      <p className="font-bold">{t("Cancelation policy")}</p>
                      {vehicle.cancelationPolicies.map((policy, i) => (
                        <ServiceCancelationPolicyInput
                          {...policy}
                          name="cancelationPolicy"
                          onSelected={() => {}}
                          key={`${i}-${JSON.stringify(policy)}`}
                        />
                      ))}
                    </div> */}
                    <Button
                      onClick={() =>
                        selected
                          ? handleUnSelect(vehicle.id)
                          : handleSelect(vehicle.id)
                      }
                      outline={selected}
                      className="self-end w-fit"
                    >
                      {selected ? t("Selected") : t("Select")}
                    </Button>
                  </div>
                );
              })
            : null
          : null}
      </Slider>
    </div>
  );
};

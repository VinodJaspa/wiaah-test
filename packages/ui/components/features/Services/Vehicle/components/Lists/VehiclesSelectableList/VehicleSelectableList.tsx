import { Button } from "@UI";
import { ServiceCancelationPolicyInput } from "@UI/components/features/Services/components/Inputs/ServiceCancelationPolicyInput";
import { VehicleSearchCard } from "@UI/components/features/Services/Vehicle/components/cards/VehicleSearchCard";
import { Vehicle } from "api";
import { useResponsive } from "hooks";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { usePublishRef } from "state";

export const VehiclesSelectableList: React.FC<{
  vehicles: Vehicle[];
}> = ({ vehicles }) => {
const { t } = useTranslation();
  const { isMobile, isTablet } = useResponsive();
  const VehiclesRef = usePublishRef((keys) => keys.vehicle);
  const [selectedVehicles, setSelectedVehicles] = React.useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const itemsPerPage = isMobile ? 1 : isTablet ? 2 : 3;
  const maxIndex = Math.max(0, vehicles.length - itemsPerPage);
  const translateX = -(currentIndex * (100 / itemsPerPage));

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  React.useEffect(() => {
    // Ensure currentIndex stays within valid range when itemsPerPage changes
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [itemsPerPage, maxIndex]);

  return (
    <div ref={VehiclesRef} className="relative">
      {/* Container with padding for navigation buttons (only on desktop) */}
      <div
        className={`${!isMobile && vehicles.length > itemsPerPage ? "px-12" : ""} relative`}
      >
        {/* Add explicit width and overflow-hidden to contain the carousel */}
        <div className="w-full overflow-hidden">
          <div
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(${translateX}%)` }}
          >
            {vehicles.map((vehicle) => {
              const selected = selectedVehicles.includes(vehicle.id);

              const handleSelect = (id: string) => {
                setSelectedVehicles((state) => [...state, id]);
              };

              const handleUnSelect = (id: string) => {
                setSelectedVehicles((state) =>
                  state.filter((vehicleId) => vehicleId !== id),
                );
              };

              return (
                <div
                  key={vehicle.id}
                  className="flex-shrink-0 p-3"
                  style={{ width: `${100 / itemsPerPage}%` }}
                >
                  <div className="flex flex-col gap-2 h-full">
                    <VehicleSearchCard showTotal={false} {...vehicle} />
                    <div className="flex flex-col gap-1">
                      <p className="font-bold">{t("Cancelation policy")}</p>
                      {vehicle.cancelationPolicies.map((policy, i) => (
                        <ServiceCancelationPolicyInput
                          isCalendarCard
                          {...policy}
                          name="cancelationPolicy"
                          onSelected={() => {}}
                          key={`${i}-${JSON.stringify(policy)}`}
                        />
                      ))}
                    </div>
                    <Button
                      onClick={() =>
                        selected
                          ? handleUnSelect(vehicle.id)
                          : handleSelect(vehicle.id)
                      }
                      outline={selected}
                      className="self-end w-fit mt-auto"
                    >
                      {selected ? t("Selected") : t("Select")}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {!isMobile && vehicles.length > itemsPerPage && (
        <>
          <button
            className="absolute top-1/2 -translate-y-1/2 left-2 z-10 bg-black/50 w-8 aspect-square flex items-center justify-center rounded-full disabled:opacity-50"
            onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
            disabled={!canGoPrev}
          >
            <ChevronLeft className="text-primary" />
          </button>
          <button
            className="absolute top-1/2 -translate-y-1/2 right-2 z-10 bg-black/50 w-8 aspect-square flex items-center justify-center rounded-full disabled:opacity-50"
            onClick={() =>
              setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
            }
            disabled={!canGoNext}
          >
            <ChevronRight className="text-primary" />
          </button>
        </>
      )}
    </div>
  );
};

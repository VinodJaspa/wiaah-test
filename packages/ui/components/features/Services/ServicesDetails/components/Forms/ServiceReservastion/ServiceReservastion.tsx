import { useBoundedCountState } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  Button,
  useGetServicesProviderQuery,
  useSearchFilters,
  MinusIcon,
  PlusIcon,
  BookedServicesCostDetails,
  GuestsInput,
  CheckInOutInput,
} from "ui";

export const ServiceReservastion: React.FC = () => {
  const { visit } = useRouting();

  const { filters } = useSearchFilters();
  const {
    data: res,
    isError,
    isLoading,
  } = useGetServicesProviderQuery(filters);

  const { t } = useTranslation();

  return (
    <div className="p-4 bg-white rounded-lg gap-16 shadow h-full justify-between border-[1px] flex flex-col border-gray-300">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col rounded-lg border-2 border-gray-300">
          <CheckInOutInput />
          <GuestsInput />
        </div>
        <Button className="py-4 ">{t("Book now")}</Button>
      </div>
      <BookedServicesCostDetails title="Rooms" vat={res?.data.vat || 0} />
    </div>
  );
};

export interface HotelGuestsInputProps {
  name: string;
  description: string;
  onCountChange: () => any;
}
export const HotelGuestsInput: React.FC<HotelGuestsInputProps> = ({
  description,
  name,
  onCountChange,
}) => {
  return (
    <div className="text-xl p-4 flex items-center w-full bg-white justify-between">
      <div className="flex flex-col gap-1">
        <p className="font-bold">{name || ""}</p>
        <p>{description || ""}</p>
      </div>
      <CountInput onCountChange={onCountChange} max={5} min={0} />
    </div>
  );
};

export interface CountInputProps {
  onCountChange: (count: number) => any;
  min?: number;
  max?: number;
}
export const CountInput: React.FC<CountInputProps> = ({
  onCountChange,
  max,
  min,
}) => {
  const { count, decrement, increment } = useBoundedCountState(min, max);

  React.useEffect(() => {
    onCountChange && onCountChange(count);
  }, [count]);

  return (
    <div className="whitespace-nowrap flex items-center gap-1">
      <MinusIcon
        className={`${count === min ? "opacity-50" : ""}`}
        onClick={() => decrement()}
      />
      <p className="w-10 select-none text-center whitespace-nowrap">{count}</p>
      <PlusIcon
        className={`${count === max ? "opacity-50" : ""}`}
        onClick={() => increment()}
      />
    </div>
  );
};

import { CountInput } from "@UI";

export interface HotelGuestsInputProps {
  name: string;
  description: string;
  count: number;
  onCountChange: (count: number) => any;
}
export const HotelGuestsInput: React.FC<HotelGuestsInputProps> = ({
  description,
  name,
  onCountChange,
  count,
}) => {
  return (
    <div className="flex items-center w-full bg-white justify-between">
      <div className="flex flex-col gap-1">
        <p className="font-bold">{name || ""}</p>
        <p className="font-medium text-[#868686]">{description || ""}</p>
      </div>
      <div className="text-xl">
        <CountInput
          count={count}
          onCountChange={onCountChange}
          max={5}
          min={0}
        />
      </div>
    </div>
  );
};

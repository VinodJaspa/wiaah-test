import { CountInput } from "@UI";

export interface HotelGuestsInputProps {
  name: string;
  description: string;
  onCountChange: (count: number) => any;
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

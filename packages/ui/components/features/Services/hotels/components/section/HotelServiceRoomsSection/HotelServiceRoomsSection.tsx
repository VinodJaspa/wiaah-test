import {
  HotelRoomDetailsCard,
  HotelRoomDetailsCardProps,
} from "@UI/components/features/Services/hotels/components/cards/HotelRoomDetailsCard";
import { useTranslation } from "react-i18next";
import { usePublishRef, useSetBookedServicesState } from "state";

export interface HotelServiceRoomsSectionProps {
  rooms: HotelRoomDetailsCardProps["room"][];
}
export const HotelServiceRoomsSection: React.FC<
  HotelServiceRoomsSectionProps
> = ({ rooms }) => {
  const { addService } = useSetBookedServicesState();
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const roomsRef = usePublishRef((refs) => refs.rooms);

  function handleBook(id: string) {}
  return (
    <div className="w-full flex gap-4 flex-col ">
      <p className="font-bold text-3xl" ref={roomsRef ?? undefined}>
        {t("Rooms")}
      </p>
      <div className="flex flex-col gap-8">
        {Array.isArray(rooms)
          ? rooms.map((room) => (
              <HotelRoomDetailsCard onBook={handleBook} room={room} />
            ))
          : null}
      </div>
    </div>
  );
};

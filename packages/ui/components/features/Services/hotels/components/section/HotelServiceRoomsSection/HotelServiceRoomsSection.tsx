import { HotelRoomDataType } from "api";
import { useResponsive } from "hooks";
import { useTranslation } from "react-i18next";
import { usePublishRef, useSetBookedServicesState } from "state";
import {
  Slider,
  HotelRoomDetailsCard,
  CaruoselLeftArrow,
  CaruoselRightArrow,
} from "ui";

export interface HotelServiceRoomsSectionProps {
  rooms: HotelRoomDataType[];
}
export const HotelServiceRoomsSection: React.FC<
  HotelServiceRoomsSectionProps
> = ({ rooms }) => {
  const { addService } = useSetBookedServicesState();
  const { isMobile, isTablet } = useResponsive();
  const { t } = useTranslation();
  const roomsRef = usePublishRef((refs) => refs.rooms);

  function handleBook(id: string) {
    const room = rooms.find((room) => room.id === id);
    if (!room) return;
    addService({
      id: room.id,
      name: room.title,
      price: room.price,
      qty: 1,
    });
  }
  return (
    <div className="w-full flex gap-4 flex-col ">
      <p className="font-bold text-3xl" ref={roomsRef ?? undefined}>
        {t("Rooms")}
      </p>
      <div className="flex flex-col gap-8">
        {Array.isArray(rooms)
          ? rooms.map((room) => (
              <HotelRoomDetailsCard onBook={handleBook} {...room} />
            ))
          : null}
      </div>
    </div>
  );
};

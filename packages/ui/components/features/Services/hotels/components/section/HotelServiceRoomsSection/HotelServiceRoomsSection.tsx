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
    <div className="w-full flex gap-2 flex-col h-[90rem]">
      <p ref={roomsRef ?? undefined}>{t("Rooms")}</p>
      <Slider
        gap={16}
        leftArrowComponent={CaruoselLeftArrow}
        rightArrowComponent={CaruoselRightArrow}
        itemsCount={isMobile ? 1 : isTablet ? 2 : 3}
      >
        {Array.isArray(rooms)
          ? rooms.map((room) => (
              <HotelRoomDetailsCard onBook={handleBook} {...room} />
            ))
          : null}
      </Slider>
    </div>
  );
};

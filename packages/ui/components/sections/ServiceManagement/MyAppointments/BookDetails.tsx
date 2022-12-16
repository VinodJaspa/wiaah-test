import React from "react";
import { useTranslation } from "react-i18next";
import { IoCall, IoLocation } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { PriceType, Service } from "types";
import {
  QrcodeDisplay,
  Divider,
  Button,
  CalanderPage,
  Table,
  TableContainer,
  TBody,
  THead,
  Tr,
  Td,
  Th,
  HStack,
  PriceDisplay,
} from "ui";
import { BookingsSectionCtx } from ".";

const service: Service = {
  serviceName: "test service name",
  serviceOwner: "Wiaah",
  serviceThumbnail:
    "https://cdn.dayrooms.com/image_cache/A1000/1783/King-d16ae5df94d1ffadec0a2eb6ffa86c97-hotel-homepage.jpg",
  contacts: {
    phone: "123456789",
    email: "testemail@email.com",
  },
  rooms: [
    {
      type: "one",
      nightPrice: 1250,
      nights: 2,
    },
    {
      type: "two",
      nightPrice: 1550,
      nights: 2,
    },
    {
      type: "three",
      nightPrice: 950,
      nights: 1,
    },
  ],
  location: {
    streetName: "Shri New Homestay, Coorg, Madikeri Road",
    streetNumber: 571201,
    city: "Karnataka",
    country: "",
  },
};

export interface BookDetailsSectionProps {
  bookId: string;
  onGoBack: () => any;
}

export const BookDetailsSection: React.FC<BookDetailsSectionProps> = ({
  bookId,
  onGoBack,
}) => {
  const total: PriceType = {
    amount: 150,
    currency: "CHF",
  };
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col overflow-hidden 2xl:flex-row gap-10">
        <div className="flex flex-col h-auto w-full justify-between">
          <div className="w-full flex gap-8 flex-col">
            <div className="flex w-full justify-between items-center">
              <span className="text-4xl font-bold">
                {t("checkin_details", "Checkin Details")}
              </span>
              <Button
                colorScheme="danger"
                onClick={() => onGoBack && onGoBack()}
              >
                {t("cancel_the_booking", "Cancel the booking")}
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row justify-between">
              <div className="flex gap-4">
                {/* book qr and number  */}
                <div className="w-28">
                  <QrcodeDisplay className="w-full" value={bookId} />
                </div>
                <div className="flex flex-col">
                  <div className="flex whitespace-nowrap flex-col">
                    {t("booking_number", "Booking Number")}
                    <span className="font-bold" data-testid="BookNumber">
                      #{bookId}
                    </span>
                  </div>
                  <Divider />
                  <Button outline>{t("save_the_qr", "Save the QR")}</Button>
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  <span className="text-xl py-1">
                    {t("checkin", "Checkin")}
                  </span>
                  <CalanderPage date={Date.now()} />
                </div>
                <div>
                  <span className="py-1 text-xl">
                    {t("checkout", "Checkout")}
                  </span>
                  <CalanderPage date={Date.now()} />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-12 text-gray-500">
              {/* checkin details */}
              <div>
                <span className="text-3xl font-bold">
                  {t("room_fare_breakup", "Room Fare Breakup")}
                </span>
                <TableContainer>
                  <Table
                    ThProps={{ className: "first:text-left text-right" }}
                    TdProps={{ className: "first:text-left text-right" }}
                    className="w-full"
                  >
                    <THead>
                      <Tr>
                        <Th>{t("room_type", "Room Type")}</Th>
                        <Th>{t("room_price", "Room Price")}</Th>
                        <Th>{t("total", "Total")}</Th>
                      </Tr>
                    </THead>
                    <TBody data-testid="RoomsTable">
                      {service.rooms.map((room, i) => (
                        <Tr key={i} data-testid="Room">
                          <Td data-testid="RoomType">
                            <span>Room Type {room.type}</span>
                          </Td>
                          <Td className="flex items-center">
                            <span data-testid="RoomNightPrice">
                              {room.nightPrice}
                            </span>
                            *<span data-testid="RoomNights">{room.nights}</span>
                          </Td>
                          <Td data-testid="RoomTotalPrice">
                            {room.nightPrice * room.nights}
                          </Td>
                        </Tr>
                      ))}
                    </TBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
            <div className="w-full flex justify-end items-center">
              <span className="text-xl font-bold flex items-center gap-2">
                {t("total", "Total")}: <PriceDisplay priceObject={total} />
              </span>
            </div>
          </div>
          <Button
            className=" mb-5 w-fit"
            onClick={() => onGoBack && onGoBack()}
          >
            {t("go_back", "Go back")}
          </Button>
        </div>
        <div className="text-xl w-full 2xl:w-[40rem] gap-4 flex flex-col">
          {/* hotel details */}
          <div className="w-full h-[30rem]">
            <img
              data-testid="ServicePhoto"
              src={service.serviceThumbnail}
              className="w-full h-[100%] object-cover"
            />
          </div>
          <span
            className="font-bold text-3xl text-gray-500"
            data-testid="ServiceName"
          >
            {service.serviceName}
          </span>
          <div className="flex gap-2 font-bold" data-testid="ServiceOwner">
            {t("buyer", "Buyer")}:{" "}
            <span className="text-gray-500">{service.serviceOwner}</span>
          </div>
          <div className="flex gap-2">
            <IoLocation />
            <div className="flex flex-col">
              <span data-testid="StreetName">
                {service.location.streetName}
              </span>
              <span>
                <span data-testid="LocationCity">{service.location.city}</span>-
                <span data-testid="StreetNumber">
                  {service.location.streetNumber}
                </span>
              </span>
            </div>
          </div>
          {service.contacts && (
            <>
              {service.contacts.phone && (
                <HStack>
                  <IoCall />
                  <span data-testid="ContactPhone">
                    {service.contacts.phone}
                  </span>
                </HStack>
              )}
              {service.contacts.email && (
                <HStack>
                  <MdEmail />
                  <span data-testid="ContactEmail">
                    {service.contacts.email}
                  </span>
                </HStack>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

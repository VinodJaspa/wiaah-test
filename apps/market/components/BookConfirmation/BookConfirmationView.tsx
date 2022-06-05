import React from "react";
import { CalanderPage, ChecklistIcon, PriceDisplay, TableContainer } from "ui";
import { PriceType, Service } from "types";
import { IoCall, IoLocation } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { QRCodeSVG } from "qrcode.react";
import { Table, Tr, Td, Th, TBody, THead, Button, Divider, HStack } from "ui";
import { useTranslation } from "react-i18next";

export interface BookConfirmationViewProps {
  service: Service;
}

export const BookConfirmationView: React.FC<BookConfirmationViewProps> = ({
  service: {
    location,
    serviceName,
    serviceOwner,
    serviceThumbnail,
    contacts,
    rooms,
  },
}) => {
  const total: PriceType = {
    amount: 150,
    currency: "CHF",
  };
  const bookId = "45DG9QY";
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-8 py-16">
      <div className="w-full shadow-md bg-primary-50 p-20 ">
        <div className="flex items-center gap-4">
          <ChecklistIcon className="w-20 fill-primary" />
          <div className="flex flex-col">
            <span className="font-bold">
              {t("booking_confirmed", "Booking Confirmed")}
            </span>
            <span>
              {t(
                "we_have_booked",
                "We have booked your spot for the selected date at the selected facility. Please arrive at the facility in due date and show the below QR code or Book Number at the counter"
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center flex-col lg:flex-row gap-40">
        <div className="w-full flex gap-8 flex-col">
          <span className="text-4xl font-bold">
            {t("checkin_details", "Checkin Details")}
          </span>
          <div className="flex justify-between">
            <div className="flex gap-4">
              {/* book qr and number  */}
              <div className="w-40">
                <QRCodeSVG size={"100%"} value={bookId} />
              </div>
              <div className="flex flex-col">
                <div className="flex flex-col">
                  {t("booking_number", "Booking Number")}
                  <span className="font-bold" data-testid="BookNumber">
                    #{bookId}
                  </span>
                </div>
                <Divider />
                <Button outline>{t("save_the_qr", "Save the QR")}</Button>
              </div>
            </div>
            <Divider />
            <div className="flex gap-16">
              <div>
                <span className="text-xl py-1">{t("checkin", "Checkin")}</span>
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
                  ThProps={{ className: "last:text-right" }}
                  TdProps={{ className: "last:text-right" }}
                  className="w-full"
                >
                  <THead>
                    <Tr>
                      <Td>Room Type</Td>
                      <Td>Room Price</Td>
                      <Td>Total</Td>
                    </Tr>
                  </THead>
                  <TBody data-testid="RoomsTable">
                    {rooms.map((room, i) => (
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
        <div className="text-xl w-[40rem] gap-2 flex-col">
          {/* hotel details */}
          {/* <AspectRatio w={"100%"} ratio={9 / 10}> */}
          <div className="w-full h-[30rem]">
            <img
              data-testid="ServicePhoto"
              src={serviceThumbnail}
              className="w-full h-[100%] object-cover"
            />
          </div>
          {/* </AspectRatio> */}
          <span
            className="font-bold text-3xl text-gray-500"
            data-testid="ServiceName"
          >
            {serviceName}
          </span>
          <div className="flex gap-2" data-testid="ServiceOwner">
            {t("owner", "Owner")}:{" "}
            <span className="text-gray-500 font-bold">{serviceOwner}</span>
          </div>
          <div className="flex gap-2">
            <IoLocation />
            <div className="flex flex-col">
              <span data-testid="StreetName">{location.streetName}</span>
              <span>
                <span data-testid="LocationCity">{location.city}</span>-
                <span data-testid="StreetNumber">{location.streetNumber}</span>
              </span>
            </div>
          </div>
          {contacts && (
            <>
              {contacts.phone && (
                <HStack>
                  <IoCall />
                  <span data-testid="ContactPhone">{contacts.phone}</span>
                </HStack>
              )}
              {contacts.email && (
                <HStack>
                  <MdEmail />
                  <span data-testid="ContactEmail">{contacts.email}</span>
                </HStack>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

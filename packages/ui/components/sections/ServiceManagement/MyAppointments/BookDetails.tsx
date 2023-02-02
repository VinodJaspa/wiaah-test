import React from "react";
import { useTranslation } from "react-i18next";
import { IoCall, IoLocation } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
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
  useGetAppointmentDetailsQuery,
} from "@UI";

export interface BookDetailsSectionProps {
  bookId: string;
  onGoBack: () => any;
}

export const BookDetailsSection: React.FC<BookDetailsSectionProps> = ({
  bookId,
  onGoBack,
}) => {
  const { data:service } = useGetAppointmentDetailsQuery(bookId)
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col overflow-hidden 2xl:flex-row gap-10">
        <div className="flex flex-col h-auto w-full justify-between">
          <div className="w-full flex gap-8 flex-col">
            <div className="flex w-full justify-between items-center">
              <span className="text-4xl font-bold">{t("Checkin Details")}</span>
              <Button
                colorScheme="danger"
                onClick={() => onGoBack && onGoBack()}
              >
                {t("Cancel the booking")}
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
                    {t("Booking Number")}
                    <span className="font-bold" data-testid="BookNumber">
                      #{bookId}
                    </span>
                  </div>
                  <Divider />
                  <Button outline>{t("Save the QR")}</Button>
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  <span className="text-xl py-1">{t("Checkin")}</span>
                  <CalanderPage date={Date.now()} />
                </div>
                <div>
                  <span className="py-1 text-xl">{t("Checkout")}</span>
                  <CalanderPage date={Date.now()} />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-12 text-gray-500">
              {/* checkin details */}
              <div>
                <span className="text-3xl font-bold">
                  {t("Room Fare Breakup")}
                </span>
                <TableContainer>
                  <Table
                    ThProps={{ className: "first:text-left text-right" }}
                    TdProps={{ className: "first:text-left text-right" }}
                    className="w-full"
                  >
                    <THead>
                      <Tr>
                        <Th>{t("Room Type")}</Th>
                        <Th>{t("Room Price")}</Th>
                        <Th>{t("Total")}</Th>
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
                {t("Total")}: <PriceDisplay priceObject={total} />
              </span>
            </div>
          </div>
          <Button
            className=" mb-5 w-fit"
            onClick={() => onGoBack && onGoBack()}
          >
            {t("Go back")}
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
            {t("Buyer")}:{" "}
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

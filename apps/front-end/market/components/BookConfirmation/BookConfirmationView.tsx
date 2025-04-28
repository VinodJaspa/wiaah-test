import React from "react";
import { ChecklistIcon } from "ui";
import { PriceType } from "types";
import {
  QrcodeDisplay,
  ServiceReachOutSection,
  ServiceWorkingHoursSection,
  useGetBookedServiceConfirmationDataQuery,
  SpinnerFallback,
  ServiceCheckoutCardSwitcher,
  Divider,
  Button,
} from "ui";
import { useTranslation } from "react-i18next";

export interface BookConfirmationViewProps {
  id: string;
}

export const BookConfirmationView: React.FC<BookConfirmationViewProps> = ({
  id,
}) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const {
    data: res,
    isLoading,
    isError,
  } = useGetBookedServiceConfirmationDataQuery(id);
  const total: PriceType = {
    amount: 150,
    currency: "CHF",
  };

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
      <div className="flex flex-col lg:flex-row gap-32">
        <div className="w-full">
          <div className="flex gap-4">
            {/* book qr and number  */}
            <div className="w-40">
              <SpinnerFallback isError={isError} isLoading={isLoading}>
                {res ? <QrcodeDisplay value={res.data.bookedId} /> : null}
              </SpinnerFallback>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col">
                {t("booking_number", "Booking Number")}
                <span className="font-bold" data-testid="BookNumber">
                  #{res ? res.data.bookedId : null}
                </span>
              </div>
              <Divider />
              <Button outline>{t("save_the_qr", "Save the QR")}</Button>
            </div>
          </div>
          <Divider />
          <div className="flex gap-4 w-full justify-between">
            <SpinnerFallback isLoading={isLoading} isError={isError}>
              {res ? <ServiceReachOutSection {...res.data.reactOut} /> : null}
            </SpinnerFallback>
            <SpinnerFallback isError={isError} isLoading={isLoading}>
              {res ? (
                <ServiceWorkingHoursSection
                  workingHours={res.data.workingDays.workingHours}
                />
              ) : null}
            </SpinnerFallback>
          </div>
        </div>
        <div className="text-xl w-[min(40rem,100%)] gap-2 flex flex-col">
          <SpinnerFallback isLoading={isLoading} isError={isError}>
            {res ? (
              <ServiceCheckoutCardSwitcher service={res.data.propertyData} />
            ) : null}
          </SpinnerFallback>
        </div>
      </div>
    </div>
  );
};

// <div className="w-full flex gap-8 flex-col">
//           <span className="text-4xl font-bold">
//             {t("checkin_details", "Checkin Details")}
//           </span>
//           <div className="flex justify-between">
//             <div className="flex gap-4">
//               {/* book qr and number  */}
//               <div className="w-40">
//                 <SpinnerFallback isError={isError} isLoading={isLoading}>
//                   {res ? <QrcodeDisplay value={res.data.BookedId} /> : null}
//                 </SpinnerFallback>
//               </div>
//               <div className="flex flex-col">
//                 <div className="flex flex-col">
//                   {t("booking_number", "Booking Number")}
//                   <span className="font-bold" data-testid="BookNumber">
//                     #{res ? res.data.BookedId : null}
//                   </span>
//                 </div>
//                 <Divider />
//                 <Button outline>{t("save_the_qr", "Save the QR")}</Button>
//               </div>
//             </div>
//             <Divider />
//             <div className="flex gap-16">
//               <div>
//                 <span className="text-xl py-1">{t("checkin", "Checkin")}</span>
//                 <CalanderPage date={Date.now()} />
//               </div>
//               <div>
//                 <span className="py-1 text-xl">
//                   {t("checkout", "Checkout")}
//                 </span>
//                 <CalanderPage date={Date.now()} />
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col gap-12 text-gray-500">
//             {/* checkin details */}
//             <div>
//               <span className="text-3xl font-bold">
//                 {t("room_fare_breakup", "Room Fare Breakup")}
//               </span>
//               <TableContainer>
//                 <Table
//                   ThProps={{ className: "last:text-right" }}
//                   TdProps={{ className: "last:text-right" }}
//                   className="w-full"
//                 >
//                   <THead>
//                     <Tr>
//                       <Td>{t("Room Type")}</Td>
//                       <Td>{t("Room Price")}</Td>
//                       <Td>{t("Total")}</Td>
//                     </Tr>
//                   </THead>
//                   <TBody data-testid="RoomsTable">
//                     {rooms.map((room, i) => (
//                       <Tr key={i} data-testid="Room">
//                         <Td data-testid="RoomType">
//                           <span>Room Type {room.type}</span>
//                         </Td>
//                         <Td className="flex items-center">
//                           <span data-testid="RoomNightPrice">
//                             {room.nightPrice}
//                           </span>
//                           *<span data-testid="RoomNights">{room.nights}</span>
//                         </Td>
//                         <Td data-testid="RoomTotalPrice">
//                           {room.nightPrice * room.nights}
//                         </Td>
//                       </Tr>
//                     ))}
//                   </TBody>
//                 </Table>
//               </TableContainer>
//             </div>
//           </div>
//           <div className="w-full flex justify-end items-center">
//             <span className="text-xl font-bold flex items-center gap-2">
//               {t("total", "Total")}: <PriceDisplay priceObject={total} />
//             </span>
//           </div>
//         </div>

{
  /* <AspectRatioImage
            ratio={7 / 6}
            alt={serviceName}
            data-testid="ServicePhoto"
            src={serviceThumbnail}
          />
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
          )} */
}
